import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
} from "react-native";
import React from "react";
import { BlurView } from "@react-native-community/blur";
import { scaleFont } from "../../utils/responsive";
import { useDispatch, useSelector } from "react-redux";
import { setToggleLearningLabUnlockPopup, setToggleRoomCreationPopup } from "../../redux/slices/toggleSlice";
import icon from "../../assets/images/roomUnlock.png";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { setSettingsInnerPageComponentToRender, setSettingsInnerPageHeaderTitle } from "../../redux/slices/globalDataSlice";

const UnlockLearningLabPopup = () => {
  const { toggleStates, walletStates } = useSelector((state) => state.Toggle);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const balance = walletStates.walletBalance;

  const handleRecharge = () => {
    dispatch(setToggleLearningLabUnlockPopup(false));
    navigation.navigate("settingsInnerPages", { page: 11 });
    dispatch(setSettingsInnerPageHeaderTitle("Recharge Wallet"));
    dispatch(setSettingsInnerPageComponentToRender("Make Payment"));
  };

  return (
    <Modal
      visible={toggleStates.toggleLearningLabUnlockPopup}
      transparent={true}
      animationType="slide"
      onRequestClose={() => dispatch(setToggleLearningLabUnlockPopup(false))}
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
          onPress={() => dispatch(setToggleLearningLabUnlockPopup(false))}
        />

        <View style={styles.modalSheet}>
          <View style={styles.closeModalMain}>
            <AntDesign
              style={{ marginRight: 20 }}
              onPress={() => dispatch(setToggleLearningLabUnlockPopup(false))}
              name="close"
              size={20}
              color="black"
            />
          </View>

          <View style={styles.content}>
            <View style={styles.iconContainer}>
              <Image style={{ height: 50, width: 50 }} source={icon} />
            </View>

            <Text style={styles.title}>Recharge to Access Learning Labs</Text>

            <Text style={styles.description}>
              Your wallet balance is ₹{balance.toLocaleString("en-IN")}. Recharge your wallet to create Learning Labs and keep your research organized.
            </Text>

            <View style={styles.balanceCard}>
              <Text style={styles.balanceLabel}>Current Balance</Text>
              <Text style={styles.balanceAmount}>₹{balance.toLocaleString("en-IN")}</Text>
            </View>

            <View style={styles.btnsMain}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleRecharge}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>
                  Recharge & Create Learning Lab
                </Text>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    fontSize: scaleFont(24),
    color: "#1F2937",
    marginBottom: 6,
    fontFamily: "Mukta-Bold",
  },
  description: {
    fontSize: scaleFont(16),
    lineHeight: 24,
    color: "#6B7280",
    marginBottom: 24,
    fontFamily: "Mukta-Regular",
  },
  balanceCard: {
    backgroundColor: "#FEE2E2",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    alignItems: "center",
  },
  balanceLabel: {
    fontSize: scaleFont(12),
    fontFamily: "Mukta-Regular",
    color: "#991B1B",
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: scaleFont(24),
    fontFamily: "Mukta-Bold",
    color: "#991B1B",
  },
  button: {
    width: "100%",
    backgroundColor: "#081A35",
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Bold",
  },
  closeModalMain: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
});

export default UnlockLearningLabPopup;
