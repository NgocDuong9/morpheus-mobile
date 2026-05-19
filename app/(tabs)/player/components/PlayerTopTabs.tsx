import Feather from "@expo/vector-icons/Feather";
import { Pressable, StyleSheet, Text, View } from "react-native";

import type { PlayerTab } from "./types";

type PlayerTopTabsProps = {
  activeIndex: number;
  tabs: PlayerTab[];
  onSelect: (index: number) => void;
  topInset?: number;
};

export function PlayerTopTabs({
  activeIndex,
  tabs,
  onSelect,
}: PlayerTopTabsProps) {
  return (
    <View style={[styles.topBar, { paddingTop: 40 }]}>
      <View style={styles.topSpacer} />
      <View style={styles.tabs}>
        {tabs.map((tab, index) => (
          <Pressable
            key={tab}
            style={[
              styles.tabItem,
              index === activeIndex && styles.tabItemActive,
            ]}
            onPress={() => onSelect(index)}
          >
            <Text
              style={[
                styles.tabText,
                index === activeIndex && styles.tabTextActive,
              ]}
            >
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.searchButton}>
        <Feather name="search" size={20} color="#fff" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#080808",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.04)",
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingBottom: 0,
    gap: 16,
    zIndex: 10,
  },
  topSpacer: { width: 24 },
  tabs: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 40,
  },
  tabItem: {
    paddingBottom: 8,
  },
  tabItemActive: {
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  tabText: { color: "rgba(255,255,255,0.56)", fontSize: 12, lineHeight: 16 },
  tabTextActive: { color: "#fff" },
  searchButton: {
    width: 24,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
