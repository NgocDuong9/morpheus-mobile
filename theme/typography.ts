import type { TextStyle } from 'react-native';

export const fontFamily = {
  ultralight: 'SFProText-Ultralight',
  thin: 'SFProText-Thin',
  light: 'SFProText-Light',
  regular: 'SFProText-Regular',
  medium: 'SFProText-Medium',
  semibold: 'SFProText-Semibold',
  bold: 'SFProText-Bold',
  heavy: 'SFProText-Heavy',
  black: 'SFProText-Black',
  displayRegular: 'SFProDisplay-Regular',
  displayMedium: 'SFProDisplay-Medium',
  displaySemibold: 'SFProDisplay-Semibold',
  displayBold: 'SFProDisplay-Bold',
  displayHeavy: 'SFProDisplay-Heavy',
  displayBlack: 'SFProDisplay-Black',
} as const;

type FontWeight = NonNullable<TextStyle['fontWeight']>;

export const familyForWeight = (weight: FontWeight, display = false): string => {
  const w = String(weight);
  if (display) {
    if (w === '100' || w === '200' || w === '300' || w === 'normal' || w === '400') {
      return fontFamily.displayRegular;
    }
    if (w === '500') return fontFamily.displayMedium;
    if (w === '600') return fontFamily.displaySemibold;
    if (w === '700' || w === 'bold') return fontFamily.displayBold;
    if (w === '800') return fontFamily.displayHeavy;
    if (w === '900') return fontFamily.displayBlack;
    return fontFamily.displayRegular;
  }
  if (w === '100') return fontFamily.ultralight;
  if (w === '200') return fontFamily.thin;
  if (w === '300') return fontFamily.light;
  if (w === 'normal' || w === '400') return fontFamily.regular;
  if (w === '500') return fontFamily.medium;
  if (w === '600') return fontFamily.semibold;
  if (w === '700' || w === 'bold') return fontFamily.bold;
  if (w === '800') return fontFamily.heavy;
  if (w === '900') return fontFamily.black;
  return fontFamily.regular;
};

export const typography = {
  largeTitle: { fontFamily: fontFamily.displayBold, fontSize: 34, lineHeight: 41 },
  title1: { fontFamily: fontFamily.displayBold, fontSize: 28, lineHeight: 34 },
  title2: { fontFamily: fontFamily.displaySemibold, fontSize: 22, lineHeight: 28 },
  title3: { fontFamily: fontFamily.displaySemibold, fontSize: 20, lineHeight: 25 },
  headline: { fontFamily: fontFamily.semibold, fontSize: 17, lineHeight: 22 },
  body: { fontFamily: fontFamily.regular, fontSize: 17, lineHeight: 22 },
  callout: { fontFamily: fontFamily.regular, fontSize: 16, lineHeight: 21 },
  subhead: { fontFamily: fontFamily.regular, fontSize: 15, lineHeight: 20 },
  footnote: { fontFamily: fontFamily.regular, fontSize: 13, lineHeight: 18 },
  caption1: { fontFamily: fontFamily.regular, fontSize: 12, lineHeight: 16 },
  caption2: { fontFamily: fontFamily.regular, fontSize: 11, lineHeight: 13 },
} as const;
