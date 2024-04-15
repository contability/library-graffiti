import "./styles/reset.css";
import "./styles/global.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Root from "./components/page";
import Header from "./components/layout/Header";
import { styled } from "styled-components";
import Gsap from "./components/gsap";
import GsapScroll from "./components/gsap/Scroll";
import GsapScrollHorizontal from "./components/gsap/Scroll/Horizontal";
import GsapScrollScaleOne from "./components/gsap/Scroll/Scale/One";

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
            <Route
              path="/gsap/scroll/scale/one"
              element={<GsapScrollScaleOne />}
            />
          </Routes>
        </BrowserRouter>
      </AppContainer>
    </>
  );
}

export default App;
