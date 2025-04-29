import styled from "styled-components";
import CommonContainer from "../layout/CommonContainer";
import { usePosts } from "../../libs/hooks/queries/useJsonPlaceholder";
import useXlsxJsStyle from "../../libs/hooks/export-excel/use-xlsx-js-style";
import { postHeaderAlias } from "../../constants/excel-alias/jasonplaceholder";
import { Post } from "../../types/api/jsonplaceholder";

const XlsxJsStyleFileSaverContainer = styled.article`
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

  ul li {
    display: flex;
    gap: 0.8rem;
    font-size: 2rem;

    b {
      min-width: 32rem;
    }
  }
`;

const XlsxJsStyleFileSaverPage = () => {
  const { refetch } = usePosts();

  // TODO: isExportExcelLoading, setIsExportExcelLoading도 가져와서 상태 값에 따라 로딩 UI modal 띄워주기
  const { executeExport } = useXlsxJsStyle<Post[]>({
    fileName: "jsonplaceholder-post",
    aliasObj: postHeaderAlias,
    dataFetch: refetch,
  });

  return (
    <CommonContainer>
      <XlsxJsStyleFileSaverContainer>
        <h2>xlsx-js-style + file-saver</h2>
        <button className="button-default" onClick={executeExport}>
          excel download
        </button>
      </XlsxJsStyleFileSaverContainer>
    </CommonContainer>
  );
};

export default XlsxJsStyleFileSaverPage;
