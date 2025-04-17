import styled from "styled-components";
import CommonContainer from "../layout/CommonContainer";
import ZoomableImage from "./zoomable-image";

const ImagePinchZoomContainer = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h2 {
    font-size: 5rem;
    text-align: center;
    color: #ffffff;
    font-weight: 700;
  }

  ul li {
    display: flex;
    gap: 0.8rem;
    font-size: 2rem;

    b {
      min-width: 32rem;
    }
  }
`;

const ImagePinchZoomPage = () => {
  return (
    <CommonContainer>
      <ImagePinchZoomContainer>
        <h2>pinch-zoom</h2>
        <ZoomableImage
          src="https://picsum.photos/600/350?v=1"
          alt="pinch-zoom image"
          ratio="600/350"
        />
      </ImagePinchZoomContainer>
    </CommonContainer>
  );
};

export default ImagePinchZoomPage;
