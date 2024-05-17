import { useNavigate } from "react-router-dom";
import CommonContainer from "../layout/CommonContainer";
import { styled } from "styled-components";

const FramerContainer = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;

  ul {
    width: fit-content;
  }
`;

const Framer = () => {
  const navigate = useNavigate();
  return (
    <CommonContainer>
      <FramerContainer>
        <h1>Framer</h1>
        <ul>
          <li>
            <button
              className="button-default"
              onClick={() => navigate("/framer/page-transition")}
            >
              page transition
            </button>
          </li>
        </ul>
      </FramerContainer>
    </CommonContainer>
  );
};

export default Framer;
