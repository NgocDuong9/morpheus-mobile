import { configureFonts, MD3DarkTheme, MD3LightTheme, type MD3Theme } from 'react-native-paper';

import { fontFamily } from './typography';

const brand = {
  primary: '#6366f1',
  secondary: '#a855f7',
  accent: '#2dd4bf',
};

const baseFont = { fontFamily: fontFamily.regular } as const;

const fonts = configureFonts({
  config: {
    displaySmall: { fontFamily: fontFamily.displayRegular },
    displayMedium: { fontFamily: fontFamily.displayMedium },
    displayLarge: { fontFamily: fontFamily.displayBold },
    headlineSmall: { fontFamily: fontFamily.displaySemibold },
    headlineMedium: { fontFamily: fontFamily.displaySemibold },
    headlineLarge: { fontFamily: fontFamily.displayBold },
    titleSmall: { fontFamily: fontFamily.semibold },
    titleMedium: { fontFamily: fontFamily.semibold },
    titleLarge: { fontFamily: fontFamily.displaySemibold },
    bodySmall: baseFont,
    bodyMedium: baseFont,
    bodyLarge: baseFont,
    labelSmall: { fontFamily: fontFamily.medium },
    labelMedium: { fontFamily: fontFamily.medium },
    labelLarge: { fontFamily: fontFamily.semibold },
  },
});

export const lightTheme: MD3Theme = {
  ...MD3LightTheme,
  fonts,
  colors: {
    ...MD3LightTheme.colors,
    primary: brand.primary,
    secondary: brand.secondary,
    tertiary: brand.accent,
  },
};

export const darkTheme: MD3Theme = {
  ...MD3DarkTheme,
  fonts,
  colors: {
    ...MD3DarkTheme.colors,
    primary: brand.primary,
    secondary: brand.secondary,
    tertiary: brand.accent,
  },
};
