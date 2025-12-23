import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useState, useEffect } from "react";
import userImg from "../../assets/images/profilepic.png";
import { scaleFont } from "../../utils/responsive";
import PencilIcon from "../../../assets/SvgIconsComponent/ProfilePageOptionsIcons/PencilIcon";
import { useDispatch } from "react-redux";
import {
  setSettingsInnerPageComponentToRender,
  setSettingsInnerPageHeaderTitle,
} from "../../redux/slices/globalDataSlice";
import { useNavigation } from "@react-navigation/native";
import MobileVerificationPopup from "../ChatScreen/MobileVerificationPopup";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserSection = () => {
  const [mobileVerificationPopup, setMobileVerificationPopup] = useState(false);
  const [isMobileVerified, setIsMobileVerified] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkMobileVerification = async () => {
      const verified = await AsyncStorage.getItem("isMobileNumberVerifiedByOTP");
      setIsMobileVerified(verified === "true");
    };
    checkMobileVerification();
  }, []);
  const navigation = useNavigation();
  return (
    <View style={styles.upgradeBtn}>
      <MobileVerificationPopup close={setMobileVerificationPopup} mobileVerificationPopup={mobileVerificationPopup} isFromProfile={true} />
      <View style={styles.upper}>
        <Image source={userImg} style={styles.userImg} />
        <View>
          <Text
            style={{
              fontSize: scaleFont(16),
              fontWeight: 600,
              fontFamily: "Mukta-Bold",
            }}
          >
            Neha Jain
          </Text>
          <Text
            style={{
              fontSize: scaleFont(14),
              fontWeight: 400,
              color: "#757575",
              marginTop: 3,
              fontFamily: "Mukta-Regular",
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
      
      {!isMobileVerified && (
        <TouchableOpacity onPress={()=>setMobileVerificationPopup(true)} style={styles.mobileVerifyButton}>
          <Text
            style={{
              fontSize: scaleFont(13),
              color: "#3A3A3A",
              fontWeight: 500,
              fontFamily: "Mukta-Bold",
            }}
          >
            Verify mobile no. — 8 days left
          </Text>
        </TouchableOpacity>
      )}
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
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingLeft: 12,
  },
});

export default UserSection;
