import { StyleSheet, View } from "react-native";

import { DashboardShell, DashboardTopHeader, SectionHeader } from "@/components/dashboard/DashboardShell";

import {
  AgentTaskCard,
  agentTasks,
  MetricCard,
  MorpheusTabs,
  platformMetrics,
  PlatformCard,
  StreamsCard,
  SuggestionCard,
  summaryMetrics,
  topTracks,
  TrackRow,
} from "./MorpheusCards";

export function MorpheusDashboard() {
  return (
    <DashboardShell activeTab="morpheus">
      <DashboardTopHeader
        kicker="Live data · synced now"
        title="Audience is awake."
        titleWidth={270}
      />
      <MorpheusTabs />

      <View style={styles.mainStack}>
        <StreamsCard />
        <View style={styles.metricGrid}>
          {summaryMetrics.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </View>
      </View>

      <SectionHeader title="Morpheus is Doing" action="3 active" />
      <View style={styles.listStack}>
        {agentTasks.map((task) => (
          <AgentTaskCard key={task.body} task={task} />
        ))}
      </View>

      <SectionHeader title="Top Tracks · This Week" action="All" />
      <View style={styles.listStack}>
        {topTracks.map((track) => (
          <TrackRow key={track.rank} track={track} />
        ))}
      </View>

      <SectionHeader title="By Platform" action="All" />
      <View style={styles.platformGrid}>
        {platformMetrics.map((platform) => (
          <PlatformCard key={platform.icon} platform={platform} />
        ))}
      </View>

      <SectionHeader title="Morpheus Suggests" action="All" />
      <SuggestionCard />
    </DashboardShell>
  );
}

const styles = StyleSheet.create({
  mainStack: { gap: 16 },
  metricGrid: {
    paddingHorizontal: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  listStack: { paddingHorizontal: 16, gap: 12 },
  platformGrid: { paddingHorizontal: 16, flexDirection: "row", gap: 8 },
});
