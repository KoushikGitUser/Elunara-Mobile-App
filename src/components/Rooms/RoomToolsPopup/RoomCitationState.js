import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { scaleFont, verticalScale } from "../../../utils/responsive";
import { ArrowLeft, Info } from "lucide-react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  setToggleRoomToolsPopupStates,
  setToggleRoomToolsPopup,
  setSelectedRoomCitationFormat,
} from "../../../redux/slices/toggleSlice";
import { commonFunctionForAPICalls } from "../../../redux/slices/apiCommonSlice";
import { triggerToast } from "../../../services/toast";
import Toaster from "../../UniversalToaster/Toaster";
import APAIcon from "../../../../assets/SvgIconsComponent/CitationFormatIcons/APAIcon";
import HarvardIcon from "../../../../assets/SvgIconsComponent/CitationFormatIcons/HavardIcon";

const screenHeight = Dimensions.get("window").height;

// Helper function to get citation icon based on name
const getCitationIcon = (name, isSelected) => {
  const color = isSelected ? "#24487C" : "#888888";
  const key = name?.toLowerCase();
  if (key?.includes("apa")) {
    return <APAIcon color={color} />;
  } else if (key?.includes("harvard") || key?.includes("havard")) {
    return <HarvardIcon color={color} />;
  }
  return <APAIcon color={color} />;
};

const RoomCitationState = () => {
  const dispatch = useDispatch();
  const [selectedCitation, setSelectedCitationLocal] = useState(null);
  const { settingsStates, roomsStates } = useSelector((state) => state.API);
  const { roomCustomisationStates } = useSelector((state) => state.Toggle);

  // Fetch citation formats on mount
  useEffect(() => {
    const payload = {
      method: "GET",
      url: "/master/citation-formats",
      name: "fetchCitationFormatsAvailable",
    };
    dispatch(commonFunctionForAPICalls(payload));
  }, []);

  const allCitationFormats = settingsStates?.settingsMasterDatas?.allCitationFormatsAvailable || [];
  const isLoading = !allCitationFormats.length;

  useEffect(() => {
    if (roomCustomisationStates?.selectedRoomCitationFormat?.id !== undefined) {
      setSelectedCitationLocal(roomCustomisationStates.selectedRoomCitationFormat.id);
    } else {
      // Find Harvard as default
      const harvard = allCitationFormats.find(
        (fmt) => fmt.name?.toLowerCase()?.includes("harvard") || fmt.name?.toLowerCase()?.includes("havard")
      );
      setSelectedCitationLocal(harvard?.id || null);
    }
  }, [roomCustomisationStates?.selectedRoomCitationFormat, allCitationFormats.length]);

  // Handle citation selection and update room
  const handleCitationSelection = (citationOption) => {
    const selectedData = {
      id: citationOption.id,
      name: citationOption.name,
    };
    dispatch(setSelectedRoomCitationFormat(selectedData));
    setSelectedCitationLocal(citationOption.id);

    // Update room with selected citation format
    const roomUuid = roomsStates.currentRoom?.uuid;
    if (roomUuid) {
      const payload = {
        method: "PUT",
        url: `/rooms/${roomUuid}`,
        name: "update-room",
        data: {
          citation_format_id: citationOption.id,
        },
      };
      dispatch(commonFunctionForAPICalls(payload))
        .unwrap()
        .then(() => {
          triggerToast("Success", `Citation format set to ${citationOption.name}`, "success", 2000);
        })
        .catch(() => {
          triggerToast("Error", "Failed to update citation format", "error", 3000);
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
        <Text style={[styles.title, { fontFamily: "Mukta-Bold" }]}>Citation Format</Text>
        <Text style={[styles.description, { fontFamily: "Mukta-Regular" }]}>
          Choose the citation style for academic references in this room.
        </Text>

        {/* Info Note */}
        <View style={styles.noteSection}>
          <Info size={20} color="#757575" style={{ marginRight: 10 }} />
          <Text
            style={{
              fontSize: scaleFont(13),
              color: "#757575",
              fontFamily: "Mukta-Regular",
              flex: 1,
            }}
          >
            Citations will only appear when relevant to academic or research-based conversations.
          </Text>
        </View>

        {isLoading ? (
          <View style={{ paddingVertical: 40, alignItems: "center" }}>
            <ActivityIndicator size="small" color="#081A35" />
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.optionsContainer}
          >
            <View style={{ flexDirection: "column" }}>
              {allCitationFormats?.map((citationOption, optionsIndex) => {
                const isSelected = selectedCitation === citationOption.id;
                const icon = getCitationIcon(citationOption.name, isSelected);

                return (
                  <TouchableOpacity
                    key={citationOption.id || optionsIndex}
                    style={[
                      styles.card,
                      {
                        backgroundColor: isSelected ? "#EEF4FF" : "white",
                        borderColor: isSelected ? "black" : "#D3DAE5",
                      },
                    ]}
                    onPress={() => handleCitationSelection(citationOption)}
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
                          {citationOption.name}
                        </Text>
                        {citationOption.description && (
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
                            {citationOption.description}
                          </Text>
                        )}
                      </View>
                    </View>
                    <RadioButton selected={isSelected} />
                  </TouchableOpacity>
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
    fontSize: scaleFont(13),
    lineHeight: 24,
    color: "#6B7280",
    marginBottom: 20,
    letterSpacing: 0.2,
  },
  noteSection: {
    width: "100%",
    minHeight: verticalScale(60),
    borderWidth: 1,
    borderColor: "#D3DAE5",
    borderRadius: 16,
    backgroundColor: "#F3F3F3",
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  optionsContainer: {
    maxHeight: screenHeight * 0.45,
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
    marginBottom: 15,
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

export default RoomCitationState;
