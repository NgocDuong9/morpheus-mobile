import { FontAwesome6 } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import type {
  EventItem,
  ExclusiveDrop,
  LiveStream,
  ProductDrop,
  ToolItem,
} from "@/components/dashboard/types";

export function HeroPickCard() {
  return (
    <View style={styles.hero}>
      <LinearGradient
        colors={["#e4e0cf", "#7b7f73", "#111111"]}
        style={styles.heroArt}
      >
        <View style={styles.orbit} />
        <View style={styles.disc}>
          <View style={styles.discCore} />
        </View>
        <View style={styles.heroBadge}>
          <FontAwesome6
            name="wand-magic-sparkles"
            size={13}
            color="#fff"
            iconStyle="solid"
          />
          <Text style={styles.heroBadgeText}>Morpheus pick for you</Text>
        </View>
        <View style={styles.playButton}>
          <Feather name="play" size={16} color="#090909" />
        </View>
      </LinearGradient>

      <View style={styles.heroMeta}>
        <View>
          <Text style={styles.heroTitle}>Slow Drift, vol. II</Text>
          <Text style={styles.heroSubtitle}>Yuna Saitō · Ambient · 42 min</Text>
        </View>
        <View style={styles.inlineIcons}>
          <Feather name="bookmark" size={20} color="rgba(255,255,255,0.56)" />
          <Feather name="heart" size={20} color="rgba(255,255,255,0.56)" />
        </View>
      </View>

      <View style={styles.quoteCard}>
        <Text style={styles.quoteMark}>{'" '}</Text>
        <Text style={styles.quoteText}>
          You played {` `}
          <Text style={styles.quoteStrong}>Slow Drift vol. I</Text>
          twice last night around this hour. Yuna just dropped a follow-up.
        </Text>
      </View>
    </View>
  );
}

