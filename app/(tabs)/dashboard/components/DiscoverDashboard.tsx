import { StyleSheet, View } from "react-native";

import {
  DashboardShell,
  DashboardTopHeader,
  HorizontalRail,
  SectionHeader,
} from "@/components/dashboard/DashboardShell";
import {
  exclusiveDrops,
  filters,
  liveStreams,
  morpheusTools,
  nearbyEvents,
  productDrops,
} from "./data";
import {
  EventRow,
  ExclusiveDropCard,
  FilterChips,
  HeroPickCard,
  LiveStreamCard,
  MembershipCard,
  ProductCard,
  ToolCard,
  WavRoomCard,
} from "./DiscoverCards";

export function DiscoverDashboard() {
  return (
    <DashboardShell activeTab="discover">
      <DashboardTopHeader />
      <HeroPickCard />
      <FilterChips filters={filters} />

      <SectionHeader title="Live right now" action="3 Streams" />
      <HorizontalRail>
        {liveStreams.map((stream) => (
          <LiveStreamCard key={stream.artist} stream={stream} />
        ))}
      </HorizontalRail>

      <SectionHeader title="WavRoom open" action="1 hosted" />
      <WavRoomCard />

      <SectionHeader title="Exclusive drops" action="Vault" />
      <HorizontalRail>
        {exclusiveDrops.map((drop) => (
          <ExclusiveDropCard key={drop.title} drop={drop} />
        ))}
      </HorizontalRail>

      <SectionHeader title="Happening near you" action="LA.6" />
      <View style={styles.eventList}>
        {nearbyEvents.map((event) => (
          <EventRow key={event.title} event={event} />
        ))}
      </View>

      <SectionHeader title="New drops" action="Shop" />
      <HorizontalRail>
        {productDrops.map((product) => (
          <ProductCard key={product.title} product={product} />
        ))}
      </HorizontalRail>

      <SectionHeader title="Create with Morpheus" action="Studio" />
      <View style={styles.toolGrid}>
        {morpheusTools.map((tool) => (
          <ToolCard key={tool.label} tool={tool} />
        ))}
      </View>

      <SectionHeader title="Go Wav+" action="14 days free" />
      <MembershipCard />
    </DashboardShell>
  );
}

const styles = StyleSheet.create({
  eventList: { paddingHorizontal: 16, gap: 12 },
  toolGrid: { paddingHorizontal: 16, flexDirection: "row", gap: 16 },
});
