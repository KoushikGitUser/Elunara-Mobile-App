import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import { moderateScale, scaleFont, verticalScale } from "../../../utils/responsive";
import GradientText from "../../common/GradientText";
import chakraLogo from "../../../assets/images/Knowledge Chakra 2.png";
import { useFonts } from "expo-font";

const GreetingsHeader = () => {
    const [fontsLoaded] = useFonts({
    'Mukta-Bold': require('../../../../assets/fonts/Mukta-Bold.ttf'),
    'Mukta-Regular': require('../../../../assets/fonts/Mukta-Regular.ttf')
  });
  
    useEffect(() => {
      if (fontsLoaded) {
      }
    }, [fontsLoaded]);
  
    // Show nothing (or a loader) while fonts are loading
    if (!fontsLoaded) {
      return null;
    }

  const belowText = "Pick a topic below, or just start typing \n— I've got you."
  return (
    <View style={styles.greetingsMain}>
      <View>
      <View style={styles.greetingPlusname}>
        <GradientText
          children="Good Morning,   "
          fullWidth={false}
          widthNumber={0.45}
          fontSize={25}
        />
        <Text style={{ fontSize: 22, fontWeight: 500,fontFamily:'Mukta-Bold'}}>Koushik!</Text>
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
    gap: 10,
  },
  image: {
      height: 115,
      width: 80,
      position: "absolute",
      right: -25,
      zIndex: 1,
      marginTop: 10,
  },
});

export default GreetingsHeader;
