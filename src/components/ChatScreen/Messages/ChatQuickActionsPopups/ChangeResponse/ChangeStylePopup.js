import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  Platform,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { BlurView } from "@react-native-community/blur";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  setToggleChangeResponseStyleWhileChatPopup,
  setSelectedResponseStyle,
} from "../../../../../redux/slices/toggleSlice";
import { scaleFont } from "../../../../../utils/responsive";
import { commonFunctionForAPICalls } from "../../../../../redux/slices/apiCommonSlice";
import ChakraIcon from "../../../../../../assets/SvgIconsComponent/ResponseStyleIcons/ChakraIcon";
import ConciseIcon from "../../../../../../assets/SvgIconsComponent/ResponseStyleIcons/ConciseIcon";
import FormalIcon from "../../../../../../assets/SvgIconsComponent/ResponseStyleIcons/FormalIcon";
import ConversationalIcon from "../../../../../../assets/SvgIconsComponent/ResponseStyleIcons/ConversationalIcon";
import DetailedIcon from "../../../../../../assets/SvgIconsComponent/ResponseStyleIcons/DetailedIcon";
import CreativeIcon from "../../../../../../assets/SvgIconsComponent/ResponseStyleIcons/CreativeIcon";

const SCREEN_HEIGHT = Dimensions.get("window").height;

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

const ChangeStylePopup = () => {
  const { toggleStates, chatCustomisationStates } = useSelector((state) => state.Toggle);
  const { settingsStates } = useSelector((state) => state.API);
  const { globalDataStates } = useSelector((state) => state.Global);
  const dispatch = useDispatch();
  const [selectedStyle, setSelectedStyle] = useState(0);

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
        <View style={styles.modalSheet}>
          <View style={styles.content}>
            <View style={styles.closeModalMain}>
              <AntDesign
                onPress={() => dispatch(setToggleChangeResponseStyleWhileChatPopup(false))}
                name="close"
                size={24}
                color="black"
              />
            </View>

            {/* Current Style Banner */}
            <View style={styles.currentStyleMain}>
              <Text style={styles.currentResponse}>Current Response Style</Text>
              <TouchableOpacity style={styles.currentStyleBadge}>
                <Text style={styles.currentStyleBadgeText}>
                  {chatCustomisationStates.selectedResponseStyle?.name || "Auto"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Title */}
            <Text style={[styles.title, { fontFamily: "Mukta-Bold" }]}>Response Style</Text>

            {/* Description */}
            <Text style={[styles.description, { fontFamily: "Mukta-Regular" }]}>
              Update the current answer by selecting a different response style
            </Text>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.optionsContainer}
            >
              <View style={{ flexDirection: "column" }}>
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
              </View>
            </ScrollView>
          </View>
        </View>
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
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  iconContainer: {
    marginTop: 5,
  },
  closeModalMain: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
    marginBottom: 20,
  },
  currentStyleMain: {
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
  currentStyleBadge: {
    backgroundColor: "#F3F3F3",
    borderColor: "#D8DCE4",
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 50,
  },
  currentStyleBadgeText: {
    fontSize: scaleFont(12),
    fontWeight: "400",
    color: "#1A1A1A",
    fontFamily: "Mukta-Regular",
  },
  title: {
    fontSize: scaleFont(26),
    color: "#1F2937",
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: scaleFont(12),
    lineHeight: 24,
    color: "#6B7280",
    marginBottom: 18,
    letterSpacing: 0.2,
  },
  optionsContainer: {
    maxHeight: SCREEN_HEIGHT * 0.55,
    flexDirection: "column",
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

export default ChangeStylePopup;
