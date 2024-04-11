import { useNavigate } from "react-router-dom";
import CommonContainer from "../layout/CommonContainer";
import { styled } from "styled-components";

const GsapContainer = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;

  ul {
    width: fit-content;
  }
`;

const Gsap = () => {
  const navigate = useNavigate();
  return (
    <CommonContainer>
      <GsapContainer>
        <h1>GSAP</h1>
        <ul>
          <li>
            <button
              className="button-default"
              onClick={() => navigate("/gsap/scroll")}
            >
              scroll
            </button>
          </li>
        </ul>
      </GsapContainer>
    </CommonContainer>
  );
};

export default Gsap;
