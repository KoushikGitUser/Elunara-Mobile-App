import {
  View,
  Text,
  Platform,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { scaleFont } from "../../../../../utils/responsive";
import { BlurView } from "@react-native-community/blur";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { LLMCardsOptions, responseStyles } from "../../../../../data/datas";
import ResponseStyleCards from "./ResponseStyleCards";
import { ArrowRight } from "lucide-react-native";
import {
  setToggleChangeResponseStyleWhileChatPopup,
  setToggleCompareStyleState,
  setSelectedResponseStyle,
} from "../../../../../redux/slices/toggleSlice";
import CompareStyleCards from "./CompareStyleCards";
import CompareLLMOrStyleState from "../CompareLLMOrStyleState";
import Toaster from "../../../../UniversalToaster/Toaster";
import { commonFunctionForAPICalls } from "../../../../../redux/slices/apiCommonSlice";
import ChakraIcon from "../../../../../../assets/SvgIconsComponent/ResponseStyleIcons/ChakraIcon";
import ConciseIcon from "../../../../../../assets/SvgIconsComponent/ResponseStyleIcons/ConciseIcon";
import FormalIcon from "../../../../../../assets/SvgIconsComponent/ResponseStyleIcons/FormalIcon";
import ConversationalIcon from "../../../../../../assets/SvgIconsComponent/ResponseStyleIcons/ConversationalIcon";
import DetailedIcon from "../../../../../../assets/SvgIconsComponent/ResponseStyleIcons/DetailedIcon";
import CreativeIcon from "../../../../../../assets/SvgIconsComponent/ResponseStyleIcons/CreativeIcon";

// Helper function to get response style icon based on name
const getResponseStyleIcon = (name) => {
  const key = name?.toLowerCase();
  if (key?.includes("auto") || key?.includes("chakra")) {
    return <ChakraIcon />;
  } else if (key?.includes("concise")) {
    return <ConciseIcon />;
  } else if (key?.includes("formal")) {
    return <FormalIcon />;
  } else if (key?.includes("conversational")) {
    return <ConversationalIcon />;
  } else if (key?.includes("detailed")) {
    return <DetailedIcon />;
  } else if (key?.includes("creative")) {
    return <CreativeIcon />;
  }
  return <ChakraIcon />; // Default to Chakra/Auto
};

const ChangeResponseStylePopup = () => {
  const SCREEN_HEIGHT = Dimensions.get("window").height;
  const { toggleStates, chatCustomisationStates } = useSelector((state) => state.Toggle);
  const { settingsStates } = useSelector((state) => state.API);
  const { globalDataStates } = useSelector((state) => state.Global);
  const [selectedStyle, setSelectedStyle] = useState(0);
  const [selectedStyleForCompare, setSelectedStyleForCompare] = useState([]);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(1);

  // Fetch response styles on mount
  useEffect(() => {
    const payload = {
      method: "GET",
      url: "/master/response-styles",
      name: "fetchResponseStylesAvailable",
    };
    dispatch(commonFunctionForAPICalls(payload));
  }, []);

  // Get all response styles
  const allResponseStyles = settingsStates?.settingsMasterDatas?.allResponseStylesAvailable || [];

  // Initialize selected style from Redux state
  useEffect(() => {
    if (chatCustomisationStates?.selectedResponseStyle?.id) {
      const index = allResponseStyles.findIndex(
        (style) => style.id === chatCustomisationStates.selectedResponseStyle.id
      );
      if (index !== -1) {
        setSelectedStyle(index);
      }
    } else {
      setSelectedStyle(0); // Default to Auto
    }
  }, [chatCustomisationStates?.selectedResponseStyle, allResponseStyles.length]);

  // Handle response style selection and trigger regeneration
  const handleStyleSelection = (styleOption, index) => {
    setSelectedStyle(index);
    const selectedData = {
      id: styleOption.name?.toLowerCase().includes("auto") ? null : styleOption.id,
      name: styleOption.name,
    };

    dispatch(setSelectedResponseStyle(selectedData));

    // Get the AI message UUID for regeneration using the stored index
    const aiMessageIndex = globalDataStates.currentAIMessageIndexForRegeneration;
    const aiMessageUuid = globalDataStates.messageIDsArray[aiMessageIndex];
    console.log("Message Index:", aiMessageIndex, "Message UUID:", aiMessageUuid);

    if (aiMessageUuid) {
      // Build customisations payload
      const customisationsPayload = {
        llm_id: chatCustomisationStates.selectedLLM?.id,
        response_style_id: styleOption.name?.toLowerCase().includes("auto") ? null : styleOption.id,
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
    } else {
      console.log("cannot trigger regeneration");
    }

    // Close the popup
    dispatch(setToggleChangeResponseStyleWhileChatPopup(false));
  };

  // Radio button component
  const RadioButton = ({ selected }) => (
    <View style={[styles.radioOuter, { borderColor: selected ? "black" : "#D3DAE5" }]}>
      {selected && <View style={styles.radioInner} />}
    </View>
  );

  return (
    <Modal
      visible={toggleStates.toggleChangeResponseStyleWhileChatPopup}
      transparent={true}
      animationType="slide"
      onRequestClose={() =>
        dispatch(setToggleChangeResponseStyleWhileChatPopup(false))
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
            dispatch(setToggleChangeResponseStyleWhileChatPopup(false))
          }
        />

        {/* Modal Sheet */}
        {toggleStates.toggleCompareStyleState ? (
          <CompareLLMOrStyleState forStyleOrLLM="style" />
        ) : (
          <View style={styles.modalSheet}>
            {/* Handle Bar */}
            <View style={styles.closeModalMain}>
              <AntDesign
                style={{ marginRight: 20 }}
                onPress={() =>
                  dispatch(setToggleChangeResponseStyleWhileChatPopup(false))
                }
                name="close"
                size={20}
                color="black"
              />
            </View>

            {/* Content */}
            <View style={styles.content}>
              <View style={styles.currentLLMMain}>
                <Text style={styles.currentResponse}>
                  Current Response Style
                </Text>

                <TouchableOpacity style={styles.badge}>
                  <Text style={styles.btnText}>
                    {chatCustomisationStates.selectedResponseStyle?.name || "Auto"}
                  </Text>
                </TouchableOpacity>
              </View>

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
                      },
                    ]}
                  >
                    Compare Responses
                  </Text>
                </TouchableOpacity>
              </View>
              {/* Description */}
              <Text style={[styles.description, { fontFamily: "Mukta-Regular" }]}>
                Update the current answer by selecting a different style
              </Text>
              {selectedCategory == 1 ? (
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={{
                    width: "100%",
                    maxHeight: SCREEN_HEIGHT * 0.45,
                    paddingTop: 20,
                    marginBottom: 20,
                  }}
                >
                  {allResponseStyles.map((styleOptions, optionsIndex) => {
                    const icon = getResponseStyleIcon(styleOptions.name);
                    const isAuto = styleOptions.name?.toLowerCase().includes("auto") || styleOptions.id === 0;

                    return (
                      <React.Fragment key={styleOptions.id || optionsIndex}>
                        <TouchableOpacity
                          style={[
                            styles.card,
                            {
                              backgroundColor:
                                selectedStyle == optionsIndex
                                  ? "#EEF4FF"
                                  : "white",
                              borderColor:
                                selectedStyle == optionsIndex
                                  ? "black"
                                  : "#D3DAE5",
                            },
                          ]}
                          onPress={() => handleStyleSelection(styleOptions, optionsIndex)}
                          activeOpacity={0.7}
                        >
                          <View style={styles.contentMain}>
                            <View style={styles.iconContainer}>
                              {icon}
                            </View>

                            <View style={styles.textContainer}>
                              <Text
                                style={[
                                  styles.optionTitle,
                                  { fontSize: scaleFont(18), fontWeight: 600, fontFamily: "Mukta-Bold" },
                                ]}
                              >
                                {styleOptions.name}
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
                                {styleOptions.description}
                              </Text>
                            </View>
                          </View>

                          <RadioButton selected={selectedStyle === optionsIndex} />
                        </TouchableOpacity>
                        {isAuto && (
                          <View style={{ width: "100%", marginBottom: 20 }}>
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
                </ScrollView>
              ) : (
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={{
                    width: "100%",
                    maxHeight: SCREEN_HEIGHT * 0.45,
                    paddingTop: 20,
                    marginBottom: 20,
                  }}
                >
                  {responseStyles?.map((credits, creditIndex) => {
                    return (
                      <CompareStyleCards
                        selectedStyleForCompare={selectedStyleForCompare}
                        setSelectedStyleForCompare={setSelectedStyleForCompare}
                        item={credits}
                        key={creditIndex}
                      />
                    );
                  })}
                  <View style={{ height: 50 }} />
                </ScrollView>
              )}

              {/* Button */}
              <View style={styles.btnsMain}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    if (selectedCategory == 1) {
                      //do something
                    } else {
                      dispatch(setToggleCompareStyleState(true));
                    }
                  }}
                  activeOpacity={0.8}
                >
                  <Text style={styles.buttonText}>
                    {selectedCategory == 1
                      ? "Update Response Style"
                      : "Compare Style"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
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
    position: "absolute",
    bottom: 0,
    zIndex: 999,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: Platform.OS === "ios" ? 40 : 24,
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
    marginBottom: 10,
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
    fontSize: scaleFont(17),
    fontWeight: "600",
    color: "#1A1A1A",
    fontFamily: "Mukta-Bold",
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
    marginBottom: 20
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
  },
  optionTitle: {
    color: "#1F2937",
  },
  optionDescription: {
    lineHeight: 20,
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

export default ChangeResponseStylePopup;
