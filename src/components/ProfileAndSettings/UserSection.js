import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useState, useEffect, useMemo } from "react";
import userImg from "../../assets/images/defaultUserPic.png";
import corporateAvatar from "../../assets/images/Corporate2.png";
import teacherAvatar from "../../assets/images/Teacher2.png";
import maleStudentAvatar from "../../assets/images/Student Male2.png";
import femaleStudentAvatar from "../../assets/images/Student Female2.png";
import { scaleFont } from "../../utils/responsive";
import { parseApiDate } from "../../utils/parseApiDate";
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
  const [profileImage, setProfileImage] = useState(userImg);
  const { settingsStates } = useSelector((state) => state.API);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkMobileVerification =  () => {
      setIsMobileVerified(settingsStates?.allProfileInfos?.phone_verified);
    };
    checkMobileVerification();
  }, [settingsStates?.allProfileInfos?.phone_verified]);

  // Days-left for mobile verification — derived (NOT useState) so it always
  // reflects the current source of truth (userData.created_at). The previous
  // useState(0) + useEffect approach surfaced "0 days left" on a freshly
  // logged-in account because the effect's `if (createdDate)` guard early-
  // exited while userData was still loading, leaving the state at its
  // initial 0. The fresh-account user then saw "0 days left" — which is the
  // expired-grace value, not the loading value.
  //
  // 10-day grace window from account creation. Returns:
  //   10 (full grace)  → no userData yet, OR account just created today
  //   1..9             → grace decreasing day by day
  //   0                → grace expired (compulsory verify popup gate triggers
  //                      via the parallel calc in ChatScreen.js)
  const daysLeft = useMemo(() => {
    const createdDate = parseApiDate(settingsStates?.userData?.created_at);
    if (!createdDate) return 10;
    const diffDays = Math.floor(
      (new Date() - createdDate) / (1000 * 60 * 60 * 24),
    );
    const remaining = 10 - diffDays;
    return remaining > 0 ? remaining : 0;
  }, [settingsStates?.userData?.created_at]);

  useEffect(() => {
    // /settings/profile populates allProfileInfos (avatar, etc.)
    dispatch(
      commonFunctionForAPICalls({
        method: "GET",
        url: "/settings/profile",
        name: "getAllProfileInfos",
      }),
    );
    // /user populates userData.created_at + phone_verified — required for the
    // days-left calc above. Dispatched here so profile page works even when
    // the user reached it via a flow that skipped SplashScreen/ChatScreen.
    dispatch(
      commonFunctionForAPICalls({
        method: "GET",
        url: "/user",
        name: "getUserData",
      }),
    );
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
            setProfileImage(userImg);
        }
      } else {
        // Both are null, use default local asset
        setProfileImage(userImg);
      }
    }
  }, [settingsStates?.allProfileInfos]);

  const navigation = useNavigation();

  const formatEmail = (email, maxLength = 20) => {
    if (!email) return "";

    if (email.length <= maxLength) return email;

    const [name, domain] = email.split("@");
    if (!domain) return email.substring(0, maxLength - 3) + "...";

    const dots = "...";
    const allowedNameLength =
      maxLength - domain.length - dots.length - 1;

    if (allowedNameLength <= 0) {
      return email.substring(0, maxLength - 3) + dots;
    }

    return `${name.substring(0, allowedNameLength)}${dots}@${domain}`;
  };


  
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
          style={[
            styles.userImg,
            { objectFit: typeof profileImage === "string" ? "cover" : "contain" }
          ]}
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
            numberOfLines={1}
            ellipsizeMode="middle"
          >
           {formatEmail(settingsStates?.allProfileInfos?.email || "")}
          </Text>
          {isMobileVerified && settingsStates?.allProfileInfos?.phone_number ? (
            <Text
              style={{
                fontSize: scaleFont(14),
                fontWeight: 400,
                color: "#757575",
                marginTop: 3,
                fontFamily: "Mukta-Regular",
              }}
              numberOfLines={1}
              ellipsizeMode="middle"
            >
              {settingsStates.allProfileInfos.phone_number}
            </Text>
          ) : null}
        </View>
        <TouchableOpacity
          onPress={() => {
            dispatch(setSettingsInnerPageHeaderTitle("Profile Information"));
            dispatch(setSettingsInnerPageComponentToRender("Edit Profile"));
            navigation.navigate("settingsInnerPages", { page: 10 });
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
            Verify mobile no. — {daysLeft} {daysLeft === 1 ? "day" : "days"} left
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
    borderRadius: 10,
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
