import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { PlatformButton } from "./index.components/PlatformButton";
import { PlatformHandleInput } from "./index.components/PlatformHandleInput";
import { PLATFORMS } from "./index.components/platforms";

export default function Onboarding() {
  const insets = useSafeAreaInsets();
  const [handle, setHandle] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [platformHandles, setPlatformHandles] = useState<
    Record<string, string>
  >({});

  const selectedPlatform = PLATFORMS.find((p) => p.id === selected) ?? null;

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scroll,
            { paddingBottom: insets.bottom + 120 },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.wordmark}>MORPHEUS</Text>

          <Text style={styles.heading}>
            YOUR AI MUSIC{"\n"}OPERATING{" "}
            <Text style={styles.headingBold}>SYSTEM</Text>
          </Text>

          <Text style={styles.label}>Connect your platform</Text>

          <View style={styles.grid}>
            {PLATFORMS.map((p) => (
              <PlatformButton
                key={p.id}
                platform={p}
                isActive={selected === p.id}
                isConnected={(platformHandles[p.id] ?? "").trim().length > 0}
                onPress={() => setSelected(selected === p.id ? null : p.id)}
              />
            ))}
          </View>

          {selectedPlatform && (
            <PlatformHandleInput
              platform={selectedPlatform}
              value={platformHandles[selectedPlatform.id] ?? ""}
              onChangeText={(value) =>
                setPlatformHandles((prev) => ({
                  ...prev,
                  [selectedPlatform.id]: value,
                }))
              }
            />
          )}

          <Text style={[styles.label, styles.labelHandle]}>
            Or drop your handle
          </Text>
          <TextInput
            placeholder="@onlyfuturistic"
            placeholderTextColor="#6b7280"
            value={handle}
            onChangeText={setHandle}
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={[styles.ctaWrap, { bottom: insets.bottom + 16 }]}>
        <Pressable
          onPress={() => {
            const cleaned = handle.trim().replace(/^@/, "");
            router.replace({
              pathname: "/onboarding/scanning",
              params: { handle: cleaned },
            });
          }}
          style={({ pressed }) => [styles.cta, pressed && styles.ctaPressed]}
        >
          <Text style={styles.ctaLabel}>Show Me What You Find</Text>
          <FontAwesome6
            name="arrow-right"
            size={16}
            color="#000"
            iconStyle="solid"
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#000" },
  flex: { flex: 1 },
  scroll: { paddingHorizontal: 24 },
  wordmark: {
    textAlign: "center",
    marginTop: 12,
    fontSize: 16,
    fontWeight: "300",
    letterSpacing: 4,
    color: "#cbd5e1",
  },
  heading: {
    textAlign: "center",
    marginTop: 48,
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "300",
    letterSpacing: 0.5,
    color: "#fff",
  },
  headingBold: { fontWeight: "800" },
  label: { marginTop: 40, marginBottom: 14, fontSize: 13, color: "#94a3b8" },
  labelHandle: { marginTop: 28 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  input: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    fontSize: 15,
    color: "#fff",
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  ctaWrap: { position: "absolute", left: 24, right: 24 },
  cta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 999,
    backgroundColor: "#fff",
  },
  ctaPressed: { opacity: 0.85 },
  ctaLabel: { fontSize: 16, fontWeight: "600", color: "#000" },
});
