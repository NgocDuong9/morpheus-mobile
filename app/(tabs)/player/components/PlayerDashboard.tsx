import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { DashboardBottomDock } from "@/components/dashboard/DashboardShell";

import {
  GESTURE_CAPTURE_THRESHOLD,
  playerMocks,
  playerTabs,
  SWIPE_COMMIT_THRESHOLD,
  SWIPE_VELOCITY_THRESHOLD,
} from "./data";
import { PlayerActionRail } from "./PlayerActionRail";
import { PlayerCaption } from "./PlayerCaption";
import { PlayerTopTabs } from "./PlayerTopTabs";
import { PlayerVideoSurface } from "./PlayerVideoSurface";

export function PlayerDashboard() {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const dragX = useRef(new Animated.Value(0)).current;
  const dragY = useRef(new Animated.Value(0)).current;
  const activeTab = playerTabs[activeTabIndex];
  const activeVideo = playerMocks[activeVideoIndex];

  const resetDrag = useCallback(() => {
    Animated.parallel([
      Animated.spring(dragX, {
        toValue: 0,
        useNativeDriver: true,
        friction: 8,
        tension: 90,
      }),
      Animated.spring(dragY, {
        toValue: 0,
        useNativeDriver: true,
        friction: 8,
        tension: 90,
      }),
    ]).start();
  }, [dragX, dragY]);

  const animateVerticalChange = useCallback(
    (direction: 1 | -1) => {
      if (isAnimating) {
        return;
      }

      setIsAnimating(true);
      Animated.timing(dragY, {
        toValue: direction * -height,
        duration: 180,
        useNativeDriver: true,
      }).start(() => {
        setActiveVideoIndex((current) => {
          if (direction === 1) {
            return (current + 1) % playerMocks.length;
          }

          return (current - 1 + playerMocks.length) % playerMocks.length;
        });
        dragY.setValue(direction * height);
        Animated.spring(dragY, {
          toValue: 0,
          useNativeDriver: true,
          friction: 9,
          tension: 100,
        }).start(() => setIsAnimating(false));
      });
    },
    [dragY, height, isAnimating],
  );

  const animateHorizontalChange = useCallback(
    (direction: 1 | -1) => {
      if (isAnimating) {
        return;
      }

      const nextTabIndex =
        direction === 1
          ? Math.min(activeTabIndex + 1, playerTabs.length - 1)
          : Math.max(activeTabIndex - 1, 0);

      if (nextTabIndex === activeTabIndex) {
        resetDrag();
        return;
      }

      setIsAnimating(true);
      Animated.timing(dragX, {
        toValue: direction * -width,
        duration: 170,
        useNativeDriver: true,
      }).start(() => {
        const nextTab = playerTabs[nextTabIndex];
        const firstVideoForTab = playerMocks.findIndex(
          (mock) => mock.tab === nextTab,
        );

        setActiveTabIndex(nextTabIndex);
        if (firstVideoForTab >= 0) {
          setActiveVideoIndex(firstVideoForTab);
        }

        dragX.setValue(direction * width);
        Animated.spring(dragX, {
          toValue: 0,
          useNativeDriver: true,
          friction: 9,
          tension: 100,
        }).start(() => setIsAnimating(false));
      });
    },
    [activeTabIndex, dragX, isAnimating, resetDrag, width],
  );

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) =>
          Math.abs(gestureState.dx) > GESTURE_CAPTURE_THRESHOLD ||
          Math.abs(gestureState.dy) > GESTURE_CAPTURE_THRESHOLD,
        onPanResponderMove: (_, gestureState) => {
          const absX = Math.abs(gestureState.dx);
          const absY = Math.abs(gestureState.dy);

          if (absX > absY) {
            dragX.setValue(gestureState.dx * 0.86);
            dragY.setValue(0);
            return;
          }

          dragY.setValue(gestureState.dy * 0.86);
          dragX.setValue(0);
        },
        onPanResponderRelease: (_, gestureState) => {
          const absX = Math.abs(gestureState.dx);
          const absY = Math.abs(gestureState.dy);
          const isHorizontal = absX > absY;
          const hasVelocity = isHorizontal
            ? Math.abs(gestureState.vx) > SWIPE_VELOCITY_THRESHOLD
            : Math.abs(gestureState.vy) > SWIPE_VELOCITY_THRESHOLD;
          const hasDistance =
            Math.max(absX, absY) > SWIPE_COMMIT_THRESHOLD || hasVelocity;

          if (!hasDistance) {
            resetDrag();
            return;
          }

          if (!isHorizontal) {
            animateVerticalChange(gestureState.dy < 0 ? 1 : -1);
            return;
          }

          animateHorizontalChange(gestureState.dx < 0 ? 1 : -1);
        },
        onPanResponderTerminate: resetDrag,
        onPanResponderTerminationRequest: () => false,
        onShouldBlockNativeResponder: () => true,
        onStartShouldSetPanResponderCapture: () => false,
        onMoveShouldSetPanResponderCapture: (_, gestureState) => {
          const absX = Math.abs(gestureState.dx);
          const absY = Math.abs(gestureState.dy);

          return (
            absX > GESTURE_CAPTURE_THRESHOLD || absY > GESTURE_CAPTURE_THRESHOLD
          );
        },
      }),
    [animateHorizontalChange, animateVerticalChange, dragX, dragY, resetDrag],
  );

  const selectTab = (index: number) => {
    const nextTab = playerTabs[index];
    const firstVideoForTab = playerMocks.findIndex(
      (mock) => mock.tab === nextTab,
    );

    setActiveTabIndex(index);
    if (firstVideoForTab >= 0) {
      setActiveVideoIndex(firstVideoForTab);
    }
    resetDrag();
  };

  const animatedContentStyle = {
    transform: [
      {
        translateX: dragX.interpolate({
          inputRange: [-width, 0, width],
          outputRange: [-width * 0.18, 0, width * 0.18],
          extrapolate: "clamp",
        }),
      },
      {
        translateY: dragY.interpolate({
          inputRange: [-height, 0, height],
          outputRange: [-height * 0.16, 0, height * 0.16],
          extrapolate: "clamp",
        }),
      },
      {
        scale: Animated.add(
          dragX.interpolate({
            inputRange: [-width, 0, width],
            outputRange: [-0.035, 0, -0.035],
            extrapolate: "clamp",
          }),
          dragY.interpolate({
            inputRange: [-height, 0, height],
            outputRange: [-0.035, 0, -0.035],
            extrapolate: "clamp",
          }),
        ).interpolate({
          inputRange: [-0.07, 0],
          outputRange: [0.93, 1],
          extrapolate: "clamp",
        }),
      },
    ],
  };

  return (
    <View style={styles.root} {...panResponder.panHandlers}>
      <PlayerVideoSurface
        animatedStyle={animatedContentStyle}
        video={activeVideo}
      />

      <SafeAreaView style={styles.overlay} edges={["top"]}>
        <PlayerTopTabs
          activeIndex={activeTabIndex}
          tabs={playerTabs}
          onSelect={selectTab}
        />
        <View style={styles.feedHint}>
          <Text style={styles.feedHintText}>{activeTab}</Text>
        </View>

        <PlayerActionRail
          animatedStyle={animatedContentStyle}
          video={activeVideo}
        />
        <PlayerCaption
          animatedStyle={animatedContentStyle}
          bottom={insets.bottom + 118}
          video={activeVideo}
        />
      </SafeAreaView>

      <LinearGradient
        pointerEvents="none"
        colors={["rgba(23,26,31,0)", "#171a1f"]}
        style={styles.bottomFade}
      />
      <DashboardBottomDock
        activeTab="player"
        bottomInset={insets.bottom}
        showMorpheusButton={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#080808" },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  feedHint: {
    position: "absolute",
    left: 16,
    top: 92,
    height: 24,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.28)",
    justifyContent: "center",
  },
  feedHintText: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 12,
    lineHeight: 16,
  },
  bottomFade: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 160,
  },
});
