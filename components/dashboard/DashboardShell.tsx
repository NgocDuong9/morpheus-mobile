import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Keyboard,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { GradientTitle } from "@/components/GradientTitle";

import { FontAwesome6, Octicons } from "@expo/vector-icons";
import { DashboardIcon, MessageCircleMoreIcon } from "./DashboardIcon";
import { useDashboardScroll } from "./DashboardScrollContext";
import { DashboardZoomScene } from "./DashboardZoomScene";
import { dashboardTabs } from "./data";
import type { DashboardTabKey } from "./types";

type DashboardShellProps = {
  activeTab: DashboardTabKey;
  children: ReactNode;
};

export function DashboardShell({ activeTab, children }: DashboardShellProps) {
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const scrollCtx = useDashboardScroll();

  useEffect(() => {
    if (!scrollCtx) return;
    return scrollCtx.register(activeTab, (animated) => {
      scrollRef.current?.scrollTo({ y: 0, animated });
    });
  }, [scrollCtx, activeTab]);

  return (
    <SafeAreaView style={shellStyles.safe} edges={["top"]}>
      <DashboardZoomScene>
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            shellStyles.scroll,
            { paddingBottom: insets.bottom + 140 },
          ]}
        >
          {children}
        </ScrollView>
      </DashboardZoomScene>

      <DashboardBottomDock activeTab={activeTab} bottomInset={insets.bottom} />
    </SafeAreaView>
  );
}

