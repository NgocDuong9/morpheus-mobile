import { FontAwesome6 } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";

type ServiceFilter = {
  label: string;
  active?: boolean;
  icon: "target" | "shuffle" | "briefcase" | "palette" | "mic" | "megaphone";
};

type ServiceTile = {
  title: string;
  subtitle: string;
  colors: readonly [string, string, ...string[]];
};

type Talent = {
  name: string;
  role: string;
  price: string;
  meta: string;
  colors: readonly [string, string, ...string[]];
};

type Activity = {
  title: string;
  subtitle: string;
  colors: readonly [string, string, ...string[]];
};

export const serviceFilters: ServiceFilter[] = [
  { label: "All", icon: "target", active: true },
  { label: "Mixing", icon: "shuffle" },
  { label: "Production", icon: "briefcase" },
  { label: "Design", icon: "palette" },
  { label: "Vocals", icon: "mic" },
  { label: "Marketing", icon: "megaphone" },
];

export const serviceTiles: ServiceTile[] = [
  {
    title: "Mixing",
    subtitle: "142 engineers",
    colors: ["#f5f5f4", "#111111"],
  },
  {
    title: "Cover art",
    subtitle: "88 designers",
    colors: ["#fb3f2f", "#111111"],
  },
  {
    title: "Topline / vocal",
    subtitle: "64 vocalists",
    colors: ["#d9f99d", "#1f2937"],
  },
  {
    title: "Music Video",
    subtitle: "31 directors",
    colors: ["#fca5a5", "#1f1f1f"],
  },
];

export const topTalents: Talent[] = [
  {
    name: "Levitate",
    role: "Mixing engineer · Tokyo",
    price: "$340",
    meta: "4.9 · 142 sessions",
    colors: ["#f97316", "#111111"],
  },
  {
    name: "Studio Hira",
    role: "Cover art · Brand bible",
    price: "$220",
    meta: "5.0 · 124 sessions",
    colors: ["#dc2626", "#0f172a"],
  },
  {
    name: "Ciel",
    role: "Topline · Cameo · Vocal",
    price: "$480",
    meta: "5.0 · 88 sessions",
    colors: ["#c4b5fd", "#0f172a"],
  },
  {
    name: "Frame Co.",
    role: "Topline · Cameo · Vocal",
    price: "$1.2K",
    meta: "4.9 · 31 sessions",
    colors: ["#115e59", "#030712"],
  },
  {
    name: "Lina",
    role: "Mixing engineer · Tokyo",
    price: "$340",
    meta: "4.8 · 56 sessions",
    colors: ["#fca5a5", "#111827"],
  },
];

export const recentActivity: Activity[] = [
  {
    title: "Studio Hira viewed your profile",
    subtitle: "2h ago · Maybe interested in collab",
    colors: ["#06b6d4", "#0f172a"],
  },
  {
    title: "Ciel sent you a demo",
    subtitle: '5h ago · "for your next track"',
    colors: ["#fda4af", "#111827"],
  },
];

export function MorpheusMatchCard() {
  return (
    <View style={styles.matchCard}>
      <View style={styles.matchGlowLeft} />
      <View style={styles.matchGlowRight} />

      <View style={styles.matchHeader}>
        <Text style={styles.matchLabel}>MORPHEUS MATCH</Text>
        <View style={styles.fitRow}>
          <Text style={styles.fitScore}>96%</Text>
          <Text style={styles.fitText}>Collab fit</Text>
        </View>
      </View>

      <View style={styles.profileMatch}>
        <ArtistProfile
          name="You"
          role="Vocalist. Alt Hip-Hop"
          colors={["#f97316", "#171717"]}
        />
        <Text style={styles.multiply}>×</Text>
        <ArtistProfile
          name="RAVN"
          role="Producer · Lo-fi"
          colors={["#38bdf8", "#111827"]}
        />
      </View>

      <View style={styles.divider} />

      <Text style={styles.whyCopy}>
        <Text style={styles.whyStrong}>Why this match? </Text>
        You have just uploaded 3 beats that fit the vocal range of RAVN. She is
        looking for a producer for her EP in July.
      </Text>

      <View style={styles.matchActions}>
        <View style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>LISTEN FIRST</Text>
        </View>
        <View style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>START SESSION</Text>
        </View>
      </View>
    </View>
  );
}

function ArtistProfile({
  name,
  role,
  colors,
}: {
  name: string;
  role: string;
  colors: readonly [string, string, ...string[]];
}) {
  return (
    <View style={styles.artistProfile}>
      <LinearGradient colors={colors} style={styles.artistAvatar} />
      <Text style={styles.artistName}>{name}</Text>
      <Text style={styles.artistRole}>{role}</Text>
    </View>
  );
}

