# SF Pro fonts

SF Pro is Apple proprietary. Download the official package from
https://developer.apple.com/fonts/ (you need both "SF Pro" archives — Text and Display),
extract the `.otf` files, and rename to match the exact filenames below.

Place them in this folder (`assets/fonts/`). The loader in
`hooks/use-app-fonts.ts` references these names — if any file is missing the
Metro bundler will fail.

## Required files

SF Pro Text:
- SF-Pro-Text-Ultralight.otf
- SF-Pro-Text-Thin.otf
- SF-Pro-Text-Light.otf
- SF-Pro-Text-Regular.otf
- SF-Pro-Text-Medium.otf
- SF-Pro-Text-Semibold.otf
- SF-Pro-Text-Bold.otf
- SF-Pro-Text-Heavy.otf
- SF-Pro-Text-Black.otf

SF Pro Display:
- SF-Pro-Display-Regular.otf
- SF-Pro-Display-Medium.otf
- SF-Pro-Display-Semibold.otf
- SF-Pro-Display-Bold.otf
- SF-Pro-Display-Heavy.otf
- SF-Pro-Display-Black.otf

## Usage

Import the family names from `theme/typography.ts`:

```ts
import { fontFamily, typography } from '@/theme/typography';

const styles = StyleSheet.create({
  title: { ...typography.title1, color: '#fff' },
  label: { fontFamily: fontFamily.semibold, fontSize: 14 },
});
```

Do not set `fontWeight` together with `fontFamily` — pick the family that already
encodes the weight (e.g. `fontFamily.bold` instead of `fontFamily.regular` + `fontWeight: '700'`).
