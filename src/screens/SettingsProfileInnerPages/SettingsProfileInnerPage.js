import { View, Text, Animated } from "react-native";
import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GeneralSettings from "../SettingsPages/GeneralSettings";
import Personalisation from "../SettingsPages/Personalisation";
import Analytics from "../SettingsPages/Analytics";
import PaymentBilling from "../SettingsPages/PaymentBilling";
import InnerPagesHeader from "../../components/ProfileAndSettings/InnerPagesCompo/InnerPagesHeader";
import { useSelector } from "react-redux";
import UnlockPremiumPopup from "../../components/ProfileAndSettings/GeneralSettingsCompo/UnlockPremiumPopup";
import ResetSettingsPopup from "../../components/ProfileAndSettings/GeneralSettingsCompo/ResetSettingsPopup";
import EditProfile from "../SettingsPages/EditProfile";

const SettingsProfileInnerPage = ({ navigation }) => {
  const { toggleStates } = useSelector((state) => state.Toggle);
  const {globalDataStates} = useSelector((state) => state.Global);
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
        {toggleStates.toggleUnlockPremiumPopup && <UnlockPremiumPopup/>}
        {toggleStates.toggleResetSettingsPopup && <ResetSettingsPopup/>}
      <InnerPagesHeader scrollY={scrollY} />
      {globalDataStates.settingsInnerPageComponentToRender == "General Settings" ? (
        <GeneralSettings/>
      ) : globalDataStates.settingsInnerPageComponentToRender == "Personalisation" ? (
        <Personalisation/>
      ) : globalDataStates.settingsInnerPageComponentToRender == "Analytics Dashboard" ? (
        <Analytics/>
      ) : globalDataStates.settingsInnerPageComponentToRender == "Payment & Billings" ? (
        <PaymentBilling/>
      ) : globalDataStates.settingsInnerPageComponentToRender == "Edit Profile" ?(
        <EditProfile/>
      ): null}
    </SafeAreaView>
  );
};

export default SettingsProfileInnerPage;
