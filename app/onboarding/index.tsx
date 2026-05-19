import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, {
  Easing,
  Extrapolation,
  FadeIn,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { GradientTitle } from "@/components/GradientTitle";
import { colors } from "@/theme/colors";
import { fontFamily } from "@/theme/typography";

const STEP_DURATION_MS = 1850;

type IntroSlide = {
  intro?: string;
  title: string;
  body: string;
  topRatio: number;
};

const slides: IntroSlide[] = [
  {
    intro: "I am",
    title: "MORPHEUS.",
    body: "Your 24/7 AI operating system. I understand music and audience better than you do - and do the heavy lifting.",
    topRatio: 0.31,
  },
  {
    title: "What I Am",
    body: "Your AI manager, label & studio in one.",
    topRatio: 0.39,
  },
  {
    title: "What I Do For You.",
    body: "Plan, create, post & monetize automatically.",
    topRatio: 0.38,
  },
  {
    title: "What You Do.",
    body: "Connect once. Then just approve or edit.I handle the rest.",
    topRatio: 0.38,
  },
];

export default function OnboardingIntro() {
  const insets = useSafeAreaInsets();
  const { height, width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);
  const progress = useSharedValue(0);
  const slideWidth = width - 52;

  useEffect(() => {
    if (activeIndex === slides.length - 1) return;

    const timeout = setTimeout(() => {
      setActiveIndex((current) => Math.min(current + 1, slides.length - 1));
    }, STEP_DURATION_MS);

    return () => clearTimeout(timeout);
  }, [activeIndex]);

  useEffect(() => {
    progress.value = withTiming(activeIndex, {
      duration: 760,
      easing: Easing.out(Easing.cubic),
    });
  }, [activeIndex, progress]);

  const activeTop = Math.min(height * 0.38, height - 420);

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <View style={styles.screen}>
        <View pointerEvents="none" style={styles.statusSpacer} />

        <View pointerEvents="none" style={styles.copyLayer}>
          {slides.map((slide, index) => (
            <IntroSlideLayer
              activeIndex={activeIndex}
              activeTop={activeTop}
              index={index}
              key={slide.title}
              progress={progress}
              slide={slide}
              slideWidth={slideWidth}
            />
          ))}
        </View>

        {activeIndex === slides.length - 1 && (
          <Animated.View
            entering={FadeIn.duration(520)}
            style={[styles.footer, { bottom: insets.bottom }]}
          >
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push("/onboarding/connect")}
              style={({ pressed }) => [
                styles.cta,
                pressed && styles.ctaPressed,
              ]}
            >
              <Text style={styles.ctaLabel}>START HERE</Text>
              <FontAwesome6
                name="arrow-right"
                size={16}
                color="#111"
                iconStyle="solid"
              />
            </Pressable>
          </Animated.View>
        )}
      </View>
    </SafeAreaView>
  );
}

function IntroSlideLayer({
  activeIndex,
  activeTop,
  index,
  progress,
  slide,
  slideWidth,
}: {
  activeIndex: number;
  activeTop: number;
  index: number;
  progress: SharedValue<number>;
  slide: IntroSlide;
  slideWidth: number;
}) {
  const animatedStyle = useAnimatedStyle(() => {
    const relativeIndex = index - progress.value;

    return {
      left: interpolate(
        relativeIndex,
        [-1, 0, 1],
        [80, 26, 26],
        Extrapolation.CLAMP,
      ),
      opacity: interpolate(
        relativeIndex,
        [-3, -2, -1, -0.18, 0, 0.45, 1],
        [0.07, 0.13, 0.24, 0.9, 1, 0, 0],
        Extrapolation.CLAMP,
      ),
      transform: [
        {
          translateY: interpolate(
            relativeIndex,
            [-3, -2, -1, 0, 1],
            [-350, -250, -150, 0, 260],
            Extrapolation.CLAMP,
          ),
        },
        {
          scale: interpolate(
            relativeIndex,
            [-3, -2, -1, 0, 1],
            [0.34, 0.45, 0.6, 1, 1],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });

  return (
    <Animated.View
      style={[
        styles.slideLayer,
        {
          top: activeTop,
          width: slideWidth,
          zIndex: index === activeIndex ? 3 : 1,
        },
        animatedStyle,
      ]}
    >
      <SlideCopy slide={slide} ghost={index < activeIndex} />
    </Animated.View>
  );
}

function SlideCopy({
  slide,
  ghost = false,
}: {
  slide: IntroSlide;
  ghost?: boolean;
}) {
  return (
    <View style={ghost && styles.ghostBlur}>
      {slide.intro && (
        <Text style={[styles.intro, ghost && styles.ghostIntro]}>
          {slide.intro}
        </Text>
      )}
      {slide.title.split("\n").map((line, lineIndex) => (
        <GradientTitle
          key={`${line}-${lineIndex}`}
          title={line}
          fontSize={36}
          height={48}
          letterSpacing={1.44}
          textTransform="capitalize"
          fontWeight={lineIndex === 0 ? 1000 : 120}
          fontFamily={
            lineIndex === 0 ? fontFamily.displayBlack : fontFamily.ultralight
          }
        />
      ))}
      <Text style={[styles.body, ghost && styles.ghostBody]}>{slide.body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  statusSpacer: {
    height: 1,
  },
  copyLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  slideLayer: {
    position: "absolute",
    transformOrigin: "left top",
  },
  ghostBlur: {
    opacity: 0.8,
  },
  intro: {
    color: "#f8fafc",
    fontFamily: fontFamily.ultralight,
    fontSize: 31,
    lineHeight: 37,
    letterSpacing: 0,
    marginBottom: 6,
  },
  body: {
    color: "#d5d5d8",
    fontFamily: fontFamily.regular,
    fontSize: 20,
    lineHeight: 31,
    letterSpacing: 0,
    marginTop: 10,
    maxWidth: 382,
  },
  ghostIntro: {
    color: "#ffffff",
    textShadowColor: "#ffffff",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  ghostBody: {
    color: "#ffffff",
    textShadowColor: "#ffffff",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 12,
  },
  footer: {
    position: "absolute",
    left: 20,
    right: 20,
    paddingTop: 13,
    borderTopColor: "rgba(255,255,255,0.05)",
  },
  cta: {
    minHeight: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 28,
    borderRadius: 999,
    backgroundColor: "#f8f8f8",
  },
  ctaPressed: {
    opacity: 0.86,
  },
  ctaLabel: {
    color: "#111",
    fontFamily: fontFamily.bold,
    fontSize: 14,
    letterSpacing: 0.8,
  },
});
