// MEMO: 이 hook 컴포넌트에서 import 받는 것만으로도 스크롤 움직임 달라짐.

import { useEffect, useRef } from "react";
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
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Lenis 인스턴스 생성
    lenisRef.current = new Lenis(lenisOptions);

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
    };
  }, []);

  return lenisRef.current;
};

export default useLenis;
