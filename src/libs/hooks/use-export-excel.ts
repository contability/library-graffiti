/* eslint-disable @typescript-eslint/no-explicit-any */
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
 * @template TData 내보낼 데이터 타입 (기본값: unknown[])
 */
export interface ExportExcelProps<TData = unknown[]> {
  /**
   * 파일 이름. fileName_YYYY-MM-DD_hhmmss 형식으로 export됨
   */
  fileName: string;
  /**
   * 데이터 패치 이벤트 함수.
   * React Query의 refetch 함수와 같은 형태로 데이터를 가져옴
   */
  dataFetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<TData | undefined, Error>>;
  /**
   * 컬럼 별칭 객체.
   * 원본 데이터의 키를 엑셀에 표시할 다른 이름으로 매핑
   * 예: { userId: '사용자 ID', title: '제목' }
   */
  aliasObj?: Record<string, string>;
  /**
   * 상태 값 별칭 객체.
   * 숫자나 코드 값을 의미 있는 텍스트로 변환할 때 사용
   * 예: { status: { '0': '대기중', '1': '진행중', '2': '완료' } }
   */
  statusAliasObj?: Record<string, Record<string, string>>;
}

/**
 * 엑셀 내보내기 기능을 제공하는 커스텀 훅
 *
 * @template TData 내보낼 데이터의 타입 (배열 형태)
 * @param {ExportExcelProps<TData>} props 엑셀 내보내기에 필요한 설정
 * @returns 엑셀 다운로드 실행 함수와 상태값
 *
 * @example
 * ```tsx
 * const { executeExport, isExportExcelLoading } = useExportExcel<Post[]>({
 *   fileName: "posts-data",
 *   aliasObj: { id: "번호", title: "제목", body: "내용" },
 *   dataFetch: fetchPostsData
 * });
 * ```
 */
