export type PlayerTab = "For You" | "Artists" | "Following";

export type PlayerMock = {
  tab: PlayerTab;
  handle: string;
  caption: string;
  tags: string;
  audio: string;
  lyric: string;
  likes: string;
  comments: string;
  shares: string;
  saves: string;
  colors: readonly [string, string, string, string];
  avatarColors: readonly [string, string];
  figureColor: string;
  prop: "mic" | "stage" | "disc";
};
