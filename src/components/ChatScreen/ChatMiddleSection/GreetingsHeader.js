import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { moderateScale, scaleFont, verticalScale } from "../../../utils/responsive";
import GradientText from "../../common/GradientText";
import chakraLogo from "../../../assets/images/Knowledge Chakra 2.png";

const GreetingsHeader = () => {
  const belowText = "Pick a topic below, or just start typing \n— I've got you."
  return (
    <View style={styles.greetingsMain}>
      <View>
      <View style={styles.greetingPlusname}>
        <GradientText
          children="Good Morning,"
          fullWidth={false}
          widthNumber={0.57}
          fontSize={25}
        />
        <Text style={{ fontSize: 20, fontWeight: 600 }}>Koushik!</Text>
      </View>
      <Text style={{fontSize:scaleFont(14),color:"#9C9C9C"}}>
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