export function StoreFilterChip({ filter }: { filter: ServiceFilter }) {
  const color = filter.active ? "#fff" : "rgba(255,255,255,0.56)";

  return (
    <View style={[styles.filterChip, filter.active && styles.filterChipActive]}>
      <ServiceIcon icon={filter.icon} color={color} />
      <Text
        style={[styles.filterLabel, filter.active && styles.filterLabelActive]}
      >
        {filter.label}
      </Text>
    </View>
  );
}

function ServiceIcon({
  icon,
  color,
}: {
  icon: ServiceFilter["icon"];
  color: string;
}) {
  if (icon === "palette") {
    return (
      <FontAwesome6 name="palette" size={14} color={color} iconStyle="solid" />
    );
  }

  if (icon === "mic") {
    return (
      <FontAwesome6
        name="microphone-lines"
        size={14}
        color={color}
        iconStyle="solid"
      />
    );
  }

  if (icon === "megaphone") {
    return (
      <FontAwesome6 name="bullhorn" size={14} color={color} iconStyle="solid" />
    );
  }

  return <Feather name={icon} size={14} color={color} />;
}

export function FeaturedBookingCard() {
  return (
    <LinearGradient colors={["#1b1b1b", "#111111"]} style={styles.featuredCard}>
      <View style={styles.featuredTop}>
        <LinearGradient
          colors={["#ff7a18", "#0f172a"]}
          style={styles.featuredArt}
        />
        <View style={styles.featuredInfo}>
          <Text style={styles.featuredTag}>INSTANT AVAILABLE</Text>
          <Text style={styles.featuredTitle}>SoundLab Mike</Text>
          <Text style={styles.featuredSubtitle}>
            Mixing & Mastering · LA · 3d delivery
          </Text>
          <Text style={styles.featuredPrice}>$200-$600</Text>
        </View>
      </View>
      <View style={styles.bookButton}>
        <Text style={styles.bookButtonText}>BOOK NOW</Text>
      </View>
    </LinearGradient>
  );
}

export function ServiceTileCard({ service }: { service: ServiceTile }) {
  return (
    <LinearGradient colors={service.colors} style={styles.serviceTile}>
      <View style={styles.tileShade} />
      <Text style={styles.serviceTitle}>{service.title}</Text>
      <Text style={styles.serviceSubtitle}>{service.subtitle}</Text>
    </LinearGradient>
  );
}

export function TalentRow({ talent }: { talent: Talent }) {
  return (
    <View style={styles.talentRow}>
      <View style={styles.talentLeft}>
        <LinearGradient colors={talent.colors} style={styles.talentAvatar} />
        <View style={styles.talentInfo}>
          <Text style={styles.talentName}>{talent.name}</Text>
          <Text style={styles.talentRole}>{talent.role}</Text>
        </View>
      </View>
      <View style={styles.talentRight}>
        <Text style={styles.talentPrice}>{talent.price}</Text>
        <Text style={styles.talentMeta}>{talent.meta}</Text>
      </View>
    </View>
  );
}

export function BriefCard() {
  return (
    <View style={styles.briefCard}>
      <View style={styles.briefIcon}>
        <Feather name="plus" size={18} color="#fff" />
      </View>
      <View style={styles.briefCopy}>
        <Text style={styles.briefTitle}>Post a brief</Text>
        <Text style={styles.briefSubtitle}>
          Morpheus will match 5 artists in 1 hour
        </Text>
      </View>
      <View style={styles.briefButton}>
        <Text style={styles.briefButtonText}>BRIEF</Text>
      </View>
    </View>
  );
}

