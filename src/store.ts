import { create, StateCreator } from "zustand";
import { TCard, TDraft } from "./types";
import { persist } from "zustand/middleware";
import { data } from "./temp.card.data";

interface StoreType {
  cards: TCard[] | undefined;
  setCards: (cards: TCard[]) => void;
  drafts: TDraft[] | undefined;
  setDrafts: (drafts: TDraft[]) => void;
}

export const useStore = create<StoreType>(
  persist(
    (set) => ({
      cards: data,
      setCards: (cards) => set({ cards }),
      drafts: undefined,
      setDrafts: (drafts) => set({ drafts }),
    }),
    { name: "mtga-helper-storage" }
  ) as StateCreator<StoreType, [], [], StoreType>
);
