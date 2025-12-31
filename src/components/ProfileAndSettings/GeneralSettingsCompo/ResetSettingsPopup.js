import {
  View,
  Text,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { scaleFont } from "../../../utils/responsive";
import { setToggleResetSettingsPopup } from "../../../redux/slices/toggleSlice";
import { BlurView } from "@react-native-community/blur";
import { AntDesign } from "@expo/vector-icons";
import { triggerToast } from "../../../services/toast";
import { commonFunctionForAPICalls, setIsAnythingChangedInGeneralSettings, setIsGeneralSettingsRestored } from "../../../redux/slices/apiCommonSlice";
import { useNavigation } from "@react-navigation/native";

const ResetSettingsPopup = () => {
  const { toggleStates } = useSelector((state) => state.Toggle);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { settingsStates } = useSelector((state) => state.API);

  useEffect(() => {
    if (settingsStates.isGeneralSettingsRestored === true) {
      dispatch(setToggleResetSettingsPopup(false));
      navigation.navigate("profile");
      triggerToast("Settings restored","Your all general settings restored to default","success",3000);
      dispatch(setIsAnythingChangedInGeneralSettings(true));
      dispatch(setIsGeneralSettingsRestored(false));
    }
  }, [settingsStates.isGeneralSettingsRestored]);

  return (
    <Modal
      visible={toggleStates.toggleResetSettingsPopup}
      transparent={true}
      animationType="slide"
      onRequestClose={() => dispatch(setToggleResetSettingsPopup(false))}
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
          onPress={() => dispatch(setToggleResetSettingsPopup(false))}
        />

        {/* Modal Sheet */}
        <View style={styles.modalSheet}>
          <View style={styles.closeModalMain}>
            <AntDesign
              onPress={() => dispatch(setToggleResetSettingsPopup(false))}
              name="close"
              size={24}
              color="black"
            />
          </View>

          {/* Content */}
          <View style={styles.content}>
            {/* Title */}
            <Text style={styles.title}>Reset Settings to Default?</Text>

            {/* Description */}
            <Text style={styles.description}>
              This will restore your Chat and General Settings to default. Your
              notes and history will remain unchanged. Proceed?
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
                onPress={() => dispatch(setToggleResetSettingsPopup(false))}
                activeOpacity={0.8}
              >
                <Text style={[styles.buttonText, { color: "black" }]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.button,
                  settingsStates.isGeneralSettingsRestored === "pending" && {
                    backgroundColor: "#CDD5DC",
                  },
                ]}
                onPress={() => {
                  const payload = {
                    method: "POST",
                    url: "/settings/restore-defaults",
                    name: "restoreAllGeneralSettings",
                  };
                  dispatch(commonFunctionForAPICalls(payload));
                }}
                activeOpacity={0.8}
                disabled={settingsStates.isGeneralSettingsRestored === "pending"}
              >
                {settingsStates.isGeneralSettingsRestored === "pending" ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text style={styles.buttonText}>Confirm Reset</Text>
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
  closeModalMain: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    marginTop: 30,
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
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: scaleFont(12),
    lineHeight: 24,
    color: "#6B7280",
    marginBottom: 32,
    letterSpacing: 0.2,
  },
  button: {
    width: "48%",
    backgroundColor: "#081A35",
    paddingVertical: 13,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(11),
    fontWeight: "500",
    letterSpacing: 0.3,
  },
});

export default ResetSettingsPopup;
