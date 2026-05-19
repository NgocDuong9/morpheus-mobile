import type {
  EventItem,
  ExclusiveDrop,
  LiveStream,
  ProductDrop,
  ToolItem,
} from "@/components/dashboard/types";

export const filters = [
  { label: "Music", icon: "music" },
  { label: "Live", icon: "live", value: "3" },
  { label: "WavRoom", icon: "wav-room" },
  { label: "Exclusive", icon: "exclusive" },
  { label: "Ticket", icon: "ticket" },
  { label: "Merch", icon: "merch" },
];

export const liveStreams: LiveStream[] = [
  {
    artist: "KAITO",
    title: 'Studio session · Making "Lull"',
    viewers: "2.1K",
    colors: ["#ff7b3d", "#202020", "#090909"],
    image: require("@/assets/images/discover/live-kaito.png"),
  },
  {
    artist: "RAVN",
    title: "Live · EP rolled out",
    viewers: "1.8K",
    colors: ["#12d6ff", "#111827", "#030712"],
    image: require("@/assets/images/discover/live-ravn.png"),
  },
  {
    artist: "MIRA",
    title: "Ambient room · Late mix",
    viewers: "912",
    colors: ["#c084fc", "#1f2937", "#080808"],
    image: require("@/assets/images/discover/live-mira.png"),
  },
];

export const exclusiveDrops: ExclusiveDrop[] = [
  {
    title: "Pre-release: vol. II",
    subtitle: "Yuna · before streaming",
    badge: "EARLY · 3D",
    locked: true,
    colors: ["#6ee7b7", "#0f172a"],
    image: require("@/assets/images/discover/exclusive-prerelease.png"),
  },
  {
    title: "Lyric-video stems",
    subtitle: "RAVN · OpenWav only",
    badge: "SIGNED",
    locked: true,
    colors: ["#38bdf8", "#111827"],
    image: require("@/assets/images/discover/exclusive-lyric-video.png"),
  },
  {
    title: "Archive mix",
    subtitle: "KAITO · private drop",
    badge: "VAULT",
    locked: false,
    colors: ["#f472b6", "#171717"],
    image: require("@/assets/images/discover/exclusive-archive.png"),
  },
];

export const nearbyEvents: EventItem[] = [
  {
    day: "18",
    month: "May",
    title: "Yuna Saitō / live",
    place: "The Observatory · D2",
    price: "$24",
    note: "2 left",
    image: require("@/assets/images/discover/event-yuna.png"),
  },
  {
    day: "02",
    month: "JUN",
    title: "RAVN / EP launch",
    place: "Arcan Stage · BKK",
    price: "$32",
    note: "Early bird",
    image: require("@/assets/images/discover/event-ravn.png"),
  },
  {
    day: "14",
    month: "JUN",
    title: "KAITO / late set",
    place: "Soma Art Café · D1",
    price: "$18",
    note: "Available",
    image: require("@/assets/images/discover/event-kaito.png"),
  },
];

export const productDrops: ProductDrop[] = [
  {
    title: "Soft Static tee",
    subtitle: "Lorem ipsun",
    price: "$38",
    badge: "Just in",
    colors: ["#f5f5f4", "#737373"],
    image: require("@/assets/images/discover/product-tee.png"),
  },
  {
    title: "vol. II vinyl",
    subtitle: "Lorem ipsun",
    price: "$48",
    colors: ["#d4d4d8", "#18181b"],
    image: require("@/assets/images/discover/product-vinyl.png"),
  },
  {
    title: "Drift cassette",
    subtitle: "50 only",
    price: "$22",
    badge: "SIGNED",
    colors: ["#a7f3d0", "#0f172a"],
    image: require("@/assets/images/discover/product-cassette.png"),
  },
  {
    title: "Tour hoodie",
    subtitle: "3 sizes",
    price: "$68",
    colors: ["#d4d4d8", "#18181b"],
    image: require("@/assets/images/discover/product-hoodie.png"),
  },
];

export const morpheusTools: ToolItem[] = [
  {
    label: "EDIT TOOL",
    title: "Remix any track",
    body: "Stems, BPM, key - AI separates and remixes using voice.",
    accent: "#ffab00",
  },
  {
    label: "DESIGN STUDIO",
    title: "Cover art in seconds",
    body: "Type a vibe and AI generates visuals that match your brand bible.",
    accent: "#9aff5b",
  },
];
