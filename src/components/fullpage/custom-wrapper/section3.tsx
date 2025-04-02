import { HTMLAttributes } from "react";
import styled from "styled-components";

interface DefaultFullPageSection3Props extends HTMLAttributes<HTMLElement> {}

const DefaultFullPageSection3Wrapper = styled.section`
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

const DefaultFullPageSection3 = ({
  className,
  onClick,
}: DefaultFullPageSection3Props) => {
  return (
    <DefaultFullPageSection3Wrapper className={className}>
      <div className="slide">
        <h2>Custom Section2-1</h2>
        <button onClick={onClick}>Click me to move Top</button>
      </div>
      <div className="slide">
        <h2>Custom Section2-2</h2>
      </div>
    </DefaultFullPageSection3Wrapper>
  );
};

export default DefaultFullPageSection3;
