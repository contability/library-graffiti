import { PropsWithChildren } from "react";
import SmoothScroll from "../SmoothScroll";

const DefaultLayout = ({ children }: PropsWithChildren) => {
  return <SmoothScroll>{children}</SmoothScroll>;
};

export default DefaultLayout;
