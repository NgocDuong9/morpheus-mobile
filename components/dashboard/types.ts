import type Feather from "@expo/vector-icons/Feather";

export type GradientColors = readonly [string, string, ...string[]];

export type DashboardTabKey =
  | "discover"
  | "store"
  | "morpheus"
  | "player"
  | "profile";

export type DashboardTabItem = {
  key: DashboardTabKey;
  label: string;
  href:
    | "/dashboard"
    | "/store"
    | "/morpheus"
    | "/player"
    | "/profile";
  icon: keyof typeof Feather.glyphMap | "sparkle";
};

export type LiveStream = {
  artist: string;
  title: string;
  viewers: string;
  colors: GradientColors;
};

export type ExclusiveDrop = {
  title: string;
  subtitle: string;
  badge: string;
  locked: boolean;
  colors: GradientColors;
};

export type EventItem = {
  day: string;
  month: string;
  title: string;
  place: string;
  price: string;
  note: string;
};

export type ProductDrop = {
  title: string;
  subtitle: string;
  price: string;
  badge?: string;
  colors: GradientColors;
};

export type ToolItem = {
  label: string;
  title: string;
  body: string;
  accent: string;
};
