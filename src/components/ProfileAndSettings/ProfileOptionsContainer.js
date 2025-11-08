import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { profileAndSettingsOptions } from "../../data/datas";
import SparkleIcon from "../../../assets/SvgIconsComponent/ChatHistorySidebarIcons/SparkleIcon";
import GradientText from "../common/GradientText";
import { moderateScale, verticalScale } from "../../utils/responsive";

const ProfileOptionsContainer = () => {
  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
      style={styles.container}
    >
      {profileAndSettingsOptions?.map((option, optionIndex) => {
        return (
          <TouchableOpacity style={styles.itemContainer}>
            {option.icon}
            <Text style={styles.title}>{option.title}</Text>
          </TouchableOpacity>
        );
      })}
      <TouchableOpacity style={styles.upgradeBtn}>
        <SparkleIcon />
        <View>
          <GradientText
            children="Upgrade plan"
            fullWidth={true}
            fontSize={18}
          />
          <Text style={{ fontSize: moderateScale(10), color: "#757575" }}>
            More access to the best models
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    marginTop:20
  },
  itemContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingVertical: 18,
  },
  icon: {
    marginRight: 15,
  },
  title: {
    fontSize: 16,
    color: "#1A202C",
    fontWeight: "500",
  },
  upgradeBtn: {
    width: "100%",
    height: verticalScale(65),
    borderWidth: 1,
    borderColor: "#D3DAE5",
    borderRadius: 16,
    padding: 12,
    gap: 15,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop:20,
    marginBottom:30
  },
});

export default ProfileOptionsContainer;
