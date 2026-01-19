import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  Platform,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { BlurView } from "@react-native-community/blur";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  setToggleChangeResponseLLMWhileChatPopup,
  setSelectedLLM,
} from "../../../../../redux/slices/toggleSlice";
import { scaleFont, moderateScale } from "../../../../../utils/responsive";
import { ArrowRightLeft, ChevronRight } from "lucide-react-native";
import CompareLLMOrStyleState from "../CompareLLMOrStyleState";
import SettingLLMState from "./SettingLLMState";
import IntegtrateAiState from "./IntegtrateAiState";
import FindAPIKeyState from "./FindAPIKeyState";
import { commonFunctionForAPICalls } from "../../../../../redux/slices/apiCommonSlice";
import gemini from "../../../../../assets/images/gemini.png";
import anthropic from "../../../../../assets/images/antropic.png";
import mistral from "../../../../../assets/images/mistral.png";
import chatgpt from "../../../../../assets/images/chatgpt.png";
import chakraLogo from "../../../../../assets/images/chakraFull.png";

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

const ChangeLLMPopup = () => {
  const { toggleStates, chatCustomisationStates } = useSelector((state) => state.Toggle);
  const { settingsStates } = useSelector((state) => state.API);
  const { globalDataStates } = useSelector((state) => state.Global);
  const dispatch = useDispatch();
  const [selectedStyle, setSelectedStyle] = useState(0);
  const [currentStateOfPopup, setCurrentStateOfPopup] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [selectedLLMsForCompare, setSelectedLLMsForCompare] = useState([]);
  const SCREEN_HEIGHT = Dimensions.get("window").height;

  // Fetch general settings and LLMs on mount
  useEffect(() => {
    const generalSettingsPayload = {
      method: "GET",
      url: "/settings/general",
      name: "getAllGeneralSettings",
    };
    const llmsPayload = {
      method: "GET",
      url: "/master/llms",
      name: "getAllLLMsAvailable",
    };
    dispatch(commonFunctionForAPICalls(generalSettingsPayload));
    dispatch(commonFunctionForAPICalls(llmsPayload));
  }, []);

  // Check if LLM preferences exist and skip to state 2 if they do
  useEffect(() => {
    const llmPreferences = settingsStates?.allGeneralSettings?.preferredLLMs;
    if (llmPreferences && (llmPreferences.preferred_llm_1 || llmPreferences.preferred_llm_2 || llmPreferences.preferred_llm_3)) {
      setCurrentStateOfPopup(2);
    }
  }, [settingsStates?.allGeneralSettings?.preferredLLMs]);

  // Initialize selected LLM from Redux state
  useEffect(() => {
    if (chatCustomisationStates?.selectedLLM?.id) {
      const index = allLLMOptions.findIndex(
        (option) => option.id === chatCustomisationStates.selectedLLM.id
      );
      if (index !== -1) {
        setSelectedStyle(index);
      }
    } else {
      setSelectedStyle(0);
    }
  }, [chatCustomisationStates?.selectedLLM]);

  // Handle LLM selection
  const handleLLMSelection = (llmOption, index) => {
    setSelectedStyle(index);
    const selectedData = {
      id: llmOption.id === "auto" ? null : llmOption.id,
      name: llmOption.name,
    };
    dispatch(setSelectedLLM(selectedData));

    // Get the AI message UUID for regeneration using the stored index
    const aiMessageIndex = globalDataStates.currentAIMessageIndexForRegeneration;
    const aiMessageUuid = globalDataStates.messageIDsArray[aiMessageIndex];
    console.log("Message Index:", aiMessageIndex, "Message UUID:", aiMessageUuid);

    if (aiMessageUuid) {
      // Build customisations payload
      const customisationsPayload = {
        llm_id: llmOption.id === "auto" ? null : llmOption.id,
        response_style_id: chatCustomisationStates.selectedResponseStyle?.id,
        language_id: chatCustomisationStates.selectedLanguage?.id,
        citation_format_id: chatCustomisationStates.selectedCitationFormat?.id,
      };

      // Call regenerate API
      const regeneratePayload = {
        method: "POST",
        url: `/messages/${aiMessageUuid}/regenerate`,
        data: customisationsPayload,
        name: "regenerateAIResponse",
      };

      dispatch(commonFunctionForAPICalls(regeneratePayload));
    }
    else{
      console.log("cannot trigger");
    }

    // Close the popup
    dispatch(setToggleChangeResponseLLMWhileChatPopup(false));
  };

  // Radio button component
  const RadioButton = ({ selected }) => (
    <View style={[styles.radioOuter, { borderColor: selected ? "black" : "#D3DAE5" }]}>
      {selected && <View style={styles.radioInner} />}
    </View>
  );

  // Checkbox component
  const Checkbox = ({ selected }) => (
    <View style={[styles.checkboxOuter, { borderColor: selected ? "black" : "#D3DAE5", backgroundColor: selected ? "black" : "white" }]}>
      {selected && (
        <AntDesign name="check" size={14} color="white" />
      )}
    </View>
  );

  // Handle checkbox selection for compare
  const handleCompareSelection = (llmOption, optionsIndex) => {
    const isSelected = selectedLLMsForCompare.some(item => item.id === llmOption.id);

    if (isSelected) {
      // Remove from selection
      setSelectedLLMsForCompare(selectedLLMsForCompare.filter(item => item.id !== llmOption.id));
    } else {
      // Add to selection if less than 2 selected
      if (selectedLLMsForCompare.length < 2) {
        setSelectedLLMsForCompare([...selectedLLMsForCompare, llmOption]);
      }
    }
  };

  // Combine Auto option with LLMs from API
  const allLLMOptions = [
    {
      id: "auto",
      icon: chakraLogo,
      name: "Auto",
      description: "Elunara adjusts tone and style based on your query — from formal to friendly.",
      provider: "chakra",
    },
    ...(settingsStates.settingsMasterDatas.allLLMsAvailable || []),
  ];

  return (
    <Modal
      visible={toggleStates.toggleChangeResponseLLMWhileChatPopup}
      transparent={true}
      animationType="slide"
      onRequestClose={() =>
        dispatch(setToggleChangeResponseLLMWhileChatPopup(false))
      }
    >
      <View style={styles.container}>
        {/* Blur Background */}

        <BlurView
          style={styles.blurView}
          blurType="light"
          blurAmount={7}
          reducedTransparencyFallbackColor="rgba(0, 0, 0, 0.43)"
        />
        <View style={styles.androidBlur} />

        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={() =>
            dispatch(setToggleChangeResponseLLMWhileChatPopup(false))
          }
        />
        {currentStateOfPopup == 1 ? (
          <SettingLLMState setCurrentStateOfPopup={setCurrentStateOfPopup} />
        ) : currentStateOfPopup == 2 ? (
          <View style={styles.modalSheet}>
            <View style={styles.content}>
              <View style={styles.closeModalMain}>
                <AntDesign
                  onPress={() => dispatch(setToggleChangeResponseLLMWhileChatPopup(false))}
                  name="close"
                  size={24}
                  color="black"
                />
              </View>

              {/* Current LLM Banner */}
              <View style={styles.currentLLMMain}>
                <Text style={styles.currentResponse}>Current Response LLM</Text>
                <TouchableOpacity style={styles.currentLLMBadge}>
                  <Text style={styles.currentLLMBadgeText}>
                    {chatCustomisationStates.selectedLLM?.name || "Auto"}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Category Selection Tabs */}
              <View style={styles.categorySections}>
                <TouchableOpacity
                  onPress={() => setSelectedCategory(1)}
                  style={[
                    styles.sections,
                    {
                      borderColor: selectedCategory == 1 ? "black" : "#E2E2E2",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.sectionText,
                      {
                        color: selectedCategory == 1 ? "black" : "#757575",
                        fontWeight: selectedCategory == 1 ? 600 : 400,
                        fontSize: scaleFont(13),
                        fontFamily: selectedCategory == 1 ? "Mukta-Bold" : "Mukta-Regular",
                      },
                    ]}
                  >
                    Select Another
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setSelectedCategory(2)}
                  style={[
                    styles.sections,
                    {
                      borderColor: selectedCategory == 2 ? "black" : "#E2E2E2",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.sectionText,
                      {
                        color: selectedCategory == 2 ? "black" : "#757575",
                        fontWeight: selectedCategory == 2 ? 600 : 400,
                        fontSize: scaleFont(13),
                        fontFamily: selectedCategory == 2 ? "Mukta-Bold" : "Mukta-Regular",
                      },
                    ]}
                  >
                    Compare Responses
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Description */}
              <Text style={[styles.description, { fontFamily: "Mukta-Regular" }]}>
                {selectedCategory == 1
                  ? "Update the current answer by selecting a different LLM"
                  : "Select multiple LLMs to compare their responses side by side"}
              </Text>

              {selectedCategory == 1 ? (
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={{ maxHeight: SCREEN_HEIGHT * 0.55 }}
                >
                <View style={styles.optionsMain}>
                  {allLLMOptions?.map((option, optionsIndex) => {
                    const isAuto = option.id === "auto";
                    const icon = isAuto ? option.icon : getProviderImage(option.provider);
                    const badgeText = isAuto ? "" : getBadgeText(option.provider);

                    return (
                      <React.Fragment key={option.id || optionsIndex}>
                        <TouchableOpacity
                          style={[
                            styles.card,
                            {
                              backgroundColor: selectedStyle == optionsIndex ? "#EEF4FF" : "white",
                              borderColor: selectedStyle == optionsIndex ? "black" : "#D3DAE5",
                            },
                          ]}
                          onPress={() => handleLLMSelection(option, optionsIndex)}
                          activeOpacity={0.7}
                        >
                          <View style={styles.contentMain}>
                            <View style={styles.iconContainer}>
                              <Image source={icon} style={{ height: 23, width: 23 }} />
                            </View>
                            <View style={styles.textContainer}>
                              <Text
                                style={[
                                  styles.optionTitle,
                                  { fontSize: scaleFont(18), fontWeight: 600, fontFamily: "Mukta-Bold" },
                                ]}
                              >
                                {option.name}
                              </Text>
                              <Text
                                style={[
                                  styles.optionDescription,
                                  {
                                    fontSize: scaleFont(14),
                                    fontWeight: 400,
                                    color: "#8F8F8F",
                                    fontFamily: "Mukta-Regular"
                                  },
                                ]}
                              >
                                {option.description}
                              </Text>
                              {!isAuto && badgeText && (
                                <View style={styles.buttonContainer}>
                                  <Text
                                    style={{
                                      fontSize: scaleFont(12.5),
                                      fontWeight: 400,
                                      color: "#8F8F8F",
                                      fontFamily: "Mukta-Regular"
                                    }}
                                  >
                                    {badgeText}
                                  </Text>
                                </View>
                              )}
                            </View>
                          </View>
                          <RadioButton selected={selectedStyle === optionsIndex} />
                        </TouchableOpacity>
                        {isAuto && (
                          <View style={{ width: "100%" }}>
                            <Text
                              style={{
                                textAlign: "center",
                                color: "#757575",
                                fontSize: scaleFont(15),
                                fontFamily: "Mukta-Regular"
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

                <TouchableOpacity
                  onPress={() => setCurrentStateOfPopup(4)}
                  style={[
                    styles.card,
                    {
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      gap: 15,
                      marginTop: 25,
                      marginBottom: 25,
                      backgroundColor: "#F3F3F3",
                    },
                  ]}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 15,
                      }}
                    >
                      <ArrowRightLeft strokeWidth={1.25} />
                      <Text
                        style={{
                          fontSize: moderateScale(15),
                          fontWeight: 600,
                          fontFamily: "Mukta-Bold"
                        }}
                      >
                        Integrate Your AI account
                      </Text>
                    </View>
                    <ChevronRight size={30} strokeWidth={1.25} />
                  </View>
                  <Text style={{ fontSize: scaleFont(13), color: "#757575", fontFamily: "Mukta-Regular" }}>
                    Link your account to tailor responses and enjoy the benefits of your subscription.
                  </Text>
                </TouchableOpacity>
              </ScrollView>
              ) : (
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={{ maxHeight: SCREEN_HEIGHT * 0.55 }}
                >
                  <View style={styles.optionsMain}>
                    {allLLMOptions?.filter(opt => opt.id !== "auto")?.map((option, optionsIndex) => {
                      const icon = getProviderImage(option.provider);
                      const badgeText = getBadgeText(option.provider);
                      const isSelected = selectedLLMsForCompare.some(item => item.id === option.id);

                      return (
                        <TouchableOpacity
                          key={option.id || optionsIndex}
                          style={[
                            styles.card,
                            {
                              backgroundColor: isSelected ? "#EEF4FF" : "white",
                              borderColor: isSelected ? "black" : "#D3DAE5",
                            },
                          ]}
                          onPress={() => handleCompareSelection(option, optionsIndex)}
                          activeOpacity={0.7}
                        >
                          <View style={styles.contentMain}>
                            <View style={styles.iconContainer}>
                              <Image source={icon} style={{ height: 23, width: 23 }} />
                            </View>
                            <View style={styles.textContainer}>
                              <Text
                                style={[
                                  styles.optionTitle,
                                  { fontSize: scaleFont(18), fontWeight: 600, fontFamily: "Mukta-Bold" },
                                ]}
                              >
                                {option.name}
                              </Text>
                              <Text
                                style={[
                                  styles.optionDescription,
                                  {
                                    fontSize: scaleFont(14),
                                    fontWeight: 400,
                                    color: "#8F8F8F",
                                    fontFamily: "Mukta-Regular"
                                  },
                                ]}
                              >
                                {option.description}
                              </Text>
                              {badgeText && (
                                <View style={styles.buttonContainer}>
                                  <Text
                                    style={{
                                      fontSize: scaleFont(12.5),
                                      fontWeight: 400,
                                      color: "#8F8F8F",
                                      fontFamily: "Mukta-Regular"
                                    }}
                                  >
                                    {badgeText}
                                  </Text>
                                </View>
                              )}
                            </View>
                          </View>
                          <Checkbox selected={isSelected} />
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </ScrollView>
              )}

              {/* Compare Button */}
              {selectedCategory == 2 && (
                <TouchableOpacity
                  style={[
                    styles.button,
                    {
                      backgroundColor: selectedLLMsForCompare.length === 2 ? "#081A35" : "#CDD5DC",
                      marginTop: 20,
                    },
                  ]}
                  onPress={() => {
                    if (selectedLLMsForCompare.length === 2) {
                      setCurrentStateOfPopup(3);
                    }
                  }}
                  activeOpacity={0.8}
                  disabled={selectedLLMsForCompare.length !== 2}
                >
                  <Text style={[styles.buttonText, { fontFamily: "Mukta-Regular" }]}>
                    Compare LLMs ({selectedLLMsForCompare.length}/2)
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ) : currentStateOfPopup == 3 ? (
          <CompareLLMOrStyleState setCurrentStateOfPopup={setCurrentStateOfPopup} forStyleOrLLM="LLM" />
        ) : currentStateOfPopup == 4 ? (
          <IntegtrateAiState setCurrentStateOfPopup={setCurrentStateOfPopup} />
        ) : (
          <FindAPIKeyState setCurrentStateOfPopup={setCurrentStateOfPopup} />
        )}
        {/* Modal Sheet */}
      </View>
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
    backgroundColor: "rgba(0, 0, 0, 0.18)",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalSheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: Platform.OS === "ios" ? 40 : 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 20,
  },
  btnsMain: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  verifiedIcon: {
    height: 55,
    width: 50,
    objectFit: "contain",
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  iconContainer: {
    marginBottom: 10,
  },
  title: {
    fontSize: scaleFont(25),
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: scaleFont(12),
    lineHeight: 24,
    color: "#6B7280",
    marginBottom: 18,
    letterSpacing: 0.2,
  },
  button: {
    width: "100%",
    backgroundColor: "#081A35",
    paddingVertical: 13,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(12),
    fontWeight: "500",
    letterSpacing: 0.3,
  },
  featuresList: {
    gap: 10,
    marginBottom: 30,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 12,
  },
  featureText: {
    fontSize: scaleFont(13),
    lineHeight: 24,
    color: "#1F2937",
    fontWeight: "500",
    flex: 1,
    paddingTop: 1,
  },
  cardsContainer: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
    marginBottom: 55,
  },
  priceCard: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    borderRadius: 20,
    padding: 13,
    borderWidth: 2,
    borderColor: "#D3DAE5",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedCard: {
    backgroundColor: "#EEF4FF",
    borderColor: "#081A35",
  },
  checkBadge: {
    position: "absolute",
    top: -17,
    right: 20,
    transform: [{ translateX: 12 }],
    width: 27,
    height: 27,
    borderRadius: 16,
    backgroundColor: "#081A35",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#ffffff",
  },
  saveBadge: {
    position: "absolute",
    top: -15,
    right: 15,
    backgroundColor: "#F3ECFF",
    borderWidth: 1,
    borderColor: "#7D1DE4",
    paddingHorizontal: 14,
    paddingVertical: 2,
    borderRadius: 20,
  },
  saveText: {
    color: "#7D1DE4",
    fontSize: 10,
    fontWeight: "600",
  },
  priceText: {
    fontSize: scaleFont(12.5),
    fontWeight: "600",
    color: "#1F2937",
    textAlign: "center",
  },
  periodText: {
    fontSize: scaleFont(12.5),
    fontWeight: "600",
    color: "#1F2937",
    textAlign: "center",
  },
  closeModalMain: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  categorySections: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  sectionText: {
    color: "#757575",
  },
  sections: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 2,
    borderColor: "lightgrey",
    paddingVertical: 10,
  },
  categorySections: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  sectionText: {
    color: "#757575",
  },
  sections: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 2,
    borderColor: "lightgrey",
    paddingVertical: 10,
  },
  currentLLMMain: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#D8DCE4",
    marginBottom: 20,
  },
  currentResponse: {
    fontSize: scaleFont(16),
    fontWeight: "600",
    color: "#1A1A1A",
    fontFamily: "Mukta-Bold",
  },
  currentLLMBadge: {
    backgroundColor: "#F3F3F3",
    borderColor: "#D8DCE4",
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 50,
  },
  currentLLMBadgeText: {
    fontSize: scaleFont(12),
    fontWeight: "400",
    color: "#1A1A1A",
    fontFamily: "Mukta-Regular",
  },
  badge: {
    backgroundColor: "#F3F3F3",
    borderColor: "#D8DCE4",
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 50,
  },
  btnText: {
    fontSize: scaleFont(12),
    fontWeight: "400",
    color: "#1A1A1A",
    fontFamily: "Mukta-Regular",
  },
  optionsMain: {
    flexDirection: "column",
    gap: 25,
    alignItems: "center",
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
  optionTitle: {
    color: "#1F2937",
  },
  optionDescription: {
    lineHeight: 20,
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
  checkboxOuter: {
    width: 23,
    height: 23,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#D3DAE5",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
});

export default ChangeLLMPopup;
