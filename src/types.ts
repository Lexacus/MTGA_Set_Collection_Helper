import { CSSProperties, HTMLAttributes } from "react";

export type TCard = {
  name: string;
  owned: number;
  rarity: "M" | "R" | "U" | "N";
};

export type TColors = "R" | "W" | "U" | "G" | "B";

export type TDraft = {
  colors: TColors[];
  wins: number;
  losses: number;
  type: "Premier" | "Quick";
  raresDrafted: number;
  mythicsDrafted: number;
  packsObtained: number;
  date: Date;
};

export type TText = HTMLAttributes<HTMLParagraphElement> & CSSProperties;
