import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BlurView } from "@react-native-community/blur";
import { AntDesign } from "@expo/vector-icons";
import UpgradeSparkleIcon from "../../../../assets/SvgIconsComponent/GeneralSettingsIcon/UpgradeSparkleIcon";
import { scaleFont } from "../../../utils/responsive";
import { setToggleUnlockPremiumPopup } from "../../../redux/slices/toggleSlice";

const UnlockPremiumPopup = () => {
  const { toggleStates } = useSelector((state) => state.Toggle);
  const dispatch = useDispatch();

  return (
    <Modal
      visible={toggleStates.toggleUnlockPremiumPopup}
      transparent={true}
      animationType="slide"
      onRequestClose={() => dispatch(setToggleUnlockPremiumPopup(false))}
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
          onPress={() => dispatch(setToggleUnlockPremiumPopup(false))}
        />

        {/* Modal Sheet */}
        <View style={styles.modalSheet}>
          {/* Close Button */}
          <View style={styles.closeModalMain}>
            <AntDesign
              style={{ marginRight: 20 }}
              onPress={() => dispatch(setToggleUnlockPremiumPopup(false))}
              name="close"
              size={23}
              color="black"
            />
          </View>

          {/* Content */}
          <View style={styles.content}>
            {/* Icon */}
            <View style={styles.iconContainer}>
              <UpgradeSparkleIcon />
            </View>

            {/* Title */}
            <Text style={styles.title}>Unlock Premium Features</Text>

            {/* Description */}
            <Text style={styles.description}>
              Upgrade your plan to enable this option and enjoy greater ad control along with premium benefits.
            </Text>

            {/* Button */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => dispatch(setToggleUnlockPremiumPopup(false))}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Upgrade Plan</Text>
            </TouchableOpacity>
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
    backgroundColor: "rgba(255, 255, 255, 1)",
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
  verifiedIcon: {
    height: 55,
    width: 50,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 32,
  },
  iconContainer: {
    marginBottom: 20,
    backgroundColor: "#E9EAEB",
    width:50,
    height:50,
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    borderRadius:50
  },
  title: {
    fontSize: scaleFont(24),
    fontFamily: "Mukta-Bold",
    color: "#1F2937",
    marginBottom: 16,
    letterSpacing: -0.5,
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
    fontFamily: "Mukta-Bold",
    letterSpacing: 0.3,
  },
  closeModalMain: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
});

export default UnlockPremiumPopup;
