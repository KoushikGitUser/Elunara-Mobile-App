import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BlurView } from "@react-native-community/blur";
import { scaleFont } from "../../utils/responsive";
import { useNavigation } from "@react-navigation/native";
import { triggerToast } from "../../services/toast";
import { appColors } from "../../themes/appColors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { setIsLogOutToFalse, userLogOut } from "../../redux/slices/authSlice";
import {
  removeToken,
  removeRefreshToken,
} from "../../utils/Secure/secureStore";
import { resetAllStates } from "../../redux/actions/resetActions";

const ConfirmLogoutPopup = ({
  toggleLogOutConfirmPopup,
  setToggleLogOutConfirmPopup,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { authStates } = useSelector((state) => state.Auth);

  useEffect(() => {
    const handleLogout = async () => {
      if (authStates.isLogOut === true) {
        // Reset all Redux states
        dispatch(resetAllStates());

        // Clear tokens
        await removeToken();
        await removeRefreshToken();

        // Clear AsyncStorage
        await AsyncStorage.setItem("authenticUser", "false");

        // Close popup
        setToggleLogOutConfirmPopup(false);

        // Navigate to welcome screen
        navigation.reset({
          index: 0,
          routes: [{ name: "welcome" }],
        });

        // Reset logout state
        dispatch(setIsLogOutToFalse());
      }
    };
    handleLogout();
  }, [authStates.isLogOut]);

  return (
    <Modal
      visible={toggleLogOutConfirmPopup}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setToggleLogOutConfirmPopup(false)}
    >
      <View style={styles.container}>
        {/* Blur Background */}

        <BlurView
          style={styles.blurView}
          blurType="light"
          blurAmount={7}
          reducedTransparencyFallbackColor="rgba(0, 0, 0, 0.43)"
        />
        <View style={styles.androidBlur} />

        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={() => setToggleLogOutConfirmPopup(false)}
        />

        {/* Modal Sheet */}
        <View style={styles.modalSheet}>
          {/* Handle Bar */}
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>

          {/* Content */}
          <View style={styles.content}>
            {/* Title */}
            <Text style={styles.title}>Confirm Log Out</Text>

            {/* Description */}
            <Text style={styles.description}>
              Are you sure you want to log out? You'll need to sign in again to
              access your Rooms and chats.
            </Text>

            {/* Button */}
            <View style={styles.btnsMain}>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor: "white",
                    borderWidth: 1,
                    borderColor: "black",
                  },
                ]}
                onPress={() => setToggleLogOutConfirmPopup(false)}
                activeOpacity={0.8}
              >
                <Text style={[styles.buttonText, { color: "black" }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor:
                      authStates.isLogOut == "pending"
                        ? "#CDD5DC"
                        : appColors.navyBlueShade,
                  },
                ]}
                disabled={authStates.isLogOut == "pending"}
                onPress={() => {
                  dispatch(userLogOut());
                }}
                activeOpacity={0.8}
              >
                {authStates.isLogOut == "pending" ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text style={styles.buttonText}>Log Out</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  blurView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  androidBlur: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.18)",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalSheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: Platform.OS === "ios" ? 40 : 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 20,
  },
  btnsMain: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  verifiedIcon: {
    height: 55,
    width: 50,
    objectFit: "contain",
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: scaleFont(23),
    fontFamily: "Mukta-Bold",
    color: "#1F2937",
    marginBottom: 16,
  },
  description: {
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Regular",
    lineHeight: 24,
    color: "#6B7280",
    marginBottom: 32,
    letterSpacing: 0.2,
  },
  button: {
    width: "48%",
    backgroundColor: "#081A35",
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(14),
    fontWeight: "500",
    fontFamily: "Mukta-Medium",
    letterSpacing: 0.3,
  },
});

export default ConfirmLogoutPopup;
