import { StyleSheet, Text, View } from 'react-native';

import { PlatformIconBadge } from '@/components/platform-icon-badge';

import { type InsightStat, PLATFORM_META } from './data';

interface Props {
  stat: InsightStat;
  tone: 'gain' | 'loss';
}

const BAR_COUNT = 8;
const TONE_COLOR = {
  gain: '#9AFF5B',
  loss: '#FF3B1F',
} as const;
const BAR_OFF = 'rgba(255, 255, 255, 0.08)';

export function InsightStatBlock({ stat, tone }: Props) {
  const platform = PLATFORM_META[stat.platform];
  const fill = TONE_COLOR[tone];
  const arrow = tone === 'gain' ? '↑' : '↓';

  return (
    <View style={styles.block}>
      <View style={styles.heading}>
        <PlatformIconBadge color={platform.color} icon={platform.icon} size={24} iconSize={14} />
        <Text style={styles.label}>
          {platform.label} {arrow}
        </Text>
      </View>

      <View style={styles.bars}>
        {Array.from({ length: BAR_COUNT }).map((_, i) => (
          <View
            key={i}
            style={[styles.bar, { backgroundColor: i < stat.bars ? fill : BAR_OFF }]}
          />
        ))}
      </View>

      <Text style={[styles.value, { color: fill }]}>{stat.value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    height: 132,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    gap: 16,
  },
  heading: {
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 13,
    lineHeight: 16,
    color: '#fff',
  },
  bars: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    gap: 4,
  },
  bar: {
    flex: 1,
    height: 8,
    borderRadius: 2,
  },
  value: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    textAlign: 'center',
  },
});
