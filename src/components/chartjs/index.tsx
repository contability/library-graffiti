import styled from "styled-components";
import CommonContainer from "../layout/CommonContainer";
import { useNavigate } from "react-router-dom";

const ChartContainer = styled.article`
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

const Chart = () => {
  const navigate = useNavigate();
  return (
    <CommonContainer>
      <ChartContainer>
        <h1>Chart.js</h1>
        <ul>
          <li>
            <button
              className="button-default"
              onClick={() => navigate("/chartjs/bar")}
            >
              bar
            </button>
          </li>
          <li>
            <button
              className="button-default"
              onClick={() => navigate("/chartjs/radar")}
            >
              radar
            </button>
          </li>
        </ul>
      </ChartContainer>
    </CommonContainer>
  );
};

export default Chart;
