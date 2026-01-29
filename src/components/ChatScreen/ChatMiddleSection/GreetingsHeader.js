import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import { moderateScale, scaleFont, verticalScale } from "../../../utils/responsive";
import GradientText from "../../common/GradientText";
import chakraLogo from "../../../assets/images/Knowledge Chakra 2.png";
import { useFonts } from "expo-font";
import { useSelector } from "react-redux";

const GreetingsHeader = () => {
    const [fontsLoaded] = useFonts({
    'Mukta-Bold': require('../../../../assets/fonts/Mukta-Bold.ttf'),
    'Mukta-Regular': require('../../../../assets/fonts/Mukta-Regular.ttf')
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
            return "Hello,";
        }
    };

  const belowText = "Pick a topic below, or just start typing \n— I've got you."
  return (
    <View style={styles.greetingsMain}>
      <View>
      <View style={styles.greetingPlusname}>
        <GradientText
          children={getGreeting()}
          fullWidth={false}
          fontSize={24}
          measureWidth={true}
        />
        <Text style={{ fontSize: 22, fontWeight: 500,fontFamily:'Mukta-Bold'}}>{firstName}!</Text>
      </View>
      <Text style={{fontSize:scaleFont(15),color:"#9C9C9C",fontFamily:'Mukta-Regular'}}>
         {belowText}
      </Text>
      </View>

      <Image style={styles.image} source={chakraLogo} />
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
    gap: 0,
  },
  image: {
      height: 115,
      width: 80,
      position: "absolute",
      right: -25,
      zIndex: 1,
      top:-50
  },
});

export default GreetingsHeader;
