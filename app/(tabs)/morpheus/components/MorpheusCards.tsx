import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";

type Metric = {
  label: string;
  value: string;
  change: string;
  positive?: boolean;
};

type AgentTask = {
  icon: "megaphone" | "edit-3" | "dollar-sign";
  body: string;
  meta: string;
};

type Track = {
  rank: string;
  title: string;
  platforms: string;
  streams: string;
  progress: number;
  colors: readonly [string, string, ...string[]];
};

type PlatformMetric = {
  icon: "spotify" | "youtube" | "tiktok" | "soundcloud";
  value: string;
  growth: string;
};

export const summaryMetrics: Metric[] = [
  { label: "ROYALTIES", value: "$2,840", change: "↑ 18% this week", positive: true },
  { label: "NEW FANS", value: "1,204", change: "↑ 42% this week", positive: true },
  { label: "SAVES", value: "8,420", change: "↑ 12% this week", positive: true },
  { label: "SHARES", value: "340", change: "↓ 5% this week" },
];

export const agentTasks: AgentTask[] = [
  {
    icon: "megaphone",
    body: 'Pitching "Slow Drift" to 7 lo-fi editors on Spotify.',
    meta: "STARTED 2H AGO · ETA TONIGHT",
  },
  {
    icon: "edit-3",
    body: "Posted Reel #14. Engagement 3.2x higher than baseline.",
    meta: "2 MIN AGO · TIKTOK + IG",
  },
  {
    icon: "dollar-sign",
    body: "Collecting royalties from 4 platforms. $840 incoming.",
    meta: "AUTO · 6H AGO",
  },
];

export const topTracks: Track[] = [
  {
    rank: "1",
    title: "Slow Drift",
    platforms: "Spotify · YouTube · TikTok",
    streams: "142K",
    progress: 1,
    colors: ["#d9f99d", "#0f172a"],
  },
  {
    rank: "2",
    title: "Hours",
    platforms: "Spotify · Apple Music",
    streams: "68K",
    progress: 0.48,
    colors: ["#ef4444", "#111827"],
  },
  {
    rank: "3",
    title: "Lull (demo)",
    platforms: "SoundCloud · TikTok",
    streams: "52K",
    progress: 0.36,
    colors: ["#c084fc", "#1e1b4b"],
  },
  {
    rank: "4",
    title: "Tide",
    platforms: "YouTube · Apple Music",
    streams: "22K",
    progress: 0.16,
    colors: ["#f472b6", "#111827"],
  },
  {
    rank: "5",
    title: "Concrete Jungle",
    platforms: "YouTube · Apple Music",
    streams: "10K",
    progress: 0.08,
    colors: ["#38bdf8", "#0f172a"],
  },
];

export const platformMetrics: PlatformMetric[] = [
  { icon: "spotify", value: "142K", growth: "28%" },
  { icon: "youtube", value: "68K", growth: "42%" },
  { icon: "tiktok", value: "52K", growth: "68%" },
  { icon: "soundcloud", value: "22K", growth: "12%" },
];

