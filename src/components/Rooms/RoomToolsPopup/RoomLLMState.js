import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { scaleFont } from "../../../utils/responsive";
import { ArrowLeft } from "lucide-react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  setToggleRoomToolsPopupStates,
  setToggleRoomToolsPopup,
  setSelectedRoomLLM,
} from "../../../redux/slices/toggleSlice";
import { commonFunctionForAPICalls } from "../../../redux/slices/apiCommonSlice";
import { triggerToast } from "../../../services/toast";
import Toaster from "../../UniversalToaster/Toaster";
import gemini from "../../../assets/images/gemini.png";
import anthropic from "../../../assets/images/antropic.png";
import mistral from "../../../assets/images/mistral.png";
import chatgpt from "../../../assets/images/chatgpt.png";
import chakraLogo from "../../../assets/images/chakraFull.png";

const screenHeight = Dimensions.get("window").height;

// Helper function to map provider names to icons
const providerImages = {
  google: gemini,
  anthropic: anthropic,
  "mistral ai": mistral,
  "open ai": chatgpt,
  openai: chatgpt,
};

const getProviderImage = (provider) => {
  const key = provider?.toLowerCase();
  return providerImages[key] || anthropic;
};

// Helper function to generate badge text based on provider
const getBadgeText = (provider) => {
  const key = provider?.toLowerCase();
  const badgeMap = {
    google: "The Knowledge Engine",
    openai: "The Idea Engine",
    "open ai": "The Idea Engine",
    anthropic: "The Thoughtful Engine",
    "mistral ai": "The Logic Engine",
    mistral: "The Logic Engine",
  };
  return badgeMap[key] || "";
};

