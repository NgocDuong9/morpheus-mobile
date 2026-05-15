import type { ComponentType } from 'react';
import type { FontAwesome6 } from '@expo/vector-icons';

import { INSTAGRAM_GRADIENT, type PlatformGradient } from '@/theme/gradients';

import { FacebookDonut } from './charts/FacebookDonut';
import { InstagramBars } from './charts/InstagramBars';
import { SpotifyRing } from './charts/SpotifyRing';
import { TikTokPulse } from './charts/TikTokPulse';
import { YouTubeLine } from './charts/YouTubeLine';

export type PlatformKey = 'youtube' | 'instagram' | 'facebook' | 'tiktok' | 'spotify';
export type InsightKind =
  | 'warning'
  | 'opportunity'
  | 'growth'
  | 'strength'
  | 'decline'
  | 'stale'
  | 'critical';

export type PlatformColor = string | PlatformGradient;

export interface PlatformMeta {
  label: string;
  color: PlatformColor;
  icon: React.ComponentProps<typeof FontAwesome6>['name'];
}

export const PLATFORM_META: Record<PlatformKey, PlatformMeta> = {
  youtube: { label: 'YouTube', color: '#FF0000', icon: 'youtube' },
  instagram: { label: 'Instagram', color: INSTAGRAM_GRADIENT, icon: 'instagram' },
  facebook: { label: 'Facebook', color: '#1877F2', icon: 'facebook-f' },
  tiktok: { label: 'TikTok', color: '#111111', icon: 'tiktok' },
  spotify: { label: 'Spotify', color: '#1DB954', icon: 'spotify' },
};

export const KIND_META: Record<InsightKind, { label: string; color: string }> = {
  warning: { label: 'Warning', color: '#FBBC05' },
  opportunity: { label: 'Opportunity', color: '#06B6D4' },
  growth: { label: 'Growth', color: '#9AFF5B' },
  strength: { label: 'Strength', color: '#9AFF5B' },
  decline: { label: 'Decline', color: '#FF3B1F' },
  stale: { label: 'Stale', color: '#FBBC05' },
  critical: { label: 'Critical', color: '#FF3B1F' },
};

export interface InsightStat {
  platform: PlatformKey;
  value: string;
  bars: number;
}

export interface Insight {
  id: string;
  platform: PlatformKey;
  value: string;
  kind: InsightKind;
  Chart?: ComponentType;
  subtitle?: string;
  infoTitle?: string;
  infoBody?: string;
}

export const INSIGHTS: Insight[] = [
  {
    id: 'instagram',
    platform: 'instagram',
    value: '-9,415',
    kind: 'warning',
    Chart: InstagramBars,
    subtitle: '30-day change — audiences diverging',
    infoTitle: 'Instagram Is Shrinking - Fast',
    infoBody:
      'Lost 9,415 followers (−2.45%) in 30 days. Meanwhile Spotify gained +11,683 listeners. Your music audience grows but your social presence is actively declining.',
  },
  {
    id: 'facebook',
    platform: 'facebook',
    value: '0.02%',
    kind: 'opportunity',
    Chart: FacebookDonut,
    infoTitle: '1.3M Ghost Followers',
    infoBody:
      "Facebook is your biggest platform — 1.3M followers — but only 252 'talks'. That's 0.02% engagement. This audience is dead. Massive reactivation opportunity.",
  },
  {
    id: 'tiktok',
    platform: 'tiktok',
    value: '0% Growth',
    kind: 'stale',
    Chart: TikTokPulse,
    infoTitle: 'TikTok Has Flatlined',
    infoBody:
      'Total likes: 0% change in 90 days. Top posts are all from 2019-2022. You have 188K followers watching nothing new hit. Coasting on old momentum.',
  },
  {
    id: 'spotify',
    platform: 'spotify',
    value: '89.7%',
    kind: 'strength',
    Chart: SpotifyRing,
    infoTitle: 'Your Conversion Rate Is Elite',
    infoBody:
      "89.71% fan conversion on Spotify — nearly everyone who discovers you follows. Your music converts. The problem isn't your art — it's distribution and content not feeding enough new listeners in.",
  },
  {
    id: 'youtube',
    platform: 'youtube',
    value: '-12.2%',
    kind: 'critical',
    Chart: YouTubeLine,
    infoTitle: 'Your YouTube Empire Is Dying',
    infoBody:
      '91.4M lifetime views and 31M+ viral hits — but channel views dropped 12.7M (–12.2%) in 90 days. Monthly views at zero. Your biggest asset is bleeding out.',
  },
];
