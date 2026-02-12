import {
  View,
  Text,
  Platform,
  StyleSheet,
  Modal,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { scaleFont } from "../../utils/responsive";
import { BlurView } from "@react-native-community/blur";
import { AntDesign } from "@expo/vector-icons";
import { Check } from "lucide-react-native";
import { platformFeatures } from "../../data/datas";
import { useDispatch, useSelector } from "react-redux";
import { setToggleProPlanUpgradePopup } from "../../redux/slices/toggleSlice";
import GradientText from "../common/GradientText";
import BigChakraIcon from "../../../assets/SvgIconsComponent/PaymentBillingIcons/BigChakraIcon";
import { useNavigation } from "@react-navigation/native";
import { setSettingsInnerPageComponentToRender, setSettingsInnerPageHeaderTitle } from "../../redux/slices/globalDataSlice";

const ProPlanUpgradingPopup = () => {
  const { toggleStates, walletStates } = useSelector((state) => state.Toggle);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const SCREEN_HEIGHT = Dimensions.get("window").height;
  const balance = walletStates.walletBalance;

  const handleRecharge = () => {
    dispatch(setToggleProPlanUpgradePopup(false));
    navigation.navigate("settingsInnerPages", { page: 11 });
    dispatch(setSettingsInnerPageHeaderTitle("Recharge Wallet"));
    dispatch(setSettingsInnerPageComponentToRender("Make Payment"));
  };

  return (
    <Modal
      visible={toggleStates.toggleProPlanUpgradePopup}
      transparent={true}
      animationType="slide"
      onRequestClose={() => dispatch(setToggleProPlanUpgradePopup(false))}
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
          onPress={() => dispatch(setToggleProPlanUpgradePopup(false))}
        />

        <View style={styles.modalSheet}>
          <View style={styles.closeModalMain}>
            <AntDesign
              style={{ marginRight: 20 }}
              onPress={() => dispatch(setToggleProPlanUpgradePopup(false))}
              name="close"
              size={20}
              color="black"
            />
          </View>

          <View style={styles.content}>
            <View style={styles.iconContainer}>
              <BigChakraIcon />
            </View>

            <GradientText
              children="Recharge Required"
              fullWidth={true}
              fontSize={30}
            />

            <Text style={styles.description}>
              Your wallet balance is ₹{balance.toLocaleString("en-IN")}. Recharge your wallet to unlock all platform features.
            </Text>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width: "100%", maxHeight: SCREEN_HEIGHT * 0.4 }}
            >
              <View style={styles.featuresList}>
                {platformFeatures.map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <Check size={24} color="#10B981" strokeWidth={1.7} />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>

            <View style={styles.btnsMain}>
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
    marginBottom: 10,
  },
  description: {
    fontSize: scaleFont(16),
    lineHeight: 24,
    color: "#6B7280",
    marginBottom: 32,
    fontFamily: "Mukta-Regular",
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
    fontWeight: "500",
    fontFamily: "Mukta-Bold",
  },
  featuresList: {
    gap: 10,
    marginBottom: 30,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 12,
  },
  featureText: {
    fontSize: scaleFont(14),
    lineHeight: 24,
    color: "#414651",
    flex: 1,
    paddingTop: 1,
    fontFamily: "Mukta-Medium",
  },
  closeModalMain: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
});

export default ProPlanUpgradingPopup;
