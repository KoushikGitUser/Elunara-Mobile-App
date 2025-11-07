import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React, { useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "./chatSidebarStyles.styles";
import profilePic from "../../../assets/images/profilepic.png";
import { moderateScale } from "../../../utils/responsive";
import spark from "../../../assets/images/spark.png";
import GradientText from "../../common/GradientText";
import { useDispatch } from "react-redux";
import { setToggleChatHistorySidebar } from "../../../redux/slices/toggleSlice";
import SparkleIcon from "../../../../assets/SvgIconsComponent/ChatHistorySidebarIcons/SparkleIcon";

const SidebarFooter = () => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={styles.chatHistorySidebarFooter}>
      <TouchableOpacity
        onPress={() => {
          Alert.alert("Logout?", "Are you sure you want to logout?", [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Ok",
              onPress: () => {
                navigation.navigate("welcome");
                dispatch(setToggleChatHistorySidebar(false));
              },
            },
          ]);
        }}
        style={styles.profileButton}
      >
        <Image source={profilePic} style={styles.profilePic} />
        <Text style={styles.profileText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.upgradeBtn}>
       <SparkleIcon/>
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
      <View style={styles.madeinindia}>
        <Text style={{ color: "#757575", fontSize: moderateScale(16) }}>
          Made in India
        </Text>
      </View>
    </View>
  );
};

export default SidebarFooter;
