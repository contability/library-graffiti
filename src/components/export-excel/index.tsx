import styled from "styled-components";
import CommonContainer from "../layout/CommonContainer";
import { useNavigate } from "react-router-dom";

const ExportExcelContainer = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;

  ul {
    width: fit-content;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
`;

const ExportExcelPage = () => {
  const navigate = useNavigate();
  return (
    <CommonContainer>
      <ExportExcelContainer>
        <h1>export excel</h1>
        <ul>
          <li>
            <button
              className="button-default"
              onClick={() => navigate("/export-excel/xlsxjsstyle-filesaver")}
            >
              xlsx-js-style + file-saver
            </button>
          </li>
          <li>
            <button
              className="button-default"
              onClick={() => navigate("/export-excel/exceljs-filesaver")}
            >
              exceljs + file-saver
            </button>
          </li>
        </ul>
      </ExportExcelContainer>
    </CommonContainer>
  );
};

export default ExportExcelPage;