export function FilterChips({
  filters,
}: {
  filters: {
    label: string;
    icon: string;
    value?: string;
  }[];
}) {
  return (
    <View style={styles.filtersBlock}>
      <Text style={styles.microcopy}>Jump to </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        {filters.map((filter) => (
          <View key={filter.label} style={styles.chip}>
            <Text style={styles.chipText}>{filter.label}</Text>
            {filter.value && (
              <View style={styles.chipValue}>
                <View
                  style={{
                    backgroundColor: "#9AFF5B",
                    width: 6,
                    height: 6,
                    borderRadius: 6,
                  }}
                ></View>
                <Text style={styles.chipValue}>{filter.value}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export function LiveStreamCard({ stream }: { stream: LiveStream }) {
  return (
    <LinearGradient colors={stream.colors} style={styles.liveCard}>
      <View style={styles.liveTop}>
        <View style={styles.livePill}>
          <View style={styles.liveDot} />
          <Text style={styles.livePillText}>LIVE</Text>
        </View>
        <View style={styles.viewCount}>
          <Feather name="eye" size={12} color="#fff" />
          <Text style={styles.viewCountText}>{stream.viewers}</Text>
        </View>
      </View>
      <View style={styles.stageLight} />
      <View style={styles.liveBottom}>
        <Text style={styles.liveArtist}>{stream.artist}</Text>
        <Text style={styles.liveTitle}>{stream.title}</Text>
      </View>
    </LinearGradient>
  );
}

export function WavRoomCard() {
  return (
    <LinearGradient colors={["#1d2a20", "#0d0d0d"]} style={styles.wavRoom}>
      <Text style={styles.microcopy}>LISTENING SESSION · NOW</Text>
      <Text style={styles.roomTitle}>{"Yuna's midnight room"}</Text>
      <Text style={styles.roomSubtitle}>
        Hosted by Yuna Saitō · Ambient set
      </Text>
      <View style={styles.waveform}>
        {Array.from({ length: 19 }).map((_, index) => (
          <View
            key={index}
            style={[styles.waveBar, { height: 8 + ((index * 17) % 35) }]}
          />
        ))}
      </View>
      <View style={styles.roomFooter}>
        <View style={styles.avatarStack}>
          {Array.from({ length: 5 }).map((_, index) => (
            <View key={index} style={[styles.avatar, { left: index * 14 }]} />
          ))}
        </View>
        <Text style={styles.listeners}>+248 listeners</Text>
        <View style={styles.joinButton}>
          <Text style={styles.joinText}>JOIN</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

export function ExclusiveDropCard({ drop }: { drop: ExclusiveDrop }) {
  return (
    <View style={styles.dropCard}>
      <LinearGradient colors={drop.colors} style={styles.dropArt}>
        <View style={styles.dropBadge}>
          <Text style={styles.dropBadgeText}>{drop.badge}</Text>
        </View>
        {drop.locked && (
          <Feather name="lock" size={16} color="#fff" style={styles.lockIcon} />
        )}
      </LinearGradient>
      <Text style={styles.dropTitle}>{drop.title}</Text>
      <Text style={styles.dropSubtitle}>{drop.subtitle}</Text>
    </View>
  );
}

export function EventRow({ event }: { event: EventItem }) {
  return (
    <View style={styles.eventRow}>
      <LinearGradient
        colors={["#f8fafc", "#525252"]}
        style={styles.eventThumb}
      />
      <View style={styles.eventInfo}>
        <View style={styles.dateRow}>
          <Text style={styles.eventDay}>{event.day}</Text>
          <Text style={styles.eventMonth}>{event.month}</Text>
        </View>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventPlace}>{event.place}</Text>
      </View>
      <View style={styles.eventPrice}>
        <Text style={styles.price}>{event.price}</Text>
        <Text style={styles.eventNote}>{event.note}</Text>
      </View>
    </View>
  );
}

export function ProductCard({ product }: { product: ProductDrop }) {
  return (
    <View style={styles.productCard}>
      <LinearGradient colors={product.colors} style={styles.productArt}>
        {product.badge && (
          <View style={styles.productBadge}>
            <Text style={styles.productBadgeText}>{product.badge}</Text>
          </View>
        )}
      </LinearGradient>
      <View style={styles.productBody}>
        <Text style={styles.productTitle}>{product.title}</Text>
        <Text style={styles.productSubtitle}>{product.subtitle}</Text>
        <Text style={styles.productPrice}>{product.price}</Text>
      </View>
    </View>
  );
}

export function ToolCard({ tool }: { tool: ToolItem }) {
  return (
    <View style={styles.toolCard}>
      <Text style={[styles.toolLabel, { color: tool.accent }]}>
        {tool.label}
      </Text>
      <Text style={styles.toolTitle}>{tool.title}</Text>
      <Text style={styles.toolBody}>{tool.body}</Text>
    </View>
  );
}

export function MembershipCard() {
  return (
    <LinearGradient colors={["#18270f", "#080808"]} style={styles.membership}>
      <View style={styles.freeTrial}>
        <Text style={styles.freeTrialText}>FREE TRIAL</Text>
      </View>
      <Text style={styles.unlock}>UNLOCK EVERYTHING.</Text>
      <Text style={styles.memberTitle}>Openwav . Membership</Text>
      {[
        "Lossless · spatial mixes",
        "WavRoom access · pre-releases",
        "Morpheus remix & design unlimited",
        "Exclusive merch + ticket presale",
      ].map((item) => (
        <Text key={item} style={styles.memberItem}>
          • {item}
        </Text>
      ))}
      <View style={styles.memberFooter}>
        <Text style={styles.memberPrice}>
          <Text style={styles.memberPriceValue}>$6</Text> / month
        </Text>
        <View style={styles.trialButton}>
          <Text style={styles.trialButtonText}>START FREE TRIAL</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  hero: { gap: 16 },
  heroArt: {
    height: 300,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  orbit: {
    position: "absolute",
    width: 190,
    height: 190,
    borderRadius: 95,
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.55)",
    transform: [{ scaleX: 1.65 }, { rotate: "-18deg" }],
  },
  disc: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: "rgba(255,255,255,0.42)",
    alignItems: "center",
    justifyContent: "center",
  },
  discCore: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#232323",
  },
  heroBadge: {
    position: "absolute",
    top: 24,
    left: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 8,
    height: 32,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.64)",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.64)",
  },
  heroBadgeText: { color: "#fff", fontSize: 13 },
  playButton: {
    position: "absolute",
    top: 24,
    right: 24,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  heroMeta: {
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  heroTitle: {
    color: "#fff",
    fontSize: 24,
    lineHeight: 28,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  heroSubtitle: {
    color: "rgba(255,255,255,0.56)",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 12,
  },
  inlineIcons: { flexDirection: "row", gap: 16 },
  quoteCard: {
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.64)",
    backgroundColor: "rgba(255,255,255,0.04)",
    padding: 20,
    minHeight: 128,
    overflow: "hidden",
  },
  quoteMark: { color: "#ffab00", fontSize: 20, lineHeight: 20 },
  quoteText: {
    color: "rgba(255,255,255,0.72)",
    fontFamily: "SF Pro",
    fontSize: 14,
    fontWeight: "100",
    lineHeight: 20,
    marginTop: 8,
  },
  quoteStrong: {
    color: "#fff",
    fontFamily: "SF Pro",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20,
  },
  filtersBlock: { marginTop: 32, paddingHorizontal: 16, gap: 8 },
  microcopy: { color: "rgba(255,255,255,0.48)", fontSize: 13, lineHeight: 16 },
  filterRow: { flexDirection: "row", gap: 8, paddingRight: 16 },
  chip: {
    height: 28,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  chipText: { color: "#fff", fontSize: 12, lineHeight: 16 },
  chipValue: {
    color: "#fff",
    fontSize: 12,
    lineHeight: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  liveCard: {
    width: 212,
    height: 300,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
    padding: 16,
    justifyContent: "space-between",
  },
  liveTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  livePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    height: 24,
    paddingHorizontal: 8,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.56)",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.64)",
  },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#9aff5b" },
  livePillText: { color: "#9aff5b", fontSize: 12, fontWeight: "700" },
  viewCount: { flexDirection: "row", alignItems: "center", gap: 4 },
  viewCountText: { color: "#fff", fontSize: 12, fontWeight: "700" },
  stageLight: {
    alignSelf: "center",
    width: 74,
    height: 150,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.28)",
    transform: [{ rotate: "18deg" }],
  },
  liveBottom: { gap: 8 },
  liveArtist: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "700",
  },
  liveTitle: { color: "rgba(255,255,255,0.8)", fontSize: 13, lineHeight: 16 },
  wavRoom: {
    marginHorizontal: 16,
    height: 240,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
    padding: 20,
    overflow: "hidden",
  },
  roomTitle: {
    color: "#fff",
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "600",
    marginTop: 12,
  },
  roomSubtitle: {
    color: "rgba(255,255,255,0.56)",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
  },
  waveform: {
    height: 64,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 2,
    marginTop: 16,
  },
  waveBar: { flex: 1, borderRadius: 4, backgroundColor: "#9aff5b" },
  roomFooter: { marginTop: 16, flexDirection: "row", alignItems: "center" },
  avatarStack: { width: 80, height: 24, position: "relative" },
  avatar: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#d9d9d9",
    borderWidth: 1,
    borderColor: "#080808",
  },
  listeners: { color: "rgba(255,255,255,0.72)", fontSize: 12, flex: 1 },
  joinButton: {
    height: 32,
    paddingHorizontal: 18,
    borderRadius: 999,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  joinText: { color: "#080808", fontSize: 12, fontWeight: "800" },
  dropCard: { width: 156, gap: 12 },
  dropArt: {
    width: 156,
    height: 156,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    overflow: "hidden",
  },
  dropBadge: {
    position: "absolute",
    left: 8,
    bottom: 8,
    height: 24,
    paddingHorizontal: 8,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.56)",
    justifyContent: "center",
  },
  dropBadgeText: { color: "#fff", fontSize: 12, fontWeight: "700" },
  lockIcon: { position: "absolute", right: 16, top: 16 },
  dropTitle: { color: "#fff", fontSize: 14, lineHeight: 20 },
  dropSubtitle: {
    color: "rgba(255,255,255,0.48)",
    fontSize: 13,
    lineHeight: 16,
  },
  eventRow: {
    height: 96,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.04)",
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  eventThumb: { width: 64, height: 64, borderRadius: 8 },
  eventInfo: { flex: 1, marginLeft: 16 },
  dateRow: { flexDirection: "row", alignItems: "baseline", gap: 4 },
  eventDay: { color: "#fff", fontSize: 20, lineHeight: 20, fontWeight: "700" },
  eventMonth: { color: "rgba(255,255,255,0.64)", fontSize: 12, lineHeight: 12 },
  eventTitle: { color: "#fff", fontSize: 14, lineHeight: 20, marginTop: 4 },
  eventPlace: {
    color: "rgba(255,255,255,0.48)",
    fontSize: 12,
    lineHeight: 16,
    marginTop: 2,
  },
  eventPrice: { alignItems: "flex-end" },
  price: { color: "#fff", fontSize: 20, lineHeight: 24 },
  eventNote: { color: "rgba(255,255,255,0.56)", fontSize: 12, lineHeight: 20 },
  productCard: {
    width: 264,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
  },
  productArt: { height: 264 },
  productBadge: {
    position: "absolute",
    top: 16,
    left: 16,
    height: 24,
    paddingHorizontal: 8,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.56)",
    justifyContent: "center",
  },
  productBadgeText: { color: "#fff", fontSize: 12, fontWeight: "700" },
  productBody: { padding: 16, gap: 4 },
  productTitle: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "700",
  },
  productSubtitle: {
    color: "rgba(255,255,255,0.48)",
    fontSize: 14,
    lineHeight: 20,
  },
  productPrice: { color: "#fff", fontSize: 16, lineHeight: 24, marginTop: 8 },
  toolCard: {
    flex: 1,
    minHeight: 142,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: "rgba(255,255,255,0.04)",
    padding: 13,
    gap: 12,
    overflow: "hidden",
  },
  toolLabel: { fontSize: 10, lineHeight: 12, fontWeight: "400" },
  toolTitle: { color: "#fff", fontSize: 14, lineHeight: 20, fontWeight: "600" },
  toolBody: { color: "rgba(255,255,255,0.48)", fontSize: 13, lineHeight: 16 },
  membership: {
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.64)",
    padding: 20,
    overflow: "hidden",
  },
  freeTrial: {
    position: "absolute",
    right: 15,
    top: 15,
    height: 24,
    paddingHorizontal: 8,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.56)",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.64)",
    justifyContent: "center",
  },
  freeTrialText: { color: "#fff", fontSize: 12, fontWeight: "700" },
  unlock: {
    color: "#67fa12",
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "900",
    marginBottom: 8,
  },
  memberTitle: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  memberItem: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "200",
  },
  memberFooter: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  memberPrice: { color: "#fff", fontSize: 12 },
  memberPriceValue: { color: "#9aff5b", fontSize: 20 },
  trialButton: {
    height: 32,
    borderRadius: 999,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  trialButtonText: { color: "#171a1f", fontSize: 12, fontWeight: "800" },
});
