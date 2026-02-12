import {
  View,
  Text,
  Platform,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { scaleFont } from "../../utils/responsive";
import { BlurView } from "@react-native-community/blur";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setToggleUnlockArchiveLimitPopup } from "../../redux/slices/toggleSlice";
import icon from "../../assets/images/archiveLimit.png";
import { useNavigation } from "@react-navigation/native";
import { setSettingsInnerPageComponentToRender, setSettingsInnerPageHeaderTitle } from "../../redux/slices/globalDataSlice";

const UnlockArchiveLimitPopup = () => {
  const { toggleStates, walletStates } = useSelector((state) => state.Toggle);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const balance = walletStates.walletBalance;

  const handleRecharge = () => {
    dispatch(setToggleUnlockArchiveLimitPopup(false));
    navigation.navigate("settingsInnerPages", { page: 11 });
    dispatch(setSettingsInnerPageHeaderTitle("Recharge Wallet"));
    dispatch(setSettingsInnerPageComponentToRender("Make Payment"));
  };

  return (
    <Modal
      visible={toggleStates.toggleUnlockArchiveLimitPopup}
      transparent={true}
      animationType="slide"
      onRequestClose={() => dispatch(setToggleUnlockArchiveLimitPopup(false))}
    >
      <View style={styles.container}>
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
          onPress={() => dispatch(setToggleUnlockArchiveLimitPopup(false))}
        />

        <View style={styles.modalSheet}>
          <View style={styles.closeModalMain}>
            <AntDesign
              style={{ marginRight: 20 }}
              onPress={() => dispatch(setToggleUnlockArchiveLimitPopup(false))}
              name="close"
              size={20}
              color="black"
            />
          </View>

          <View style={styles.content}>
            <View style={styles.iconContainer}>
              <Image style={{ height: 50, width: 50 }} source={icon} />
            </View>

            <Text style={styles.title}>Insufficient Balance</Text>

            <Text style={styles.description}>
              Your wallet balance is ₹{balance.toLocaleString("en-IN")}. Recharge your wallet to continue archiving chats and accessing all features.
            </Text>

            <Text style={styles.tipText}>
              Tip: Pin important chats so they're easy to find without archiving.
            </Text>

            <View style={styles.btnsMain}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "white", borderWidth: 1 }]}
                onPress={() => dispatch(setToggleUnlockArchiveLimitPopup(false))}
                activeOpacity={0.8}
              >
                <Text style={[styles.buttonText, { color: "black" }]}>
                  Manage Archived Chats
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={handleRecharge}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>Recharge Wallet</Text>
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
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 20,
  },
  btnsMain: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
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
    fontFamily: "Mukta-Bold",
    color: "#1F2937",
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: scaleFont(14),
    lineHeight: 24,
    color: "#6B7280",
    marginBottom: 16,
    fontFamily: "Mukta-Regular",
  },
  tipText: {
    fontSize: scaleFont(12),
    lineHeight: 24,
    color: "#6B7280",
    marginBottom: 24,
    fontFamily: "Mukta-Regular",
  },
  button: {
    width: "100%",
    backgroundColor: "#081A35",
    paddingVertical: 13,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(13),
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

export default UnlockArchiveLimitPopup;
