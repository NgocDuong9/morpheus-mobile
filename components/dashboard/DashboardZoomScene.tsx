import { useFocusEffect } from "@react-navigation/native";
import { useCallback, type ReactNode } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type Props = {
  children: ReactNode;
};

export function DashboardZoomScene({ children }: Props) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useFocusEffect(
    useCallback(() => {
      scale.value = 0.9;
      opacity.value = 0.4;
      scale.value = withTiming(1, {
        duration: 500,
        easing: Easing.out(Easing.cubic),
      });
      opacity.value = withTiming(1, {
        duration: 220,
        easing: Easing.out(Easing.cubic),
      });
    }, [opacity, scale]),
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.fill, animatedStyle]}>
      {children}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
});
