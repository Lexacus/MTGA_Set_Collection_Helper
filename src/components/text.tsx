import styled from "@emotion/styled";
import { CSSProperties, HTMLAttributes } from "react";

type TText = HTMLAttributes<HTMLParagraphElement> & CSSProperties;

const StyledText = styled.p`
  width: ${({ width }: TText) => width ?? "fit-content"};
  fontsize: ${({ fontSize }: TText) => fontSize ?? "fit-content"};
  margin: ${({ margin }: TText) => margin ?? "fit-content"};
  padding: ${({ padding }: TText) => padding ?? "fit-content"};
`;

export const Text = ({ children, ...props }: TText) => {
  return <StyledText {...props}>{children}</StyledText>;
};
