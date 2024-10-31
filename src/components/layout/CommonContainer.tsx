import { PropsWithChildren, memo } from "react";
import { styled } from "styled-components";

const CommonContainer = styled.div`
  position: relative;
  font-size: 2rem;
  margin: 0 auto;
  width: 100%;
  max-width: 120rem;
  display: flex;
  flex-direction: column;
  place-items: center;
  scroll-behavior: smooth;
  padding: 2rem;

  h1 {
    font-size: 10rem;
  }

  .button-default {
    padding: 1.2rem;
    background-color: #1a1a1a;
    color: rgba(255, 255, 255, 0.87);
    border-radius: 8px;
    border: 1px solid transparent;
    transition: border-color 0.25s;

    &:hover {
      border-color: #646cff;
    }
  }
`;

const CommonContainerLayout = ({ children }: PropsWithChildren) => {
  return <CommonContainer>{children}</CommonContainer>;
};

export default memo(CommonContainerLayout);
