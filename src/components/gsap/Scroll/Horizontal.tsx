import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { styled } from "styled-components";
gsap.registerPlugin(ScrollTrigger);

const GsapScrollHorizontalContainer = styled.article`
  overflow-y: auto;
  overflow-x: hidden;
  color: black;
  font-size: 2.5rem;
  position: relative;

  .section-first {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: yellow;

    h1 {
      font-size: 5rem;
      font-weight: 700;
    }

    h2 {
      font-size: 2.5rem;
    }
  }

  .section-scroll__horizontal {
    width: 600dvw;
    height: 100dvh;
    display: flex;
    flex-wrap: wrap;

    .panel {
      width: 100dvw;
      height: 100dvh;
    }

    .red {
      background: blue;
    }
    .red {
      background: red;
    }
    .orange {
      background: orange;
    }
    .purple {
      background: purple;
    }
    .blue {
      background-color: blue;
    }
  }

  .section-last {
    display: flex;
    height: 100dvh;
    background-color: yellow;
  }
`;

const GsapScrollHorizontal = () => {
  const component = useRef<HTMLElement>(null);
  const slider = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray(".panel");
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: slider.current,
          pin: true,
          scrub: 1,
          snap: 1 / (panels.length - 1),
          end: () => "+=" + slider.current?.offsetWidth,
          markers: true,
        },
      });
    }, component);
    return () => ctx.revert();
  }, []);

  return (
    <GsapScrollHorizontalContainer ref={component}>
      <section className="section-first">
        <h1>Testing horizontal scrolling w/ three sections</h1>
        <h2>First Container</h2>
      </section>
      <section className="section-scroll__horizontal" ref={slider}>
        <div className="description panel blue">
          <div>
            SCROLL DOWN
            <div className="scroll-down">
              <div className="arrow" />
            </div>
          </div>
        </div>
        <div className="panel red">ONE</div>
        <div className="panel orange">TWO</div>
        <div className="panel purple">THREE</div>
      </section>
      <section className="section-last">Last Container</section>
    </GsapScrollHorizontalContainer>
  );
};

export default GsapScrollHorizontal;
