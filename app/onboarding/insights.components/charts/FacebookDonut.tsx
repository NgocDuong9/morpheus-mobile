import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const FILLED = CIRCUMFERENCE * 0.18;
const ACCENT = '#06B6D4';
const TRACK = 'rgba(255, 255, 255, 0.08)';

export function FacebookDonut() {
  return (
    <View style={styles.row}>
      <View style={styles.donut}>
        <Svg width={108} height={108} viewBox="0 0 108 108">
          <Circle cx={54} cy={54} r={RADIUS} stroke={TRACK} strokeWidth={8} fill="none" />
          <Circle
            cx={54}
            cy={54}
            r={RADIUS}
            stroke={ACCENT}
            strokeWidth={8}
            fill="none"
            strokeDasharray={`${FILLED} ${CIRCUMFERENCE}`}
            strokeLinecap="round"
            transform="rotate(-90 54 54)"
          />
        </Svg>
        <View style={styles.donutCenter}>
          <Text style={styles.donutValue}>1.3M</Text>
          <Text style={styles.donutLabel}>Followers</Text>
        </View>
      </View>

      <View style={styles.stats}>
        <View style={styles.statRow}>
          <View style={[styles.dot, { backgroundColor: 'rgba(255, 255, 255, 0.4)' }]} />
          <View>
            <Text style={styles.statValue}>1.3M</Text>
            <Text style={styles.statLabel}>Total followers</Text>
          </View>
        </View>
        <View style={styles.statRow}>
          <View style={[styles.dot, { backgroundColor: ACCENT }]} />
          <View>
            <Text style={styles.statValue}>252</Text>
            <Text style={styles.statLabel}>Engaged</Text>
          </View>
        </View>
        <View style={styles.engagement}>
          <Text style={[styles.statValue, { color: ACCENT, fontSize: 18 }]}>0.02%</Text>
          <Text style={[styles.statLabel, { color: ACCENT }]}>Engagement</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    gap: 12,
  },
  donut: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 108,
    height: 108,
  },
  donutCenter: {
    position: 'absolute',
    alignItems: 'center',
  },
  donutValue: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '600',
    color: '#fff',
  },
  donutLabel: {
    fontSize: 11,
    lineHeight: 14,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  stats: {
    flex: 1,
    gap: 8,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statValue: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '600',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    lineHeight: 16,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  engagement: {
    marginTop: 2,
  },
});
