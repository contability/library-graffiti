import { PropsWithChildren, useCallback } from "react";
import useLenis from "../../../hooks/useLenis";
import styled from "styled-components";

const ScrollToButton = styled.button`
  color: white;
  padding: 16px;
  font-size: 3rem;
  font-weight: 600;
  border: 1px solid white;
  border-radius: 8px;
  margin-bottom: 32px;
`;

interface ScrollToSectionButtonProps {
  targetId: string;
}

const ScrollToSectionButton = ({
  targetId,
  children,
}: PropsWithChildren<ScrollToSectionButtonProps>) => {
  const lenis = useLenis();

  const handleClick = useCallback(() => {
    const targetElement = document.getElementById(targetId);
    if (!targetElement || !lenis) return;

    lenis.scrollTo(targetElement, {
      offset: 0,
      duration: 1.5,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
  }, [lenis, targetId]);

  return <ScrollToButton onClick={handleClick}>{children}</ScrollToButton>;
};

export default ScrollToSectionButton;
