import styled from "styled-components";
import CommonContainer from "../layout/CommonContainer";
import { useNavigate } from "react-router-dom";

const EmblaCarouselContainer = styled.article`
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

const EmblaCarouselPage = () => {
  const navigate = useNavigate();
  return (
    <CommonContainer>
      <EmblaCarouselContainer>
        <h1>embla carousel</h1>
        <ul>
          <li>
            <button
              className="button-default"
              onClick={() => navigate("/embla-carousel/parallex")}
            >
              parallex + prev-next + dot + autoplay
            </button>
          </li>
        </ul>
      </EmblaCarouselContainer>
    </CommonContainer>
  );
};

export default EmblaCarouselPage;
