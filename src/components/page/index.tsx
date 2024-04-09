import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const RootContainer = styled.div`
  font-size: 2rem;
`;

const Root = () => {
  const navigate = useNavigate();
  const handleClickEvent = () => {
    navigate("/gsap/");
  };
  return (
    <RootContainer>
      <ul>
        <li>
          <button onClick={handleClickEvent}>gsap</button>
        </li>
      </ul>
    </RootContainer>
  );
};

export default Root;
