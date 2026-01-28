import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import GradientText from "../../components/common/GradientText";
import { appColors } from "../../themes/appColors";
import BigGrayChakra from "../../assets/images/BigGrayChakra.png";

const NoInternetScreen = ({ onRetry }) => {
  return (
    <View style={styles.container}>
      <Image source={BigGrayChakra} style={styles.chakraLogo} />
      <View style={styles.contentContainer}>
        <Feather style={{borderWidth:2,borderRadius:50,padding:10,borderColor:"#888888"}} name="wifi-off" size={35} color="#888888" />
        <GradientText marginTop={40} marginBottom={10} fontSize={25} fullWidth={true} style={styles.title}>
          No Internet Connection
        </GradientText>
        <Text style={styles.description}>
          Make Sure WiFi or Mobile Data is turned on and then Try Again
        </Text>
        <TouchableOpacity style={styles.button} onPress={onRetry}>
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  chakraLogo: {
    position: "absolute",
    top: 100,
    right: 0,
    height: 200,
    width: 120,
  },
  contentContainer: {
    alignItems: "flex-start",
  },
  title: {
    marginTop: 16,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "left",
    marginTop: 8,
    marginBottom: 44,
    fontFamily: "Mukta-Regular",
  },
  button: {
    backgroundColor: appColors.navyBlueShade,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 50,
    alignSelf: "center",
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Mukta-Bold",
  },
});

export default NoInternetScreen;
