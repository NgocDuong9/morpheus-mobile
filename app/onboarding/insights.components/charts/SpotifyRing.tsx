import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const RADIUS = 48;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const FILLED = CIRCUMFERENCE * 0.897;
const ACCENT = '#9AFF5B';
const TRACK = 'rgba(255, 255, 255, 0.08)';

export function SpotifyRing() {
  return (
    <View style={styles.row}>
      <View style={styles.ring}>
        <Svg width={120} height={120} viewBox="0 0 120 120">
          <Circle cx={60} cy={60} r={RADIUS} stroke={TRACK} strokeWidth={8} fill="none" />
          <Circle
            cx={60}
            cy={60}
            r={RADIUS}
            stroke={ACCENT}
            strokeWidth={8}
            fill="none"
            strokeDasharray={`${FILLED} ${CIRCUMFERENCE}`}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
          />
        </Svg>
        <View style={styles.ringCenter}>
          <Text style={styles.ringValue}>89.7</Text>
          <Text style={styles.ringUnit}>%</Text>
        </View>
      </View>

      <View style={styles.stats}>
        <View>
          <Text style={styles.statValue}>582K</Text>
          <Text style={styles.statLabel}>Monthly listeners</Text>
        </View>
        <View>
          <Text style={styles.statValue}>522K</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <Text style={styles.cta}>Nearly all listeners → Follow</Text>
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
  ring: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 120,
  },
  ringCenter: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  ringValue: {
    fontSize: 22,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
  ringUnit: {
    marginLeft: 2,
    fontSize: 14,
    lineHeight: 18,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  stats: {
    flex: 1,
    gap: 8,
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
  cta: {
    marginTop: 2,
    fontSize: 13,
    lineHeight: 16,
    color: ACCENT,
  },
});
