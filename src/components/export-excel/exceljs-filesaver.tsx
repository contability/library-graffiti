import styled from "styled-components";
import CommonContainer from "../layout/CommonContainer";
import { usePosts } from "../../libs/hooks/queries/useJsonPlaceholder";
import { postHeaderAlias } from "../../constants/excel-alias/jasonplaceholder";
import { Post } from "../../types/api/jsonplaceholder";
import useExceljs from "../../libs/hooks/export-excel/use-exceljs";

const ExcelJsFileSaverContainer = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h2 {
    font-size: 5rem;
    text-align: center;
    color: #988c8c;
    font-weight: 700;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    align-items: center;
    li {
      display: flex;
      gap: 0.8rem;
      font-size: 2rem;

      b {
        min-width: 32rem;
      }
    }
  }
`;

const ExcelJsFileSaverPage = () => {
  const { refetch } = usePosts();

  // TODO: 이미지 삽입도 해보기
  const { executeExport, isExportExcelLoading } = useExceljs<Post[]>({
    fileName: "jsonplaceholder-post",
    aliasObj: postHeaderAlias,
    dataFetch: refetch,
  });

  return (
    <CommonContainer>
      <ExcelJsFileSaverContainer>
        <h2>exceljs + file-saver</h2>
        <ul>
          <li>
            ExcelJS는 xlsx-js-style 보다 더 다양한 스타일링과 서식 옵션을 제공
          </li>
          <li>셀 단위로 스타일을 적용할 수 있어 더 세밀한 제어가 가능</li>
          <li>워크시트와 워크북에 대한 메타데이터 설정 가능</li>
          <li>셀 병합, 조건부 서식, 이미지 삽입 등 고급 기능 제공</li>
        </ul>
        <button
          className="button-default"
          onClick={executeExport}
          disabled={isExportExcelLoading}
        >
          {isExportExcelLoading ? "로딩 중..." : "excel download"}
        </button>
      </ExcelJsFileSaverContainer>
    </CommonContainer>
  );
};

export default ExcelJsFileSaverPage;
