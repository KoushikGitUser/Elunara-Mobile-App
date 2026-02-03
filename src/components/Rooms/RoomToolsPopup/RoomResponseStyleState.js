import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { scaleFont, verticalScale } from "../../../utils/responsive";
import { ArrowLeft } from "lucide-react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  setToggleRoomToolsPopupStates,
  setToggleRoomToolsPopup,
  setSelectedRoomResponseStyle,
} from "../../../redux/slices/toggleSlice";
import { commonFunctionForAPICalls } from "../../../redux/slices/apiCommonSlice";
import { triggerToast } from "../../../services/toast";
import Toaster from "../../UniversalToaster/Toaster";
import ChakraIcon from "../../../../assets/SvgIconsComponent/ResponseStyleIcons/ChakraIcon";
import ConciseIcon from "../../../../assets/SvgIconsComponent/ResponseStyleIcons/ConciseIcon";
import FormalIcon from "../../../../assets/SvgIconsComponent/ResponseStyleIcons/FormalIcon";
import ConversationalIcon from "../../../../assets/SvgIconsComponent/ResponseStyleIcons/ConversationalIcon";
import DetailedIcon from "../../../../assets/SvgIconsComponent/ResponseStyleIcons/DetailedIcon";
import CreativeIcon from "../../../../assets/SvgIconsComponent/ResponseStyleIcons/CreativeIcon";

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

const RoomResponseStyleState = () => {
  const dispatch = useDispatch();
  const [selectedStyle, setSelectedStyle] = useState(0);
  const { settingsStates, roomsStates } = useSelector((state) => state.API);
  const { roomCustomisationStates } = useSelector((state) => state.Toggle);

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
    if (roomCustomisationStates?.selectedRoomResponseStyle?.id) {
      setSelectedStyle(roomCustomisationStates.selectedRoomResponseStyle.id);
    } else {
      if (allResponseStyles.length > 0) {
        setSelectedStyle(allResponseStyles[0]?.id || 0);
      } else {
        setSelectedStyle(0);
      }
    }
  }, [roomCustomisationStates?.selectedRoomResponseStyle, allResponseStyles.length]);

  // Handle response style selection and update room
  const handleStyleSelection = (styleOption) => {
    const isAuto = styleOption.name?.toLowerCase()?.includes("auto");
    const selectedData = {
      id: isAuto ? null : styleOption.id,
      name: styleOption.name,
    };

    dispatch(setSelectedRoomResponseStyle(selectedData));
    setSelectedStyle(styleOption.id);

    // Update room with selected response style
    const roomUuid = roomsStates.currentRoom?.uuid;
    if (roomUuid) {
      const payload = {
        method: "PUT",
        url: `/rooms/${roomUuid}`,
        name: "update-room",
        data: {
          response_style_id: isAuto ? null : styleOption.id,
        },
      };
      dispatch(commonFunctionForAPICalls(payload))
        .unwrap()
        .then(() => {
          triggerToast("Success", `Response style set to ${styleOption.name}`, "success", 2000);
        })
        .catch(() => {
          triggerToast("Error", "Failed to update response style", "error", 3000);
        });
    }
  };

  const RadioButton = ({ selected }) => (
    <View style={[styles.radioOuter, { borderColor: selected ? "black" : "" }]}>
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
        <Text style={[styles.title, { fontFamily: "Mukta-Bold" }]}>Response Style</Text>
        <Text style={[styles.description, { fontFamily: "Mukta-Regular" }]}>
          Set the tone of your AI companion for this room - whether you need a mentor,
          explainer, or study buddy.
        </Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.optionsContainer}
        >
          <View style={{ flexDirection: "column" }}>
            {allResponseStyles?.map((styleOptions, optionsIndex) => {
              const icon = getResponseStyleIcon(styleOptions.name);
              const isAuto = styleOptions.name?.toLowerCase()?.includes("auto") || styleOptions.id === 0;

              return (
                <React.Fragment key={styleOptions.id || optionsIndex}>
                  <TouchableOpacity
                    style={[
                      styles.card,
                      {
                        backgroundColor:
                          selectedStyle == styleOptions.id ? "#EEF4FF" : "white",
                        borderColor:
                          selectedStyle == styleOptions.id ? "black" : "#D3DAE5",
                      },
                    ]}
                    onPress={() => handleStyleSelection(styleOptions)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.contentMain}>
                      <View style={styles.iconContainer}>{icon}</View>
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
                              fontFamily: "Mukta-Regular",
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
    fontSize: scaleFont(13),
    lineHeight: 24,
    color: "#6B7280",
    marginBottom: 32,
    letterSpacing: 0.2,
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
    marginBottom: 20,
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

export default RoomResponseStyleState;
