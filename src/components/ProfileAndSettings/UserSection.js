import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import userImg from "../../assets/images/profilepic.png";
import { scaleFont } from "../../utils/responsive";
import PencilIcon from "../../../assets/SvgIconsComponent/ProfilePageOptionsIcons/PencilIcon";

const UserSection = () => {
  return (
    <View style={styles.upgradeBtn}>
      <View style={styles.upper}>
        <Image source={userImg} style={styles.userImg} />
        <View>
          <Text style={{ fontSize: scaleFont(14), fontWeight: 600 }}>
            Neha Jain
          </Text>
          <Text style={{ fontSize: scaleFont(14), fontWeight: 400,color:"#757575"}}>
            neha@gmail.com
          </Text>
        </View>
        <TouchableOpacity style={{marginLeft:"auto",alignSelf:"flex-end"}}>
          <PencilIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  upgradeBtn: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#D3DAE5",
    borderRadius: 16,
    padding: 12,
    gap: 15,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  upper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  userImg: {
    height: 50,
    width: 50,
    marginRight:20
  },
});

export default UserSection;
