import { Stack } from "expo-router";

import { colors } from "@/theme/colors";

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.bg },
        gestureEnabled: true,
        fullScreenGestureEnabled: true,
      }}
    >
      <Stack.Screen name="logo" />
      <Stack.Screen name="index" />
      <Stack.Screen name="connect" />
      <Stack.Screen name="scanning" />
      <Stack.Screen name="insights" />
    </Stack>
  );
}
