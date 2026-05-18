import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Animated, StyleSheet, Text, View } from "react-native";

import type { PlayerMock } from "./types";

type PlayerCaptionProps = {
  bottom: number;
  video: PlayerMock;
  animatedStyle: object;
};

export function PlayerCaption({
  bottom,
  video,
  animatedStyle,
}: PlayerCaptionProps) {
  return (
    <Animated.View
      style={[styles.captionBlock, { bottom }, animatedStyle]}
    >
      <Text style={styles.handle}>{video.handle}</Text>
      <Text style={styles.caption}>
        {video.caption} <Text style={styles.tags}>{video.tags}</Text>
      </Text>
      <View style={styles.musicRow}>
        <FontAwesome6 name="music" size={14} color="#fff" iconStyle="solid" />
        <Text style={styles.musicText}>{video.audio}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  captionBlock: {
    position: "absolute",
    left: 24,
    right: 64,
    gap: 4,
  },
  handle: { color: "#fff", fontSize: 16, lineHeight: 24, fontWeight: "600" },
  caption: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 20,
    textTransform: "capitalize",
  },
  tags: { color: "rgba(255,255,255,0.64)" },
  musicRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
  },
  musicText: { color: "#fff", fontSize: 13, lineHeight: 16 },
});
