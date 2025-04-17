import { ImgHTMLAttributes } from "react";
import styled from "styled-components";

export interface ImgProps extends ImgHTMLAttributes<HTMLImageElement> {
  ratio?: string;
}

const ImgConatiner = styled.img<ImgProps>`
  display: block;
  width: 100%;
  aspect-ratio: ${(props) => props.ratio || "auto"};
`;

const Img = ({ src, alt, ratio }: ImgProps) => {
  return <ImgConatiner src={src} alt={alt} ratio={ratio} />;
};

export default Img;