const RoomLLMState = () => {
  const dispatch = useDispatch();
  const [selectedLLM, setSelectedLLMLocal] = useState(null);
  const { settingsStates, roomsStates } = useSelector((state) => state.API);
  const { roomCustomisationStates } = useSelector((state) => state.Toggle);

  // Fetch LLMs on mount
  useEffect(() => {
    const payload = {
      method: "GET",
      url: "/master/llms",
      name: "fetchLLMsAvailable",
    };
    dispatch(commonFunctionForAPICalls(payload));
  }, []);

  const allLLMs = settingsStates?.settingsMasterDatas?.allLLMsAvailable || [];
  const isLoading = !allLLMs.length;

  // Create auto option + actual LLMs
  const llmOptions = [
    {
      id: null,
      name: "Auto",
      description: "Elunara adjusts tone and style based on your query — from formal to friendly.",
      provider: "chakra",
    },
    ...allLLMs,
  ];

  useEffect(() => {
    if (roomCustomisationStates?.selectedRoomLLM?.id !== undefined) {
      setSelectedLLMLocal(roomCustomisationStates.selectedRoomLLM.id);
    } else {
      setSelectedLLMLocal(null); // Auto
    }
  }, [roomCustomisationStates?.selectedRoomLLM]);

  // Handle LLM selection and update room
  const handleLLMSelection = (llmOption) => {
    const selectedData = {
      id: llmOption.id,
      name: llmOption.name,
    };
    dispatch(setSelectedRoomLLM(selectedData));
    setSelectedLLMLocal(llmOption.id);

    // Update room with selected LLM
    const roomUuid = roomsStates.currentRoom?.uuid;
    if (roomUuid) {
      const payload = {
        method: "PUT",
        url: `/rooms/${roomUuid}`,
        name: "update-room",
        data: {
          llm_id: llmOption.id,
        },
      };
      dispatch(commonFunctionForAPICalls(payload))
        .unwrap()
        .then(() => {
          triggerToast("Success", `LLM set to ${llmOption.name}`, "success", 2000);
        })
        .catch(() => {
          triggerToast("Error", "Failed to update LLM", "error", 3000);
        });
    }
  };

  const RadioButton = ({ selected }) => (
    <View style={[styles.radioOuter, { borderColor: selected ? "black" : "#D3DAE5" }]}>
      {selected && <View style={styles.radioInner} />}
    </View>
  );

  return (
    <View style={styles.modalSheet}>
      <View style={styles.content}>
        <View style={styles.closeModalMain}>
          <TouchableOpacity
            onPress={() => dispatch(setToggleRoomToolsPopupStates(0))}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <ArrowLeft size={30} strokeWidth={2} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => dispatch(setToggleRoomToolsPopup(false))}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={[styles.title, { fontFamily: "Mukta-Bold" }]}>Choose LLM</Text>
        <Text style={[styles.description, { fontFamily: "Mukta-Regular" }]}>
          Select the AI model for your responses - choose based on speed or depth.
        </Text>

        {isLoading ? (
          <View style={{ paddingVertical: 40, alignItems: "center" }}>
            <ActivityIndicator size="small" color="#081A35" />
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.optionsContainer}
          >
            <View style={styles.optionsMain}>
              {llmOptions?.map((llmOption, optionsIndex) => {
                const isAuto = llmOption.id === null;
                const icon = isAuto ? chakraLogo : getProviderImage(llmOption.provider);
                const badgeText = isAuto ? "" : getBadgeText(llmOption.provider);
                const isSelected = selectedLLM === llmOption.id;

                return (
                  <React.Fragment key={llmOption.id || `auto-${optionsIndex}`}>
                    <TouchableOpacity
                      style={[
                        styles.card,
                        {
                          backgroundColor: isSelected ? "#EEF4FF" : "white",
                          borderColor: isSelected ? "black" : "#D3DAE5",
                        },
                      ]}
                      onPress={() => handleLLMSelection(llmOption)}
                      activeOpacity={0.7}
                    >
                      <View style={styles.contentMain}>
                        <View style={styles.iconContainer}>
                          <Image
                            source={icon}
                            style={{ height: 23, width: 23 }}
                          />
                        </View>
                        <View style={styles.textContainer}>
                          <Text
                            style={[
                              styles.optionTitle,
                              { fontSize: scaleFont(18), fontWeight: 600, fontFamily: "Mukta-Bold" },
                            ]}
                          >
                            {llmOption.name}
                          </Text>
                          <Text
                            style={[
                              styles.optionDescription,
                              {
                                fontSize: scaleFont(14),
                                fontWeight: 400,
                                color: "#8F8F8F",
                                fontFamily: "Mukta-Regular",
                              },
                            ]}
                          >
                            {llmOption.description}
                          </Text>
                          {!isAuto && badgeText && (
                            <View style={styles.buttonContainer}>
                              <Text
                                style={{
                                  fontSize: scaleFont(12.5),
                                  fontWeight: 400,
                                  color: "#8F8F8F",
                                  fontFamily: "Mukta-Regular",
                                }}
                              >
                                {badgeText}
                              </Text>
                            </View>
                          )}
                        </View>
                      </View>
                      <RadioButton selected={isSelected} />
                    </TouchableOpacity>
                    {isAuto && allLLMs.length > 0 && (
                      <View style={{ width: "100%" }}>
                        <Text
                          style={{
                            textAlign: "center",
                            color: "#757575",
                            fontSize: scaleFont(15),
                            fontFamily: "Mukta-Regular",
                          }}
                        >
                          Or Select Manually
                        </Text>
                      </View>
                    )}
                  </React.Fragment>
                );
              })}
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalSheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: Platform.OS === "ios" ? 40 : 24,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
    maxHeight: screenHeight * 0.8,
  },
  iconContainer: {
    marginTop: 5,
  },
  closeModalMain: {
    width: "100%",
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: scaleFont(26),
    color: "#1F2937",
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: scaleFont(14),
    lineHeight: 24,
    color: "#6B7280",
    marginBottom: 32,
    letterSpacing: 0.2,
  },
  optionsContainer: {
    maxHeight: screenHeight * 0.55,
    flexDirection: "column",
  },
  optionsMain: {
    flexDirection: "column",
    gap: 25,
    alignItems: "center",
  },
  buttonContainer: {
    backgroundColor: "#F3F3F3",
    width: "auto",
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  card: {
    borderWidth: 1,
    borderColor: "#D3DAE5",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 18,
    backgroundColor: "white",
  },
  contentMain: {
    flexDirection: "row",
    gap: 10,
    width: "85%",
    alignItems: "flex-start",
  },
  textContainer: {
    flexDirection: "column",
    gap: 5,
    alignItems: "flex-start",
  },
  radioOuter: {
    width: 23,
    height: 23,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#D3DAE5",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  radioInner: {
    width: "80%",
    height: "80%",
    borderRadius: 50,
    backgroundColor: "#000000ff",
  },
});

export default RoomLLMState;
