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
      <View style={styles.header}>
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
      <View style={[styles.settingItem, { marginTop: 20 }]}>
        <View style={styles.settingTextContainer}>
          <Text style={styles.settingTitle}>Email Notifications</Text>
          <Text style={styles.settingDescription}>
            Receive updates and important information directly in your inbox.
          </Text>
        </View>
        <CustomSwitch
          value={emailNotifications}
          onValueChange={setEmailNotifications}
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
    fontSize: scaleFont(17),
    fontWeight: "600",
    color: "#1F2937",
    letterSpacing: -0.5,
    paddingLeft: 10,
  },
  subtitle: {
    fontSize: scaleFont(13),
    color: "#6B7280",
    marginTop: 10,
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
    fontSize: 15,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 5,
    letterSpacing: -0.3,
  },
  settingDescription: {
    fontSize: scaleFont(13),
    color: "#6B7280",
  },
});

export default NotificationSettings;
