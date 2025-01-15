import { ReactNode, useEffect } from "react";
import useLenis from "../../hooks/useLenis";

const SmoothScroll = ({ children }: { children: ReactNode }) => {
  const lenis = useLenis();

  // 스크롤 이벤트 핸들러 예시
  useEffect(() => {
    if (!lenis) return;
    const onScroll = ({ progress }: { progress: number }) => {
      console.log(progress);
    };

    // 스크롤 이벤트 구독
    lenis.on("scroll", onScroll);
    return () => {
      // Clean up
      lenis.off("scroll", onScroll);
    };
  }, [lenis]);

  return <>{children}</>;
};

export default SmoothScroll;
