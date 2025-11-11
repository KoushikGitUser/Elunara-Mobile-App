import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { scaleFont } from "../../utils/responsive";
import PencilIcon from "../../../assets/SvgIconsComponent/ProfilePageOptionsIcons/PencilIcon";
import profilePic from "../../assets/images/profilepic.png";
import { Marker } from "react-native-svg";
import InfoIcon from "../../../assets/SvgIconsComponent/ProfilePageOptionsIcons/InfoIcon";

const EditProfile = () => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        width: "100%",
        paddingHorizontal: 20,
        backgroundColor: "#FAFAFA",
      }}
    >
      <View style={styles.profileImgContainer}>
        <View style={{ height: 120, width: 120, position: "relative1" }}>
          <Image
            source={profilePic}
            style={{ height: "100%", width: "100%" }}
          />
          <TouchableOpacity style={styles.editBtnImg}>
            <PencilIcon />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.fullnameInput}>
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>First Name</Text>
          <View style={styles.input}>
            <TextInput
              style={styles.inputText}
              placeholder="Your first name"
              placeholderTextColor="#9CA3AF"
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
              returnKeyType="done"
            />
            <TouchableOpacity>
              <PencilIcon />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Last Name</Text>
          <View style={styles.input}>
            <TextInput
              style={styles.inputText}
              placeholder="Your last name"
              placeholderTextColor="#9CA3AF"
              value={lastName}
              onChangeText={(text) => setLastName(text)}
              returnKeyType="done"
            />
            <TouchableOpacity>
              <PencilIcon />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={[styles.inputSection, { width: "100%" }]}>
        <Text style={styles.inputLabel}>Email</Text>
        <View style={styles.input}>
          <TextInput
            style={styles.inputText}
            placeholder="Your first name"
            placeholderTextColor="#9CA3AF"
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            returnKeyType="done"
          />
          <TouchableOpacity>
            <PencilIcon />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.inputSection, { width: "100%" }]}>
        <Text style={styles.inputLabel}>Password</Text>
        <View style={styles.input}>
          <TextInput
            style={styles.inputText}
            placeholder="Your first name"
            placeholderTextColor="#9CA3AF"
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            returnKeyType="done"
          />
          <TouchableOpacity>
            <PencilIcon />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerTitleContainer}>
            <TouchableOpacity>
              <InfoIcon />
            </TouchableOpacity>
            <Text style={styles.title}>Verify Mobile no. in 10 Days</Text>
          </View>
          <Text style={styles.subtitle}>
            Verifying your mobile no. helps protect your account and enables important notifications.
          </Text>
          <TouchableOpacity
            style={[
              styles.verifyButton,
            ]}
            activeOpacity={0.8}
          >
            <Text style={styles.verifyButtonText}>Verify and Secure Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inputSection: {
    marginBottom: 20,
    marginTop: 10,
    width: "48%",
  },
  inputLabel: {
    fontSize: scaleFont(10),
    fontWeight: "400",
    color: "#5E5E5E",
    marginBottom: 8,
    letterSpacing: 0.1,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#1F2937",
    letterSpacing: 0.2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  inputText: {
    backgroundColor: "#FFFFFF",
    fontSize: scaleFont(10),
    color: "#1F2937",
    letterSpacing: 0.2,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 35,
    marginTop: 15,
  },
  verifyButton: {
    backgroundColor: "#081A35",
    paddingVertical: 13,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop:20
  },
  verifyButtonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(11),
    fontWeight: "500",
    letterSpacing: 0.3,
  },
  fullnameInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  profileImgContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  editBtnImg: {
    backgroundColor: "#F3F3F3",
    borderWidth: 2,
    borderColor: "#FAFAFA",
    padding: 6,
    paddingRight: 9,
    paddingBottom: 9,
    position: "absolute",
    borderRadius: 9,
    right: -15,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#D3DAE5",
    marginBottom: 45,
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: scaleFont(16),
    fontWeight: "600",
    color: "#1F2937",
    letterSpacing: -0.5,
    paddingLeft: 10,
  },
  subtitle: {
    fontSize: scaleFont(12),
    color: "#6B7280",
    marginTop: 10,
  },
  settingDescription: {
    fontSize: scaleFont(13),
    color: "#6B7280",
  },
});

export default EditProfile;
