import styled from "@emotion/styled";
import { CSSProperties, HTMLAttributes } from "react";

type FlexProps = HTMLAttributes<HTMLDivElement> & CSSProperties;

const Flex = styled.div`
  display: flex;
  flex-direction: ${({ flexDirection }: FlexProps) =>
    flexDirection ?? "column"};
  width: ${({ width }: FlexProps) => width ?? "fit-content"};
  margin: ${({ margin }: FlexProps) => margin ?? "fit-content"};
  padding: ${({ padding }: FlexProps) => padding ?? "fit-content"};
  column-gap: ${({ columnGap }: FlexProps) => columnGap ?? "0"};
`;

export const FlexCol = ({ children, ...props }: FlexProps) => {
  return (
    <Flex flexDirection="column" {...props}>
      {children}
    </Flex>
  );
};

export const FlexRow = ({ children, ...props }: FlexProps) => {
  return (
    <Flex flexDirection="row" {...props}>
      {children}
    </Flex>
  );
};
