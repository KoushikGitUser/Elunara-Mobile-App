import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import { BlurView } from "@react-native-community/blur";
import { Feather } from "@expo/vector-icons";
import { scaleFont } from "../../../../utils/responsive";
import { useDispatch, useSelector } from "react-redux";
import { setToggleRenameChatPopup } from "../../../../redux/slices/toggleSlice";
import { Delete } from "lucide-react-native";
import {
  commonFunctionForAPICalls,
  resetChatTitleUpdated,
} from "../../../../redux/slices/apiCommonSlice";
import { triggerToast } from "../../../../services/toast";

const { width } = Dimensions.get("window");

const RenameChatPopup = () => {
  const inputRef = useRef(null);
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { roomsStates, chatsStates } = useSelector((state) => state.API);
  const dispatch = useDispatch();
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const animatedValue = useState(new Animated.Value(0))[0];
  const [chatName, setChatName] = useState("");

  useEffect(() => {
    if (roomsStates.currentRoom) {
      setChatName(roomsStates.currentRoom.name);
    }
  }, [roomsStates.currentRoom]);

  useEffect(() => {
    const keyboardDidShow = Keyboard.addListener("keyboardDidShow", (e) => {
      const height = e.endCoordinates.height;
      setKeyboardHeight(height);
      Animated.timing(animatedValue, {
        toValue: height / 2.5, // pushes up slightly, not fully
        duration: 250,
        useNativeDriver: false,
      }).start();
    });

    const keyboardDidHide = Keyboard.addListener("keyboardDidHide", () => {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      keyboardDidShow.remove();
      keyboardDidHide.remove();
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 500);
  }, []);

  // Set initial chat name from API data when modal opens
  useEffect(() => {
    if (
      toggleStates.toggleRenameChatPopup &&
      chatsStates.allChatsDatas.currentActionChatDetails?.name
    ) {
      setChatName(chatsStates.allChatsDatas.currentActionChatDetails.name);
    }
  }, [toggleStates.toggleRenameChatPopup]);

  // Handle success case
  useEffect(() => {
    if (chatsStates.loaderStates.isChatTitleUpdated === true) {
      // Refresh recent chats list first (before closing popup)
      const recentChatsPayload = {
        method: "GET",
        url: "/chats/recent?limit=10",
        name: "getAllRecentChats",
      };
      dispatch(commonFunctionForAPICalls(recentChatsPayload));

      // Reset the loader state
      dispatch(resetChatTitleUpdated());

      // Close popup and show toast
      dispatch(setToggleRenameChatPopup(false));
      setTimeout(() => {
        triggerToast(
          "Renamed!",
          "Your chat has been successfully renamed",
          "success",
          3000,
        );
      }, 300);
    }
  }, [chatsStates.loaderStates.isChatTitleUpdated]);
  return (
    <Modal
      visible={toggleStates.toggleRenameChatPopup}
      transparent={true}
      animationType="slide"
      onRequestClose={() => dispatch(setToggleRenameChatPopup(false))}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={[styles.container]}
      >
        {/* Blur Background */}
        <BlurView
          style={styles.blurView}
          blurType="light"
          blurAmount={5}
          reducedTransparencyFallbackColor="rgba(0,0,0,0.4)"
        />
        <View style={styles.androidBlur} />
        <View style={styles.gapFiller} />

        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={0.5}
          onPress={() => {
            dispatch(setToggleRenameChatPopup(false));
          }}
        />
        <TouchableWithoutFeedback onPress={() => {}}>
          <Animated.View
            style={{
              transform: [
                {
                  translateY: animatedValue.interpolate({
                    inputRange: [0, Math.max(keyboardHeight, 1)], // ensure non-zero positive range
                    outputRange: [0, -Math.max(keyboardHeight, 1) * 2.3],
                    extrapolate: "clamp",
                  }),
                },
              ],
            }}
          >
            {/* Modal Sheet */}
            <ScrollView
              contentContainerStyle={[styles.scrollContent]}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.modalSheet}>
                {/* Content */}
                <View style={styles.content}>
                  {/* Title */}

                  <Text style={[styles.title, { fontFamily: "Mukta-Bold" }]}>
                    Rename Chat
                  </Text>
                  <View style={styles.inputSection}>
                    <Text
                      style={[
                        styles.inputLabel,
                        { fontFamily: "Mukta-Regular" },
                      ]}
                    >
                      Rename
                    </Text>
                    <View style={styles.input}>
                      <TextInput
                        ref={inputRef}
                        style={[
                          styles.inputText,
                          { fontFamily: "Mukta-Regular", fontSize: 14 },
                        ]}
                        placeholder="Enter chat name"
                        placeholderTextColor="#9CA3AF"
                        value={chatName}
                        onChangeText={(text) => setChatName(text)}
                        returnKeyType="done"
                      />
                      <Delete
                        onPress={() => {
                          setChatName("");
                        }}
                        color={chatName ? "black" : "lightgrey"}
                        strokeWidth={1.25}
                      />
                    </View>
                  </View>

                  {/* Verify Button */}
                  <TouchableOpacity
                    onPress={() => {
                      if (roomsStates.currentRoom) {
                        const payload = {
                          method: "PUT",
                          url: `/rooms/${roomsStates.currentRoom.uuid || roomsStates.currentRoom.id}`,
                          name: "update-room",
                          data: {
                            name: chatName,
                          },
                        };
                        dispatch(commonFunctionForAPICalls(payload));
                        // Close popup immediately for room updates (old logic)
                        dispatch(setToggleRenameChatPopup(false));
                        setTimeout(() => {
                          triggerToast(
                            "Renamed!",
                            "Your chat has been successfully renamed",
                            "success",
                            3000,
                          );
                        }, 500);
                      } else {
                        // New logic for chats
                        const chatUUID =
                          chatsStates.allChatsDatas.currentActionChatDetails
                            ?.id ||
                          chatsStates.allChatsDatas.createdChatDetails?.id;
                        if (!chatUUID) {
                          triggerToast(
                            "Error",
                            "Chat UUID not found",
                            "error",
                            3000,
                          );
                          return;
                        }

                        const payload = {
                          method: "PUT",
                          url: `/chats/${chatUUID}`,
                          data: { name: chatName },
                          name: "renameAndUpdateChatTitle",
                        };

                        dispatch(commonFunctionForAPICalls(payload));
                      }
                    }}
                    style={[
                      styles.verifyButton,
                      !chatName && styles.verifyButtonDisabled,
                    ]}
                    activeOpacity={0.8}
                    disabled={!chatName}
                  >
                    <Text
                      style={[
                        styles.verifyButtonText,
                        { fontFamily: "Mukta-Regular" },
                      ]}
                    >
                      Done
                    </Text>
                  </TouchableOpacity>

                  {/* Skip for now */}
                  <TouchableOpacity
                    style={[styles.skipButton]}
                    onPress={() => dispatch(setToggleRenameChatPopup(false))}
                    activeOpacity={0.7}
                  ></TouchableOpacity>

                  {/* Note */}
                </View>
              </View>
            </ScrollView>
          </Animated.View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  blurView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  androidBlur: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  gapFiller: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "30%",
    backgroundColor: "white",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  modalSheet: {
    backgroundColor: "#ffffffff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 20,
    marginBottom: 0,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  closeModalMain: {
    width: "100%",
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: scaleFont(26),
    color: "#1F2937",
    marginBottom: 5,
    marginTop: 10,
    lineHeight: 36,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: scaleFont(12),
    lineHeight: 24,
    color: "#6B7280",
    letterSpacing: 0.2,
  },
  inputSection: {
    marginBottom: 24,
    marginTop: 40,
  },
  inputLabel: {
    fontSize: scaleFont(12),
    fontWeight: "400",
    color: "#5E5E5E",
    marginBottom: 8,
    letterSpacing: 0.1,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 5,
    color: "#1F2937",
    letterSpacing: 0.2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputText: {
    backgroundColor: "#FFFFFF",
    fontSize: scaleFont(10),
    color: "#1F2937",
    letterSpacing: 0.2,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 35,
    marginTop: 15,
  },
  otpInput: {
    width: "15%",
    height: 57,
    borderWidth: 1.5,
    borderColor: "#d1d5db",
    borderRadius: 16,
    textAlign: "center",
    fontSize: scaleFont(15),
    fontWeight: "600",
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 80,
  },
  resendText: {
    fontSize: scaleFont(10),
    color: "#6b7280",
  },
  resendLink: {
    fontSize: scaleFont(10),
    fontWeight: "600",
    color: "#111827",
    textDecorationLine: "underline",
  },
  verifyButton: {
    backgroundColor: "#081A35",
    paddingVertical: 13,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  verifyButtonDisabled: {
    backgroundColor: "#CDD5DC",
  },
  verifyButtonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(13),
    fontWeight: "500",
    letterSpacing: 0.3,
  },
  skipButton: {
    alignItems: "center",
    paddingVertical: 12,
    marginBottom: 10,
    marginTop: 30,
  },
  skipButtonText: {
    color: "#0F172A",
    fontSize: scaleFont(10),
    fontWeight: "600",
    textDecorationLine: "underline",
    letterSpacing: 0.2,
  },
  noteContainer: {
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  noteText: {
    fontSize: scaleFont(9),
    lineHeight: 20,
    color: "#6B7280",
    letterSpacing: 0.1,
  },
  noteBold: {
    fontWeight: "700",
    color: "#374151",
    color: "#374151",
  },
});

export default RenameChatPopup;
