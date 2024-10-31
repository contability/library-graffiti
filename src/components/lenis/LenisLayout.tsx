import { ReactLenis } from "@studio-freight/react-lenis";
import { PropsWithChildren } from "react";

interface LenisOptions {
  duration?: number;
  orientation?: "vertical" | "horizontal";
  gestureOrientation?: "vertical" | "horizontal";
  smoothWheel?: boolean;
  smoothTouch?: boolean;
  wheelMultiplier?: number;
  touchMultiplier?: number;
  infinite?: boolean;
}

const LenisLayout = ({ children }: PropsWithChildren) => {
  const options: LenisOptions = {
    duration: 2,
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  };

  return (
    <ReactLenis options={options} root={false}>
      {children}
    </ReactLenis>
  );
};

export default LenisLayout;
