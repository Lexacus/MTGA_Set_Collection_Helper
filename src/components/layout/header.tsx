import { useNavigate } from "react-router-dom";
import { StyledText } from "../text/text.styles";
import { HeaderContainer } from "./header.styles";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <StyledText
        cursor="pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        Collection
      </StyledText>
      <StyledText
        cursor="pointer"
        onClick={() => {
          navigate("/drafts");
        }}
      >
        Drafts
      </StyledText>
      <StyledText cursor="pointer">About</StyledText>
    </HeaderContainer>
  );
};
