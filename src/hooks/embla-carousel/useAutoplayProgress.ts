import { useCallback, useEffect, useRef, useState } from "react";
import { EmblaCarouselType } from "embla-carousel";

// 자동 재생 진행 표시 훅의 반환 타입
type UseAutoplayProgressType = {
  showAutoplayProgress: boolean;
};

// 자동 재생 진행 상태를 시각적으로 표시하기 위한 커스텀 훅
export const useAutoplayProgress = <ProgressElement extends HTMLElement>(
  emblaApi: EmblaCarouselType | undefined,
  progressNode: React.RefObject<ProgressElement>
): UseAutoplayProgressType => {
  // 진행 표시 바 표시 여부
  const [showAutoplayProgress, setShowAutoplayProgress] = useState(false);
  // 애니메이션 이름 저장용 참조
  const animationName = useRef("");
  // 타이머 ID 저장용 참조
  const timeoutId = useRef(0);
  // requestAnimationFrame ID 저장용 참조
  const rafId = useRef(0);

  // 진행 표시 애니메이션 시작 함수
  const startProgress = useCallback((timeUntilNext: number | null) => {
    const node = progressNode.current;

    if (!node) return;
    if (timeUntilNext === null) return;

    // 애니메이션 이름이 아직 저장되지 않았다면 스타일에서 가져옴
    if (!animationName.current) {
      const style = window.getComputedStyle(node);
      animationName.current = style.animationName;
    }

    // 애니메이션 초기화
    node.style.animationName = "none";
    node.style.transform = "translate3d(0,0,0)";

    // 다음 프레임에서 애니메이션 시작 (브라우저 렌더링 최적화)
    rafId.current = window.requestAnimationFrame(() => {
      timeoutId.current = window.setTimeout(() => {
        // 진행 애니메이션 설정 - 애니메이션 이름과 남은 시간으로 지속 시간 설정
        node.style.animationName = animationName.current;
        node.style.animationDuration = `${timeUntilNext}ms`;
      }, 0);
    });

    // 진행 표시 바 보이기
    setShowAutoplayProgress(true);
  }, []);

  // emblaApi 변경 시 이벤트 리스너 등록
  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    // 자동 재생 타이머 이벤트 리스너 등록
    emblaApi
      // 타이머 설정 시 진행 표시 애니메이션 시작
      .on("autoplay:timerset", () => startProgress(autoplay.timeUntilNext()))
      // 타이머 중지 시 진행 표시 숨김
      .on("autoplay:timerstopped", () => setShowAutoplayProgress(false));
  }, [emblaApi]);

  // 컴포넌트 언마운트 시 타이머와 애니메이션 프레임 정리
  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafId.current);
      clearTimeout(timeoutId.current);
    };
  }, []);

  // 외부에서 사용할 값 반환
  return {
    showAutoplayProgress, // 진행 표시 바 표시 여부
  };
};
