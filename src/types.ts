import { CSSProperties, HTMLAttributes } from "react";

export type TCard = {
  name: string;
  owned: number;
  rarity: "M" | "R" | "U" | "N";
};

export type TDraft = {
  wins: number;
  type: "premier" | "quick";
  raresDrafted: number;
  mythicsDrafted: number;
  date: string;
};

export type TText = HTMLAttributes<HTMLParagraphElement> & CSSProperties;
