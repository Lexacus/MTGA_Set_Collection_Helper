import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { shallow } from "zustand/shallow";
import { FlexCol } from "../components/base.styles";
import { CardCounter } from "../components/card.counter";
import { Text } from "../components/text";
import { useStore } from "../store";

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 0 10%;
`;

const Homepage = () => {
  /*  const { data } = useQuery(["getCards"], async () => {
    const res = await fetch(
      "https://api.scryfall.com/cards/search?include_extras=true&include_variations=true&order=set&q=e%3Aone&unique=prints",
      {
        method: "GET",
      }
    );
    console.log(res.json());
    //@ts-ignore
    return res.json().data;
  });
 */
  const { cards, setCards } = useStore(
    ({ cards, setCards }) => ({ cards, setCards }),
    shallow
  );

  const noOfMythics = useMemo(() => {
    return (
      cards?.reduce(
        (acc, next) => acc + (next.rarity === "M" ? next.owned : 0),
        0
      ) ?? 0
    );
  }, [cards]);

  const noOfRares = useMemo(() => {
    return (
      cards?.reduce(
        (acc, next) => acc + (next.rarity === "R" ? next.owned : 0),
        0
      ) ?? 0
    );
  }, [cards]);

  console.log();
  return (
    <>
      <FlexRow>
        <FlexCol>
          {cards?.map((card, i) => (
            <CardCounter key={card.name + card.rarity} card={card} index={i} />
          ))}
        </FlexCol>
        <FlexCol>
          <Text>Number of mythics in the set: 19</Text>
          <Text>{"Number of mythics owned: " + noOfMythics}</Text>
          <Text>
            {"Mythic Set Compleation: " +
              ((noOfMythics / 76) * 100).toPrecision(2) +
              "%"}
          </Text>
          <Text>Number of rares in the set: 60</Text>
          <Text>{"Number of rares owned: " + noOfRares}</Text>
          <Text>
            {"Rare Set Compleation: " +
              ((noOfRares / 240) * 100).toPrecision(2) +
              "%"}
          </Text>
        </FlexCol>
      </FlexRow>
    </>
  );
};

export default Homepage;
