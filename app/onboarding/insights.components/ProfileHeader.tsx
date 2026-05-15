import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "@/theme/colors";

interface Props {
  currentIndex: number;
  total: number;
}

export function ProfileHeader({ currentIndex, total }: Props) {
  const pageLabel = `2/5`;

  return (
    <View style={styles.row}>
      <Pressable
        onPress={() => router.back()}
        hitSlop={12}
        style={styles.backBtn}
      >
        <FontAwesome6
          name="arrow-left"
          size={18}
          color={colors.text.muted}
          iconStyle="solid"
        />
      </Pressable>
      <Text style={styles.wordmark}>MORPHEUS</Text>
      <Text style={styles.page}>{pageLabel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  backBtn: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  wordmark: {
    color: colors.text.muted,
    fontSize: 14,
    letterSpacing: 3,
    fontWeight: "300",
  },
  page: {
    color: colors.text.secondary,
    fontSize: 13,
    fontWeight: "500",
    width: 50,
    textAlign: "right",
  },
});
