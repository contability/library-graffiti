import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import CommonContainer from "../../layout/CommonContainer";

const ReactDayPickerPageContainer = styled.article`
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

const ReactDayPickerPage = () => {
  const navigate = useNavigate();
  return (
    <CommonContainer>
      <ReactDayPickerPageContainer>
        <h1>react-Day-picker</h1>
        <ul>
          <li>
            <button
              className="button-default"
              onClick={() =>
                navigate("/day-picker/react-day-picker/custom-input")
              }
            >
              custom-input
            </button>
          </li>
        </ul>
      </ReactDayPickerPageContainer>
    </CommonContainer>
  );
};

export default ReactDayPickerPage;
