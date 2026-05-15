import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#000' } }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="scanning" options={{ gestureEnabled: false }} />
      <Stack.Screen name="insights" options={{ gestureEnabled: false }} />
    </Stack>
  );
}
