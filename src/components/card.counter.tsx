import { useState } from "react";
import { TCard } from "../types";
import { FlexCol, FlexRow } from "./base.styles";
import { Text } from "./text";

enum RarityColorEnum {
  M = "orange",
  R = "yellow",
  U = "silver",
  N = "white",
}

export const CardCounter = ({ name, owned, rarity }: TCard) => {
  const [counter, setCounter] = useState(owned);

  return (
    <FlexRow columnGap="10px">
      <Text width="300px" color={RarityColorEnum[rarity]}>
        {name}
      </Text>
      <Text
        cursor="pointer"
        onClick={() => {
          if (counter > 0) {
            setCounter(counter - 1);
          }
        }}
      >
        {"-"}
      </Text>

      <Text>{counter}</Text>
      <Text
        cursor="pointer"
        onClick={() => {
          if (counter < 4) {
            setCounter(counter + 1);
          }
        }}
      >
        {"+"}
      </Text>
    </FlexRow>
  );
};
