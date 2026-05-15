import { router, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/theme/colors';

const PLATFORM_COUNT = 6;
const SCAN_DURATION_MS = 2500;

export default function Scanning() {
  const { handle } = useLocalSearchParams<{ handle?: string }>();
  const displayHandle = handle?.trim() || 'Futuristic';

  useEffect(() => {
    const t = setTimeout(() => {
      router.replace({ pathname: '/onboarding/insights', params: { handle: displayHandle } });
    }, SCAN_DURATION_MS);
    return () => clearTimeout(t);
  }, [displayHandle]);

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <View style={styles.center}>
        <Text style={styles.wordmark}>MORPHEUS</Text>
        <Text style={styles.status}>
          Scanning {displayHandle} across {PLATFORM_COUNT} platforms...
        </Text>
        <ActivityIndicator size="small" color={colors.text.muted} style={styles.spinner} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16 },
  wordmark: {
    fontSize: 20,
    letterSpacing: 6,
    fontWeight: '300',
    color: colors.text.muted,
  },
  status: {
    fontSize: 15,
    fontWeight: '400',
    color: colors.text.secondary,
  },
  spinner: { marginTop: 8 },
});
