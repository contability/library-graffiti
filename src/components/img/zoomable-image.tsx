import { useCallback, useRef } from "react";
import QuickPinchZoom, {
  make3dTransformValue,
  UpdateAction,
} from "react-quick-pinch-zoom";
import Img, { ImgProps } from "./img";

/** 이미지만 따로 zoom 가능하도록 분리 시켜주는 react-quick-pinch-zoom을 이용한 컴포넌트 */
const ZoomableImage = ({ src, alt, ratio }: ImgProps) => {
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const onUpdate = useCallback(({ x, y, scale }: UpdateAction) => {
    const container = imgContainerRef?.current;

    if (container) {
      const value = make3dTransformValue({ x, y, scale });
      container.style.setProperty("transform", value);
    }
  }, []);

  return (
    <div className="w-full">
      <QuickPinchZoom onUpdate={onUpdate}>
        <div ref={imgContainerRef}>
          <Img src={src} alt={alt} ratio={ratio} />
        </div>
      </QuickPinchZoom>
    </div>
  );
};

export default ZoomableImage;
