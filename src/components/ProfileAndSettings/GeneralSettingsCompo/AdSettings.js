import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import SpeakerIcon from "../../../../assets/SvgIconsComponent/GeneralSettingsIcon/SpeakerIcon";
import CustomSwitch from "../InnerPagesCompo/CustomSwitch";
import { scaleFont } from "../../../utils/responsive";
import { useDispatch, useSelector } from "react-redux";
import { commonFunctionForAPICalls } from "../../../redux/slices/apiCommonSlice";

const AdSettings = () => {
  const [skipAdPermission, setSkipAdPermission] = useState(false);
  const [personalizedAds, setPersonalizedAds] = useState(false);
  const { settingsStates } = useSelector((state) => state.API);
  const dispatch = useDispatch();

  useEffect(() => {
    setSkipAdPermission(
      settingsStates.allGeneralSettings.adSettings.skip_ad_permission
    );
    setPersonalizedAds(
      settingsStates.allGeneralSettings.adSettings.personalized_ads
    );
  }, [
    settingsStates.allGeneralSettings.adSettings.skip_ad_permission,
    settingsStates.allGeneralSettings.adSettings.personalized_ads,
  ]);

  const toggleSkipAdSettings = () => {
    const data = {
      skip_ad_permission: !skipAdPermission,
    };
    const payload = {
      method: "PUT",
      url: "/settings/general",
      data,
      name: "updateGeneralSettings",
    };
    dispatch(commonFunctionForAPICalls(payload));
  };

  const togglePersonalisedAdsSettings = () => {
    const data = {
      personalized_ads: !personalizedAds,
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
          <SpeakerIcon />
          <Text style={styles.title}>Ad Settings</Text>
        </View>
        <Text style={styles.subtitle}>
          Control your advertising preferences and personalize your ad
          experience.
        </Text>
      </View>

      {/* Email Notifications Section */}
      <View style={[styles.settingItem, { marginTop: 20 }]}>
        <View style={styles.settingTextContainer}>
          <Text style={styles.settingTitle}>Skip ad permission</Text>
          <Text style={styles.settingDescription}>
            Allow the option to skip advertisements during your experience.
          </Text>
        </View>
        <CustomSwitch
          triggerAPICall={toggleSkipAdSettings}
          action="Skip Ad Permission"
          skipAd={true}
          value={skipAdPermission}
          onValueChange={setSkipAdPermission}
        />
      </View>

      {/* Push Notifications Section */}
      <View style={styles.settingItem}>
        <View style={styles.settingTextContainer}>
          <Text style={styles.settingTitle}>Personalised Ads</Text>
          <Text style={styles.settingDescription}>
            Choose the kinds of ads you want to see and which info can be used
            to personalise them
          </Text>
        </View>
        <CustomSwitch
        triggerAPICall={togglePersonalisedAdsSettings}
          value={personalizedAds}
          onValueChange={setPersonalizedAds}
          action="Personalised Ads"
        />
      </View>
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
    fontSize: scaleFont(15),
    color: "#1F2937",
    marginBottom: 5,
    fontFamily: "Mukta-Bold",
  },
  settingDescription: {
    fontSize: scaleFont(12),
    color: "#6B7280",
    fontFamily: "Mukta-Regular",
  },
});

export default AdSettings;
