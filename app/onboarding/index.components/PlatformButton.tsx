import { Pressable, StyleSheet, Text, View } from 'react-native';

import { PlatformIconBadge } from '@/components/platform-icon-badge';

import type { Platform } from './platforms';

interface PlatformButtonProps {
  platform: Platform;
  isActive: boolean;
  isConnected: boolean;
  onPress: () => void;
}

export function PlatformButton({
  platform,
  isActive,
  isConnected,
  onPress,
}: PlatformButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.btn,
        isActive && styles.btnActive,
        isConnected && styles.btnConnected,
        pressed && styles.btnPressed,
      ]}
    >
      <PlatformIconBadge
        color={platform.color}
        icon={platform.icon}
        size={24}
        iconSize={12}
      />
      <Text style={styles.label}>{platform.label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexBasis: '47.5%',
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  btnPressed: { backgroundColor: 'rgba(255,255,255,0.08)' },
  btnActive: { borderColor: '#6366f1' },
  btnConnected: { borderColor: 'rgba(255,255,255,0.6)' },
  label: { fontSize: 15, fontWeight: '500', color: '#fff' },
});
