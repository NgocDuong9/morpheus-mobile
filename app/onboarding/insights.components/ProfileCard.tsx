import { FontAwesome6 } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/theme/colors";

interface Props {
  handle: string;
  audience: string;
  genre: string;
  rank: string;
  rankDelta: string;
  status: string;
}

export function ProfileCard({
  handle,
  audience,
  genre,
  rank,
  rankDelta,
  status,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.badgesRow}>
        <View style={[styles.badge, styles.badgeRank]}>
          <Text style={styles.badgeRankText}>{rankDelta} rank </Text>
          <FontAwesome6
            name="arrow-up"
            size={10}
            color="#22c55e"
            iconStyle="solid"
          />
        </View>
        <View style={[styles.badge, styles.badgeStatus]}>
          <Text style={styles.badgeStatusText}>{status}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.avatar} />
        <View style={styles.info}>
          <Text style={styles.name}>{handle}</Text>
          <Text style={styles.meta}>
            {genre} · #{rank}
          </Text>
        </View>
        <View style={styles.audience}>
          <Text style={styles.audienceValue}>{audience}</Text>
          <Text style={styles.audienceLabel}>Audience</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface.card,
    borderWidth: 1,
    borderColor: colors.surface.border,
    borderRadius: 20,
    padding: 16,
    gap: 12,
  },
  badgesRow: { flexDirection: "row", gap: 8 },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeRank: { backgroundColor: "rgba(34,197,94,0.15)" },
  badgeRankText: { color: "#22c55e", fontSize: 12, fontWeight: "600" },
  badgeStatus: { backgroundColor: "rgba(245,158,11,0.15)" },
  badgeStatusText: { color: "#f59e0b", fontSize: 12, fontWeight: "600" },
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: "#374151",
  },
  info: { flex: 1 },
  name: { color: colors.text.primary, fontSize: 18, fontWeight: "700" },
  meta: { color: colors.text.secondary, fontSize: 12, marginTop: 2 },
  audience: { alignItems: "flex-end" },
  audienceValue: { color: "#22c55e", fontSize: 20, fontWeight: "700" },
  audienceLabel: { color: colors.text.secondary, fontSize: 11 },
});
