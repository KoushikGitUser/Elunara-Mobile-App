import { View, Text, Animated } from "react-native";
import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GeneralSettings from "../SettingsPages/GeneralSettings";
import Personalisation from "../SettingsPages/Personalisation";
import Analytics from "../SettingsPages/Analytics";
import PaymentBilling from "../SettingsPages/PaymentBilling";
import HelpCenter from "../SettingsPages/HelpCenter";
import InnerPagesHeader from "../../components/ProfileAndSettings/InnerPagesCompo/InnerPagesHeader";
import { useSelector } from "react-redux";
import UnlockPremiumPopup from "../../components/ProfileAndSettings/GeneralSettingsCompo/UnlockPremiumPopup";
import ResetSettingsPopup from "../../components/ProfileAndSettings/GeneralSettingsCompo/ResetSettingsPopup";

const SettingsProfileInnerPage = ({ route, navigation }) => {
  const { page } = route.params;
  const { toggleStates } = useSelector((state) => state.Toggle);
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  const pagesArray = [
    <GeneralSettings handleScroll={handleScroll} />,
    <Personalisation />,
    <Analytics />,
    <PaymentBilling />,
    "0",
    <HelpCenter />,
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
        {toggleStates.toggleUnlockPremiumPopup && <UnlockPremiumPopup/>}
        {toggleStates.toggleResetSettingsPopup && <ResetSettingsPopup/>}
      <InnerPagesHeader scrollY={scrollY} page={page} />
      {pagesArray[page]}
    </SafeAreaView>
  );
};

export default SettingsProfileInnerPage;
