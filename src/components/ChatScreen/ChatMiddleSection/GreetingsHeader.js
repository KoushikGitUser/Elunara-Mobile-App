import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import {
  moderateScale,
  scaleFont,
  verticalScale,
} from "../../../utils/responsive";
import SimpleGradientText from "../../common/SimpleGradientText";
import { useFonts } from "expo-font";
import { useSelector } from "react-redux";

const GreetingsHeader = () => {
  const [fontsLoaded] = useFonts({
    "Mukta-Bold": require("../../../../assets/fonts/Mukta-Bold.ttf"),
    "Mukta-Regular": require("../../../../assets/fonts/Mukta-Regular.ttf"),
  });

  // Get profile info from Redux
  const { settingsStates } = useSelector((state) => state.API);
  const firstName = settingsStates?.allProfileInfos?.first_name || "User";

  useEffect(() => {
    if (fontsLoaded) {
    }
  }, [fontsLoaded]);

  // Show nothing (or a loader) while fonts are loading
  if (!fontsLoaded) {
    return null;
  }

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      return "Good Morning,";
    } else if (hour >= 12 && hour < 17) {
      return "Good Afternoon,";
    } else if (hour >= 17 && hour < 21) {
      return "Good Evening,";
    } else {
      return "Hello there,";
    }
  };

  const belowText =
    "Pick a topic below, or just start typing \n— I've got you.";
  return (
    <View style={styles.greetingsMain}>
      <View style={{width:"100%"}}>
        <View style={styles.greetingPlusname}>
          <SimpleGradientText
            gradientText={getGreeting()}
            solidText={`${firstName}!`}
            fontSize={24}
          />
        </View>
        <Text
          style={{
            fontSize: scaleFont(15),
            color: "#9C9C9C",
            fontFamily: "Mukta-Regular",
          }}
        >
          {belowText}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  greetingsMain: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  greetingPlusname: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width:"100%"
  },
});

export default GreetingsHeader;
