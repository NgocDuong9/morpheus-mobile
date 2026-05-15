import { StyleSheet, Text, View } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';

const ACCENT = '#FBBC05';
const MUTED = 'rgba(255, 255, 255, 0.5)';

export function TikTokPulse() {
  return (
    <View style={styles.wrap}>
      <View style={styles.headRow}>
        <Text style={styles.year}>2022</Text>
        <Text style={styles.year}>2024</Text>
        <Text style={styles.flatlined}>flatlined</Text>
      </View>

      <Svg width="100%" height={72} viewBox="0 0 300 72">
        <Polyline
          points="0,46 60,46 75,18 90,58 100,30 115,52 130,46 300,46"
          stroke={ACCENT}
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>

      <View style={styles.footRow}>
        <Text style={styles.footText}>Peak engagement</Text>
        <Text style={styles.footText}>Last 90 days: 0% change</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    gap: 12,
  },
  headRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  year: {
    fontSize: 12,
    color: MUTED,
  },
  flatlined: {
    marginLeft: 'auto',
    fontSize: 13,
    color: ACCENT,
  },
  footRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footText: {
    fontSize: 12,
    color: MUTED,
  },
});
