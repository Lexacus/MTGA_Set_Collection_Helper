import styled from "@emotion/styled";
import { HTMLAttributes } from "react";

const StyledDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  justify-content: center;
  align-content: center;
  margin: 0 auto;
  background-color: darkgray;
`;

const Wrapper = ({ children, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return <StyledDiv>{children}</StyledDiv>;
};

export default Wrapper;
