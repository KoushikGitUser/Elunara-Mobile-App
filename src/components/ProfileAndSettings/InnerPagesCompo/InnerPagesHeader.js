import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";
import React from "react";
import { ArrowLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { scaleFont, verticalScale } from "../../../utils/responsive";
import { useSelector } from "react-redux";
import BackArrowLeftIcon from '../../../../assets/SvgIconsComponent/BackArrowLeftIcon'

const InnerPagesHeader = ({ scrollY }) => {
  const {globalDataStates} = useSelector((state) => state.Global);
  const navigation = useNavigation();

  // Interpolate border opacity based on scroll position
  const borderOpacity = scrollY
    ? scrollY.interpolate({
        inputRange: [0, 50],
        outputRange: [0, 1], 
        extrapolate: "clamp",
      })
    : new Animated.Value(0);

  return (
    <View style={styles.headerWrapper}>
      <View style={[styles.chatHeader]}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <BackArrowLeftIcon/>
        </TouchableOpacity>
        <Text style={{ fontSize: scaleFont(20), fontWeight: 600,fontFamily:"Mukta-Bold" }}>
          {globalDataStates.settingsInnerPageHeaderTitle}
        </Text>
      </View>
      
      {/* Animated Border */}
      <Animated.View
        style={[
          styles.headerBorder,
          {
            opacity: borderOpacity,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: "#FAFAFA",
    zIndex: 9,
  },
  chatHeader: {
    width: "100%",
    minHeight: verticalScale(64),
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    gap: 20,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
  headerBorder: {
    height: 1,
    backgroundColor: "#D3DAE5",
    width: "100%",
  },
});

export default InnerPagesHeader;
