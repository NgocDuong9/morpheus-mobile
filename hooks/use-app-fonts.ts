import { useFonts } from 'expo-font';

export function useAppFonts() {
  const [loaded, error] = useFonts({
    'SFProText-Ultralight': require('@/assets/fonts/SF-Pro-Text-Ultralight.otf'),
    'SFProText-Thin': require('@/assets/fonts/SF-Pro-Text-Thin.otf'),
    'SFProText-Light': require('@/assets/fonts/SF-Pro-Text-Light.otf'),
    'SFProText-Regular': require('@/assets/fonts/SF-Pro-Text-Regular.otf'),
    'SFProText-Medium': require('@/assets/fonts/SF-Pro-Text-Medium.otf'),
    'SFProText-Semibold': require('@/assets/fonts/SF-Pro-Text-Semibold.otf'),
    'SFProText-Bold': require('@/assets/fonts/SF-Pro-Text-Bold.otf'),
    'SFProText-Heavy': require('@/assets/fonts/SF-Pro-Text-Heavy.otf'),
    'SFProText-Black': require('@/assets/fonts/SF-Pro-Text-Black.otf'),
    'SFProDisplay-Regular': require('@/assets/fonts/SF-Pro-Display-Regular.otf'),
    'SFProDisplay-Medium': require('@/assets/fonts/SF-Pro-Display-Medium.otf'),
    'SFProDisplay-Semibold': require('@/assets/fonts/SF-Pro-Display-Semibold.otf'),
    'SFProDisplay-Bold': require('@/assets/fonts/SF-Pro-Display-Bold.otf'),
    'SFProDisplay-Heavy': require('@/assets/fonts/SF-Pro-Display-Heavy.otf'),
    'SFProDisplay-Black': require('@/assets/fonts/SF-Pro-Display-Black.otf'),
  });
  return { loaded, error };
}
