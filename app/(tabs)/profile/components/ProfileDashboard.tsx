import { ScrollView, StyleSheet, View } from "react-native";

import { DashboardShell } from "@/components/dashboard/DashboardShell";

import {
  merch,
  profileImages,
  services,
  socials,
  tracks,
} from "./data";
import {
  MerchCard,
  ProfileHero,
  ProfileSection,
  ServiceCard,
  SocialCard,
  TrackRow,
} from "./ProfileCards";

export function ProfileDashboard() {
  return (
    <DashboardShell activeTab="profile">
      <ProfileHero />

      <View style={styles.content}>
        <ProfileSection title="Connect">
          <View style={styles.socialGrid}>
            {socials.map((social) => (
              <SocialCard key={social.platform} social={social} />
            ))}
          </View>
        </ProfileSection>

        <ProfileSection title="Featured Tracks">
          <View style={styles.trackList}>
            {tracks.map((track, index) => (
              <TrackRow
                key={track.title}
                track={track}
                artwork={profileImages.tracks[index]}
              />
            ))}
          </View>
        </ProfileSection>

        <ProfileSection title="Services">
          <View style={styles.serviceList}>
            {services.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </View>
        </ProfileSection>

        <ProfileSection title="Merch">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.merchRail}
          >
            {merch.map((item, index) => (
              <MerchCard
                key={item.title}
                item={item}
                artwork={profileImages.merch[index]}
              />
            ))}
          </ScrollView>
        </ProfileSection>
      </View>
    </DashboardShell>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    gap: 32,
  },
  socialGrid: {
    flexDirection: "row",
    gap: 8,
  },
  trackList: {
    gap: 16,
  },
  serviceList: {
    gap: 16,
  },
  merchRail: {
    gap: 16,
    paddingRight: 16,
  },
});
