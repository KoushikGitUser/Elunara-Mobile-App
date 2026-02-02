import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import FlagIcon from "../../../../assets/SvgIconsComponent/GeneralSettingsIcon/FlagIcon";
import LanguageDropdown from "../../ChatScreen/ChatInputCompos/ToolsPopupStates/ResponseLangState/LanguageDropdown";
import { moderateScale, scaleFont } from "../../../utils/responsive";
import { languages } from "../../../data/datas";
import RegionDropdown from "./RegionDropdown";
import { useDispatch, useSelector } from "react-redux";
import { commonFunctionForAPICalls } from "../../../redux/slices/apiCommonSlice";

const RegionSettings = () => {
  const [selectedCounts, setSelectedCounts] = useState([]);
  const { settingsStates } = useSelector((state) => state.API);
  const dispatch = useDispatch();

  const updateCountry = (id) => {
    const data = {
      country_id: id,
    };
    const payload = {
      method: "PUT",
      url: "/settings/general",
      data,
      name: "updateGeneralSettings",
    };
    dispatch(commonFunctionForAPICalls(payload));
  };

  const updateCity = (id) => {
    const data = {
      city_id: id,
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
          <FlagIcon />
          <Text style={styles.title}>Region</Text>
        </View>
        <Text style={styles.subtitle}>
          Set your location to customize content, language, and features for
          your area.
        </Text>
      </View>
      <Text
        style={{
          fontSize: moderateScale(12),
          color: "#5E5E5E",
          marginTop: 20,
          fontFamily: "Mukta-Regular",
        }}
      >
        Country
      </Text>
      <RegionDropdown
        initialSetValue={
          settingsStates.allGeneralSettings.regionSettings.country
        }
        triggerAPICall={updateCountry}
        country={true}
        selectedCounts={selectedCounts}
        setSelectedCounts={setSelectedCounts}
      />
      <Text
        style={{
          fontSize: moderateScale(12),
          color: "#5E5E5E",
          marginTop: 20,
          fontFamily: "Mukta-Regular",
          opacity: settingsStates.allGeneralSettings.regionSettings.country ? 1 : 0.5,
        }}
      >
        City
      </Text>
      <RegionDropdown
        initialSetValue={settingsStates.allGeneralSettings.regionSettings.city}
        triggerAPICall={updateCity}
        country={false}
        selectedCounts={selectedCounts}
        setSelectedCounts={setSelectedCounts}
        disabled={!settingsStates.allGeneralSettings.regionSettings.country}
      />
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
    fontWeight: "600",
    color: "#1F2937",
    fontFamily: "Mukta-Bold",
    paddingLeft: 10,
  },
  subtitle: {
    fontSize: scaleFont(14),
    lineHeight: 20,
    color: "#757575",
    marginTop: 10,
    fontFamily: "Mukta-Regular",
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
    marginBottom: 5,
    letterSpacing: -0.3,
  },
  settingDescription: {
    fontSize: scaleFont(13),
    color: "#6B7280",
  },
});

export default RegionSettings;
