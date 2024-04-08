// import "./App.css";
import "./styles/reset.css";
import "./styles/global.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Gsap from "./components/gsap";
import Root from "./components/page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/gsap/" element={<Gsap />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
