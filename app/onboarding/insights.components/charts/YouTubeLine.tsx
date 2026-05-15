import { StyleSheet, Text, View } from 'react-native';
import Svg, { Defs, Line, LinearGradient, Polygon, Polyline, Stop } from 'react-native-svg';

const ACCENT = '#FF3B1F';
const MUTED = 'rgba(255, 255, 255, 0.4)';
const GRID = 'rgba(255, 255, 255, 0.12)';

const Y_LEVELS = [
  { label: '3M', y: 0 },
  { label: '2M', y: 33.3 },
  { label: '1M', y: 66.7 },
  { label: '500k', y: 83.3 },
  { label: '0', y: 100 },
];

const LINE = '0,12 60,14 120,10 180,15 220,14 260,30 290,62';
const AREA = `${LINE} 290,100 0,100`;

export function YouTubeLine() {
  return (
    <View style={styles.wrap}>
      <View style={styles.chart}>
        <View style={styles.yAxis}>
          {Y_LEVELS.map(({ label, y }) => (
            <Text key={label} style={[styles.yLabel, { top: `${y}%` }]}>
              {label}
            </Text>
          ))}
        </View>

        <View style={styles.plot}>
          <Svg width="100%" height="100%" viewBox="0 0 290 100" preserveAspectRatio="none">
            <Defs>
              <LinearGradient id="ytArea" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor={ACCENT} stopOpacity="0.4" />
                <Stop offset="1" stopColor={ACCENT} stopOpacity="0" />
              </LinearGradient>
            </Defs>

            {Y_LEVELS.map(({ y }) => (
              <Line
                key={y}
                x1={0}
                x2={290}
                y1={y}
                y2={y}
                stroke={GRID}
                strokeWidth={0.5}
                strokeDasharray="3 3"
              />
            ))}

            <Polygon points={AREA} fill="url(#ytArea)" />
            <Polyline
              points={LINE}
              stroke={ACCENT}
              strokeWidth={1.5}
              fill="none"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </Svg>
        </View>
      </View>

      <Text style={styles.foot}>90 days ago</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    gap: 8,
  },
  chart: {
    flex: 1,
    flexDirection: 'row',
  },
  yAxis: {
    position: 'relative',
    width: 36,
    height: '100%',
  },
  yLabel: {
    position: 'absolute',
    left: 0,
    fontSize: 10,
    color: MUTED,
    transform: [{ translateY: -7 }],
  },
  plot: {
    flex: 1,
    height: '100%',
  },
  foot: {
    fontSize: 12,
    color: MUTED,
    textAlign: 'center',
  },
});