export function ActivityRow({ activity }: { activity: Activity }) {
  return (
    <View style={styles.activityRow}>
      <LinearGradient colors={activity.colors} style={styles.activityAvatar} />
      <View style={styles.activityCopy}>
        <Text style={styles.activityTitle}>{activity.title}</Text>
        <Text style={styles.activitySubtitle}>{activity.subtitle}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  matchCard: {
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.64)",
    backgroundColor: "rgba(255,255,255,0.04)",
    padding: 20,
    overflow: "hidden",
    gap: 16,
  },
  matchGlowLeft: {
    position: "absolute",
    left: -47,
    bottom: -48,
    width: 158,
    height: 225,
    borderRadius: 156,
    backgroundColor: "rgba(80,80,90,0.4)",
    filter: "blur(40px)",
  },
  matchGlowRight: {
    position: "absolute",
    right: -39,
    top: -93,
    width: 158,
    height: 225,
    borderRadius: 156,
    backgroundColor: "rgba(80,80,90,0.4)",
    filter: "blur(50px)",
  },
  matchHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  matchLabel: {
    color: "#fff",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "300",
  },
  fitRow: { flexDirection: "row", alignItems: "baseline", gap: 4 },
  fitScore: {
    color: "#9aff5b",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "700",
  },
  fitText: { color: "rgba(255,255,255,0.48)", fontSize: 14, lineHeight: 20 },
  profileMatch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  artistProfile: { alignItems: "center", width: 104 },
  artistAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  artistName: { color: "#efece4", fontSize: 14, lineHeight: 20, marginTop: 12 },
  artistRole: {
    color: "rgba(255,255,255,0.56)",
    fontSize: 12,
    lineHeight: 16,
    marginTop: 4,
    textAlign: "center",
  },
  multiply: { color: "#fff", fontSize: 18, fontWeight: "300" },
  divider: { height: 1, backgroundColor: "rgba(255,255,255,0.16)" },
  whyCopy: { color: "#fff", fontSize: 12, lineHeight: 18 },
  whyStrong: { fontWeight: "700" },
  matchActions: { flexDirection: "row", gap: 12 },
  secondaryButton: {
    flex: 1,
    height: 40,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: { color: "#fff", fontSize: 12, fontWeight: "800" },
  primaryButton: {
    flex: 1,
    height: 40,
    borderRadius: 999,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: { color: "#171a1f", fontSize: 12, fontWeight: "800" },
  filterChip: {
    height: 28,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.08)",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  filterChipActive: { backgroundColor: "rgba(255,255,255,0.12)" },
  filterLabel: {
    color: "rgba(255,255,255,0.56)",
    fontSize: 12,
    lineHeight: 16,
  },
  filterLabelActive: { color: "#fff" },
  featuredCard: {
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
    padding: 12,
    gap: 12,
  },
  featuredTop: { flexDirection: "row", gap: 12, alignItems: "center" },
  featuredArt: { width: 88, height: 88, borderRadius: 12 },
  featuredInfo: { flex: 1 },
  featuredTag: {
    color: "#9aff5b",
    fontSize: 10,
    lineHeight: 12,
    fontWeight: "800",
  },
  featuredTitle: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
    marginTop: 4,
  },
  featuredSubtitle: {
    color: "rgba(255,255,255,0.64)",
    fontSize: 12,
    lineHeight: 16,
    marginTop: 2,
  },
  featuredPrice: { color: "#fff", fontSize: 18, lineHeight: 24, marginTop: 8 },
  bookButton: {
    height: 32,
    borderRadius: 999,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  bookButtonText: { color: "#080808", fontSize: 12, fontWeight: "800" },
  serviceTile: {
    flexBasis: "48%",
    flexGrow: 1,
    minHeight: 130,
    borderRadius: 16,
    padding: 12,
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  tileShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.18)",
  },
  serviceTitle: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "700",
  },
  serviceSubtitle: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 12,
    lineHeight: 16,
    marginTop: 4,
  },
  talentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  talentLeft: { flexDirection: "row", alignItems: "center", gap: 12, flex: 1 },
  talentAvatar: {
    width: 64,
    height: 64,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.04)",
  },
  talentInfo: { flex: 1 },
  talentName: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
  },
  talentRole: {
    color: "rgba(255,255,255,0.64)",
    fontSize: 12,
    lineHeight: 16,
    marginTop: 4,
  },
  talentRight: { alignItems: "flex-end", marginLeft: 8 },
  talentPrice: { color: "#fff", fontSize: 14, lineHeight: 20 },
  talentMeta: {
    color: "rgba(255,255,255,0.48)",
    fontSize: 11,
    lineHeight: 16,
    marginTop: 4,
  },
  briefCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "rgba(255,255,255,0.16)",
    backgroundColor: "rgba(255,255,255,0.04)",
    padding: 17,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  briefIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  briefCopy: { flex: 1 },
  briefTitle: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
  },
  briefSubtitle: {
    color: "rgba(255,255,255,0.64)",
    fontSize: 12,
    lineHeight: 16,
    marginTop: 2,
  },
  briefButton: {
    height: 32,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  briefButtonText: { color: "#171a1f", fontSize: 12, fontWeight: "800" },
  activityRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  activityAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
  },
  activityCopy: { flex: 1, gap: 8 },
  activityTitle: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "600",
  },
  activitySubtitle: {
    color: "rgba(255,255,255,0.56)",
    fontSize: 12,
    lineHeight: 16,
  },
});
