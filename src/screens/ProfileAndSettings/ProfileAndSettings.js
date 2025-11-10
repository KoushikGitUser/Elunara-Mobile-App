import { View, Text, Animated } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../../components/ProfileAndSettings/ProfileHeader";
import UserSection from "../../components/ProfileAndSettings/UserSection";
import ProfileOptionsContainer from "../../components/ProfileAndSettings/ProfileOptionsContainer";
import ChatHistorySidebar from "../../components/ChatScreen/ChatHistorySidebar/ChatHistorySidebar";

const ProfileAndSettings = () => {
  const translateX = React.useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFA",paddingHorizontal:20}}>
      <ChatHistorySidebar translateX={translateX} />
      <Animated.View
        style={{ flex: 1, transform: [{ translateX }] }}
      >
        <ProfileHeader translateX={translateX}/>
        <UserSection/>
        <ProfileOptionsContainer/>
      </Animated.View>
    </SafeAreaView>
  );
};

export default ProfileAndSettings;
