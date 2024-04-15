import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { styled } from "styled-components";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setRandomColor } from "../../../libs/utils";
import { useNavigate } from "react-router-dom";
import CommonContainer from "../../layout/CommonContainer";
gsap.registerPlugin(ScrollTrigger);

const GsapScrollContainer = styled.div`
  overflow-x: hidden;

  .section-space {
    font-size: 10rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 2rem;
    height: 100dvh;

    p {
      font-size: 3rem;
    }
  }

  .section-list {
    height: 100dvh;

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
        border-radius: 0.8rem;

        button {
          font-size: 3rem;
          padding: 3rem;
        }
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
    <CommonContainer>
      <GsapScrollContainer>
        <section className="section-space">
          <h3>GSAP - SCROLL</h3>
          <p>SCROLL DOWN</p>
        </section>
        <section className="section-list">
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
              <button onClick={() => navigate("/gsap/scroll/scale/one")}>
                scale v1
              </button>
            </li>
          </ul>
        </section>
      </GsapScrollContainer>
    </CommonContainer>
  );
};

export default GsapScroll;
