import { FontAwesome6 } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { colors } from "@/theme/colors";

import { INSIGHTS } from "./insights.components/data";
import { InsightCarousel } from "./insights.components/InsightCarousel";
import { PageDots } from "./insights.components/PageDots";
import { ProfileCard } from "./insights.components/ProfileCard";
import { ProfileHeader } from "./insights.components/ProfileHeader";

const SCREEN_W = Dimensions.get("window").width;
const SIDE_PADDING = 20;
const CARD_GAP = 12;
const CARD_WIDTH = SCREEN_W - SIDE_PADDING * 2;

export default function Insights() {
  const { handle } = useLocalSearchParams<{ handle?: string }>();
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);

  const displayHandle = handle?.trim() || "Futuristic";

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: insets.bottom + 120 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerWrap}>
          <ProfileHeader currentIndex={currentIndex} total={INSIGHTS.length} />
        </View>

        <View style={styles.section}>
          <ProfileCard
            handle={displayHandle}
            audience="1.5M"
            genre="Hip-Hop/Rap · Alt"
            rank="26,436"
            rankDelta="+4,707"
            status="Slowing"
          />
        </View>

        <View style={styles.foundRow}>
          <FontAwesome6
            name="wand-magic-sparkles"
            size={14}
            color={colors.brand.primary}
            iconStyle="solid"
          />
          <Text style={styles.foundText}>
            Morpheys Found {INSIGHTS.length} Insights
          </Text>
        </View>

        <Text style={styles.swipeHeading}>Swipe To Explore</Text>

        <InsightCarousel
          insights={INSIGHTS}
          cardWidth={CARD_WIDTH}
          gap={CARD_GAP}
          sidePadding={SIDE_PADDING}
          onIndexChange={setCurrentIndex}
        />

        <PageDots count={INSIGHTS.length} current={currentIndex} />
      </ScrollView>

      <View style={[styles.ctaWrap, { bottom: insets.bottom + 16 }]}>
        <Pressable
          onPress={() => router.replace("/(tabs)")}
          style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
        >
          <Text style={styles.ctaLabel}>Show Me My Audience</Text>
          <FontAwesome6
            name="arrow-right"
            size={16}
            color="#000"
            iconStyle="solid"
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  scroll: { paddingTop: 4 },
  headerWrap: { paddingHorizontal: SIDE_PADDING },
  section: { paddingHorizontal: SIDE_PADDING, marginTop: 8 },
  foundRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: SIDE_PADDING,
    marginTop: 18,
  },
  foundText: { color: colors.brand.primary, fontSize: 14, fontWeight: "500" },
  swipeHeading: {
    color: colors.text.primary,
    fontSize: 24,
    fontWeight: "600",
    paddingHorizontal: SIDE_PADDING,
    marginTop: 6,
    marginBottom: 10,
  },
  ctaWrap: { position: "absolute", left: SIDE_PADDING, right: SIDE_PADDING },
  cta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 999,
    backgroundColor: "#fff",
  },
  ctaPressed: { opacity: 0.85 },
  ctaLabel: { color: "#000", fontSize: 16, fontWeight: "600" },
});
