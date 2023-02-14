import { create, StateCreator } from "zustand";
import { TCard } from "./types";
import { persist } from "zustand/middleware";
import { data } from "./temp.card.data";

interface StoreType {
  cards: TCard[] | undefined;
  setCards: (cards: TCard[]) => void;
}

export const useStore = create<StoreType>(
  persist(
    (set) => ({
      cards: data,
      setCards: (cards) => set({ cards }),
    }),
    { name: "mtga-helper-storage" }
  ) as StateCreator<StoreType, [], [], StoreType>
);
