import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const GsapContainer = styled.article`
  h1 {
    font-size: 10rem;
  }
  ul {
    li {
      button {
        font-size: 3rem;
      }
    }
  }
`;

const Gsap = () => {
  const navigate = useNavigate();
  return (
    <GsapContainer>
      <h1>GSAP</h1>
      <ul>
        <li>
          <button onClick={() => navigate("/gsap/scroll")}>scroll</button>
        </li>
      </ul>
    </GsapContainer>
  );
};

export default Gsap;
