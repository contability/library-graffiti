import styled from "styled-components";
import CommonContainer from "../layout/CommonContainer";
import { useNavigate } from "react-router-dom";

const FullPageContainer = styled.article`
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

const FullPage = () => {
  const navigate = useNavigate();
  return (
    <CommonContainer>
      <FullPageContainer>
        <h1>FullPage</h1>
        <ul>
          <li>
            <button
              className="button-default"
              onClick={() => navigate("/fullpage/default")}
            >
              default
            </button>
          </li>
          <li>
            <button
              className="button-default"
              onClick={() => navigate("/fullpage/custom-wrapper")}
            >
              custom wrapper
            </button>
          </li>
          <li>
            <button
              className="button-default"
              onClick={() =>
                window.open(
                  "https://github.com/alvarotrigo/react-fullpage?tab=readme-ov-file#usage",
                  "_blank"
                )
              }
            >
              DOCUMENT
            </button>
          </li>
        </ul>
      </FullPageContainer>
    </CommonContainer>
  );
};

export default FullPage;
