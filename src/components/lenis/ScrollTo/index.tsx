import styled from "styled-components";
import CommonContainer from "../../layout/CommonContainer";
import ScrollToSectionButton from "./ScrollToSectionButton";

const LenisScrollToWrapper = styled.div`
  section {
    height: 100dvh;
  }
`;

const LenisScrollTo = () => {
  return (
    <CommonContainer>
      <LenisScrollToWrapper>
        <ScrollToSectionButton targetId="section4">
          Scroll to Section 4 Button
        </ScrollToSectionButton>
        <section id="section1">Section1</section>
        <section id="section2">Section2</section>
        <section id="section3">Section3</section>
        <section id="section4">Section4</section>
        <section id="section5">Section5</section>
      </LenisScrollToWrapper>
    </CommonContainer>
  );
};

export default LenisScrollTo;
