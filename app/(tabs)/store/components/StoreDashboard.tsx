import { ScrollView, StyleSheet, View } from "react-native";

import { DashboardShell, DashboardTopHeader, SectionHeader } from "@/components/dashboard/DashboardShell";
import {
  ActivityRow,
  BriefCard,
  FeaturedBookingCard,
  MorpheusMatchCard,
  recentActivity,
  serviceFilters,
  ServiceTileCard,
  serviceTiles,
  StoreFilterChip,
  TalentRow,
  topTalents,
} from "./StoreCards";

export function StoreDashboard() {
  return (
    <DashboardShell activeTab="store">
      <DashboardTopHeader
        kicker="New match · just now"
        title="Artist Marketplace"
        titleWidth={260}
      />

      <View style={styles.contentStack}>
        <MorpheusMatchCard />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRail}
        >
          {serviceFilters.map((filter) => (
            <StoreFilterChip key={filter.label} filter={filter} />
          ))}
        </ScrollView>

        <FeaturedBookingCard />
      </View>

      <SectionHeader title="Browse By Service" action="All" />
      <View style={styles.serviceGrid}>
        {serviceTiles.map((service) => (
          <ServiceTileCard key={service.title} service={service} />
        ))}
      </View>

      <SectionHeader title="Top Rated This Week" action="All" />
      <View style={styles.listStack}>
        {topTalents.map((talent) => (
          <TalentRow key={talent.name} talent={talent} />
        ))}
      </View>

      <SectionHeader title="Need Something Specific?" action="" />
      <View style={styles.inset}>
        <BriefCard />
      </View>

      <SectionHeader title="Recent Activity" action="" />
      <View style={styles.listStack}>
        {recentActivity.map((activity) => (
          <ActivityRow key={activity.title} activity={activity} />
        ))}
      </View>
    </DashboardShell>
  );
}

const styles = StyleSheet.create({
  contentStack: { gap: 32 },
  filterRail: { paddingHorizontal: 16, gap: 8 },
  serviceGrid: {
    paddingHorizontal: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  listStack: { paddingHorizontal: 16, gap: 16 },
  inset: { paddingHorizontal: 16 },
});
