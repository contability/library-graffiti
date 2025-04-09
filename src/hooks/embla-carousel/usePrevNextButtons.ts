import { useCallback, useEffect, useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";

// 이전/다음 버튼 기능을 위한 커스텀 훅
export const usePrevNextButtons = (emblaApi: EmblaCarouselType | undefined) => {
  // 이전 버튼 비활성화 상태
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  // 다음 버튼 비활성화 상태
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  // 이전 슬라이드로 이동하는 함수
  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev(); // emblaApi의 scrollPrev 함수 호출
  }, [emblaApi]);

  // 다음 슬라이드로 이동하는 함수
  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext(); // emblaApi의 scrollNext 함수 호출
  }, [emblaApi]);

  // 슬라이드 선택 시 버튼 상태 업데이트
  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    // 이전/다음 슬라이드로 이동 가능한지 여부에 따라 버튼 상태 설정
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  // emblaApi 변경 시 이벤트 리스너 등록
  useEffect(() => {
    if (!emblaApi) return;

    // 초기 버튼 상태 설정
    onSelect(emblaApi);

    // 이벤트 리스너 등록
    emblaApi.on("reInit", onSelect); // 캐러셀 재초기화 시 버튼 상태 업데이트
    emblaApi.on("select", onSelect); // 슬라이드 선택 시 버튼 상태 업데이트

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // 외부에서 사용할 값과 함수 반환
  return {
    prevBtnDisabled, // 이전 버튼 비활성화 상태
    nextBtnDisabled, // 다음 버튼 비활성화 상태
    onPrevButtonClick, // 이전 버튼 클릭 핸들러
    onNextButtonClick, // 다음 버튼 클릭 핸들러
  };
};
