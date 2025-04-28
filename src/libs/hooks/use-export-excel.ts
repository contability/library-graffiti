import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import * as FileSaver from "file-saver";
import { useCallback, useState } from "react";
import * as XLSX from "sheetjs-style";

/**
 * 기본 데이터 항목 타입 - 모든 객체는 이것으로 취급
 */
export type DataItem = Record<string, unknown>;

/**
 * 엑셀 내보내기 훅 속성
 */
export interface ExportExcelProps<TData = unknown[]> {
  /** 파일 이름. fileName_YYYY-MM-DD_hhmmss로 export */
  fileName: string;
  /** 데이터 패치 이벤트 */
  dataFetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<TData, Error>>;
  /** 로딩 여부 상태 설정 */
  // setIsLoading: (isLoading: boolean) => void;
  /** 컬럼 별칭 오브젝트 */
  aliasObj?: Record<string, string>;
  /** 상태 값 별칭 오브젝트. 열거형 처럼 숫자 등의 값과 실제 의미를 갖는 객체를 맵핑하려는 의도. */
  statusAliasObj?: Record<string, Record<string, string>>;
}

/**
 * 엑셀 내보내기 훅
 */
const useExportExcel = <TData extends unknown[] = unknown[]>({
  fileName,
  aliasObj = {},
  statusAliasObj,
  dataFetch,
}: ExportExcelProps<TData>) => {
  const [isExportExcelLoading, setIsExportExcelLoading] = useState(false);

  const renameKey = useCallback(
    async (list: TData) => {
      if (!list || list.length === 0) return;
      let sequence = list.length;

      // 객체 배열에 대해 처리
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await list.map((obj: any) => {
        const aliasObjKeys = Object.keys(aliasObj);
        aliasObjKeys.map((key) => {
          let value =
            typeof obj[key] === "boolean" ? JSON.stringify(obj[key]) : obj[key];
          if (statusAliasObj) {
            const statusFields = Object.keys(statusAliasObj);
            statusFields.find((statusField) => {
              if (key === statusField) {
                value = statusAliasObj[statusField][String(value)];
              }
            });
          }
          if (typeof value === "string") value = value.toUpperCase();
          if (typeof value === "string" && key === "walletAddress")
            value = value.trim();
          if (key === "no") value = sequence--;
          obj[aliasObj[key]] = value;
          delete obj[key];
        });
      });
    },
    [aliasObj, statusAliasObj]
  );

  const executeExport = useCallback(async () => {
    setIsExportExcelLoading(true);
    const fetchResult = await dataFetch();

    // 데이터 가져오기 성공 확인
    if (fetchResult.status === "success" && fetchResult.data) {
      const list = fetchResult.data;

      // 다운로드 할 데이터가 없을 때
      if (!Array.isArray(list) || list.length < 1) {
        setIsExportExcelLoading(false);
        return;
      }

      await renameKey(list as TData);
      const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8";
      const extension = ".xlsx";

      // 현재 시간을 YYYY-MM-DD_HHmmss 형식으로 포맷팅
      const now = new Date();
      const dateString = now.toISOString().split("T")[0];
      const timeString = now.toTimeString().split(" ")[0].replace(/:/g, "");
      const formattedFileName = `${fileName}_${dateString}_${timeString}`;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ws = XLSX.utils.json_to_sheet(list as any[]);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], { type: fileType });

      await FileSaver.saveAs(data, formattedFileName + extension);
    } else {
      // 에러 처리
      console.error("데이터 가져오기 실패:", fetchResult.error);
    }

    setIsExportExcelLoading(false);
  }, [dataFetch, renameKey, fileName]);

  return {
    /** 외부에서 로딩 모달을 띄워주기 위한 state 값 */
    isExportExcelLoading,
    /** excel export 실행 함수 */
    executeExport,
    /** 외부에서 로딩 모달을 조작하기 위한 state 조작 함수 */
    setIsExportExcelLoading,
  };
};

export default useExportExcel;
