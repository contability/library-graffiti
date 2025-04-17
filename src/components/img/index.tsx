import styled from "styled-components";
import CommonContainer from "../layout/CommonContainer";
import { useNavigate } from "react-router-dom";

const ImagePageContainer = styled.article`
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

const ImagePage = () => {
  const navigate = useNavigate();
  return (
    <CommonContainer>
      <ImagePageContainer>
        <h1>image</h1>
        <ul>
          <li>
            <button
              className="button-default"
              onClick={() => navigate("/img/pinch-zoom")}
            >
              pinch-zoom
            </button>
          </li>
        </ul>
      </ImagePageContainer>
    </CommonContainer>
  );
};

export default ImagePage;
