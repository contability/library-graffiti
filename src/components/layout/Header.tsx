import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  padding: 2rem;

  button {
    font-size: 3rem;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isRootPage = location.pathname === "/";

  return (
    <HeaderContainer>
      {!isRootPage && <button onClick={() => navigate(-1)}>뒤로</button>}
    </HeaderContainer>
  );
};

export default Header;
