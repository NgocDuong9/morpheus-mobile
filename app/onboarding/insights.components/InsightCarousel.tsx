import { FlatList, type NativeScrollEvent, type NativeSyntheticEvent, StyleSheet, View } from 'react-native';

import { type Insight } from './data';
import { InsightCard } from './InsightCard';

interface Props {
  insights: Insight[];
  cardWidth: number;
  gap: number;
  sidePadding: number;
  onIndexChange: (index: number) => void;
}

export function InsightCarousel({ insights, cardWidth, gap, sidePadding, onIndexChange }: Props) {
  const snap = cardWidth + gap;

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = e.nativeEvent.contentOffset.x;
    const index = Math.round(offset / snap);
    onIndexChange(Math.max(0, Math.min(index, insights.length - 1)));
  };

  return (
    <FlatList
      horizontal
      data={insights}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={{ width: cardWidth, marginRight: gap }}>
          <InsightCard insight={item} width={cardWidth} />
        </View>
      )}
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      snapToInterval={snap}
      snapToAlignment="start"
      contentContainerStyle={[styles.content, { paddingLeft: sidePadding, paddingRight: sidePadding }]}
      onMomentumScrollEnd={handleScroll}
      scrollEventThrottle={16}
    />
  );
}

const styles = StyleSheet.create({
  content: { paddingVertical: 8 },
});
