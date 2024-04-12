import "./styles/reset.css";
import "./styles/global.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Root from "./components/page";
import Gsap from "./components/Gsap";
import GsapScroll from "./components/Gsap/Scroll";
import Header from "./components/layout/Header";
import { styled } from "styled-components";
import GsapScrollHorizontal from "./components/Gsap/Scroll/Horizontal";

const AppContainer = styled.main`
  width: 100dvw;
  background-color: #242424;
  color: rgba(255, 255, 255, 0.87);
`;

function App() {
  return (
    <>
      <AppContainer>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/gsap/" element={<Gsap />} />
            <Route path="/gsap/scroll" element={<GsapScroll />} />
            <Route
              path="/gsap/scroll/horizontal"
              element={<GsapScrollHorizontal />}
            />
          </Routes>
        </BrowserRouter>
      </AppContainer>
    </>
  );
}

export default App;
