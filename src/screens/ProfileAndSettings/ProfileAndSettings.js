import { View, Text, Animated } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "../../components/ProfileAndSettings/ProfileHeader";
import UserSection from "../../components/ProfileAndSettings/UserSection";
import ProfileOptionsContainer from "../../components/ProfileAndSettings/ProfileOptionsContainer";

const ProfileAndSettings = () => {
  const translateX = React.useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFA",paddingHorizontal:20}}>
      <Animated.View
        style={{ flex: 1, transform: [{ translateX }] }}
      >
        <ProfileHeader/>
        <UserSection/>
        <ProfileOptionsContainer/>
      </Animated.View>
    </SafeAreaView>
  );
};

export default ProfileAndSettings;
