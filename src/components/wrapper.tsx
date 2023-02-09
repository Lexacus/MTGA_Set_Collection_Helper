import styled from "@emotion/styled";
import { HTMLAttributes } from "react";

const StyledDiv = styled.div`
  width: 100%;
  height: 100vw;
  max-width: 1366px;
  overflow-x: hidden;
  margin: 0 auto;
  background-color: darkgray;
`;

const Wrapper = ({ children, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return <StyledDiv>{children}</StyledDiv>;
};

export default Wrapper;