export function MorpheusTabs() {
  return (
    <View style={styles.segmented}>
      {["Overview", "Agents", "Activity"].map((item, index) => (
        <View key={item} style={[styles.segment, index === 0 && styles.segmentActive]}>
          <Text style={[styles.segmentText, index === 0 && styles.segmentTextActive]}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

export function StreamsCard() {
  return (
    <View style={styles.streamCard}>
      <View style={styles.greenGlow} />
      <Text style={styles.cardLabel}>TOTAL STREAMS · ALL PLATFORMS</Text>
      <View style={styles.streamValueRow}>
        <Text style={styles.streamValue}>284K</Text>
        <Text style={styles.positiveText}>↑ 31%</Text>
      </View>
      <Text style={styles.mutedText}>+67.4K vs last week · WoW growth</Text>
      <View style={styles.sparkline}>
        {[18, 20, 23, 26, 25, 31, 28, 34, 36, 39, 40, 43, 41, 45, 49].map((height, index) => (
          <View key={index} style={[styles.sparkBar, { height }]} />
        ))}
      </View>
    </View>
  );
}

export function MetricCard({ metric }: { metric: Metric }) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricLabel}>{metric.label}</Text>
      <Text style={styles.metricValue}>{metric.value}</Text>
      <Text style={[styles.metricChange, metric.positive && styles.positiveText]}>{metric.change}</Text>
    </View>
  );
}

export function AgentTaskCard({ task }: { task: AgentTask }) {
  return (
    <View style={styles.taskCard}>
      <View style={styles.taskIcon}>
        {task.icon === "megaphone" ? (
          <FontAwesome6 name="bullhorn" size={16} color="#fff" iconStyle="solid" />
        ) : task.icon === "dollar-sign" ? (
          <Feather name="dollar-sign" size={18} color="#fff" />
        ) : (
          <Feather name={task.icon} size={18} color="#fff" />
        )}
      </View>
      <View style={styles.taskText}>
        <Text style={styles.taskBody}>{task.body}</Text>
        <Text style={styles.taskMeta}>{task.meta}</Text>
      </View>
    </View>
  );
}

export function TrackRow({ track }: { track: Track }) {
  return (
    <View style={styles.trackRow}>
      <Text style={styles.trackRank}>{track.rank}</Text>
      <LinearGradient colors={track.colors} style={styles.trackArt} />
      <View style={styles.trackInfo}>
        <Text style={styles.trackTitle}>{track.title}</Text>
        <Text style={styles.trackPlatforms}>{track.platforms}</Text>
      </View>
      <View style={styles.trackRight}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${Math.round(track.progress * 100)}%` }]} />
        </View>
        <Text style={styles.trackStreams}>{track.streams}</Text>
      </View>
    </View>
  );
}

export function PlatformCard({ platform }: { platform: PlatformMetric }) {
  return (
    <View style={styles.platformCard}>
      <View style={[styles.platformIcon, platform.icon === "spotify" && styles.spotify, platform.icon === "youtube" && styles.youtube, platform.icon === "tiktok" && styles.tiktok, platform.icon === "soundcloud" && styles.soundcloud]}>
        <PlatformIcon type={platform.icon} />
      </View>
      <Text style={styles.platformValue}>{platform.value}</Text>
      <Text style={styles.platformGrowth}>{platform.growth}</Text>
    </View>
  );
}

function PlatformIcon({ type }: { type: PlatformMetric["icon"] }) {
  if (type === "spotify") {
    return <FontAwesome6 name="spotify" size={18} color="#fff" iconStyle="brand" />;
  }
  if (type === "youtube") {
    return <FontAwesome6 name="youtube" size={18} color="#fff" iconStyle="brand" />;
  }
  if (type === "tiktok") {
    return <FontAwesome6 name="tiktok" size={18} color="#fff" iconStyle="brand" />;
  }
  return <FontAwesome6 name="soundcloud" size={18} color="#fff" iconStyle="brand" />;
}

export function SuggestionCard() {
  return (
    <View style={styles.suggestionCard}>
      <Text style={styles.quoteMark}>“</Text>
      <Text style={styles.recommended}>RECOMMENDED ACTION</Text>
      <Text style={styles.suggestionCopy}>
        <Text style={styles.suggestionStrong}>TikTok</Text> is heating up. You should post 3 reels in the
        next 48 hours with a hook in the first 0-3 seconds. Expected reach{" "}
        <Text style={styles.suggestionStrong}>+210%</Text>.
      </Text>
      <View style={styles.suggestionActions}>
        <View style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>LET MORPHEUS DO IT</Text>
        </View>
        <View style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>LATER</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  segmented: {
    marginHorizontal: 16,
    marginBottom: 24,
    height: 44,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.04)",
    backgroundColor: "rgba(255,255,255,0.08)",
    padding: 4,
    flexDirection: "row",
    gap: 4,
  },
  segment: { flex: 1, borderRadius: 999, alignItems: "center", justifyContent: "center" },
  segmentActive: { backgroundColor: "rgba(255,255,255,0.08)" },
  segmentText: { color: "rgba(255,255,255,0.56)", fontSize: 13, lineHeight: 16 },
  segmentTextActive: { color: "#fff" },
  streamCard: {
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.64)",
    backgroundColor: "rgba(255,255,255,0.04)",
    padding: 16,
    overflow: "hidden",
    gap: 8,
  },
  greenGlow: {
    position: "absolute",
    width: 184,
    height: 255,
    borderRadius: 156,
    right: -41,
    top: -103,
    backgroundColor: "rgba(154,255,91,0.16)",
  },
  cardLabel: { color: "#fff", fontSize: 12, lineHeight: 16, fontWeight: "300" },
  streamValueRow: { flexDirection: "row", alignItems: "baseline", gap: 8 },
  streamValue: { color: "#fff", fontSize: 32, lineHeight: 36, fontWeight: "800", letterSpacing: 0.64 },
  positiveText: { color: "#9aff5b" },
  mutedText: { color: "rgba(255,255,255,0.56)", fontSize: 12, lineHeight: 16 },
  sparkline: { height: 68, flexDirection: "row", alignItems: "flex-end", gap: 4, paddingTop: 8 },
  sparkBar: { flex: 1, borderTopWidth: 1, borderColor: "#fff", backgroundColor: "rgba(255,255,255,0.08)" },
  metricCard: {
    width: "47.7%",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
    backgroundColor: "rgba(255,255,255,0.04)",
    padding: 17,
    gap: 8,
  },
  metricLabel: { color: "#9a9a9e", fontSize: 12, lineHeight: 16 },
  metricValue: { color: "#fff", fontSize: 20, lineHeight: 24, fontWeight: "800", letterSpacing: 0.4 },
  metricChange: { color: "rgba(255,255,255,0.64)", fontSize: 13, lineHeight: 16 },
  taskCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
    backgroundColor: "rgba(255,255,255,0.04)",
    padding: 16,
    flexDirection: "row",
    gap: 12,
    overflow: "hidden",
  },
  taskIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: { flex: 1, gap: 8 },
  taskBody: { color: "#fff", fontSize: 14, lineHeight: 20 },
  taskMeta: { color: "rgba(255,255,255,0.48)", fontSize: 12, lineHeight: 16, textAlign: "right" },
  trackRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  trackRank: { color: "#9aff5b", width: 12, fontSize: 13, lineHeight: 16 },
  trackArt: { width: 40, height: 40, borderRadius: 8 },
  trackInfo: { flex: 1 },
  trackTitle: { color: "#fff", fontSize: 14, lineHeight: 20 },
  trackPlatforms: { color: "rgba(255,255,255,0.64)", fontSize: 12, lineHeight: 16 },
  trackRight: { width: 78, flexDirection: "row", alignItems: "center", gap: 10, justifyContent: "flex-end" },
  progressTrack: { width: 44, height: 3, borderRadius: 2, backgroundColor: "rgba(255,255,255,0.18)", overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: 2, backgroundColor: "#fff" },
  trackStreams: { color: "#fff", fontSize: 12, lineHeight: 16, minWidth: 24, textAlign: "right" },
  platformCard: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: "rgba(255,255,255,0.04)",
    alignItems: "center",
    paddingVertical: 13,
    gap: 8,
  },
  platformIcon: { width: 32, height: 32, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  spotify: { backgroundColor: "#1DB954" },
  youtube: { backgroundColor: "#ff0000" },
  tiktok: { backgroundColor: "#020617" },
  soundcloud: { backgroundColor: "#ff5500" },
  platformValue: { color: "#fff", fontSize: 16, lineHeight: 20, fontWeight: "800" },
  platformGrowth: { color: "#9aff5b", fontSize: 12, lineHeight: 16 },
  suggestionCard: {
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.64)",
    backgroundColor: "rgba(255,255,255,0.04)",
    padding: 20,
    gap: 12,
    overflow: "hidden",
  },
  quoteMark: { color: "#ffc01f", fontSize: 22, lineHeight: 20 },
  recommended: { color: "#ffc01f", fontSize: 14, lineHeight: 20, fontWeight: "900" },
  suggestionCopy: { color: "rgba(255,255,255,0.72)", fontSize: 14, lineHeight: 20 },
  suggestionStrong: { color: "#fff", fontWeight: "700" },
  suggestionActions: { flexDirection: "row", gap: 12 },
  primaryButton: { flex: 1, height: 40, borderRadius: 999, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" },
  primaryButtonText: { color: "#171a1f", fontSize: 12, fontWeight: "800" },
  secondaryButton: {
    height: 40,
    paddingHorizontal: 18,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: { color: "#fff", fontSize: 12, fontWeight: "800" },
});
