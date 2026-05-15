import { FontAwesome6 } from '@expo/vector-icons';

import { INSTAGRAM_GRADIENT, type PlatformGradient } from '@/theme/gradients';

export type Platform = {
  id: string;
  label: string;
  icon: React.ComponentProps<typeof FontAwesome6>['name'];
  color: string | PlatformGradient;
};

export const PLATFORMS: Platform[] = [
  { id: 'spotify', label: 'Spotify', icon: 'spotify', color: '#1DB954' },
  { id: 'instagram', label: 'Instagram', icon: 'instagram', color: INSTAGRAM_GRADIENT },
  { id: 'tiktok', label: 'TikTok', icon: 'tiktok', color: '#111111' },
  { id: 'youtube', label: 'YouTube', icon: 'youtube', color: '#FF0000' },
  { id: 'soundcloud', label: 'SoundCloud', icon: 'soundcloud', color: '#FF5500' },
  { id: 'facebook', label: 'Facebook', icon: 'facebook-f', color: '#1877F2' },
];
