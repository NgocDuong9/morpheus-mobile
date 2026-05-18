import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { Animated, StyleSheet, Text, View } from "react-native";

import type { PlayerMock } from "./types";

type PlayerActionRailProps = {
  video: PlayerMock;
  animatedStyle: object;
};

export function PlayerActionRail({
  video,
  animatedStyle,
}: PlayerActionRailProps) {
  return (
    <Animated.View style={[styles.actionRail, animatedStyle]}>
      <View style={styles.avatarWrap}>
        <LinearGradient colors={video.avatarColors} style={styles.avatar} />
        <View style={styles.followBadge}>
          <Text style={styles.followText}>Follow</Text>
        </View>
      </View>
      <ActionButton icon="heart" label={video.likes} />
      <ActionButton icon="message-circle" label={video.comments} />
      <ActionButton icon="send" label={video.shares} />
      <ActionButton icon="bookmark" label={video.saves} />
      <Feather name="more-horizontal" size={28} color="#fff" />
    </Animated.View>
  );
}

function ActionButton({
  icon,
  label,
}: {
  icon: "heart" | "message-circle" | "send" | "bookmark";
  label: string;
}) {
  return (
    <View style={styles.actionItem}>
      <Feather name={icon} size={28} color="#fff" />
      <Text style={styles.actionLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  actionRail: {
    position: "absolute",
    right: 16,
    bottom: 194,
    width: 40,
    alignItems: "center",
    gap: 24,
  },
  avatarWrap: {
    width: 40,
    height: 52,
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.64)",
  },
  followBadge: {
    position: "absolute",
    bottom: 0,
    height: 18,
    minWidth: 40,
    borderRadius: 4,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  followText: { color: "#080808", fontSize: 10, lineHeight: 12 },
  actionItem: { alignItems: "center", gap: 4 },
  actionLabel: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 13,
    lineHeight: 16,
  },
});
