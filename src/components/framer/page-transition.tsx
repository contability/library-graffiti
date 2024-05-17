import { motion } from "framer-motion";
import { styled } from "styled-components";

const PageTransitionWrapper = styled.article`
  width: 100dvw;
  height: 100dvh;
  padding: 20rem;
  display: flex;
  justify-content: center;

  p {
    font-size: 20rem;
  }
`;

const PageTransition = () => {
  return (
    <PageTransitionWrapper>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
      >
        <p>페이지 접속하면 스르륵 올라감</p>
      </motion.div>
    </PageTransitionWrapper>
  );
};

export default PageTransition;
