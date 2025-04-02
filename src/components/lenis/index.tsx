import styled from "styled-components";
import CommonContainer from "../layout/CommonContainer";
import { useNavigate } from "react-router-dom";

const LenisPageContainer = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5rem;

  ul {
    width: fit-content;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
  }
`;

const LenisPage = () => {
  const navigate = useNavigate();
  return (
    <CommonContainer>
      <LenisPageContainer>
        <h2>Lenis</h2>
        <ul>
          <li>
            <button
              className="button-default"
              onClick={() => navigate("/lenis/default")}
            >
              default
            </button>
          </li>
          <li>
            <button
              className="button-default"
              onClick={() => navigate("/lenis/scroll-to")}
            >
              scroll to
            </button>
          </li>
          <li>
            <button
              className="button-default"
              onClick={() =>
                window.open(
                  "https://github.com/darkroomengineering/lenis#readme",
                  "_blank"
                )
              }
            >
              DOCUMENT
            </button>
          </li>
        </ul>
      </LenisPageContainer>
    </CommonContainer>
  );
};

export default LenisPage;
