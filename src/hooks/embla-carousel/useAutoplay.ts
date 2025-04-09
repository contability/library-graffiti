import { useCallback, useEffect, useState } from "react";
import { EmblaCarouselType } from "embla-carousel";

// 자동 재생 기능 관련 커스텀 훅
export const useAutoplay = (emblaApi: EmblaCarouselType | undefined) => {
  // 자동 재생 상태를 관리하는 상태
  const [autoplayIsPlaying, setAutoplayIsPlaying] = useState(false);

  // 자동 재생 상태에서 버튼 클릭 처리 함수
  const onAutoplayButtonClick = useCallback(
    (callback: () => void) => {
      const autoplay = emblaApi?.plugins()?.autoplay;
      if (!autoplay) return;

      // 상호작용 중지 설정에 따라 자동 재생 재설정 또는 중지
      const resetOrStop =
        autoplay.options.stopOnInteraction === false
          ? autoplay.reset // 상호작용 중지가 꺼져있으면 타이머만 리셋
          : autoplay.stop; // 상호작용 중지가 켜져있으면 완전히 중지

      resetOrStop();
      callback(); // 버튼 클릭 콜백 실행 (예: 이전/다음 슬라이드로 이동)
    },
    [emblaApi]
  );

  // 자동 재생 토글 함수 (재생 중이면 중지, 중지 중이면 재생)
  const toggleAutoplay = useCallback(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    // 현재 상태에 따라 적절한 함수 선택
    const playOrStop = autoplay.isPlaying() ? autoplay.stop : autoplay.play;
    playOrStop();
  }, [emblaApi]);

  // 자동 재생 상태 업데이트 및 이벤트 리스너 등록
  useEffect(() => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    // 초기 자동 재생 상태 설정
    setAutoplayIsPlaying(autoplay.isPlaying());

    // 이벤트 리스너 등록: 자동 재생 시작/중지/재초기화 시 상태 업데이트
    emblaApi
      .on("autoplay:play", () => setAutoplayIsPlaying(true))
      .on("autoplay:stop", () => setAutoplayIsPlaying(false))
      .on("reInit", () => setAutoplayIsPlaying(autoplay.isPlaying()));
  }, [emblaApi]);

  // 외부에서 사용할 값과 함수 반환
  return {
    autoplayIsPlaying, // 현재 자동 재생 상태
    toggleAutoplay, // 자동 재생 상태를 토글하는 함수
    onAutoplayButtonClick, // 버튼 클릭 처리 함수
  };
};
