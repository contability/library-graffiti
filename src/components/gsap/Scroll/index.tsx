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
      // gsap.fromTo
      // 현재 상태를 시작 또는 끝으로 사용하는 from이나 to 트윈과 달리 시작과 끝을 모두 정의할 수 있음.

      // gsap.fromTo(el, {autoAlpha:0}, {...})
      // GSAP의 fromTo 메소드를 사용하여, 각 요소(el)에 대해 초기 상태({autoAlpha:0})에서 목표 상태 ({...} 안의 내용)로 애니메이션을 적용한다.
      // autoAlpha는 투명도(opacity)와 visibility 속성을 동시에 제어 하며, 0은 완전히 투명하고 보이지 않음을, 1은 완전히 불투명하고 보임을 의미한다.

      gsap.fromTo(
        el,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          // left
          // 요소의 왼쪽 위치를 설정. 여기서는 0으로 설정하여 왼쪽에 붙어있다는 의미
          left: 0,
          // duration
          // 애니메이션의 지속 시간을 0.5초로 설정
          duration: 0.5,
          scrollTrigger: {
            // 애니메이션의 트리거 포인트로 각 요소(el)를 사용
            trigger: el,
            // start
            // 애니메이션 시작 조건을 설정한다.
            // top: 트리거 요소(애니메이션을 시작할 요소)의 상단을 의미
            // bottom: 뷰포트(현재 화면에 보이는 영역)의 하단을 의미
            // -=: 빼기. 여기서는 bottom 값에 -가 붙었으니까 위치가 올라가게 된다.
            // 100: 픽셀 단위의 값

            // 정리하자면 트리거 요소의 상단이 뷰포트의 하단보다 100픽셀 위에 위치할 때 애니메이션을 시작한다. 라는 의미가 된다.
            // 쉽게 말해서 사용자가 스크롤을 내리다가 트리거 요소가 화면 하단에서 100픽셀 위로 올라오는 순간 애니메이션이 시작된다.
            start: "top bottom-=100",
            // toggleActions
            // 스크롤 동작에 따른 애니메이션 동작을 정의한다.
            // 스크롤이 시작 조건에 도달하면 애니메이션을 play(재생)하고, 스크롤이 역방향으로 이동하여 조건을 떠날 때 reverse(역재생)한다.
            // 나머지 두 조건(none)은 액션을 취하지 않음을 의미한다.
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
