import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useState, useEffect } from "react";
import userImg from "../../assets/images/profilepic.png";
import corporateAvatar from "../../assets/images/Corporate2.png";
import teacherAvatar from "../../assets/images/Teacher2.png";
import maleStudentAvatar from "../../assets/images/Student Male2.png";
import femaleStudentAvatar from "../../assets/images/Student Female2.png";
import { scaleFont } from "../../utils/responsive";
import PencilIcon from "../../../assets/SvgIconsComponent/ProfilePageOptionsIcons/PencilIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  setSettingsInnerPageComponentToRender,
  setSettingsInnerPageHeaderTitle,
} from "../../redux/slices/globalDataSlice";
import { useNavigation } from "@react-navigation/native";
import MobileVerificationPopup from "../ChatScreen/MobileVerificationPopup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { commonFunctionForAPICalls } from "../../redux/slices/apiCommonSlice";

const UserSection = () => {
  const [mobileVerificationPopup, setMobileVerificationPopup] = useState(false);
  const [isMobileVerified, setIsMobileVerified] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const { settingsStates } = useSelector((state) => state.API);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkMobileVerification =  () => {
      setIsMobileVerified(settingsStates?.allProfileInfos?.phone_verified);
    };
    checkMobileVerification();
  }, [settingsStates?.allProfileInfos?.phone_verified]);


  useEffect(() => {
    const payload = {
      method: "GET",
      url: "/settings/profile",
      name: "getAllProfileInfos",
    };
    dispatch(commonFunctionForAPICalls(payload));
  }, []);

  // Set profile image based on API data
  useEffect(() => {
    const profileData = settingsStates?.allProfileInfos;
    if (profileData) {
      if (profileData.profile_image !== null) {
        // Profile image from API takes priority
        setProfileImage(profileData.profile_image);
      } else if (profileData.avatar_type !== null) {
        // Set respective avatar from local assets
        switch (profileData.avatar_type) {
          case "corporate":
            setProfileImage(corporateAvatar);
            break;
          case "teacher":
            setProfileImage(teacherAvatar);
            break;
          case "student_male":
            setProfileImage(maleStudentAvatar);
            break;
          case "student_female":
            setProfileImage(femaleStudentAvatar);
            break;
          default:
            setProfileImage(null);
        }
      } else {
        // Both are null, use default local asset
        setProfileImage(null);
      }
    }
  }, [settingsStates?.allProfileInfos]);

  const navigation = useNavigation();
  
  return (
    <View style={styles.upgradeBtn}>
      <MobileVerificationPopup
        close={setMobileVerificationPopup}
        mobileVerificationPopup={mobileVerificationPopup}
        isFromProfile={true}
      />
      <View style={styles.upper}>
        <Image
          source={
            profileImage
              ? typeof profileImage === "string"
                ? { uri: profileImage }
                : profileImage
              : userImg
          }
          style={styles.userImg}
        />
        <View>
          <Text
            style={{
              fontSize: scaleFont(16),
              fontWeight: 600,
              fontFamily: "Mukta-Bold",
            }}
          >
            {settingsStates?.allProfileInfos?.first_name || ""} {settingsStates?.allProfileInfos?.last_name || ""}
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
            {settingsStates?.allProfileInfos?.email || ""}
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
        <TouchableOpacity
          onPress={() => setMobileVerificationPopup(true)}
          style={styles.mobileVerifyButton}
        >
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
