import { SvgXml } from "react-native-svg";

export type DiscoverAssetIconName =
  | "sparkles"
  | "play"
  | "bookmark"
  | "heart"
  | "lock"
  | "eye";

type DiscoverAssetIconProps = {
  name: DiscoverAssetIconName;
  color?: string;
  height?: number;
  opacity?: number;
  width?: number;
};

const iconXml = {
  sparkles: (color: string, opacity: number) =>
    `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.62469 10.333C6.56517 10.1023 6.44492 9.89171 6.27644 9.72323C6.10796 9.55475 5.89741 9.4345 5.66669 9.37498L1.57669 8.32031C1.50691 8.30051 1.4455 8.25848 1.40177 8.20061C1.35804 8.14274 1.33438 8.07218 1.33438 7.99964C1.33438 7.92711 1.35804 7.85655 1.40177 7.79868C1.4455 7.74081 1.50691 7.69878 1.57669 7.67898L5.66669 6.62365C5.89732 6.56418 6.10782 6.44403 6.27629 6.27567C6.44477 6.10731 6.56507 5.8969 6.62469 5.66631L7.67936 1.57631C7.69896 1.50626 7.74095 1.44454 7.7989 1.40057C7.85686 1.35661 7.92761 1.33281 8.00036 1.33281C8.0731 1.33281 8.14385 1.35661 8.20181 1.40057C8.25977 1.44454 8.30175 1.50626 8.32136 1.57631L9.37536 5.66631C9.43488 5.89703 9.55513 6.10758 9.72361 6.27606C9.89209 6.44454 10.1026 6.56479 10.3334 6.62431L14.4234 7.67831C14.4937 7.69771 14.5557 7.73965 14.5999 7.7977C14.6441 7.85574 14.6681 7.92669 14.6681 7.99964C14.6681 8.0726 14.6441 8.14355 14.5999 8.20159C14.5557 8.25964 14.4937 8.30158 14.4234 8.32098L10.3334 9.37498C10.1026 9.4345 9.89209 9.55475 9.72361 9.72323C9.55513 9.89171 9.43488 10.1023 9.37536 10.333L8.32069 14.423C8.30109 14.493 8.2591 14.5548 8.20114 14.5987C8.14319 14.6427 8.07244 14.6665 7.99969 14.6665C7.92695 14.6665 7.8562 14.6427 7.79824 14.5987C7.74028 14.5548 7.6983 14.493 7.67869 14.423L6.62469 10.333Z" fill="${color}" fill-opacity="${opacity}"/></svg>`,
  play: (color: string, opacity: number) =>
    `<svg viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L10.3333 7L1 13V1Z" stroke="${color}" stroke-opacity="${opacity}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  bookmark: (color: string, opacity: number) =>
    `<svg viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.2667 15.6L6.43333 12.2667L0.6 15.6V2.26667C0.6 1.82464 0.775595 1.40072 1.08816 1.08816C1.40072 0.775595 1.82464 0.6 2.26667 0.6H10.6C11.042 0.6 11.466 0.775595 11.7785 1.08816C12.0911 1.40072 12.2667 1.82464 12.2667 2.26667V15.6Z" stroke="${color}" stroke-opacity="${opacity}" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  heart: (color: string, opacity: number) =>
    `<svg viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.7667 9.76667C16.0083 8.55 17.2667 7.09167 17.2667 5.18333C17.2667 3.96776 16.7838 2.80197 15.9242 1.94243C15.0647 1.08289 13.8989 0.6 12.6833 0.6C11.2167 0.6 10.1833 1.01667 8.93333 2.26667C7.68333 1.01667 6.65 0.6 5.18333 0.6C3.96776 0.6 2.80197 1.08289 1.94243 1.94243C1.08289 2.80197 0.6 3.96776 0.6 5.18333C0.6 7.1 1.85 8.55833 3.1 9.76667L8.93333 15.6L14.7667 9.76667Z" stroke="${color}" stroke-opacity="${opacity}" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  lock: (color: string, opacity: number) =>
    `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.66667 6.66667V4.66667C4.66667 3.78261 5.01786 2.93477 5.64298 2.30964C6.2681 1.68452 7.11595 1.33333 8 1.33333C8.88406 1.33333 9.7319 1.68452 10.357 2.30964C10.9821 2.93477 11.3333 3.78261 11.3333 4.66667V6.66667M8.66667 10.6667C8.66667 11.0349 8.36819 11.3333 8 11.3333C7.63181 11.3333 7.33333 11.0349 7.33333 10.6667C7.33333 10.2985 7.63181 10 8 10C8.36819 10 8.66667 10.2985 8.66667 10.6667ZM3.33333 6.66667H12.6667C13.403 6.66667 14 7.26362 14 8V13.3333C14 14.0697 13.403 14.6667 12.6667 14.6667H3.33333C2.59695 14.6667 2 14.0697 2 13.3333V8C2 7.26362 2.59695 6.66667 3.33333 6.66667Z" stroke="${color}" stroke-opacity="${opacity}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  eye: (color: string, opacity: number) =>
    `<svg viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.531253 4.17369C0.489582 4.06143 0.489582 3.93795 0.531253 3.82569C0.937103 2.84162 1.62601 2.00021 2.51064 1.40814C3.39527 0.81607 4.43577 0.5 5.50025 0.5C6.56473 0.5 7.60524 0.81607 8.48987 1.40814C9.37449 2.00021 10.0634 2.84162 10.4693 3.82569C10.5109 3.93795 10.5109 4.06143 10.4693 4.17369C10.0634 5.15776 9.37449 5.99917 8.48987 6.59124C7.60524 7.18331 6.56473 7.49938 5.50025 7.49938C4.43577 7.49938 3.39527 7.18331 2.51064 6.59124C1.62601 5.99917 0.937103 5.15776 0.531253 4.17369Z" stroke="${color}" stroke-opacity="${opacity}" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.50024 5.49963C6.32867 5.49963 7.00024 4.82806 7.00024 3.99963C7.00024 3.17121 6.32867 2.49963 5.50024 2.49963C4.67182 2.49963 4.00024 3.17121 4.00024 3.99963C4.00024 4.82806 4.67182 5.49963 5.50024 5.49963Z" stroke="${color}" stroke-opacity="${opacity}" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
} satisfies Record<DiscoverAssetIconName, (color: string, opacity: number) => string>;

export function DiscoverAssetIcon({
  name,
  color = "#fff",
  height,
  opacity = 1,
  width,
}: DiscoverAssetIconProps) {
  const resolvedWidth = width ?? height ?? 20;
  const resolvedHeight = height ?? width ?? 20;

  return (
    <SvgXml
      xml={iconXml[name](color, opacity)}
      width={resolvedWidth}
      height={resolvedHeight}
    />
  );
}
