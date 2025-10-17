import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "./chatSidebarStyles.styles";
import profilePic from "../../../assets/images/profilepic.png";
import { moderateScale } from "../../../utils/responsive";

const SidebarFooter = () => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();

  return (
    <View style={styles.chatHistorySidebarFooter}>
      <TouchableOpacity style={styles.profileButton}>
        <Image source={profilePic} style={styles.profilePic} />
        <Text style={styles.profileText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.upgradeBtn}>
        <Ionicons name="sparkles-outline" size={24} color="#888888" />
        <View>
          <Text style={{ fontSize: moderateScale(14), fontWeight: 600 }}>
            Upgrade plan
          </Text>
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
