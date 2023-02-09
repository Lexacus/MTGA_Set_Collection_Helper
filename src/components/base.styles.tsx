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
`;

export const FlexCol = ({ children, ...props }: FlexProps) => {
  return <Flex flexDirection="column">{children}</Flex>;
};

export const FlexRow = ({ children, ...props }: FlexProps) => {
  return <Flex flexDirection="row">{children}</Flex>;
};
