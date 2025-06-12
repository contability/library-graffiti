import { useNavigate } from "react-router-dom";
import CommonContainer from "../layout/CommonContainer";
import { styled } from "styled-components";

const PdfPageContainer = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;

  ul {
    width: fit-content;
  }
`;

const PdfPage = () => {
  const navigate = useNavigate();
  return (
    <CommonContainer>
      <PdfPageContainer>
        <h1>PDF</h1>
        <ul>
          <li>
            <button
              className="button-default"
              onClick={() => navigate("/pdf/react-pdf")}
            >
              react-pdf
            </button>
          </li>
        </ul>
      </PdfPageContainer>
    </CommonContainer>
  );
};

export default PdfPage;
