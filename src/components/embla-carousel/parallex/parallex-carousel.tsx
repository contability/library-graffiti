import type { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Autoplay from "embla-carousel-autoplay";
import { DotButton } from "../embla-carousel-dot-button";
import { NextButton, PrevButton } from "../embla-carousel-arrow-buttons";
import styled from "styled-components";
import { useAutoplay } from "../../../hooks/embla-carousel/useAutoplay";
import { useDotButton } from "../../../hooks/embla-carousel/useDotButton";
import { usePrevNextButtons } from "../../../hooks/embla-carousel/usePrevNextButtons";
import { useAutoplayProgress } from "../../../hooks/embla-carousel/useAutoplayProgress";

// 캐러셀의 기본 옵션 설정
const CAROUSEL_OPTIONS: EmblaOptionsType = {
  loop: true, // 무한 루프 활성화
  dragFree: false, // 드래그 시 자유롭게 스크롤되지 않음
  containScroll: "trimSnaps", // 스크롤 범위를 스냅 지점으로 제한
  skipSnaps: false, // 스냅 지점을 건너뛰지 않음
  inViewThreshold: 0.9, // 슬라이드가 90% 이상 보여야 화면에 있다고 판단
};

// 자동 재생 옵션 설정
const AUTOPLAY_OPTIONS = {
  delay: 4000, // 슬라이드 전환 간 딜레이(4초)
  stopOnInteraction: false, // 사용자 상호작용 시 자동 재생 중지하지 않음
  stopOnMouseEnter: false, // 마우스 진입 시 자동 재생 중지하지 않음
};

// 패럴렉스 효과의 강도 설정 (0.3 = 30% 이동)
const TWEEN_FACTOR = 0.3;

interface CarouselProps {
  slides: ReactNode[]; // 캐러셀에 표시할 슬라이드 배열
}

// 스타일드 컴포넌트로 캐러셀 UI 요소 정의
const EmblaContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

const EmblaViewport = styled.div`
  overflow: hidden;
  width: 100%;
`;

const EmblaContainer2 = styled.div`
  display: flex;
  backface-visibility: hidden;
  touch-action: pan-y;
`;

const EmblaSlide = styled.div`
  flex: 0 0 100%;
  min-width: 0;
`;

// 패럴렉스 효과를 위한 컨테이너
const EmblaParallax = styled.div`
  height: 100%;
  overflow: hidden;
`;

// 패럴렉스 레이어 - 실제로 움직이는 요소
const EmblaParallaxLayer = styled.div`
  height: 100%;
  position: relative;
  width: 100%;
`;

// 캐러셀 컨트롤(버튼, 점 등)을 감싸는 컨테이너
const ControlsWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  gap: 8px;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;

// 이전/다음 버튼을 감싸는 컨테이너
const ArrowButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 1rem;
  padding-right: 1rem;
  gap: 0.5rem;
`;

// 인디케이터 점들을 감싸는 컨테이너
const DotsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

// 자동 재생 버튼 스타일
const AutoplayButton = styled.button`
  color: white;
  font-size: 3rem;
`;

// 자동 재생 진행 상태 표시 컨테이너
const AutoplayProgress = styled.div``;

// 인디케이터 점 프롭스 타입 정의
interface DotProps {
  isSelected: boolean; // 현재 선택된 점인지 여부
}

// 인디케이터 점 스타일 - 선택된 상태에 따라 색상 변경
const Dot = styled(DotButton)<DotProps>`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 9999px;
  background-color: ${(props) => (props.isSelected ? "#F97316" : "#FED7AA")};
`;

const ParallexCarousel = ({ slides }: CarouselProps) => {
  // Embla 캐러셀 훅 초기화 (옵션과 플러그인 적용)
  const [emblaRef, emblaApi] = useEmblaCarousel(CAROUSEL_OPTIONS, [
    Autoplay(AUTOPLAY_OPTIONS),
  ]);

  // 패럴렉스 효과를 위한 상태와 참조
  const [tweenValues, setTweenValues] = useState<number[]>([]); // 각 슬라이드의 이동 값
  const tweenNodes = useRef<HTMLElement[]>([]); // 이동할 DOM 요소들
  const progressNode = useRef<HTMLDivElement>(null); // 자동 재생 진행 표시줄

  // 커스텀 훅을 사용하여 캐러셀 기능 구현
  // 인디케이터 점 관련 상태와 함수
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  // 이전/다음 버튼 관련 상태와 함수
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  // 자동 재생 관련 상태와 함수
  const { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick } =
    useAutoplay(emblaApi);

  // 자동 재생 진행 표시 관련 상태
  const { showAutoplayProgress } = useAutoplayProgress(emblaApi, progressNode);

  // 패럴렉스 효과를 위한 DOM 요소 참조 설정
  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    // 각 슬라이드에서 패럴렉스 레이어 요소를 찾아 참조 배열에 저장
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(".embla__parallax__layer") as HTMLElement;
    });
  }, []);

  // 스크롤 이벤트 발생 시 패럴렉스 효과 계산
  const onScroll = useCallback(() => {
    if (!emblaApi) return;

    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress(); // 현재 스크롤 위치 (0~1)

    // 각 슬라이드의 변환 스타일 계산
    const styles = emblaApi.scrollSnapList().map((scrollSnap, index) => {
      let diffToTarget = scrollSnap - scrollProgress; // 현재 위치와 스냅 위치의 차이

      // 무한 루프 모드일 경우 위치 보정
      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.target();
          if (index === loopItem.index && target !== 0) {
            const sign = Math.sign(target);
            if (sign === -1) {
              diffToTarget = scrollSnap - (1 + scrollProgress);
            }
            if (sign === 1) {
              diffToTarget = scrollSnap + (1 - scrollProgress);
            }
          }
        });
      }

      // 변환 값 계산: 차이 * (-1 * 트윈 팩터) * 100 = 이동할 퍼센트
      return diffToTarget * (-1 * TWEEN_FACTOR) * 100;
    });

    setTweenValues(styles); // 계산된 변환 값 상태 업데이트
  }, [emblaApi]);

  // 캐러셀 API가 준비되면 이벤트 리스너 등록
  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi); // 패럴렉스 노드 참조 설정
    onScroll(); // 초기 스크롤 위치에 따른 패럴렉스 적용

    // 이벤트 리스너 등록
    emblaApi
      .on("reInit", setTweenNodes) // 캐러셀 재초기화 시 노드 참조 업데이트
      .on("reInit", onScroll) // 캐러셀 재초기화 시 패럴렉스 효과 업데이트
      .on("scroll", onScroll); // 스크롤 시 패럴렉스 효과 업데이트

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      if (emblaApi) {
        emblaApi
          .off("reInit", setTweenNodes)
          .off("reInit", onScroll)
          .off("scroll", onScroll);
      }
    };
  }, [emblaApi, setTweenNodes, onScroll]);

  // 트윈 값이 변경되면 DOM 요소에 변환 스타일 적용
  useEffect(() => {
    if (tweenValues.length === 0 || !tweenNodes.current.length) return;

    // 각 노드에 계산된 변환 스타일 적용
    tweenValues.forEach((translate, index) => {
      const tweenNode = tweenNodes.current[index];
      if (tweenNode) {
        tweenNode.style.transform = `translateX(${translate}%)`;
      }
    });
  }, [tweenValues]);

  return (
    <EmblaContainer className="embla">
      {/* 캐러셀 뷰포트 - 실제 보이는 영역 */}
      <EmblaViewport className="embla__viewport" ref={emblaRef}>
        <EmblaContainer2 className="embla__container">
          {/* 슬라이드 맵핑 - 각 슬라이드에 패럴렉스 효과 적용 */}
          {slides.map((slide, contentIndex) => (
            <EmblaSlide key={contentIndex} className="embla__slide">
              <EmblaParallax className="embla__parallax">
                <EmblaParallaxLayer
                  className="embla__parallax__layer"
                  style={{ transform: "translateX(0%)" }}
                >
                  {slide}
                </EmblaParallaxLayer>
              </EmblaParallax>
            </EmblaSlide>
          ))}
        </EmblaContainer2>
      </EmblaViewport>

      {/* 캐러셀 컨트롤 영역 */}
      <ControlsWrapper>
        {/* 이전/다음 버튼 */}
        <ArrowButtonsWrapper>
          <PrevButton
            onClick={() => onAutoplayButtonClick(onPrevButtonClick)}
            disabled={prevBtnDisabled}
          />
          <NextButton
            onClick={() => onAutoplayButtonClick(onNextButtonClick)}
            disabled={nextBtnDisabled}
          />
        </ArrowButtonsWrapper>

        {/* 인디케이터 점 */}
        <DotsWrapper>
          {scrollSnaps.map((_, index) => (
            <Dot
              key={index}
              onClick={() => onDotButtonClick(index)}
              isSelected={index === selectedIndex}
              className="embla__dot"
            />
          ))}
        </DotsWrapper>

        {/* 자동 재생 토글 버튼 */}
        <AutoplayButton
          className="embla__play"
          onClick={toggleAutoplay}
          type="button"
        >
          {autoplayIsPlaying ? "Stop" : "Start"}
        </AutoplayButton>

        {/* 자동 재생 진행 표시 */}
        <AutoplayProgress
          className={`embla__progress`.concat(
            showAutoplayProgress ? "" : " embla__progress--hidden"
          )}
        >
          <div className="embla__progress__bar" ref={progressNode} />
        </AutoplayProgress>
      </ControlsWrapper>
    </EmblaContainer>
  );
};

export default ParallexCarousel;
