import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { styled } from "styled-components";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setRandomColor } from "../../../libs/utils";
import { useNavigate } from "react-router-dom";
gsap.registerPlugin(ScrollTrigger);

const GsapScrollContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  place-items: center;
  scroll-behavior: smooth;
  overflow-x: hidden;

  .div-space {
    font-size: 10rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100dvh;

    p {
      font-size: 3rem;
    }
  }

  .box-list {
    width: 100vw;
    display: flex;
    gap: 2rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 400px;

    .box {
      text-align: center;
      position: relative;
      left: -200px;
      button {
        font-size: 3rem;
        padding: 3rem;
      }
    }
  }
`;

const GsapScroll = () => {
  const navigate = useNavigate();
  const listRef = useRef<Array<HTMLLIElement>>([]);

  useEffect(() => {
    listRef.current?.forEach((el) => {
      gsap.fromTo(
        el,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          left: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: el,
            start: "top bottom-=100",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  const addToRefs = (el: HTMLLIElement) => {
    if (el && !listRef.current?.includes(el)) listRef.current?.push(el);
  };

  return (
    <GsapScrollContainer>
      <div className="div-space">
        <h3>GSAP - SCROLL</h3>
        <p>SCROLL DOWN</p>
      </div>
      <ul className="box-list">
        <li
          style={{ backgroundColor: setRandomColor() }}
          ref={addToRefs}
          className="box"
        >
          <button onClick={() => navigate("/gsap/scroll/horizontal")}>
            horizontal
          </button>
        </li>
        <li
          style={{ backgroundColor: setRandomColor() }}
          ref={addToRefs}
          className="box"
        >
          <button>box2</button>
        </li>
        <li
          style={{ backgroundColor: setRandomColor() }}
          ref={addToRefs}
          className="box"
        >
          <button>box3</button>
        </li>
        <li
          style={{ backgroundColor: setRandomColor() }}
          ref={addToRefs}
          className="box"
        >
          <button>box4</button>
        </li>
        <li
          style={{ backgroundColor: setRandomColor() }}
          ref={addToRefs}
          className="box"
        >
          <button>box5</button>
        </li>
      </ul>
    </GsapScrollContainer>
  );
};

export default GsapScroll;
