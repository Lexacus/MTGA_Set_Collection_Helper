import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form/dist/types";
import { shallow } from "zustand/shallow";
import { FlexCol } from "../components/base.styles";
import { CardCounter } from "../components/card.counter";
import { Text } from "../components/text";
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

  const { register, handleSubmit, setValue } = useForm<TDraft>({
    defaultValues: {
      raresDrafted: 0,
      mythicsDrafted: 0,
      type: "quick",
      wins: 0,
    },
  });

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
    const file = new Blob([data], { type: "text/plain" });

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

  const onSubmit: SubmitHandler<TDraft> = (data) => {
    console.log(data);

    drafts?.push({ ...data, date: dayjs().format("DD/MM/YYYY") });
    setDrafts(drafts ?? []);
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
          <Text onClick={saveCards} cursor="pointer">
            SAVE CARDS
          </Text>
          <Text onClick={readCards} cursor="pointer">
            READ CARDS
          </Text>
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
        <FlexCol>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <select {...register("wins")} placeholder="Wins">
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
            </select>
            <select {...register("type")}>
              <option value={"premier"}>Premier/Traditional</option>
              <option value={"quick"}>Quick</option>
            </select>
            <input {...register("raresDrafted")} placeholder="No. of rares" />
            <input
              {...register("mythicsDrafted")}
              placeholder="No. of mythics"
            />

            <button type="submit">Insert Draft</button>
          </form>
        </FlexCol>
        <FlexCol>
          {drafts?.map((draft, i) => (
            <FlexRow
              onClick={() => {
                console.log("ok");
                const newDrafts = drafts.filter((x, index) => index !== i);
                setDrafts(newDrafts);
              }}
            >
              <Text>{draft.wins}</Text>
              <Text>{draft.date}</Text>
            </FlexRow>
          ))}
        </FlexCol>
      </FlexRow>
    </>
  );
};

export default Homepage;
