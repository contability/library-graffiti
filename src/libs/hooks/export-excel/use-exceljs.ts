/* eslint-disable @typescript-eslint/no-explicit-any */
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import * as FileSaver from "file-saver";
import { useCallback, useState } from "react";
import ExcelJS from "exceljs";

// 기본 시바견 이미지 URL
const SHIBA_INU_IMAGE_URL =
  "https://raw.githubusercontent.com/contability/assets-hub/main/images/shiba_inu.webp";

// 이미지 URL을 스키마 없이 정규화하는 함수
function normalizeImageUrl(url: string): string {
  // GitHub 원시 이미지 URL 처리
  if (url.includes("raw.githubusercontent.com")) {
    return url;
  }

  // 이미지 URL이 상대 경로인 경우 절대 경로로 변환
  if (url.startsWith("/") && !url.startsWith("//")) {
    return `${window.location.origin}${url}`;
  }

  return url;
}

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
  /**
   * 샘플 이미지 URL (선택사항)
   * 첫 번째 시트 하단에 이미지를 추가
   */
  sampleImageUrl?: string;
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
  sampleImageUrl,
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
   * 이미지를 ArrayBuffer로 가져오는 함수
   */
  const fetchImageAsArrayBuffer = useCallback(
    async (
      imageUrl: string
    ): Promise<{ buffer: ArrayBuffer; type: string } | null> => {
      try {
        const normalizedUrl = normalizeImageUrl(imageUrl);
        console.log("이미지 URL 가져오기 시도:", normalizedUrl);

        const response = await fetch(normalizedUrl, {
          method: "GET",
          mode: "cors",
          cache: "no-cache",
        });

        if (!response.ok) {
          throw new Error(`이미지 로딩 실패: ${response.status}`);
        }

        const arrayBuffer = await response.arrayBuffer();
        const contentType =
          response.headers.get("content-type") || "image/jpeg";

        console.log("이미지 다운로드 성공:", {
          size: arrayBuffer.byteLength,
          type: contentType,
        });

        return {
          buffer: arrayBuffer,
          type: contentType,
        };
      } catch (error) {
        console.error("이미지 가져오기 실패:", error);
        return null;
      }
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
      // 시바견 이미지 다운로드 (모든 행에서 사용할 같은 이미지)
      const targetImageUrl = sampleImageUrl || SHIBA_INU_IMAGE_URL;
      console.log("시바견 이미지 다운로드 시작:", targetImageUrl);

      const imageData = await fetchImageAsArrayBuffer(targetImageUrl);
      if (!imageData) {
        console.error("이미지 다운로드 실패");
        setIsExportExcelLoading(false);
        return;
      }

      // 이미지 확장자 파악
      const mimeToExt: Record<string, "jpeg" | "png" | "gif"> = {
        "image/jpeg": "jpeg",
        "image/jpg": "jpeg",
        "image/png": "png",
        "image/gif": "gif",
        "image/webp": "jpeg", // webp는 jpeg로 대체
      };

      const type = imageData.type.split(";")[0];
      const extension = mimeToExt[type] || "jpeg";

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

        // 이미지 열 헤더 추가
        headers.push("이미지");

        // 컬럼 설정
        worksheet.columns = headers.map((header, index) => {
          // 마지막 열(이미지 열)은 더 넓게 설정
          const width = index === headers.length - 1 ? 30 : 20;
          return {
            header,
            key: header,
            width,
          };
        });

        // 헤더 행 스타일 설정
        const headerRow = worksheet.getRow(1);
        headerRow.height = 30; // 헤더 행 높이 설정

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

        // 헤더 다음 행부터는 데이터와 이미지 추가
        const imageId = workbook.addImage({
          buffer: imageData.buffer,
          extension,
        });

        // 데이터 추가
        transformedData.forEach((item, index) => {
          // 데이터 행 추가 (이미지 열은 비워둠)
          const row = worksheet.addRow(Object.values(item));
          row.height = 80; // 이미지가 들어갈 행 높이 설정

          // 마지막 셀 (이미지 열) 인덱스
          const lastCellIndex = headers.length;

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

          // 이미지 셀과 그 다음 셀 병합 (가로 2개 셀 병합)
          worksheet.mergeCells(
            row.number, // 현재 행 번호
            lastCellIndex, // 이미지 열 (마지막 열)
            row.number, // 현재 행 번호
            lastCellIndex + 1 // 마지막 열 + 1 (병합할 열)
          );

          // 이미지 추가 (행의 마지막 셀에 이미지 추가)
          try {
            // 이미지를 현재 행의 마지막 병합된 셀에 추가
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            worksheet.addImage(imageId, {
              tl: { col: lastCellIndex - 1, row: row.number - 1 },
              br: { col: lastCellIndex + 1, row: row.number },
              editAs: "oneCell",
            } as any);
          } catch (imageError) {
            console.error(`${index + 1}번째 행 이미지 추가 실패:`, imageError);
          }
        });

        // 엑셀 파일로 내보내기
        console.log("엑셀 파일 생성 시작");
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        FileSaver.saveAs(blob, `${formattedFileName}.xlsx`);
        console.log("엑셀 파일 다운로드 완료");
      } else {
        console.error("데이터 가져오기 실패:", fetchResult.error);
      }
    } catch (error) {
      console.error("엑셀 내보내기 중 오류 발생:", error);
    } finally {
      setIsExportExcelLoading(false);
    }
  }, [dataFetch, fileName, renameKey, fetchImageAsArrayBuffer, sampleImageUrl]);

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
