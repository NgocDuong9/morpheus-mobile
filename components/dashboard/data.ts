import type { DashboardTabItem } from "./types";

export const dashboardTabs: DashboardTabItem[] = [
  { key: "discover", label: "Discover", href: "/dashboard", icon: "compass" },
  { key: "store", label: "Store", href: "/store", icon: "shopping-cart" },
  { key: "morpheus", label: "Morpheus", href: "/morpheus", icon: "sparkle" },
  { key: "player", label: "Player", href: "/player", icon: "play-circle" },
  { key: "profile", label: "Profile", href: "/profile", icon: "user" },
];
