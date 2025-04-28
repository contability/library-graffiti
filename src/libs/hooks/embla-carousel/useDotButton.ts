import { useCallback, useEffect, useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";

// 캐러셀 인디케이터 점(도트) 버튼을 위한 커스텀 훅
export const useDotButton = (emblaApi: EmblaCarouselType | undefined) => {
  // 현재 선택된 슬라이드 인덱스
  const [selectedIndex, setSelectedIndex] = useState(0);
  // 스크롤 스냅 위치 배열 (각 슬라이드의 정지 위치)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  // 인디케이터 점 클릭 시 해당 슬라이드로 이동
  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index); // emblaApi의 scrollTo 함수를 사용해 해당 인덱스로 이동
    },
    [emblaApi]
  );

  // 캐러셀 초기화 또는 재초기화 시 스크롤 스냅 위치 배열 업데이트
  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  // 슬라이드 선택 시 선택된 인덱스 업데이트
  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  // emblaApi 변경 시 이벤트 리스너 등록
  useEffect(() => {
    if (!emblaApi) return;

    // 초기 상태 설정
    onInit(emblaApi);
    onSelect(emblaApi);

    // 이벤트 리스너 등록
    emblaApi.on("reInit", onInit); // 캐러셀 재초기화 시 스냅 위치 업데이트
    emblaApi.on("reInit", onSelect); // 캐러셀 재초기화 시 선택 인덱스 업데이트
    emblaApi.on("select", onSelect); // 슬라이드 선택 시 선택 인덱스 업데이트

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
      emblaApi.off("reInit", onInit);
    };
  }, [emblaApi, onInit, onSelect]);

  // 외부에서 사용할 값과 함수 반환
  return {
    selectedIndex, // 현재 선택된 슬라이드 인덱스
    scrollSnaps, // 스크롤 스냅 위치 배열
    onDotButtonClick, // 인디케이터 점 클릭 핸들러
  };
};
