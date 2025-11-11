import { View, Text, Animated } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../../components/ProfileAndSettings/ProfileHeader";
import UserSection from "../../components/ProfileAndSettings/UserSection";
import ProfileOptionsContainer from "../../components/ProfileAndSettings/ProfileOptionsContainer";
import ChatHistorySidebar from "../../components/ChatScreen/ChatHistorySidebar/ChatHistorySidebar";
import ConfirmLogoutPopup from "../../components/ProfileAndSettings/ConfirmLogoutPopup";

const ProfileAndSettings = () => {
  const translateX = React.useRef(new Animated.Value(0)).current;
  const [toggleLogOutConfirmPopup, setToggleLogOutConfirmPopup] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFA",paddingHorizontal:20}}>
      <ConfirmLogoutPopup toggleLogOutConfirmPopup={toggleLogOutConfirmPopup} setToggleLogOutConfirmPopup={setToggleLogOutConfirmPopup} />
      <ChatHistorySidebar translateX={translateX} />
      <Animated.View
        style={{ flex: 1, transform: [{ translateX }] }}
      >
        <ProfileHeader translateX={translateX}/>
        <UserSection/>
        <ProfileOptionsContainer setToggleLogOutConfirmPopup={setToggleLogOutConfirmPopup} />
      </Animated.View>
    </SafeAreaView>
  );
};

export default ProfileAndSettings;
