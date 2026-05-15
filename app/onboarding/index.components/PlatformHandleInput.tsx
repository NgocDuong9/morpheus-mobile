import { StyleSheet, TextInput, View } from 'react-native';

import { PlatformIconBadge } from '@/components/platform-icon-badge';

import type { Platform } from './platforms';

interface PlatformHandleInputProps {
  platform: Platform;
  value: string;
  onChangeText: (value: string) => void;
}

export function PlatformHandleInput({ platform, value, onChangeText }: PlatformHandleInputProps) {
  const hasValue = value.trim().length > 0;

  return (
    <View style={styles.row}>
      <PlatformIconBadge color={platform.color} icon={platform.icon} size={36} iconSize={16} />
      <TextInput
        placeholder={`Your ${platform.label} handle`}
        placeholderTextColor="#6b7280"
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, hasValue && styles.inputConnected]}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 14,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    fontSize: 15,
    color: '#fff',
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  inputConnected: { borderColor: 'rgba(255,255,255,0.6)' },
});
