import Feather from "@expo/vector-icons/Feather";
import Octicons from "@expo/vector-icons/Octicons";

import type { DashboardTabItem } from "./types";

type DashboardIconProps = {
  name: DashboardTabItem["icon"];
  color: string;
  size?: number;
};

export function DashboardIcon({ name, color, size = 20 }: DashboardIconProps) {
  if (name === "sparkle") {
    return <Octicons name="sparkle" size={size} color={color} />;
  }

  return <Feather name={name} size={size} color={color} />;
}

export function MessageCircleMoreIcon({ color, size = 20 }: { color: string; size?: number }) {
  return <Feather name="message-circle" size={size} color={color} />;
}
