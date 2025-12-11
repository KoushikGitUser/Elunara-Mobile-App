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
import HelpCenter from "../SettingsPages/HelpCenter";
import AcademicLinks from "../SettingsPages/AcademicLinks";
import AboutPage from "../SettingsPages/AboutPage";
import TermsOfUse from "../SettingsPages/TermsOfUse";
import PrivacyPolicy from "../SettingsPages/PrivacyPolicy";
import ContactPage from "../SettingsPages/ContactPage";
import HelpCenterSearch from "../SettingsPages/HelpCenterSearch";
import MakePaymentPage from "../SettingsPages/MakePaymentPage";
import UpdateProfilePicPopup from "../../components/ProfileAndSettings/EditProfileCompo/UpdateProfilePicPopup";

const SettingsProfileInnerPage = ({ route, navigation }) => {
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { globalDataStates } = useSelector((state) => state.Global);
  const scrollY = useRef(new Animated.Value(0)).current;
  const { page } = route.params;
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  const pagesArray = [
    <GeneralSettings handleScroll={handleScroll} />,
    <Personalisation />,
    <Analytics handleScroll={handleScroll} />,
    <PaymentBilling handleScroll={handleScroll} />,
    <AcademicLinks />,
    <AboutPage handleScroll={handleScroll} />,
    <HelpCenter handleScroll={handleScroll} />,
    <TermsOfUse handleScroll={handleScroll} />,
    <PrivacyPolicy handleScroll={handleScroll} />,
    <ContactPage/>,
    <HelpCenterSearch/>,
    <EditProfile/>,
    <MakePaymentPage/>
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
      {toggleStates.toggleUnlockPremiumPopup && <UnlockPremiumPopup />}
      {toggleStates.toggleResetSettingsPopup && <ResetSettingsPopup />}
      <InnerPagesHeader scrollY={scrollY} />
      {pagesArray[page]}
    </SafeAreaView>
  );
};

export default SettingsProfileInnerPage;
