import { HTMLAttributes, useEffect } from "react";
import styled from "styled-components";

interface DefaultFullPageSection2Props extends HTMLAttributes<HTMLElement> {}

const DefaultFullPageSection2Wrapper = styled.section`
  height: 100dvh;
  h2 {
    font-size: 5rem;
    text-align: center;
    color: #ffffff;
    font-weight: 700;
  }

  button {
    font-size: 5rem;
    width: 100%;
    text-align: "center";
    font-weight: 700;
  }
`;

const DefaultFullPageSection2 = ({
  className,
  onClick,
}: DefaultFullPageSection2Props) => {
  useEffect(() => {
    console.log(className);
  }, [className]);
  return (
    <DefaultFullPageSection2Wrapper className={className}>
      <div className="slide">
        <h2>Custom Section2-1</h2>
        <button onClick={onClick}>Click me to move down</button>
      </div>
      <div className="slide">
        <h2>Custom Section2-2</h2>
      </div>
    </DefaultFullPageSection2Wrapper>
  );
};

export default DefaultFullPageSection2;
