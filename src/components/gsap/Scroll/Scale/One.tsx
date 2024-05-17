import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { styled } from "styled-components";
gsap.registerPlugin(ScrollTrigger);

const GsapScrollScaleOneContainer = styled.article`
  border: 2px solid red;
  width: 100%;
  margin: 0;
  padding: 0;

  .panel {
    height: 100dvh;
    width: 100%;

    &.azure {
      background-color: azure;
    }

    &.beige {
      background-color: beige;
    }

    &:nth-child(2) {
      background-color: blue;
    }

    .inner {
      height: 100%;
      background-color: aqua;
      width: 100%;
    }
  }
`;

const GsapScrollScaleOne = () => {
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#my-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    tl.to(".inner", {
      scale: 0.7,
    });
  }, []);

  return (
    <GsapScrollScaleOneContainer>
      <section className="panel azure" />
      <section className="panel" id="my-section">
        <div className="inner" />
      </section>
      <section className="panel beige" />
    </GsapScrollScaleOneContainer>
  );
};

export default GsapScrollScaleOne;
