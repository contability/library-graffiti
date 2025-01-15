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
import Framer from "./components/framer";
import PageTransition from "./components/framer/page-transition";
import Chart from "./components/chartjs";
import ChartRadar from "./components/chartjs/radar";
import ChartBar from "./components/chartjs/bar";
import FullPage from "./components/fullpage";
import DefaultFullPage from "./components/fullpage/default";
import CustomWrapperFullPage from "./components/fullpage/custom-wrapper";
import LenisPage from "./components/lenis";
import LenisDefault from "./components/lenis/Default";
import LenisScrollTo from "./components/lenis/ScrollTo";

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

            <Route path="/framer" element={<Framer />} />
            <Route
              path="/framer/page-transition"
              element={<PageTransition />}
            />

            <Route path="/chartjs" element={<Chart />} />
            <Route path="/chartjs/bar" element={<ChartBar />} />
            <Route path="/chartjs/radar" element={<ChartRadar />} />

            <Route path="/fullpage/" element={<FullPage />} />
            <Route path="/fullpage/default" element={<DefaultFullPage />} />
            <Route
              path="/fullpage/custom-wrapper"
              element={<CustomWrapperFullPage />}
            />

            <Route path="/lenis" element={<LenisPage />} />
            <Route path="/lenis/default" element={<LenisDefault />} />
            <Route path="/lenis/scroll-to" element={<LenisScrollTo />} />
          </Routes>
        </BrowserRouter>
      </AppContainer>
    </>
  );
}

export default App;
