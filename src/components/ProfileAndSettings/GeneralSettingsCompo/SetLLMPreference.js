import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { moderateScale, scaleFont } from "../../../utils/responsive";
import ResLangIcon from "../../../../assets/SvgIconsComponent/ToolsOptionsIcons/ResLangIcon";
import DropDowns from "../../ChatScreen/ChatInputCompos/ToolsPopupStates/DropDowns";
import { commonFunctionForAPICalls } from "../../../redux/slices/apiCommonSlice";
import { useDispatch, useSelector } from "react-redux";

const SetLLMPreference = () => {
  const [selectedCounts, setSelectedCounts] = useState([]);
  const dispatch = useDispatch();
  const { settingsStates } = useSelector((state) => state.API);

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

  return (
    <View style={styles.content}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <ResLangIcon color="#888" />
          <Text style={styles.title}>Set preferred LLMS</Text>
        </View>
        <Text style={styles.subtitle}>
          Receive responses in your preferred LLMs! Pick up to 3 to easily
          toggle between them
        </Text>
      </View>
      <Text
        style={{
          fontSize: moderateScale(12),
          color: "#5E5E5E",
          marginTop: 25,
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
        selectedCounts={selectedCounts}
        setSelectedCounts={setSelectedCounts}
      />
      <Text
        style={{
          fontSize: moderateScale(12),
          color: "#5E5E5E",
          marginTop: 25,
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
        selectedCounts={selectedCounts}
        setSelectedCounts={setSelectedCounts}
      />
      {/* <Text
        style={{
          fontSize: moderateScale(12),
          color: "#5E5E5E",
          marginTop: 25,
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
        selectedCounts={selectedCounts}
        setSelectedCounts={setSelectedCounts}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  content: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#D3DAE5",
    marginBottom: 25,
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  bellIcon: {
    marginRight: 16,
  },
  title: {
    fontSize: scaleFont(18),
    color: "#1F2937",
    fontFamily: "Mukta-Bold",
    paddingLeft: 10,
  },
  subtitle: {
    fontSize: scaleFont(14),
    color: "#757575",
    marginTop: 10,
    fontFamily: "Mukta-Regular",
    lineHeight: 20,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 0,
  },
  settingTextContainer: {
    flex: 1,
    marginRight: 24,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  settingDescription: {
    fontSize: scaleFont(13),
    color: "#6B7280",
  },
});

export default SetLLMPreference;
