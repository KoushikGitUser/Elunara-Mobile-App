import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Animated,
  Dimensions,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "./chatSidebarStyles.styles";
import profilePic from "../../../assets/images/defaultUserPic.png";
import corporateAvatar from "../../../assets/images/Corporate2.png";
import teacherAvatar from "../../../assets/images/Teacher2.png";
import maleStudentAvatar from "../../../assets/images/Student Male2.png";
import femaleStudentAvatar from "../../../assets/images/Student Female2.png";
import { moderateScale } from "../../../utils/responsive";
import spark from "../../../assets/images/spark.png";
import GradientText from "../../common/GradientText";
import { useDispatch, useSelector } from "react-redux";
import {
  setToggleChatHistorySidebar,
  setToggleProPlanUpgradePopup,
} from "../../../redux/slices/toggleSlice";
import SparkleIcon from "../../../../assets/SvgIconsComponent/ChatHistorySidebarIcons/SparkleIcon";
import { commonFunctionForAPICalls } from "../../../redux/slices/apiCommonSlice";
import { appColors } from "../../../themes/appColors";

const SidebarFooter = ({ translateX }) => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { settingsStates } = useSelector((state) => state.API);
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const [profileImage, setProfileImage] = useState(null);

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

  return (
    <View style={styles.chatHistorySidebarFooter}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("profile");
          Animated.timing(translateX, {
            toValue: toggleStates.toggleChatHistorySidebar
              ? 0
              : SCREEN_WIDTH * 0.75,
            duration: 300,
            useNativeDriver: true,
          }).start();
          dispatch(
            setToggleChatHistorySidebar(!toggleStates.toggleChatHistorySidebar)
          );
        }}
        style={styles.profileButton}
      >
        <Image
          source={
            profileImage
              ? typeof profileImage === "string"
                ? { uri: profileImage }
                : profileImage
              : profilePic
          }
          style={styles.profilePic}
        />
        <Text style={[styles.profileText, { fontFamily: "Mukta-Bold" }]}>
          Profile
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => dispatch(setToggleProPlanUpgradePopup(true))}
        style={styles.upgradeBtn}
      >
        <SparkleIcon color={appColors.navyBlueShade} />
        <View>
          <GradientText
            children="Upgrade plan"
            fullWidth={true}
            fontSize={20}
          />
          <Text
            style={{
              fontSize: moderateScale(11),
              color: "#757575",
              fontFamily: "Mukta-Regular",
            }}
          >
            More access to the best models
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.madeinindia}>
        <Text
          style={{
            color: "#757575",
            fontSize: moderateScale(16),
            fontFamily: "Mukta-Regular",
          }}
        >
          Made in India
        </Text>
      </View>
    </View>
  );
};

export default SidebarFooter;
