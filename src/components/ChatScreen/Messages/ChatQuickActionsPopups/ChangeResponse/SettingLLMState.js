import {
  View,
  Text,
  Platform,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { moderateScale, scaleFont, verticalScale } from "../../../../../utils/responsive";
import { ArrowLeft } from "lucide-react-native";
import { AntDesign } from "@expo/vector-icons";
import DropDowns from "../../../ChatInputCompos/ToolsPopupStates/DropDowns";
import { useDispatch, useSelector } from "react-redux";
import { LLMOptionsAvailable } from "../../../../../data/datas";
import { commonFunctionForAPICalls } from "../../../../../redux/slices/apiCommonSlice";
import { setToggleChangeResponseLLMWhileChatPopup } from "../../../../../redux/slices/toggleSlice";
const screenHeight = Dimensions.get("window").height;


const SettingLLMState = ({setCurrentStateOfPopup}) => {
  const [selectedCountsArray, setSelectedCountsArray] = useState([]);
  const [selectedLLM1, setSelectedLLM1] = useState(null);
  const [selectedLLM2, setSelectedLLM2] = useState(null);
  const [selectedLLM3, setSelectedLLM3] = useState(null);
  const dispatch = useDispatch();
  const { settingsStates } = useSelector((state) => state.API);

  // Handler to save LLM preferences
  const handleSaveLLMPreferences = () => {
    const updateData = {};

    if (selectedLLM1) {
      updateData.preferred_llm_1_id = selectedLLM1;
    }
    if (selectedLLM2) {
      updateData.preferred_llm_2_id = selectedLLM2;
    }
    if (selectedLLM3) {
      updateData.preferred_llm_3_id = selectedLLM3;
    }

    if (Object.keys(updateData).length > 0) {
      const payload = {
        method: "PUT",
        url: "/settings/general",
        data: updateData,
        name: "updateGeneralSettings",
      };
      dispatch(commonFunctionForAPICalls(payload));
    }

    // Move to next state
    setCurrentStateOfPopup(2);
  };

  return (
    <View style={styles.modalSheet}>
      <View style={styles.content}>
        <View style={styles.closeModalMain}>
          <AntDesign
            onPress={() => dispatch(setToggleChangeResponseLLMWhileChatPopup(false))}
            name="close"
            size={24}
            color="black"
            style={{marginLeft: "auto"}}
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
            initialSetValue={settingsStates.allGeneralSettings.preferredLLMs?.preferred_llm_1}
            triggerAPICall={setSelectedLLM1}
            selectedCounts={selectedCountsArray}
            setSelectedCounts={setSelectedCountsArray}
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
            initialSetValue={settingsStates.allGeneralSettings.preferredLLMs?.preferred_llm_2}
            triggerAPICall={setSelectedLLM2}
            selectedCounts={selectedCountsArray}
            setSelectedCounts={setSelectedCountsArray}
          />
          <Text
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
            initialSetValue={settingsStates.allGeneralSettings.preferredLLMs?.preferred_llm_3}
            triggerAPICall={setSelectedLLM3}
            selectedCounts={selectedCountsArray}
            setSelectedCounts={setSelectedCountsArray}
          />

          {/* Button */}
          <TouchableOpacity
            style={[
              styles.button,
              {
                backgroundColor:
                  selectedCountsArray?.length >= 3 ? "#081A35" : "#CDD5DC",
              },
            ]}
            onPress={handleSaveLLMPreferences}
            activeOpacity={0.8}
            disabled={selectedCountsArray?.length < 3}
          >
            <Text style={[styles.buttonText, { fontFamily: "Mukta-Regular" }]}>
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

export default SettingLLMState;
