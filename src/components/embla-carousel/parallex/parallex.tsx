import ParallexCarousel from "./parallex-carousel";
import styled from "styled-components";

interface SlideContainerProps {
  bgColor: string;
}

interface ImageProps {
  ratio?: string;
}

const SlideContainer = styled.div<SlideContainerProps>`
  height: 100%;
  cursor: grabbing;
  background-color: ${(props) => props.bgColor};
`;

const SlideFigure = styled.figure`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 1280px;
`;

const DesktopImage = styled.img<ImageProps>`
  display: none;
  width: 100%;
  aspect-ratio: ${(props) => props.ratio || "auto"};

  @media (min-width: 768px) {
    display: block;
  }
`;

const MobileImage = styled.img<ImageProps>`
  display: block;
  width: 100%;
  aspect-ratio: ${(props) => props.ratio || "auto"};

  @media (min-width: 768px) {
    display: none;
  }
`;

const SlideCaption = styled.figcaption`
  position: absolute;
  left: 50%;
  top: 18%;
  transform: translateX(-50%);
  white-space: pre-line;
  font-weight: bold;
  font-size: 2rem;
  color: #111827;

  @media (min-width: 1024px) {
    font-size: 3.25rem;
  }
`;

const SimpleFigure = styled.figure`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 1280px;
`;

const contentList = [
  <SlideContainer key="main-section__slide-01" bgColor="#4395b7">
    <SlideFigure>
      <DesktopImage
        src="https://picsum.photos/600/350?v=1"
        alt="main slider01 image"
        ratio="600/350"
      />
      <MobileImage
        src="https://picsum.photos/375/548?v=2"
        alt="main slider01 mobile image"
        ratio="375/548"
      />
      <SlideCaption>SLIDE01</SlideCaption>
    </SlideFigure>
  </SlideContainer>,
  <SlideContainer key="main-section__slide-02" bgColor="#e5e5e5">
    <SimpleFigure>
      <DesktopImage
        src="https://picsum.photos/600/350?v=3"
        alt="main slider02 image"
        ratio="600/350"
      />
      <MobileImage
        src="https://picsum.photos/375/548?v=4"
        alt="main slider02 mobile image"
        ratio="375/548"
      />
    </SimpleFigure>
    <SlideCaption>SLIDE02</SlideCaption>
  </SlideContainer>,
];

const EmblaCarouselParallex = () => {
  return (
    <main>
      <ParallexCarousel slides={contentList} />
    </main>
  );
};

export default EmblaCarouselParallex;
