import { router } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { FadeOut } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MorpheusIcon } from '@/components/LogoMorpheus';
import { colors } from '@/theme/colors';

const HOLD_MS = 2200;

export default function OnboardingLogo() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('/onboarding');
    }, HOLD_MS);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <Animated.View exiting={FadeOut.duration(360)} style={styles.center}>
        <MorpheusIcon loop={false} width={255} height={27} />
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
