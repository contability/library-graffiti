import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  padding: 2rem;

  button {
    font-size: 3rem;
    padding: 1.2rem;
    background-color: #1a1a1a;
    color: rgba(255, 255, 255, 0.87);
    border-radius: 8px;
    border: 1px solid transparent;
    transition: border-color 0.25s;

    &:hover {
      border-color: #646cff;
    }
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isRootPage = location.pathname === "/";

  return (
    <HeaderContainer>
      {!isRootPage && (
        <button className="button-default" onClick={() => navigate(-1)}>
          뒤로
        </button>
      )}
    </HeaderContainer>
  );
};

export default Header;
