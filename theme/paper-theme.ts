import { MD3DarkTheme, MD3LightTheme, type MD3Theme } from 'react-native-paper';

const brand = {
  primary: '#6366f1',
  secondary: '#a855f7',
  accent: '#2dd4bf',
};

export const lightTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: brand.primary,
    secondary: brand.secondary,
    tertiary: brand.accent,
  },
};

export const darkTheme: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: brand.primary,
    secondary: brand.secondary,
    tertiary: brand.accent,
  },
};
