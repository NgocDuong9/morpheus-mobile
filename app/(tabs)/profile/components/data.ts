export const profileImages = {
  hero: require("@/assets/images/profile/hero-bg.png"),
  avatar: require("@/assets/images/profile/avatar.png"),
  tracks: [
    require("@/assets/images/profile/track-unspoken.png"),
    require("@/assets/images/profile/track-right-back.png"),
    require("@/assets/images/profile/track-automatic.png"),
    require("@/assets/images/profile/track-good-news.png"),
  ],
  merch: [
    require("@/assets/images/profile/merch-tee.png"),
    require("@/assets/images/profile/merch-cassette.png"),
    require("@/assets/images/profile/merch-hoodie.png"),
  ],
};

export const socials = [
  { platform: "Spotify", value: "522K", icon: "spotify", color: "#1ed760" },
  { platform: "Instagram", value: "422K", icon: "instagram", color: "#ff3d9a" },
  { platform: "YouTube", value: "339K", icon: "youtube", color: "#ff1b1c" },
  { platform: "TikTok", value: "188K", icon: "tiktok", color: "#fff" },
] as const;

export const tracks = [
  { title: "UNSPOKEN", popularity: "40" },
  { title: "RIGHT BACK", popularity: "33" },
  { title: "Automatic", popularity: "32" },
  { title: "GOOD NEWS", popularity: "--" },
];

export const services = [
  {
    title: "CUSTOM VERSE",
    demand: "High demand",
    accent: "#9aff5b",
    tiers: [
      { label: "Basic", price: "$150" },
      { label: "Standard", price: "$300", active: true },
      { label: "Premium", price: "$500" },
    ],
  },
  {
    title: "VOCAL FEATURE",
    demand: "Medium demand",
    accent: "#fbbc05",
    tiers: [
      { label: "Basic", price: "$500" },
      { label: "Standard", price: "$1000", active: true },
      { label: "Premium", price: "$2000" },
    ],
  },
  {
    title: "SONGWRITING SESSION",
    demand: "High demand",
    accent: "#9aff5b",
    tiers: [
      { label: "Basic", price: "$200" },
      { label: "Standard", price: "$400", active: true },
      { label: "Premium", price: "$750" },
    ],
  },
];

export const merch = [
  {
    title: "Soft Static tee",
    subtitle: "Lorem ipsum",
    price: "$38",
    badge: "JUST IN",
  },
  { title: "Drift cassette", subtitle: "50 only", price: "$22", badge: "SIGNED" },
  { title: "Tour hoodie", subtitle: "3 sizes", price: "$68" },
];
