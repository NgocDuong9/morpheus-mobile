import { useId } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Text as SvgText,
} from "react-native-svg";

type GradientTitleProps = {
  title: string;
  width?: number;
  height?: number;
  style?: StyleProp<ViewStyle>;
};

const DEFAULT_FONT_SIZE = 20;
const DEFAULT_HEIGHT = 24;
const DEFAULT_LETTER_SPACING = 2;

export function GradientTitle({
  title,
  width,
  height = DEFAULT_HEIGHT,
  style,
}: GradientTitleProps) {
  const gradientId = `gradientTitle${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const titleWidth =
    width ??
    Math.ceil(
      title.length * (DEFAULT_FONT_SIZE * 0.62 + DEFAULT_LETTER_SPACING),
    );

  return (
    <Svg
      width={titleWidth}
      height={height}
      style={style}
      accessibilityLabel={title}
    >
      <Defs>
        <LinearGradient id={gradientId} x1="1" y1="0.536" x2="0" y2="0.464">
          <Stop offset="0.0714" stopColor="#FFFFFF" />
          <Stop offset="0.96" stopColor="#999999" />
        </LinearGradient>
      </Defs>
      <SvgText
        x={0}
        y={19}
        fill={`url(#${gradientId})`}
        fontFamily="SF Pro"
        fontSize={DEFAULT_FONT_SIZE}
        fontStyle="normal"
        fontWeight="540"
        letterSpacing={DEFAULT_LETTER_SPACING}
      >
        {title}
      </SvgText>
    </Svg>
  );
}
