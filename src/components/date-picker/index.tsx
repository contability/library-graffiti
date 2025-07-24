import styled from "styled-components";
import CommonContainer from "../layout/CommonContainer";
import { useNavigate } from "react-router-dom";

const DatePickerPageContainer = styled.article`
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

const DatePickerPage = () => {
  const navigate = useNavigate();
  return (
    <CommonContainer>
      <DatePickerPageContainer>
        <h1>Date Picker</h1>
        <ul>
          <li>
            <button
              className="button-default"
              onClick={() => navigate("/day-picker/react-day-picker")}
            >
              react-day-picker
            </button>
          </li>
        </ul>
      </DatePickerPageContainer>
    </CommonContainer>
  );
};

export default DatePickerPage;
