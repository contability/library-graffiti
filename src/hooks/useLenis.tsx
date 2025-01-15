// MEMO: 이 hook을 컴포넌트에서 import 받는 것만으로도 스크롤 움직임 달라짐.

import { useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";

interface LenisOptions {
  duration?: number;
  orientation?: "vertical" | "horizontal";
  gestureOrientation?: "vertical" | "horizontal";
  smoothWheel?: boolean;
  smoothTouch?: boolean;
  wheelMultiplier?: number;
  touchMultiplier?: number;
  infinite?: boolean;
  easing: (t: number) => number;
}

const lenisOptions: LenisOptions = {
  duration: 1.2,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical",
  gestureOrientation: "vertical",
  smoothTouch: true,
  smoothWheel: true,
  touchMultiplier: 2,
};

const useLenis = () => {
  const [isReady, setIsReady] = useState(false);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Lenis 인스턴스 생성
    lenisRef.current = new Lenis(lenisOptions);
    lenisRef.current.__isScrolling;

    /**
     * MEMO: 이 부분 없으면 컴포넌트에서 useLenis 임포트 해도 인스턴스가 제대로 return이 안되어 일부 동작이 실행 안되는 현상을 발견했다.
     * 그냥 스크롤은 괜찮은데 scrollTo 동작이 제대로 안되는 현상을 발견했고
     * lenis.__isScrolling이 false여야 하는데 true로 되어 있으면 scrollTo가 안되더라
     */
    // Lenis가 준비되었음을 표시
    setIsReady(true);

    // RAF(RequestAnimationFrame) 함수
    const raf = (time: number) => {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    };

    // Animation 시작
    requestAnimationFrame(raf);

    return () => {
      // Clean up
      lenisRef.current?.destroy();
      setIsReady(false);
    };
  }, []);

  return isReady ? lenisRef.current : null;
};

export default useLenis;
