import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
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
import { useNavigation } from "@react-navigation/native";
import {
  setToggleToolsPopup,
  setToggleToolsPopupStates,
} from "../../../../../redux/slices/toggleSlice";
import { commonFunctionForAPICalls } from "../../../../../redux/slices/apiCommonSlice";
import LLMSavedState from "./LLMSavedState";
import IntegrateAIAccState from "./IntegrateAIAccState";

const screenHeight = Dimensions.get("window").height;

const LLMState = () => {
  const [selectedCountsArray, setSelectedCountsArray] = useState([]);
  const [isLLMSaved, setIsLLMSaved] = useState(false);
  const [toggleIntegrateAi, setToggleIntegrateAi] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { settingsStates, loading } = useSelector((state) => state.API);

  useEffect(() => {
    // Check if LLM preferences already exist
    const llmPreferences = settingsStates?.allGeneralSettings?.preferredLLMs;
    if (llmPreferences && (llmPreferences.preferred_llm_1 || llmPreferences.preferred_llm_2 || llmPreferences.preferred_llm_3)) {
      setIsLLMSaved(true);
    }
  }, [settingsStates?.allGeneralSettings?.preferredLLMs]);

  const updateLLM1 = (id) => {
    const data = {
      preferred_llm_1_id: id,
    };
    const payload = {
      method: "PUT",
      url: "/settings/general",
      data,
      name: "updateGeneralSettings",
    };
    dispatch(commonFunctionForAPICalls(payload));
  };

  const updateLLM2 = (id) => {
    const data = {
      preferred_llm_2_id: id,
    };
    const payload = {
      method: "PUT",
      url: "/settings/general",
      data,
      name: "updateGeneralSettings",
    };
    dispatch(commonFunctionForAPICalls(payload));
  };

  const updateLLM3 = (id) => {
    const data = {
      preferred_llm_3_id: id,
    };
    const payload = {
      method: "PUT",
      url: "/settings/general",
      data,
      name: "updateGeneralSettings",
    };
    dispatch(commonFunctionForAPICalls(payload));
  };

  const handleSaveLLMPreferences = async () => {
    setIsSaving(true);

    // The LLM preferences have already been saved individually via updateLLM1/2/3
    // This button just confirms and transitions to the saved state
    // We could optionally refetch to ensure sync
    const payload = {
      method: "GET",
      url: "/settings/general",
      name: "getAllGeneralSettings",
    };

    await dispatch(commonFunctionForAPICalls(payload));
    setIsSaving(false);
    setIsLLMSaved(true);
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
              initialSetValue={
                settingsStates.allGeneralSettings.preferredLLMs.preferred_llm_1
              }
              triggerAPICall={updateLLM1}
              selectedCounts={selectedCountsArray}
              setSelectedCounts={setSelectedCountsArray}
              selectOptionsArray={LLMOptionsAvailable}
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
              initialSetValue={
                settingsStates.allGeneralSettings.preferredLLMs.preferred_llm_2
              }
              triggerAPICall={updateLLM2}
              selectedCounts={selectedCountsArray}
              setSelectedCounts={setSelectedCountsArray}
              selectOptionsArray={LLMOptionsAvailable}
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
              initialSetValue={
                settingsStates.allGeneralSettings.preferredLLMs.preferred_llm_3
              }
              triggerAPICall={updateLLM3}
              selectedCounts={selectedCountsArray}
              setSelectedCounts={setSelectedCountsArray}
              selectOptionsArray={LLMOptionsAvailable}
            /> */}

            {/* Button */}
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor:
                    selectedCountsArray?.length >= 3 && !isSaving ? "#081A35" : "#CDD5DC",
                },
              ]}
              onPress={handleSaveLLMPreferences}
              activeOpacity={0.8}
              disabled={selectedCountsArray?.length < 3 || isSaving}
            >
              {isSaving ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text
                  style={[styles.buttonText, { fontFamily: "Mukta-Regular" }]}
                >
                  Save LLM Preferences
                </Text>
              )}
            </TouchableOpacity>
            <View style={{flexDirection:"row",width:"100%",justifyContent:"center",alignItems:"center"}}>
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
              <Pressable
                style={{borderBottomWidth:2}}
                onPress={() => {
                  dispatch(setToggleToolsPopup(false));
                  navigation.navigate("settingsInnerPages", { page: 0 });
                }}
              >
                <Text style={{
                  fontSize: moderateScale(13),
                  lineHeight:15,
                  fontWeight: 600,
                  textAlign: "center",
                  fontFamily: "Mukta-Bold",
                }}>Settings</Text>
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
