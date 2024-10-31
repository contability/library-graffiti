import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CommonContainer from "../layout/CommonContainer";

const RootList = styled.ul`
  width: fit-content;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 2rem;
`;

const Root = () => {
  const navigate = useNavigate();

  return (
    <CommonContainer>
      <RootList>
        <li>
          <button className="button-default" onClick={() => navigate("/gsap")}>
            gsap
          </button>
        </li>
        <li>
          <button
            className="button-default"
            onClick={() => navigate("/framer")}
          >
            framer
          </button>
        </li>
        <li>
          <button
            className="button-default"
            onClick={() => navigate("/chartjs")}
          >
            react-chartjs-2
          </button>
        </li>
        <li>
          <button
            className="button-default"
            onClick={() => navigate("/fullpage")}
          >
            react-fullpage
          </button>
        </li>
        <li>
          <button className="button-default" onClick={() => navigate("/lenis")}>
            lenis
          </button>
        </li>
      </RootList>
    </CommonContainer>
  );
};

export default Root;
