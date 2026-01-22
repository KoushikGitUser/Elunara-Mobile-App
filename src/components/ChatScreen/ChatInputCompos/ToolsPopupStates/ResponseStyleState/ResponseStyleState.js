import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { scaleFont, verticalScale } from "../../../../../utils/responsive";
import { ArrowLeft } from "lucide-react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  setToggleToolsPopupStates,
  setToggleTopicsPopup,
  setSelectedResponseStyle,
} from "../../../../../redux/slices/toggleSlice";
import { commonFunctionForAPICalls } from "../../../../../redux/slices/apiCommonSlice";
import ChakraIcon from "../../../../../../assets/SvgIconsComponent/ResponseStyleIcons/ChakraIcon";
import ConciseIcon from "../../../../../../assets/SvgIconsComponent/ResponseStyleIcons/ConciseIcon";
import FormalIcon from "../../../../../../assets/SvgIconsComponent/ResponseStyleIcons/FormalIcon";
import ConversationalIcon from "../../../../../../assets/SvgIconsComponent/ResponseStyleIcons/ConversationalIcon";
import DetailedIcon from "../../../../../../assets/SvgIconsComponent/ResponseStyleIcons/DetailedIcon";
import CreativeIcon from "../../../../../../assets/SvgIconsComponent/ResponseStyleIcons/CreativeIcon";

const screenHeight = Dimensions.get("window").height;

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

const ResponseStyleState = () => {
  const dispatch = useDispatch();
  const [selectedStyle, setSelectedStyle] = useState(0);
  const { settingsStates } = useSelector((state) => state.API);
  const { chatCustomisationStates } = useSelector((state) => state.Toggle);

  useEffect(() => {
    const payload = {
      method: "GET",
      url: "/master/response-styles",
      name: "fetchResponseStylesAvailable",
    };
    dispatch(commonFunctionForAPICalls(payload));
  }, []);

  // Initialize selected style from Redux state
  const allResponseStyles = settingsStates?.settingsMasterDatas?.allResponseStylesAvailable || [];

  useEffect(() => {
    if (chatCustomisationStates?.selectedResponseStyle?.id) {
      // Set to the actual ID, not the index
      setSelectedStyle(chatCustomisationStates.selectedResponseStyle.id);
    } else {
      // If no selection or Auto is selected, set to the first item's ID (Auto)
      if (allResponseStyles.length > 0) {
        setSelectedStyle(allResponseStyles[0]?.id || 0);
      } else {
        setSelectedStyle(0);
      }
    }
  }, [chatCustomisationStates?.selectedResponseStyle, allResponseStyles.length]);

  // Handle response style selection
  const handleStyleSelection = (styleOption) => {
    const selectedData = {
      id: styleOption.name?.toLowerCase().includes("auto") ? null : styleOption.id,
      name: styleOption.name,
    };

    dispatch(setSelectedResponseStyle(selectedData));
    setSelectedStyle(styleOption.id);
  };

  const RadioButton = ({ selected }) => (
    <View style={[styles.radioOuter, { borderColor: selected ? "black" : "" }]}>
      {selected && <View style={styles.radioInner} />}
    </View>
  );

  return (
    <View style={styles.modalSheet}>
      {/* Content */}
      <View style={styles.content}>
        <View style={styles.closeModalMain}>
          <ArrowLeft
            onPress={() => dispatch(setToggleToolsPopupStates(0))}
            size={30}
            strokeWidth={2}
          />
          <AntDesign
            onPress={() => dispatch(setToggleTopicsPopup(false))}
            name="close"
            size={24}
            color="black"
          />
        </View>
        {/* Title */}
        <Text style={[styles.title, { fontFamily: "Mukta-Bold" }]}>Response Style</Text>

        {/* Description */}
        <Text style={[styles.description, { fontFamily: "Mukta-Regular" }]}>
          Set the tone of your AI companion - whether you need a mentor,
          explainer, or study buddy.
        </Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.optionsContainer}
        >
          <View style={{ flexDirection: "column",}}>
            {(settingsStates?.settingsMasterDatas?.allResponseStylesAvailable || [])?.map((styleOptions, optionsIndex) => {
              const icon = getResponseStyleIcon(styleOptions.name);
              const isAuto = styleOptions.name?.toLowerCase().includes("auto") || styleOptions.id === 0;

              return (
                <React.Fragment key={styleOptions.id || optionsIndex}>
                  <TouchableOpacity
                    style={[
                      styles.card,
                      {
                        backgroundColor:
                          selectedStyle == styleOptions.id
                            ? "#EEF4FF"
                            : "white",
                        borderColor:
                          selectedStyle == styleOptions.id
                            ? "black"
                            : "#D3DAE5",
                      },
                    ]}
                    onPress={() => handleStyleSelection(styleOptions)}
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

                    <RadioButton selected={selectedStyle === styleOptions.id} />
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
  );
};

const styles = StyleSheet.create({
  modalSheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: Platform.OS === "ios" ? 40 : 24,
  },
  verifiedIcon: {
    height: 55,
    width: 50,
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
    fontSize: scaleFont(13),
    lineHeight: 24,
    color: "#6B7280",
    marginBottom: 32,
    letterSpacing: 0.2,
  },
  noteSection: {
    width: "100%",
    minHeight: verticalScale(70),
    borderWidth: 1,
    borderColor: "#D3DAE5",
    borderRadius: 16,
    backgroundColor: "#F3F3F3",
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#081A35",
    paddingVertical: 13,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 30,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(11),
    fontWeight: "500",
    letterSpacing: 0.3,
  },
  optionsContainer: {
    maxHeight: screenHeight * 0.55,
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
    marginBottom:20
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

export default ResponseStyleState;
