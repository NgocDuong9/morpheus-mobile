export interface PlatformGradient {
  colors: readonly [string, string, ...string[]];
  locations: readonly [number, number, ...number[]];
  start: { x: number; y: number };
  end: { x: number; y: number };
}

export const INSTAGRAM_GRADIENT: PlatformGradient = {
  colors: ['#FFE185', '#FFBB36', '#FF5176', '#F63395', '#A436D2', '#5F4EED'],
  locations: [0.1465, 0.295, 0.4152, 0.5141, 0.6697, 0.8535],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
};
