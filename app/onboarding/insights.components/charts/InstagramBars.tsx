import { StyleSheet, View } from 'react-native';

import { InsightStatBlock } from '../InsightStatBlock';

export function InstagramBars() {
  return (
    <View style={styles.row}>
      <InsightStatBlock
        stat={{ platform: 'spotify', value: '+11,683', bars: 6 }}
        tone="gain"
      />
      <InsightStatBlock
        stat={{ platform: 'instagram', value: '−9,415', bars: 2 }}
        tone="loss"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    gap: 16,
  },
});
