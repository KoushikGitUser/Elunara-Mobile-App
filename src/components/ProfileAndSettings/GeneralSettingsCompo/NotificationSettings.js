import { View, Text, ScrollView, Switch, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { scaleFont } from "../../../utils/responsive";
import BellIcon from "../../../../assets/SvgIconsComponent/GeneralSettingsIcon/BellIcon";
import CustomSwitch from "../InnerPagesCompo/CustomSwitch";

const NotificationSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  return (
    <View style={styles.content}>
      {/* Header Section */}
      <View >
        <View style={styles.headerTitleContainer}>
          <BellIcon />
          <Text style={styles.title}>Notifications Settings</Text>
        </View>
        <Text style={styles.subtitle}>
          Manage how and when you receive updates, alerts, and important
          messages.
        </Text>
      </View>

      {/* Email Notifications Section */}
      <View style={[styles.settingItem, { marginTop: 10 }]}>
        <View style={styles.settingTextContainer}>
          <Text style={styles.settingTitle}>Email Notifications</Text>
          <Text style={styles.settingDescription}>
            Receive updates and important information directly in your inbox.
          </Text>
        </View>
        <CustomSwitch
          value={emailNotifications}
          onValueChange={setEmailNotifications}
          action="Email Notifications"
        />
      </View>

      {/* Push Notifications Section */}
      <View style={styles.settingItem}>
        <View style={styles.settingTextContainer}>
          <Text style={styles.settingTitle}>Push Notifications</Text>
          <Text style={styles.settingDescription}>
            Get real-time alerts and messages sent to your device.
          </Text>
        </View>
        <CustomSwitch
          value={pushNotifications}
          onValueChange={setPushNotifications}
          action="Push Notifications"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  content: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#D3DAE5",
    marginBottom:25
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  bellIcon: {
    marginRight: 16,
  }, 
  title: {
    fontSize: scaleFont(18),
    fontWeight: "600",
    color: "#1F2937",
    fontFamily:"Mukta-Bold",
    paddingLeft: 10,
  },
  subtitle: {
    fontSize: scaleFont(14),
    color: "#757575",
    marginTop: 10,
    fontFamily:"Mukta-Regular",
        lineHeight:20,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 0,
  },
  settingTextContainer: {
    flex: 1,
    marginRight: 24,
  },
  settingTitle: {
    fontSize: scaleFont(14),
    color: "#1F2937",
    marginBottom: 5,
    fontFamily:"Mukta-Bold",
  },
  settingDescription: {
    fontSize: scaleFont(12),
    color: "#6B7280",
    fontFamily:"Mukta-Regular",
  },
});

export default NotificationSettings;
