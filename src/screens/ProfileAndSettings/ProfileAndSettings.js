import { View, Text, Animated, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../../components/ProfileAndSettings/ProfileHeader";
import UserSection from "../../components/ProfileAndSettings/UserSection";
import ProfileOptionsContainer from "../../components/ProfileAndSettings/ProfileOptionsContainer";
import ChatHistorySidebar from "../../components/ChatScreen/ChatHistorySidebar/ChatHistorySidebar";
import ConfirmLogoutPopup from "../../components/ProfileAndSettings/ConfirmLogoutPopup";
import { useSelector } from "react-redux";
import UnlockAnalyticsDashboardPopup from "../../components/Monetisation/UnlockAnalyticsDashboardPopup";
import UnlockAdFreeExpPopup from "../../components/Monetisation/UnlockAdFreeExpPopup";
import { useFonts } from "expo-font";

const ProfileAndSettings = () => {
  const translateX = React.useRef(new Animated.Value(0)).current;
  const { toggleStates } = useSelector((state) => state.Toggle);
  const [toggleLogOutConfirmPopup, setToggleLogOutConfirmPopup] =
    useState(false);

  const [fontsLoaded] = useFonts({
    "Mukta-Bold": require("../../../assets/fonts/Mukta-Bold.ttf"),
    "Mukta-Regular": require("../../../assets/fonts/Mukta-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
    }
  }, [fontsLoaded]);

  // Show nothing (or a loader) while fonts are loading
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FAFAFA",
        paddingHorizontal: 20,
        marginTop: -StatusBar.currentHeight,
      }}
    >
      {toggleStates.toggleUnlockAnalyticsDashboardPopup && (
        <UnlockAnalyticsDashboardPopup />
      )}
      {toggleStates.toggleAdFreeExpPopup && <UnlockAdFreeExpPopup />}
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        translucent={false}
        animated
      />
      <ConfirmLogoutPopup
        toggleLogOutConfirmPopup={toggleLogOutConfirmPopup}
        setToggleLogOutConfirmPopup={setToggleLogOutConfirmPopup}
      />
      <ChatHistorySidebar translateX={translateX} />
      <Animated.View style={{ flex: 1, transform: [{ translateX }] }}>
        <View
          style={{
            height: StatusBar.currentHeight,
            width: "100%",
            backgroundColor: "#FAFAFA",
            zIndex: 9999,
          }}
        ></View>
        <ProfileHeader translateX={translateX} />
        <UserSection />
        <ProfileOptionsContainer
          setToggleLogOutConfirmPopup={setToggleLogOutConfirmPopup}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

export default ProfileAndSettings;
