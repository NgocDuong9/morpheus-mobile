import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Text as SvgText,
} from "react-native-svg";

import { colors } from "@/theme/colors";

interface Props {
  currentIndex: number;
  total: number;
}

const WORDMARK_WIDTH = 156;
const WORDMARK_HEIGHT = 24;

export function ProfileHeader({ currentIndex, total }: Props) {
  const pageLabel = `2/5`;

  return (
    <View style={styles.row}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          style={styles.backBtn}
        >
          <FontAwesome6
            name="arrow-left"
            size={18}
            color={colors.text.muted}
            iconStyle="solid"
          />
        </Pressable>
        <Svg width={WORDMARK_WIDTH} height={WORDMARK_HEIGHT}>
          <Defs>
            <LinearGradient
              id="wordmarkGrad"
              x1="1"
              y1="0.536"
              x2="0"
              y2="0.464"
            >
              <Stop offset="0.0714" stopColor="#FFFFFF" />
              <Stop offset="0.96" stopColor="#999999" />
            </LinearGradient>
          </Defs>
          <SvgText
            x={WORDMARK_WIDTH / 2}
            y={18}
            fill="url(#wordmarkGrad)"
            fontSize={20}
            fontWeight="500"
            letterSpacing={2}
            textAnchor="middle"
          >
            MORPHEUS
          </SvgText>
        </Svg>
      </View>
      <Text style={styles.page}>{pageLabel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  backBtn: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  page: {
    color: colors.text.secondary,
    fontSize: 13,
    fontWeight: "500",
    width: 50,
    textAlign: "right",
  },
});
