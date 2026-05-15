import { DarkTheme, ThemeProvider, type Theme } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';

import { queryClient } from '@/lib/query-client';
import { colors } from '@/theme/colors';
import { darkTheme } from '@/theme/paper-theme';

export const unstable_settings = {
  anchor: '(tabs)',
};

const navigationTheme: Theme = {
  ...DarkTheme,
  colors: { ...DarkTheme.colors, background: colors.bg },
};

const screenOptions = {
  contentStyle: { backgroundColor: colors.bg },
} as const;

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={darkTheme}>
        <ThemeProvider value={navigationTheme}>
          <Stack screenOptions={screenOptions}>
            <Stack.Screen name="onboarding" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
          <StatusBar style="light" />
        </ThemeProvider>
      </PaperProvider>
    </QueryClientProvider>
  );
}
