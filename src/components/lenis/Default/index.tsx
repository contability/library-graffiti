import styled from "styled-components";
import DefaultLayout from "./DefaultLayout";
import CommonContainer from "../../layout/CommonContainer";

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
    <DefaultLayout>
      <CommonContainer>
        <LenisDefaultWrapper>
          <section>Page1</section>
          <section>Page2</section>
          <section>Page3</section>
          <section>Page4</section>
          <section>Page5</section>
        </LenisDefaultWrapper>
      </CommonContainer>
    </DefaultLayout>
  );
};

export default LenisDefault;
