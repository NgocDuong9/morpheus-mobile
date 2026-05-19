import { useId } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Text as SvgText,
} from "react-native-svg";

import { fontFamily as themeFontFamily } from "@/theme/typography";

type TextTransform = "none" | "capitalize" | "uppercase" | "lowercase";

type GradientTitleProps = {
  title: string;
  width?: number;
  height?: number;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: number | string;
  letterSpacing?: number;
  textTransform?: TextTransform;
  style?: StyleProp<ViewStyle>;
};

const DEFAULT_FONT_SIZE = 20;
const DEFAULT_LETTER_SPACING = 2;

function applyTransform(value: string, transform: TextTransform): string {
  if (transform === "uppercase") return value.toUpperCase();
  if (transform === "lowercase") return value.toLowerCase();
  if (transform === "capitalize") {
    return value.replace(
      /\p{L}+/gu,
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    );
  }
  return value;
}

export function GradientTitle({
  title,
  width,
  height,
  fontSize = DEFAULT_FONT_SIZE,
  fontFamily = themeFontFamily.medium,
  fontWeight,
  letterSpacing = DEFAULT_LETTER_SPACING,
  textTransform = "none",
  style,
}: GradientTitleProps) {
  const gradientId = `gradientTitle${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const display = applyTransform(title, textTransform);
  const titleWidth =
    width ?? Math.ceil(display.length * (fontSize * 0.62 + letterSpacing));
  const titleHeight = height ?? Math.ceil(fontSize * 1.2);

  return (
    <Svg
      width={titleWidth}
      height={titleHeight}
      style={style}
      accessibilityLabel={display}
    >
      <Defs>
        <LinearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor="#FFFFFF" />
          <Stop offset="1" stopColor="#999999" />
        </LinearGradient>
      </Defs>
      <SvgText
        x={0}
        y={fontSize * 0.95}
        fill={`url(#${gradientId})`}
        fontFamily={fontFamily}
        fontSize={fontSize}
        fontStyle="normal"
        fontWeight={fontWeight}
        letterSpacing={letterSpacing}
      >
        {display}
      </SvgText>
    </Svg>
  );
}
