import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import * as FileSaver from "file-saver";
import { useCallback, useState } from "react";
import ExcelJS from "exceljs";

/**
 * 기본 데이터 항목 타입 - 모든 객체는 이것으로 취급
 */
export type DataItem = Record<string, unknown>;

/**
 * 엑셀 내보내기 훅 속성
 * @template TData 내보낼 데이터 타입 (기본값: unknown[])
 */
export interface ExcelJsProps<TData = unknown[]> {
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
 * ExcelJS를 사용한 엑셀 내보내기 기능을 제공하는 커스텀 훅
 *
 * @template TData 내보낼 데이터의 타입 (배열 형태)
 * @param {ExcelJsProps<TData>} props 엑셀 내보내기에 필요한 설정
 * @returns 엑셀 다운로드 실행 함수와 상태값
 *
 * @example
 * ```tsx
 * const { executeExport, isExportExcelLoading } = useExceljs<Post[]>({
 *   fileName: "posts-data",
 *   aliasObj: { id: "번호", title: "제목", body: "내용" },
 *   dataFetch: fetchPostsData
 * });
 * ```
 */
const useExceljs = <TData extends unknown[] = unknown[]>({
  fileName,
  aliasObj = {},
  statusAliasObj,
  dataFetch,
}: ExcelJsProps<TData>) => {
  // 엑셀 다운로드 진행 상태를 관리하는 상태값
  const [isExportExcelLoading, setIsExportExcelLoading] = useState(false);

  /**
   * 데이터의 키 이름을 변환하는 함수
   *
   * @param list 변환할 데이터 배열
   */
  const renameKey = useCallback(
    async (list: TData) => {
      if (!list || list.length === 0) return [];

      // 객체 배열에 대해 처리
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (list as any[]).map((obj, index) => {
        const newObj: Record<string, unknown> = {};
        const sequence = list.length - index;

        // 기존 객체의 모든 키에 대해 변환 작업 수행
        Object.keys(obj).forEach((key) => {
          // 변환할 키가 aliasObj에 있는지 확인
          if (Object.keys(aliasObj).includes(key)) {
            // boolean 값은 문자열로 변환
            let value =
              typeof obj[key] === "boolean"
                ? JSON.stringify(obj[key])
                : obj[key];

            // 상태값 변환 처리
            if (statusAliasObj && key in statusAliasObj) {
              const statusValue = String(value);
              if (statusValue in statusAliasObj[key]) {
                value = statusAliasObj[key][statusValue];
              }
            }

            // 문자열 값 처리
            if (typeof value === "string") value = value.toUpperCase();
            if (typeof value === "string" && key === "walletAddress") {
              value = value.trim();
            }

            // 번호 필드 처리
            if (key === "no") value = sequence;

            // 변환된 키와 값으로 새 객체 구성
            newObj[aliasObj[key]] = value;
            delete newObj[key];
          } else {
            // aliasObj에 없는 키는 그대로 유지
            newObj[key] = obj[key];
          }
        });

        return newObj;
      });
    },
    [aliasObj, statusAliasObj]
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
          console.error("내보낼 데이터가 없습니다.");
          setIsExportExcelLoading(false);
          return;
        }

        // 데이터 키 변환 처리
        const transformedData = await renameKey(list as TData);

        // 현재 시간을 YYYY-MM-DD_HHmmss 형식으로 포맷팅
        const now = new Date();
        const dateString = now.toISOString().split("T")[0];
        const timeString = now.toTimeString().split(" ")[0].replace(/:/g, "");
        const formattedFileName = `${fileName}_${dateString}_${timeString}`;

        // 워크북 생성
        const workbook = new ExcelJS.Workbook();
        workbook.created = now;
        workbook.modified = now;

        // 워크시트 생성
        const worksheet = workbook.addWorksheet("data-list", {
          properties: { tabColor: { argb: "4F81BD" } },
        });

        // 헤더 정보 가져오기
        const headers = Object.keys(transformedData[0] || {});

        // 컬럼 설정
        worksheet.columns = headers.map((header) => ({
          header,
          key: header,
          width: 20,
        }));

        // 헤더 행 스타일 설정
        const headerRow = worksheet.getRow(1);
        headerRow.eachCell((cell) => {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "4F81BD" },
          };
          cell.font = {
            name: "맑은 고딕",
            color: { argb: "FFFFFF" },
            bold: true,
            size: 12,
          };
          cell.alignment = {
            horizontal: "center",
            vertical: "middle",
          };
          cell.border = {
            top: { style: "thin", color: { argb: "8EA9DB" } },
            bottom: { style: "thin", color: { argb: "8EA9DB" } },
            left: { style: "thin", color: { argb: "8EA9DB" } },
            right: { style: "thin", color: { argb: "8EA9DB" } },
          };
        });

        // 데이터 추가
        transformedData.forEach((item, index) => {
          const row = worksheet.addRow(item);

          // 행 스타일 설정 (홀수/짝수 행 구분)
          const isOdd = (index + 1) % 2 !== 0;

          row.eachCell((cell) => {
            // 기본 셀 스타일
            cell.font = {
              name: "맑은 고딕",
              size: 11,
            };

            cell.alignment = {
              vertical: "middle",
              wrapText: true,
            };

            cell.border = {
              top: { style: "thin", color: { argb: "D3D3D3" } },
              bottom: { style: "thin", color: { argb: "D3D3D3" } },
              left: { style: "thin", color: { argb: "D3D3D3" } },
              right: { style: "thin", color: { argb: "D3D3D3" } },
            };

            // 홀수 행 배경색 설정
            if (isOdd) {
              cell.fill = {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "F5F5F5" },
              };
            }
          });
        });

        // 엑셀 파일로 내보내기
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        FileSaver.saveAs(blob, `${formattedFileName}.xlsx`);
      } else {
        console.error("데이터 가져오기 실패:", fetchResult.error);
      }
    } catch (error) {
      console.error("엑셀 내보내기 중 오류 발생:", error);
    } finally {
      setIsExportExcelLoading(false);
    }
  }, [dataFetch, renameKey, fileName]);

  return {
    /** 엑셀 내보내기 로딩 상태 */
    isExportExcelLoading,
    /** 엑셀 내보내기 실행 함수 */
    executeExport,
    /** 외부에서 로딩 상태를 조작하기 위한 함수 */
    setIsExportExcelLoading,
  };
};

export default useExceljs;