export function DashboardBottomDock({
  activeTab,
  bottomInset = 0,
  showMorpheusButton = true,
}: {
  activeTab: DashboardTabKey;
  bottomInset?: number;
  showMorpheusButton?: boolean;
}) {
  const [isMorpheusChatOpen, setMorpheusChatOpen] = useState(false);
  const scrollCtx = useDashboardScroll();

  return (
    <>
      <View
        style={[shellStyles.bottomDock, { paddingBottom: bottomInset + 8 }]}
      >
        {showMorpheusButton && (
          <Pressable
            style={shellStyles.morpheusButton}
            onPress={() => setMorpheusChatOpen(true)}
          >
            <Octicons name="sparkle" size={24} color="#080808" />
          </Pressable>
        )}

        <View style={shellStyles.bottomNav}>
          {dashboardTabs.map((item) => {
            const isActive = item.key === activeTab;

            return (
              <Pressable
                key={item.key}
                style={shellStyles.navItem}
                onPress={() => {
                  if (isActive) {
                    scrollCtx?.scrollToTop(item.key, true);
                    return;
                  }
                  scrollCtx?.scrollToTop(item.key, false);
                  router.push(item.href);
                }}
              >
                <DashboardIcon
                  name={item.icon}
                  size={20}
                  color={isActive ? "#fff" : "rgba(255,255,255,0.56)"}
                />
                <Text
                  style={[
                    shellStyles.navLabel,
                    isActive && shellStyles.navLabelActive,
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <View style={shellStyles.homeIndicator} />
      </View>

      <MorpheusChatModal
        visible={isMorpheusChatOpen}
        onClose={() => setMorpheusChatOpen(false)}
      />
    </>
  );
}

export function DashboardTopHeader({
  kicker = "Tuesday · 23:14 · cloudy",
  title = "Morning Futuristic",
  titleWidth = 236,
}: {
  kicker?: string;
  title?: string;
  titleWidth?: number;
}) {
  return (
    <View style={shellStyles.header}>
      <View>
        <Text style={shellStyles.kicker}>{kicker}</Text>
        <GradientTitle
          title={title}
          width={titleWidth}
          style={shellStyles.title}
        />
      </View>

      <View style={shellStyles.headerActions}>
        <Feather name="bell" size={20} color="#fff" />
        <Feather name="search" size={20} color="#fff" />
        <MessageCircleMoreIcon color="#fff" />
      </View>
    </View>
  );
}

export function SectionHeader({
  title,
  action,
}: {
  title: string;
  action: string;
}) {
  return (
    <View style={shellStyles.sectionHeader}>
      <Text style={shellStyles.sectionTitle}>{title}</Text>
      <View style={shellStyles.sectionAction}>
        <Text style={shellStyles.sectionActionText}>{action}</Text>
        <View style={shellStyles.actionLine} />
      </View>
    </View>
  );
}

export function HorizontalRail({ children }: { children: ReactNode }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={shellStyles.horizontalList}
    >
      {children}
    </ScrollView>
  );
}

export function EmptyTabScreen({
  activeTab,
  title,
}: {
  activeTab: DashboardTabKey;
  title: string;
}) {
  return (
    <DashboardShell activeTab={activeTab}>
      <DashboardTopHeader />
      <View style={shellStyles.emptyState}>
        <Text style={shellStyles.emptyTitle}>{title}</Text>
        <Text style={shellStyles.emptyCopy}>
          Layout shell is ready for this tab.
        </Text>
      </View>
    </DashboardShell>
  );
}

function MorpheusChatModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const insets = useSafeAreaInsets();
  const { height: windowHeight } = useWindowDimensions();
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const sheetHeight = Math.min(684, windowHeight - 76);
  const updateKeyboardOffset = useCallback((height: number) => {
    setKeyboardOffset(Math.max(0, height + 8));
  }, []);

  useEffect(() => {
    if (!visible) {
      setKeyboardOffset(0);
      return;
    }

    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const showSubscription = Keyboard.addListener(showEvent, (event) => {
      updateKeyboardOffset(event.endCoordinates.height);
    });
    const hideSubscription = Keyboard.addListener(hideEvent, () => {
      setKeyboardOffset(0);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [updateKeyboardOffset, visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      presentationStyle="overFullScreen"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={shellStyles.modalRoot}>
        <Pressable style={shellStyles.modalBackdrop} onPress={onClose} />
        <View
          style={[
            shellStyles.chatStack,
            { transform: [{ translateY: -keyboardOffset }] },
          ]}
        >
          <Pressable style={shellStyles.chatFloatingButton} onPress={onClose}>
            <Octicons name="sparkle" size={22} color="#080808" />
          </Pressable>

          <View
            style={[
              shellStyles.chatSheet,
              {
                height: sheetHeight,
                paddingBottom: Math.max(insets.bottom, 8),
              },
            ]}
          >
            <View style={shellStyles.chatHeader}>
              <View style={shellStyles.chatHeaderText}>
                <Text style={shellStyles.chatTitle}>Morpheus</Text>
                <Text style={shellStyles.chatSubtitle}>8 agents · running</Text>
              </View>
              <Pressable style={shellStyles.chatMoreButton}>
                <Feather name="more-horizontal" size={18} color="#fff" />
              </Pressable>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={shellStyles.chatMessages}
            >
              <View style={shellStyles.summaryCard}>
                <View style={shellStyles.summaryTop}>
                  <Text style={shellStyles.summaryNumber}>14</Text>
                  <View style={shellStyles.summaryRight}>
                    <Text style={shellStyles.summaryMuted}>
                      Tasks completed
                    </Text>
                    <Text style={shellStyles.summaryToday}>Today</Text>
                  </View>
                </View>
                <Text style={shellStyles.summaryCopy}>
                  3 posts scheduled · 2 emails replied · 1 collab pitched · 8
                  streams analyzed
                </Text>
              </View>

              <Text style={shellStyles.botMessage}>
                Morning. Your Osaka post hit +18% engagement overnight. Want me
                to draft 2 more for the Japan run?
              </Text>

              <View style={shellStyles.userMessageWrap}>
                <View style={shellStyles.userBubble}>
                  <Text style={shellStyles.bubbleText}>
                    {"Why didn't yesterday's TikTok hit?"}
                  </Text>
                </View>
              </View>

              <Text style={shellStyles.botMessage}>
                Hook came in at 1.2s. Your tier hits at 0.4s. 62% of viewers
                swiped past in the first 3 seconds.
              </Text>

              <View style={shellStyles.postCard}>
                <View style={shellStyles.postHeader}>
                  <View style={shellStyles.postTime}>
                    <Feather name="clock" size={16} color="#fff" />
                    <Text style={shellStyles.postTimeText}>Fri 8 AM</Text>
                  </View>
                  <View style={shellStyles.platformPill}>
                    <View style={shellStyles.tiktokDot}>
                      <FontAwesome6
                        name="tiktok"
                        size={11}
                        color="#080808"
                        iconStyle="brand"
                      />
                    </View>
                    <Text style={shellStyles.platformPillText}>Tiktok</Text>
                  </View>
                </View>

                <LinearGradient
                  colors={["#521027", "#a21955", "#2a1439"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={shellStyles.videoPreview}
                >
                  <View style={shellStyles.videoBadge}>
                    <Feather name="video" size={14} color="#fff" />
                    <Text style={shellStyles.videoBadgeText}>Short Video</Text>
                  </View>
                  <View style={shellStyles.playButton}>
                    <Feather name="play" size={22} color="#fff" />
                  </View>
                </LinearGradient>

                <View style={shellStyles.postBody}>
                  <Text style={shellStyles.postTitle}>Wake up Osaka</Text>
                  <Text style={shellStyles.postDescription}>
                    {'"Late night drive Dotonbori" · JP caption · 9 PM JST'}
                  </Text>
                  <Text style={shellStyles.postTags}>
                    #newmusic #bts #morpheusai
                  </Text>
                </View>

                <View style={shellStyles.postActions}>
                  <Pressable style={shellStyles.approveButton}>
                    <Text style={shellStyles.approveButtonText}>Approve</Text>
                  </Pressable>
                  <Pressable style={shellStyles.iconActionButton}>
                    <Feather name="edit-2" size={16} color="#fff" />
                  </Pressable>
                  <Pressable style={shellStyles.iconActionButton}>
                    <Feather name="x" size={18} color="#fff" />
                  </Pressable>
                </View>
              </View>

              <View style={shellStyles.userMessageWrap}>
                <View
                  style={[shellStyles.userBubble, shellStyles.userBubbleStrong]}
                >
                  <Text style={shellStyles.bubbleText}>
                    Make me a post for Osaka tonight
                  </Text>
                </View>
              </View>

              <Text style={shellStyles.botMessage}>
                Drafted. Pulled trending JP hashtags + your strongest visual
                style.
              </Text>
            </ScrollView>

            <View style={shellStyles.inputDock}>
              <View style={shellStyles.chatInput}>
                <TextInput
                  placeholder="Ask the booker..."
                  placeholderTextColor="rgba(255,255,255,0.64)"
                  style={shellStyles.chatInputText}
                  onFocus={() => {
                    setTimeout(() => {
                      const metrics = Keyboard.metrics?.();
                      if (metrics) {
                        updateKeyboardOffset(metrics.height);
                      }
                    }, 100);
                  }}
                />
                <Pressable style={shellStyles.inputIconButton}>
                  <Feather name="mic" size={20} color="#fff" />
                </Pressable>
                <Pressable style={shellStyles.sendButton}>
                  <Feather name="send" size={19} color="#080808" />
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const shellStyles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#080808" },
  scroll: { paddingTop: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  kicker: {
    color: "rgba(255,255,255,0.64)",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "200",
  },
  title: {
    marginTop: 8,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingTop: 2,
  },
  sectionHeader: {
    marginTop: 32,
    marginBottom: 20,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "200",
  },
  sectionAction: { flexDirection: "row", alignItems: "center", gap: 4 },
  sectionActionText: {
    color: "rgba(255,255,255,0.48)",
    fontSize: 12,
    lineHeight: 16,
  },
  actionLine: {
    width: 12,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.48)",
  },
  horizontalList: { paddingHorizontal: 16, gap: 16 },
  bottomDock: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    paddingTop: 8,
  },
  morpheusButton: {
    position: "absolute",
    top: -56,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  morpheusMark: { color: "#080808", fontSize: 18, fontWeight: "900" },
  bottomNav: {
    width: "92%",
    height: 68,
    borderRadius: 34,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.64)",
    backgroundColor: "#1b1b1b",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  navItem: { flex: 1, alignItems: "center", justifyContent: "center", gap: 4 },
  navLabel: { color: "rgba(255,255,255,0.56)", fontSize: 11, lineHeight: 14 },
  navLabelActive: { color: "#fff" },
  homeIndicator: {
    width: 112,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#bebebe",
    marginTop: 12,
  },
  emptyState: {
    marginHorizontal: 16,
    minHeight: 220,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: "rgba(255,255,255,0.04)",
    padding: 20,
    justifyContent: "center",
  },
  emptyTitle: {
    color: "#fff",
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "700",
  },
  emptyCopy: {
    color: "rgba(255,255,255,0.56)",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  modalRoot: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  chatStack: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    alignItems: "center",
    gap: 20,
  },
  chatFloatingButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.64)",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  chatSheet: {
    width: "100%",
    maxHeight: 684,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: "#202020",
    overflow: "hidden",
  },
  chatHeader: {
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.04)",
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  chatHeaderText: {
    flex: 1,
    gap: 4,
  },
  chatTitle: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "400",
  },
  chatSubtitle: {
    color: "rgba(255,255,255,0.56)",
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "300",
  },
  chatMoreButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  chatMessages: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 96,
    gap: 24,
  },
  summaryCard: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    backgroundColor: "rgba(255,255,255,0.04)",
    padding: 17,
    gap: 10,
  },
  summaryTop: {
    minHeight: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  summaryNumber: {
    color: "#9aff5b",
    fontSize: 40,
    lineHeight: 48,
    fontWeight: "900",
    letterSpacing: 0.8,
  },
  summaryRight: {
    alignItems: "flex-end",
  },
  summaryMuted: {
    color: "#9a9a9e",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "300",
  },
  summaryToday: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "300",
  },
  summaryCopy: {
    color: "rgba(255,255,255,0.56)",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "300",
  },
  botMessage: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "300",
  },
  userMessageWrap: {
    width: "100%",
    alignItems: "flex-end",
  },
  userBubble: {
    maxWidth: 310,
    borderRadius: 16,
    borderBottomRightRadius: 0,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
    backgroundColor: "rgba(255,255,255,0.04)",
    padding: 16,
  },
  userBubbleStrong: {
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  bubbleText: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "300",
  },
  postCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: "rgba(255,255,255,0.08)",
    padding: 16,
    gap: 16,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  postTime: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  postTimeText: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
  },
  platformPill: {
    height: 24,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  tiktokDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  platformPillText: {
    color: "#fff",
    fontSize: 12,
    lineHeight: 16,
  },
  videoPreview: {
    height: 208,
    borderRadius: 14,
    overflow: "hidden",
  },
  videoBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    borderRadius: 50,
    backgroundColor: "rgba(255,255,255,0.24)",
    paddingHorizontal: 9,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  videoBadgeText: {
    color: "#fff",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  playButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 48,
    height: 48,
    marginLeft: -24,
    marginTop: -24,
    borderRadius: 24,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  postBody: {
    gap: 4,
  },
  postTitle: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "700",
  },
  postDescription: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 20,
  },
  postTags: {
    color: "#65e2fb",
    fontSize: 12,
    lineHeight: 16,
  },
  postActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  approveButton: {
    flex: 1,
    height: 40,
    borderRadius: 50,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  approveButtonText: {
    color: "#171a1f",
    fontSize: 13,
    lineHeight: 24,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  iconActionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
  },
  inputDock: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.08)",
    backgroundColor: "rgba(32,32,32,0.92)",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  chatInput: {
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "rgba(255,255,255,0.07)",
    paddingLeft: 20,
    paddingRight: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    shadowColor: "#4b3425",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
  },
  chatInputText: {
    flex: 1,
    color: "#fff",
    fontSize: 14,
    lineHeight: 20,
    paddingVertical: 0,
  },
  inputIconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
