import { HTMLAttributes, useEffect } from "react";
import styled from "styled-components";

interface DefaultFullPageSection1Props extends HTMLAttributes<HTMLElement> {}

const DefaultFullPageSection1Wrapper = styled.section`
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

const DefaultFullPageSection1 = ({
  className,
  onClick,
}: DefaultFullPageSection1Props) => {
  useEffect(() => {
    console.log(className);
  }, [className]);
  return (
    <DefaultFullPageSection1Wrapper className={className}>
      <div className="slide">
        <h2>Custom Section1-1</h2>
        <button onClick={onClick}>Click me to move down</button>
      </div>
      <div className="slide">
        <h2>Custom Section1-2</h2>
      </div>
    </DefaultFullPageSection1Wrapper>
  );
};

export default DefaultFullPageSection1;
