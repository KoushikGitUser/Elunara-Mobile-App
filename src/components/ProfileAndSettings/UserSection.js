import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import userImg from "../../assets/images/profilepic.png";
import { scaleFont } from "../../utils/responsive";
import PencilIcon from "../../../assets/SvgIconsComponent/ProfilePageOptionsIcons/PencilIcon";
import { useDispatch } from "react-redux";
import {
  setSettingsInnerPageComponentToRender,
  setSettingsInnerPageHeaderTitle,
} from "../../redux/slices/globalDataSlice";
import { useNavigation } from "@react-navigation/native";

const UserSection = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <View style={styles.upgradeBtn}>
      <View style={styles.upper}>
        <Image source={userImg} style={styles.userImg} />
        <View>
          <Text style={{ fontSize: scaleFont(14), fontWeight: 600 }}>
            Neha Jain
          </Text>
          <Text
            style={{
              fontSize: scaleFont(14),
              fontWeight: 400,
              color: "#757575",
              marginTop: 3,
            }}
          >
            neha@gmail.com
          </Text>
          {/* <Text style={{ fontSize: scaleFont(14), fontWeight: 400,color:"#757575",marginTop:3}}>
            +91 9807649876
          </Text> */}
        </View>
        <TouchableOpacity
          onPress={() => {
            dispatch(setSettingsInnerPageHeaderTitle("Profile Information"));
            dispatch(setSettingsInnerPageComponentToRender("Edit Profile"));
            navigation.navigate("settingsInnerPages", { page: 11 });
          }}
          style={{ marginLeft: "auto", alignSelf: "flex-end" }}
        >
          <PencilIcon />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.mobileVerifyButton}>
        <Text style={{fontSize:scaleFont(12),color:"#3A3A3A",fontWeight:500}}>
          Verify mobile no. — 8 days left
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  upgradeBtn: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#D3DAE5",
    borderRadius: 16,
    gap: 2,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  upper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 12,
  },
  userImg: {
    height: 50,
    width: 50,
    marginRight: 20,
  },
  mobileVerifyButton: {
    width: "100%",
    backgroundColor: "#F3F3F3",
    height: 40,
    borderBottomRightRadius:16,
    borderBottomLeftRadius:16,
    flexDirection:"row",
    justifyContent:"flex-start",
    alignItems:"center",
    paddingLeft:12
  },
});

export default UserSection;
