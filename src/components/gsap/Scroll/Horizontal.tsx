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
    // gsap context함수: 함수 내에 생성된 모든 GSAP 애니메이션과 스크롤 트리거를 한 번에 모두 쉽게 되돌리거나 킬할 수 있도록 한다.
    // 수많은 변수, 배열 등을 추적할 필요가 없다.
    // 이 기능은 React 모듈이나 요소를 원래 상태로 되돌려서 정리 해야하는 모든 곳에서 특히 유용하다.
    const ctx = gsap.context(() => {
      // gsap.utils.toArray: 객체를 배열로 반환.
      // toArray(".panel") --> [element1, element2]
      const panels = gsap.utils.toArray(".panel");
      // gsap.to(panels, {...}): panels에 지정된 대상(여러 개의 패널)의 속성을 애니메이션으로 변경한다. 이 경우 xPercent 속성을 사용하여 수평 이동을 구현한다.
      gsap.to(panels, {
        // xPercent: -100 * (panels.length - 1)
        // 모든 패널이 수평으로 -100% 씩 이동하도록 설정한다.
        // panels.length - 1은 마지막 패널까지 스크롤할 때 전체 이동 거리를 계산한다.
        xPercent: -100 * (panels.length - 1),
        // ease: "none"
        // 애니메이션의 속도 곡선을 지정한다. none은 일정한 속도로 애니메이션을 진행하게 된다.
        ease: "none",
        // ScrollTrigger 플러그인을 사용하여 스크롤을 기반으로 애니메이션을 트리거한다.
        scrollTrigger: {
          // trigger: 애니메이션을 트리거할 요소를 지정한다.
          // 여기서는 slider.curent를 사용하며, 이는 슬라이더의 현재 요소를 가리킨다.
          trigger: slider.current,
          // 스크롤 동안 trigger 요소를 고정시킨다.
          // 즉, 스크롤이 진행되는 동안 해당 요소는 화면에 고정되어 있다.
          pin: true,
          // scrub: 1
          // 스크롤과 애니메이션의 연동 정도를 설정한다.
          // 1은 스크롤과 애니메이션이 1:1 비율로 연동되며, 스크롤 속도에 따라 애니메이션 속도가 조절된다.
          scrub: 1,
          // snap
          // 스크롤이 멈춘 후 최종 위치를 조정한다.
          // 패널 사이에서 정확하게 멈출 수 있도록 하여, 스크롤이 각 패널 사이의 지점에서 자연스럽게 멈추게 한다.
          snap: 1 / (panels.length - 1),
          // 스크롤 애니메이션의 끝나는 지점을 계산한다.
          // slider.current.offsetWidth를 사용하여 슬라이더의 전체 너비만큼 스크롤할 수 있도록 설정한다.
          end: () => "+=" + slider.current?.offsetWidth,
          // 개발 시 ScrollTrigger의 시작점과 끝점을 시각적으로 표시하는 마커를 활성화한다.
          // 디버깅에 유리하다.
          markers: true,
        },
      });
    }, component);

    // 해당 함수에서 생성된 모든 GSAP 애니메이션이 되돌려진다.
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
