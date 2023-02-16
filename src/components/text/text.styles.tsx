import styled from "@emotion/styled";
import { TText } from "../../types";

export const StyledText = styled.p`
  width: ${({ width }: TText) => width ?? "fit-content"};
  fontsize: ${({ fontSize }: TText) => fontSize ?? "fit-content"};
  margin: ${({ margin }: TText) => margin ?? "0"};
  padding: ${({ padding }: TText) => padding ?? "0"};
  cursor: ${({ cursor }: TText) => cursor ?? "normal"};
  color: ${({ color }: TText) => color ?? "normal"};
  text-align: center;
`;
