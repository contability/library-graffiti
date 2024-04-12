import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CommonContainer from "../layout/CommonContainer";

const RootList = styled.ul`
  width: fit-content;
`;

const Root = () => {
  const navigate = useNavigate();
  const handleClickEvent = () => {
    navigate("/gsap/");
  };
  return (
    <CommonContainer>
      <RootList>
        <li>
          <button className="button-default" onClick={handleClickEvent}>
            gsap
          </button>
        </li>
      </RootList>
    </CommonContainer>
  );
};

export default Root;
