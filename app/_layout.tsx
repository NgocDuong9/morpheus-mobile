import { DarkTheme, ThemeProvider, type Theme } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';

import { useAppFonts } from '@/hooks/use-app-fonts';
import { queryClient } from '@/lib/query-client';
import { colors } from '@/theme/colors';
import { darkTheme } from '@/theme/paper-theme';

SystemUI.setBackgroundColorAsync(colors.bg);
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: '(tabs)',
};

const navigationTheme: Theme = {
  ...DarkTheme,
  colors: { ...DarkTheme.colors, background: colors.bg },
};

const screenOptions = {
  contentStyle: { backgroundColor: colors.bg },
  gestureEnabled: true,
  fullScreenGestureEnabled: true,
  animation: 'fade',
} as const;

export default function RootLayout() {
  const { loaded, error } = useAppFonts();

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={darkTheme}>
        <ThemeProvider value={navigationTheme}>
          <Stack screenOptions={screenOptions}>
            <Stack.Screen name="onboarding" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: 'fade' }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
          <StatusBar style="light" />
        </ThemeProvider>
      </PaperProvider>
    </QueryClientProvider>
  );
}
