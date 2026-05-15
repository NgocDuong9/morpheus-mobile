import { FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

import type { PlatformGradient } from '@/theme/gradients';

interface Props {
  color: string | PlatformGradient;
  icon: React.ComponentProps<typeof FontAwesome6>['name'];
  size: number;
  iconSize: number;
}

export function PlatformIconBadge({ color, icon, size, iconSize }: Props) {
  const circleStyle = { width: size, height: size, borderRadius: size / 2 };
  const glyph = (
    <FontAwesome6 name={icon} size={iconSize} color="#fff" iconStyle="brand" />
  );

  if (typeof color === 'string') {
    return (
      <View style={[styles.circle, circleStyle, { backgroundColor: color }]}>
        {glyph}
      </View>
    );
  }

  return (
    <LinearGradient
      colors={color.colors}
      locations={color.locations}
      start={color.start}
      end={color.end}
      style={[styles.circle, circleStyle]}
    >
      {glyph}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
