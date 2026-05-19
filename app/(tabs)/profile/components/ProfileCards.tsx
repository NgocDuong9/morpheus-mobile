import { FontAwesome6 } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import type { ReactNode } from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";

import { merch, profileImages, services, socials, tracks } from "./data";

export function ProfileHero() {
  return (
    <View style={styles.hero}>
      <ImageBackground source={profileImages.hero} style={styles.heroImage}>
        <LinearGradient
          colors={["rgba(8,8,8,0.05)", "rgba(8,8,8,0.7)", "#080808"]}
          locations={[0, 0.58, 1]}
          style={StyleSheet.absoluteFill}
        />
      </ImageBackground>

      <View style={styles.profileBlock}>
        <View style={styles.avatarWrap}>
          <Image source={profileImages.avatar} style={styles.avatar} />
          <View style={styles.verifiedBadge}>
            <Feather name="check" size={13} color="#080808" />
          </View>
        </View>

        <Text style={styles.artistName}>Futuristic</Text>
        <Text style={styles.artistMeta}>Alt Hip-Hop · Phoenix, AZ</Text>

        <View style={styles.statsRow}>
          <StatBlock value="1.5M" label="Audience" />
          <StatBlock value="583K" label="Listeners" />
          <StatBlock value="#26K" label="Tracks" />
        </View>
      </View>
    </View>
  );
}

export function ProfileSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

export function SocialCard({ social }: { social: (typeof socials)[number] }) {
  return (
    <View style={styles.socialCard}>
      <View
        style={[
          styles.socialGlow,
          {
            backgroundColor: "rgba(80, 80, 90, 0.5)",
          },
        ]}
      />
      <View style={[styles.socialIcon, { backgroundColor: social.color }]}>
        <FontAwesome6
          name={social.icon}
          size={16}
          color={social.platform === "TikTok" ? "#080808" : "#fff"}
          iconStyle="brand"
        />
      </View>
      <Text style={styles.socialValue}>{social.value}</Text>
      <Text style={styles.socialLabel}>{social.platform}</Text>
    </View>
  );
}

export function TrackRow({
  track,
  artwork,
}: {
  track: (typeof tracks)[number];
  artwork: number;
}) {
  return (
    <View style={styles.trackRow}>
      <Image source={artwork} style={styles.trackArt} />
      <View style={styles.trackInfo}>
        <Text style={styles.trackTitle}>{track.title}</Text>
        <Text style={styles.trackMeta}>Popularity: {track.popularity}</Text>
      </View>
      <View style={styles.livePill}>
        <View style={styles.liveDot} />
        <Text style={styles.liveText}>LIVE</Text>
      </View>
    </View>
  );
}

