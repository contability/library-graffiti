import styled from "styled-components";
import CommonContainer from "../../layout/CommonContainer";
import PdfViewer from "./pdf-viewer";

const ReactPdfPageContainer = styled.article`
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
const ReactPdfPage = () => {
  return (
    <CommonContainer>
      <ReactPdfPageContainer>
        <h2>react-pdf</h2>
        <PdfViewer />
      </ReactPdfPageContainer>
    </CommonContainer>
  );
};

export default ReactPdfPage;
