import { LinearGradient } from "expo-linear-gradient";
import { Animated, StyleSheet, Text, View } from "react-native";

import type { PlayerMock } from "./types";

type PlayerVideoSurfaceProps = {
  video: PlayerMock;
  animatedStyle: object;
};

export function PlayerVideoSurface({
  video,
  animatedStyle,
}: PlayerVideoSurfaceProps) {
  return (
    <>
      <LinearGradient
        pointerEvents="none"
        colors={video.colors}
        locations={[0, 0.34, 0.72, 1]}
        style={styles.videoUnderlay}
      />
      <Animated.View style={[styles.feedContent, animatedStyle]}>
        <LinearGradient
          colors={video.colors}
          locations={[0, 0.34, 0.72, 1]}
          style={styles.videoSurface}
        >
          <View
            style={[styles.figureBack, { backgroundColor: video.figureColor }]}
          />
          <View
            style={[
              styles.figureBody,
              { backgroundColor: `${video.figureColor}99` },
            ]}
          />
          <VideoProp type={video.prop} />
          <View style={styles.lyricCard}>
            <Text style={styles.lyricText}>{video.lyric}</Text>
          </View>
        </LinearGradient>
      </Animated.View>
    </>
  );
}

function VideoProp({ type }: { type: PlayerMock["prop"] }) {
  if (type === "disc") {
    return (
      <View style={styles.discProp}>
        <View style={styles.discPropCore} />
      </View>
    );
  }

  if (type === "stage") {
    return (
      <>
        <View style={styles.stageBeamLeft} />
        <View style={styles.stageBeamRight} />
      </>
    );
  }

  return (
    <>
      <View style={styles.microphoneStand} />
      <View style={styles.microphoneHead} />
    </>
  );
}

const styles = StyleSheet.create({
  feedContent: {
    ...StyleSheet.absoluteFillObject,
  },
  videoUnderlay: {
    ...StyleSheet.absoluteFillObject,
    top: 40,
  },
  videoSurface: {
    ...StyleSheet.absoluteFillObject,
    top: 40,
    overflow: "hidden",
  },
  figureBack: {
    position: "absolute",
    right: -48,
    top: 90,
    width: 210,
    height: 430,
    borderTopLeftRadius: 90,
    borderBottomLeftRadius: 42,
    backgroundColor: "#111827",
    transform: [{ rotate: "-8deg" }],
  },
  figureBody: {
    position: "absolute",
    right: 68,
    top: 148,
    width: 92,
    height: 420,
    borderRadius: 48,
    backgroundColor: "rgba(15,23,42,0.5)",
    transform: [{ rotate: "-15deg" }],
  },
  microphoneStand: {
    position: "absolute",
    left: "53%",
    top: -12,
    width: 18,
    height: 248,
    borderRadius: 9,
    backgroundColor: "#c9c5b7",
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 12,
  },
  microphoneHead: {
    position: "absolute",
    left: "49.5%",
    top: 182,
    width: 48,
    height: 78,
    borderRadius: 20,
    backgroundColor: "#a8a29e",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.35)",
  },
  discProp: {
    position: "absolute",
    left: "38%",
    top: 128,
    width: 168,
    height: 168,
    borderRadius: 84,
    borderWidth: 18,
    borderColor: "rgba(255,255,255,0.5)",
    backgroundColor: "rgba(0,0,0,0.42)",
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "-12deg" }],
  },
  discPropCore: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.72)",
  },
  stageBeamLeft: {
    position: "absolute",
    left: 40,
    top: 80,
    width: 68,
    height: 520,
    borderRadius: 34,
    backgroundColor: "rgba(255,255,255,0.22)",
    transform: [{ rotate: "18deg" }],
  },
  stageBeamRight: {
    position: "absolute",
    right: 82,
    top: 40,
    width: 54,
    height: 520,
    borderRadius: 27,
    backgroundColor: "rgba(255,255,255,0.18)",
    transform: [{ rotate: "-14deg" }],
  },
  lyricCard: {
    position: "absolute",
    left: 42,
    right: 42,
    bottom: 274,
    borderRadius: 8,
    backgroundColor: "#000",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  lyricText: {
    color: "#fff",
    fontSize: 31,
    lineHeight: 39,
    fontWeight: "900",
    letterSpacing: -0.2,
  },
});