export function ServiceCard({
  service,
}: {
  service: (typeof services)[number];
}) {
  return (
    <View style={styles.serviceCard}>
      <View style={styles.serviceHeader}>
        <Text style={styles.serviceTitle}>{service.title}</Text>
        <Text style={[styles.demandText, { color: service.accent }]}>
          {service.demand}
        </Text>
      </View>

      <View style={styles.tierRow}>
        {service.tiers.map((tier) => (
          <View key={tier.label} style={styles.tierCard}>
            <View
              style={[
                styles.tierGlow,
                { backgroundColor: `${service.accent}16` },
              ]}
            />
            <Text
              style={[styles.tierLabel, tier.active && styles.tierLabelActive]}
            >
              {tier.label}
            </Text>
            <Text
              style={[styles.tierPrice, tier.active && styles.tierPriceActive]}
            >
              {tier.price}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export function MerchCard({
  item,
  artwork,
}: {
  item: (typeof merch)[number];
  artwork: number;
}) {
  return (
    <View style={styles.merchCard}>
      <View style={styles.merchImageWrap}>
        <Image source={artwork} style={styles.merchImage} />
        {item.badge ? (
          <View style={styles.merchBadge}>
            <Text style={styles.merchBadgeText}>{item.badge}</Text>
          </View>
        ) : null}
      </View>
      <View style={styles.merchBody}>
        <Text style={styles.merchTitle}>{item.title}</Text>
        <Text style={styles.merchSubtitle}>{item.subtitle}</Text>
        <Text style={styles.merchPrice}>{item.price}</Text>
      </View>
    </View>
  );
}

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <View style={styles.statBlock}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    height: 424,
    marginTop: -20,
  },
  heroImage: {
    height: 306,
    opacity: 0.72,
  },
  profileBlock: {
    position: "absolute",
    left: 16,
    right: 16,
    top: 162,
    alignItems: "flex-start",
  },
  avatarWrap: {
    width: 96,
    height: 96,
    marginBottom: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  verifiedBadge: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#9aff5b",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#080808",
  },
  artistName: {
    color: "#fff",
    fontSize: 24,
    lineHeight: 28,
    fontWeight: "700",
    letterSpacing: 0.48,
  },
  artistMeta: {
    marginTop: 12,
    color: "#9a9a9e",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "300",
  },
  statsRow: {
    marginTop: 20,
    width: 262,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statBlock: {
    flex: 1,
    gap: 4,
  },
  statValue: {
    color: "#fff",
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "600",
  },
  statLabel: {
    color: "rgba(255,255,255,0.64)",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "300",
  },
  section: {
    gap: 20,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "200",
  },
  socialCard: {
    flex: 1,
    minHeight: 104,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.04)",
    backgroundColor: "rgba(255,255,255,0.04)",
    alignItems: "center",
    paddingVertical: 13,
    gap: 8,
    overflow: "hidden",
  },
  socialGlow: {
    position: "absolute",
    top: -24,
    left: -2,
    width: 84,
    height: 84,
    borderRadius: 42,
    filter: "blur(20px)",
  },
  socialIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  socialValue: {
    color: "#fff",
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  socialLabel: {
    color: "rgba(255,255,255,0.48)",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "300",
    textAlign: "center",
  },
  trackRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  trackArt: {
    width: 64,
    height: 64,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
  },
  trackInfo: {
    flex: 1,
    gap: 8,
  },
  trackTitle: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
    letterSpacing: 0.2,
  },
  trackMeta: {
    color: "rgba(255,255,255,0.64)",
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "300",
  },
  livePill: {
    height: 24,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.64)",
    backgroundColor: "rgba(0,0,0,0.56)",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#9aff5b",
  },
  liveText: {
    color: "#9aff5b",
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "700",
  },
  serviceCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
    backgroundColor: "rgba(255,255,255,0.04)",
    paddingHorizontal: 10,
    paddingVertical: 16,
    gap: 16,
    overflow: "hidden",
  },
  serviceHeader: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  serviceTitle: {
    color: "#fff",
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "600",
    letterSpacing: 0.2,
    textTransform: "uppercase",
    flexShrink: 1,
  },
  demandText: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "300",
    textDecorationLine: "underline",
    textTransform: "uppercase",
  },
  tierRow: {
    flexDirection: "row",
    gap: 12,
  },
  tierCard: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.04)",
    backgroundColor: "rgba(255,255,255,0.04)",
    alignItems: "center",
    paddingVertical: 16,
    gap: 8,
    overflow: "hidden",
  },
  tierGlow: {
    position: "absolute",
    left: 12,
    bottom: -18,
    width: 70,
    height: 70,
    borderRadius: 35,
    filter: "blur(20px)",
  },
  tierLabel: {
    color: "rgba(255,255,255,0.32)",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "300",
  },
  tierLabelActive: {
    color: "rgba(255,255,255,0.48)",
  },
  tierPrice: {
    color: "rgba(255,255,255,0.56)",
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "600",
  },
  tierPriceActive: {
    color: "#fff",
  },
  merchCard: {
    width: 264,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
    backgroundColor: "rgba(255,255,255,0.04)",
    overflow: "hidden",
  },
  merchImageWrap: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#f3f5f6",
    overflow: "hidden",
  },
  merchImage: {
    width: "100%",
    height: "100%",
  },
  merchBadge: {
    position: "absolute",
    top: 16,
    left: 16,
    height: 24,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.64)",
    backgroundColor: "rgba(0,0,0,0.56)",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  merchBadgeText: {
    color: "#fff",
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "700",
  },
  merchBody: {
    padding: 16,
    gap: 4,
  },
  merchTitle: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "700",
  },
  merchSubtitle: {
    color: "rgba(255,255,255,0.48)",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "300",
  },
  merchPrice: {
    marginTop: 8,
    color: "#fff",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
  },
});
