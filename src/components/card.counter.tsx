import { useState } from "react";
import { useStore } from "../store";
import { TCard } from "../types";
import { FlexCol, FlexRow } from "./base.styles";
import { Text } from "./text";
import { shallow } from "zustand/shallow";

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
      <Text width="300px" color={RarityColorEnum[cards?.[index].rarity ?? "R"]}>
        {cards?.[index].name}
      </Text>
      <Text
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
      </Text>

      <Text>{cards?.[index].owned}</Text>
      <Text
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
      </Text>
    </FlexRow>
  );
};
