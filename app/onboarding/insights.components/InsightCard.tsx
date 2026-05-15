import { FontAwesome6 } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { PlatformIconBadge } from "@/components/platform-icon-badge";

import { type Insight, KIND_META, PLATFORM_META } from "./data";

interface Props {
  insight: Insight;
  width: number;
}

export function InsightCard({ insight, width }: Props) {
  const platform = PLATFORM_META[insight.platform];
  const kind = KIND_META[insight.kind];
  const Chart = insight.Chart;

  return (
    <View style={[styles.card, { width }]}>
      {/* <View style={styles.glow} pointerEvents="none" /> */}

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <PlatformIconBadge
            color={platform.color}
            icon={platform.icon}
            size={40}
            iconSize={28}
          />
          <View style={styles.headerLabels}>
            <Text style={styles.platformLabel}>{platform.label}</Text>
            <Text style={[styles.kindLabel, { color: kind.color }]}>
              {kind.label}
            </Text>
          </View>
        </View>
        <Text style={styles.value}>{insight.value}</Text>
      </View>

      {Chart ? (
        <View style={styles.chartArea}>
          <Chart />
        </View>
      ) : null}

      {insight.subtitle ? (
        <Text style={styles.subtitle}>{insight.subtitle}</Text>
      ) : null}

      {insight.infoTitle ? (
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <FontAwesome6
              name="bolt"
              size={14}
              color="#fff"
              iconStyle="solid"
            />
            <Text style={styles.infoTitle}>{insight.infoTitle}</Text>
          </View>
          {insight.infoBody ? (
            <Text style={styles.infoBody}>{insight.infoBody}</Text>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    alignItems: "center",
    padding: 16,
    height: 420,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.16)",
    backgroundColor: "#353536",
    gap: 20,
  },
  glow: {
    position: "absolute",
    right: -51,
    top: -102,
    width: 184,
    height: 255,
    borderRadius: 156,
    backgroundColor: "rgba(120, 120, 140, 0.3)",
    opacity: 0.6,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
    height: 40,
    gap: 8,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerLabels: {
    justifyContent: "center",
    gap: 2,
  },
  platformLabel: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
    color: "#fff",
  },
  kindLabel: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "300",
  },
  value: {
    fontSize: 24,
    lineHeight: 28,
    fontWeight: "500",
    color: "#fff",
  },
  chartArea: {
    flex: 1,
    alignSelf: "stretch",
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 20,
    color: "rgba(255, 255, 255, 0.64)",
    textAlign: "center",
  },
  infoCard: {
    alignSelf: "stretch",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.04)",
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    gap: 12,
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  infoTitle: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
    color: "#fff",
  },
  infoBody: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "300",
    color: "rgba(255, 255, 255, 0.72)",
  },
});
