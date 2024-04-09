import "./styles/reset.css";
import "./styles/global.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Root from "./components/page";
import Gsap from "./components/Gsap";
import GsapScroll from "./components/Gsap/Scroll";
import Header from "./components/layout/Header";
import GsapScrollHorizontal from "./components/Gsap/Scroll/Horizontal";

function App() {
  return (
    <>
      <main>
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
      </main>
    </>
  );
}

export default App;
