import { View, Text, ScrollView } from "react-native";
import React, { useEffect } from "react";
import NotificationSettings from "../../components/ProfileAndSettings/GeneralSettingsCompo/NotificationSettings";
import AdSettings from "../../components/ProfileAndSettings/GeneralSettingsCompo/AdSettings";
import SetResponseLanguage from "../../components/ProfileAndSettings/GeneralSettingsCompo/SetResponseLanguage";
import RegionSettings from "../../components/ProfileAndSettings/GeneralSettingsCompo/RegionSettings";
import SetLLMPreference from "../../components/ProfileAndSettings/GeneralSettingsCompo/SetLLMPreference";
import RestoreDefaultSettings from "../../components/ProfileAndSettings/GeneralSettingsCompo/RestoreDefaultSettings";
import { useDispatch } from "react-redux";
import { commonFunctionForAPICalls } from "../../redux/slices/apiCommonSlice";

const GeneralSettings = ({handleScroll}) => {

  const dispatch = useDispatch();

  useEffect(()=>{
    const payload = {
      method:"GET",
      url:"/settings/general",
      name:"getAllGeneralSettings"
    }
  dispatch(commonFunctionForAPICalls(payload))
  },[]);


  return (
    <ScrollView
    onScroll={handleScroll}
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, width: "100%",paddingHorizontal:20,paddingTop:25 }}
    >
      <NotificationSettings />
      <SetLLMPreference/>
      <SetResponseLanguage />
      <RegionSettings/>
      <AdSettings />
      <RestoreDefaultSettings/>
    </ScrollView>
  );
};

export default GeneralSettings;
