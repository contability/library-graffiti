import styled from "styled-components";
import CommonContainer from "../layout/CommonContainer";
import LenisLayout from "./LenisLayout";

const LenisDefaultWrapper = styled.div`
  display: flex;
  flex-direction: column;

  section {
    min-height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const LenisDefault = () => {
  return (
    // <LenisLayout>
    <CommonContainer>
      <LenisDefaultWrapper>
        <section>Page1</section>
        <section>Page2</section>
        <section>Page3</section>
        <section>Page4</section>
        <section>Page5</section>
      </LenisDefaultWrapper>
    </CommonContainer>
    // </LenisLayout>
  );
};

export default LenisDefault;
