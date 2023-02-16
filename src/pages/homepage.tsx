import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";
import { shallow } from "zustand/shallow";
import { FlexCol } from "../components/base.styles";
import { CardCounter } from "../components/card.counter";
import { StyledText } from "../components/text/text.styles";
import { useStore } from "../store";
import { TDraft } from "../types";

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
  const { cards, drafts, setCards, setDrafts } = useStore(
    ({ cards, drafts, setCards, setDrafts }) => ({
      cards,
      drafts,
      setCards,
      setDrafts,
    }),
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

  const saveCards = () => {
    console.log("Saving cards");

    const data = JSON.stringify({ cards: cards, drafts: drafts });

    const element = document.createElement("a");
    const file = new Blob([data], { type: "StyledText/plain" });

    element.href = URL.createObjectURL(file);
    element.download = "mtg_sch_cards.json";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    URL.revokeObjectURL(element.href);
  };

  const cardsRef = useRef<HTMLInputElement>(null);
  const readCards = () => {
    cardsRef?.current?.click();
  };

  return (
    <>
      <FlexRow>
        <FlexCol>
          {cards?.map((card, i) => (
            <CardCounter key={card.name + card.rarity} card={card} index={i} />
          ))}
        </FlexCol>
        <FlexCol>
          <StyledText onClick={saveCards} cursor="pointer">
            SAVE CARDS
          </StyledText>
          <StyledText onClick={readCards} cursor="pointer">
            READ CARDS
          </StyledText>
          <input
            ref={cardsRef}
            type="file"
            hidden
            onChange={async (e) => {
              const fileObject = URL.createObjectURL(
                e.target.files?.[0] as any
              );
              console.log("fileobject created");
              const res = await fetch(fileObject);
              console.log("res awaited");
              const awaitedJson = await res.json();
              setCards(awaitedJson.cards);
              setDrafts(awaitedJson.drafts);
              console.log("json parsed", await res.json());
              URL.revokeObjectURL(fileObject);
            }}
          ></input>
          <StyledText>Number of mythics in the set: 19</StyledText>
          <StyledText>{"Number of mythics owned: " + noOfMythics}</StyledText>
          <StyledText>
            {"Mythic Set Compleation: " +
              ((noOfMythics / 76) * 100).toPrecision(2) +
              "%"}
          </StyledText>
          <StyledText>Number of rares in the set: 60</StyledText>
          <StyledText>{"Number of rares owned: " + noOfRares}</StyledText>
          <StyledText>
            {"Rare Set Compleation: " +
              ((noOfRares / 240) * 100).toPrecision(2) +
              "%"}
          </StyledText>
        </FlexCol>
      </FlexRow>
    </>
  );
};

export default Homepage;
