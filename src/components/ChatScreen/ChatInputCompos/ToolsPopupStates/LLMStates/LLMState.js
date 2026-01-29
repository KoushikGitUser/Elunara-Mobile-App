import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  moderateScale,
  scaleFont,
  verticalScale,
} from "../../../../../utils/responsive";
import { ArrowLeft } from "lucide-react-native";
import DropDowns from "../DropDowns";
import { LLMOptionsAvailable } from "../../../../../data/datas";
import { useDispatch, useSelector } from "react-redux";
import {
  setToggleToolsPopup,
  setToggleToolsPopupStates,
} from "../../../../../redux/slices/toggleSlice";
import { setTempRoomProperty } from "../../../../../redux/slices/apiCommonSlice";
import LLMSavedState from "./LLMSavedState";
import IntegrateAIAccState from "./IntegrateAIAccState";

const screenHeight = Dimensions.get("window").height;

const LLMState = () => {
  const dispatch = useDispatch();
  const { roomsStates } = useSelector((state) => state.API);

  // Initialize with current selection if available
  const initialSelection = roomsStates.tempRoomSettings?.llm_id
    ? [roomsStates.tempRoomSettings.llm_id.toString()]
    : [];

  const [selectedCountsArray, setSelectedCountsArray] =
    useState(initialSelection);
  const [isLLMSaved, setIsLLMSaved] = useState(false);
  const [toggleIntegrateAi, setToggleIntegrateAi] = useState(false);

  const handleSave = () => {
    if (selectedCountsArray.length > 0) {
      dispatch(
        setTempRoomProperty({ key: "llm_id", value: selectedCountsArray[0] }),
      );
    }
    setIsLLMSaved(true);
  };

  const updateSelection = (index, itemId) => {
    const newCounts = [...selectedCountsArray];
    newCounts[index] = itemId;
    setSelectedCountsArray(newCounts);
  };

  return (
    <View style={styles.modalSheet}>
      {/* Content */}
      {isLLMSaved ? (
        toggleIntegrateAi ? (
          <IntegrateAIAccState />
        ) : (
          <LLMSavedState setToggleIntegrateAi={setToggleIntegrateAi} />
        )
      ) : (
        <View style={styles.content}>
          <View style={styles.closeModalMain}>
            <ArrowLeft
              onPress={() => dispatch(setToggleToolsPopupStates(0))}
              size={30}
              strokeWidth={2}
            />
            <AntDesign
              onPress={() => dispatch(setToggleToolsPopup(false))}
              name="close"
              size={24}
              color="black"
            />
          </View>
          {/* Title */}
          <Text style={[styles.title, { fontFamily: "Mukta-Bold" }]}>
            Choose LLM
          </Text>

          {/* Description */}
          <Text style={[styles.description, { fontFamily: "Mukta-Regular" }]}>
            Receive responses in your preferred LLMs! Pick up to 3 now to easily
            toggle between them
          </Text>

          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ maxHeight: screenHeight * 0.6 }}
          >
            <View style={styles.noteSection}>
              <Text
                style={{
                  fontSize: moderateScale(13),
                  fontWeight: 400,
                  fontFamily: "Mukta-Regular",
                }}
              >
                <Text
                  style={{
                    fontSize: moderateScale(13),
                    fontWeight: 600,
                    fontFamily: "Mukta-Bold",
                  }}
                >
                  Note:
                </Text>{" "}
                After selection, you can also integrate your own LLM account for
                added flexibility
              </Text>
            </View>

            <Text
              style={{
                fontSize: moderateScale(11),
                color: "#5E5E5E",
                marginTop: 40,
                fontFamily: "Mukta-Regular",
              }}
            >
              LLM 1
            </Text>
            <DropDowns
              selectedId={selectedCountsArray[0]}
              onSelect={(item) => updateSelection(0, item.id)}
            />
            <Text
              style={{
                fontSize: moderateScale(11),
                color: "#5E5E5E",
                marginTop: 40,
                fontFamily: "Mukta-Regular",
              }}
            >
              LLM 2
            </Text>
            <DropDowns
              selectedId={selectedCountsArray[1]}
              onSelect={(item) => updateSelection(1, item.id)}
            />
            {/* <Text
              style={{
                fontSize: moderateScale(11),
                color: "#5E5E5E",
                marginTop: 40,
                fontFamily: "Mukta-Regular",
              }}
            >
              LLM 3
            </Text>
            <DropDowns
              selectedId={selectedCountsArray[2]}
              onSelect={(item) => updateSelection(2, item.id)}
            />

            {/* Button */}
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor:
                    selectedCountsArray?.length >= 1 ? "#081A35" : "#CDD5DC",
                },
              ]}
              onPress={handleSave}
              activeOpacity={0.8}
            >
              <Text
                style={[styles.buttonText, { fontFamily: "Mukta-Regular" }]}
              >
                Save LLM Preferences
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: moderateScale(13),
                  fontWeight: 400,
                  textAlign: "center",
                  fontFamily: "Mukta-Regular",
                }}
              >
                More LLMS? Update your list in{" "}
              </Text>
              <Pressable style={{ borderBottomWidth: 2 }}>
                <Text
                  style={{
                    fontSize: moderateScale(13),
                    lineHeight: 15,
                    fontWeight: 600,
                    textAlign: "center",
                    fontFamily: "Mukta-Bold",
                  }}
                >
                  Settings
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      )}
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
    marginBottom: 24,
  },
  closeModalMain: {
    width: "100%",
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: scaleFont(26),
    fontWeight: "600",
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
    fontSize: scaleFont(14),
    fontWeight: "600",
    letterSpacing: 0.3,
  },
});

export default LLMState;