const useExportExcel = <TData extends unknown[] = unknown[]>({
  fileName,
  aliasObj = {},
  statusAliasObj,
  dataFetch,
}: ExportExcelProps<TData>) => {
  // 엑셀 다운로드 진행 상태를 관리하는 상태값
  const [isExportExcelLoading, setIsExportExcelLoading] = useState(false);

  /**
   * 데이터의 키 이름을 변환하는 함수
   *
   * @param list 변환할 데이터 배열
   */
  const renameKey = useCallback(
    async (list: TData) => {
      if (!list || list.length === 0) return;
      let sequence = list.length;

      // 객체 배열에 대해 처리
      for (const obj of list as any[]) {
        const aliasObjKeys = Object.keys(aliasObj);
        for (const key of aliasObjKeys) {
          // boolean 값은 문자열로 변환
          let value =
            typeof obj[key] === "boolean" ? JSON.stringify(obj[key]) : obj[key];

          // 상태값 변환 처리
          if (statusAliasObj) {
            const statusFields = Object.keys(statusAliasObj);
            for (const statusField of statusFields) {
              if (key === statusField) {
                value = statusAliasObj[statusField][String(value)];
              }
            }
          }

          // 문자열 값 처리
          if (typeof value === "string") value = value.toUpperCase();
          if (typeof value === "string" && key === "walletAddress")
            value = value.trim();

          // 번호 필드 처리
          if (key === "no") value = sequence--;

          // 변환된 키와 값으로 객체 수정
          obj[aliasObj[key]] = value;
          delete obj[key];
        }
      }
    },
    [aliasObj, statusAliasObj]
  );

  /**
   * 헤더 스타일을 적용하는 함수
   * @param worksheet 워크시트 객체
   * @param headerRow 헤더 행 배열
   */
  const applyHeaderStyles = useCallback(
    (worksheet: XLSX.WorkSheet, headerCells: string[]) => {
      const headerStyle = {
        fill: {
          patternType: "solid",
          fgColor: { rgb: "4F81BD" },
          bgColor: { rgb: "4F81BD" },
        },
        font: {
          name: "맑은 고딕",
          color: { rgb: "FFFFFF" },
          bold: true,
          sz: 12,
        },
        alignment: {
          horizontal: "center",
          vertical: "center",
        },
        border: {
          top: { style: "thin", color: { rgb: "8EA9DB" } },
          bottom: { style: "thin", color: { rgb: "8EA9DB" } },
          left: { style: "thin", color: { rgb: "8EA9DB" } },
          right: { style: "thin", color: { rgb: "8EA9DB" } },
        },
      };

      // 헤더 셀에 스타일 적용
      headerCells.forEach((cell, idx) => {
        const cellAddress = XLSX.utils.encode_cell({ r: 0, c: idx });
        if (worksheet[cellAddress]) {
          worksheet[cellAddress].s = headerStyle;
        }
      });

      return worksheet;
    },
    []
  );

  /**
   * 데이터 셀에 스타일을 적용하는 함수
   * @param worksheet 워크시트 객체
   * @param list 데이터 리스트
   */
  const applyDataStyles = useCallback(
    (worksheet: XLSX.WorkSheet, list: TData) => {
      // 기본 데이터 셀 스타일
      const dataStyle = {
        font: {
          name: "맑은 고딕",
          sz: 11,
        },
        alignment: {
          vertical: "center",
          wrapText: true,
        },
        border: {
          top: { style: "thin", color: { rgb: "D3D3D3" } },
          bottom: { style: "thin", color: { rgb: "D3D3D3" } },
          left: { style: "thin", color: { rgb: "D3D3D3" } },
          right: { style: "thin", color: { rgb: "D3D3D3" } },
        },
      };

      // 홀수 행 스타일 (약간 다른 배경색)
      const oddRowStyle = {
        ...dataStyle,
        fill: {
          patternType: "solid",
          fgColor: { rgb: "F5F5F5" },
          bgColor: { rgb: "F5F5F5" },
        },
      };

      // 데이터 항목 수에 따라 행 설정
      for (let r = 1; r <= list.length; r++) {
        // 데이터 항목의 모든 속성에 대해 스타일 적용
        if (list[r - 1]) {
          const keys = Object.keys(list[r - 1] as Record<string, unknown>);
          for (let c = 0; c < keys.length; c++) {
            const cellAddress = XLSX.utils.encode_cell({ r, c });
            if (worksheet[cellAddress]) {
              // 홀수 행과 짝수 행에 다른 스타일 적용
              worksheet[cellAddress].s = r % 2 === 1 ? oddRowStyle : dataStyle;
            }
          }
        }
      }

      return worksheet;
    },
    []
  );

  /**
   * 열 너비 설정 함수
   * @param worksheet 워크시트 객체
   * @param headerCells 헤더 셀 배열
   */
  const setColumnWidths = useCallback(
    (worksheet: XLSX.WorkSheet, headerCells: string[]) => {
      // 모든 컬럼에 적당한 너비 설정
      const colCount = headerCells.length;
      const cols = [];

      for (let i = 0; i < colCount; i++) {
        cols.push({ wch: 15 }); // 기본 너비 15 문자로 설정
      }

      worksheet["!cols"] = cols;
      return worksheet;
    },
    []
  );

  /**
   * 엑셀 내보내기를 실행하는 함수
   * 데이터를 가져와서 가공한 후 엑셀 파일로 다운로드
   */
  const executeExport = useCallback(async () => {
    // 로딩 상태 시작
    setIsExportExcelLoading(true);

    try {
      // 데이터 가져오기
      const fetchResult = await dataFetch();

      // 데이터 가져오기 성공 확인
      if (fetchResult.status === "success" && fetchResult.data) {
        const list = fetchResult.data;

        // 다운로드할 데이터가 없을 때
        if (!Array.isArray(list) || list.length < 1) {
          setIsExportExcelLoading(false);
          return;
        }

        // 데이터 키 변환 처리
        await renameKey(list as TData);

        // 엑셀 파일 타입 설정
        const fileType =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8";
        const extension = ".xlsx";

        // 현재 시간을 YYYY-MM-DD_HHmmss 형식으로 포맷팅
        const now = new Date();
        const dateString = now.toISOString().split("T")[0];
        const timeString = now.toTimeString().split(" ")[0].replace(/:/g, "");
        const formattedFileName = `${fileName}_${dateString}_${timeString}`;

        // SheetJS를 사용하여 JSON 데이터를 엑셀 형식으로 변환
        let ws = XLSX.utils.json_to_sheet(list as any[]);

        // 헤더 셀 가져오기 (첫 번째 행의 모든 컬럼)
        const headerCells = Object.keys(
          list.length > 0 ? list[0] : ({} as any)
        );

        // 스타일 적용
        // TODO: 스타일 적용 안되는 이슈 있음. 수정 필요.
        ws = applyHeaderStyles(ws, headerCells);
        ws = applyDataStyles(ws, list);
        ws = setColumnWidths(ws, headerCells);

        // 워크북 생성
        const wb = XLSX.utils.book_new();

        // 워크시트를 워크북에 추가
        XLSX.utils.book_append_sheet(wb, ws, "data");

        // 워크북을 Excel 파일로 변환 (cellStyles 옵션 추가)
        const excelBuffer = XLSX.write(wb, {
          bookType: "xlsx",
          type: "array",
          bookSST: false,
          cellStyles: true,
        });

        // Blob 생성 및 파일 다운로드
        const data = new Blob([excelBuffer], { type: fileType });
        await FileSaver.saveAs(data, formattedFileName + extension);
      } else {
        // 에러 처리
        console.error("데이터 가져오기 실패:", fetchResult.error);
      }
    } catch (error) {
      console.error("엑셀 내보내기 중 오류 발생:", error);
    } finally {
      // 작업 완료 후 로딩 상태 종료
      setIsExportExcelLoading(false);
    }
  }, [
    dataFetch,
    renameKey,
    fileName,
    applyHeaderStyles,
    applyDataStyles,
    setColumnWidths,
  ]);

  return {
    /** 엑셀 내보내기 로딩 상태 */
    isExportExcelLoading,
    /** 엑셀 내보내기 실행 함수 */
    executeExport,
    /** 외부에서 로딩 상태를 조작하기 위한 함수 */
    setIsExportExcelLoading,
  };
};

export default useExportExcel;
