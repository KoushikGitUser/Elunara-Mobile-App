import { View, Text, TouchableOpacity, Animated, StyleSheet } from "react-native";
import React from "react";
import { scaleFont, verticalScale } from "../../utils/responsive";
import { ArrowLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

const AddRoomDetailsHeader = ({ scrollY }) => {
  const navigation = useNavigation();

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
          <ArrowLeft strokeWidth={2} />
        </TouchableOpacity>
        <Text style={{ fontSize: scaleFont(18), fontWeight: 600 }}>
          Learning Lab details
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

export default AddRoomDetailsHeader;
