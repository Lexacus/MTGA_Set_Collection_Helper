import { useState } from "react";
import { useStore } from "../store";
import { TCard } from "../types";
import { FlexCol, FlexRow } from "./base.styles";
import { shallow } from "zustand/shallow";
import { StyledText } from "./text/text.styles";

enum RarityColorEnum {
  M = "orange",
  R = "yellow",
  U = "silver",
  N = "white",
}

export const CardCounter = ({
  card,
  index,
}: {
  card: TCard;
  index: number;
}) => {
  const { cards, setCards } = useStore(
    ({ cards, setCards }) => ({ cards, setCards }),
    shallow
  );

  return (
    <FlexRow columnGap="10px">
      <StyledText
        width="300px"
        color={RarityColorEnum[cards?.[index].rarity ?? "R"]}
      >
        {cards?.[index].name}
      </StyledText>
      <StyledText
        cursor="pointer"
        onClick={() => {
          if (cards) {
            if (cards?.[index].owned > 0) {
              cards[index].owned--;
              setCards([...cards]);
            }
          }
        }}
      >
        {"-"}
      </StyledText>

      <StyledText>{cards?.[index].owned}</StyledText>
      <StyledText
        cursor="pointer"
        onClick={() => {
          if (cards) {
            if (cards?.[index].owned < 4) {
              cards[index].owned++;
              setCards([...cards]);
            }
          }
        }}
      >
        {"+"}
      </StyledText>
    </FlexRow>
  );
};
