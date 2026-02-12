import {
  View,
  Text,
  Platform,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import React from "react";
import { scaleFont } from "../../utils/responsive";
import { BlurView } from "@react-native-community/blur";
import { AntDesign } from "@expo/vector-icons";
import { Check } from "lucide-react-native";
import { analyticsFeatures } from "../../data/datas";
import { useDispatch, useSelector } from "react-redux";
import icon from "../../assets/images/bulbUnlock.png";
import { setToggleUnlockAnalyticsDashboardPopup } from "../../redux/slices/toggleSlice";
import { useNavigation } from "@react-navigation/native";
import { setSettingsInnerPageComponentToRender, setSettingsInnerPageHeaderTitle } from "../../redux/slices/globalDataSlice";

const UnlockAnalyticsDashboardPopup = () => {
  const { toggleStates, walletStates } = useSelector((state) => state.Toggle);
  const dispatch = useDispatch();
  const SCREEN_HEIGHT = Dimensions.get("window").height;
  const navigation = useNavigation();
  const balance = walletStates.walletBalance;

  const handleRecharge = () => {
    dispatch(setToggleUnlockAnalyticsDashboardPopup(false));
    navigation.navigate("settingsInnerPages", { page: 11 });
    dispatch(setSettingsInnerPageHeaderTitle("Recharge Wallet"));
    dispatch(setSettingsInnerPageComponentToRender("Make Payment"));
  };

  return (
    <Modal
      visible={toggleStates.toggleUnlockAnalyticsDashboardPopup}
      transparent={true}
      animationType="slide"
      onRequestClose={() =>
        dispatch(setToggleUnlockAnalyticsDashboardPopup(false))
      }
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
          onPress={() =>
            dispatch(setToggleUnlockAnalyticsDashboardPopup(false))
          }
        />

        <View style={styles.modalSheet}>
          <View style={styles.closeModalMain}>
            <AntDesign
              style={{ marginRight: 20 }}
              onPress={() =>
                dispatch(setToggleUnlockAnalyticsDashboardPopup(false))
              }
              name="close"
              size={20}
              color="black"
            />
          </View>

          <View style={styles.content}>
            <View style={styles.iconContainer}>
              <Image style={{ height: 50, width: 50 }} source={icon} />
            </View>

            <Text style={styles.title}>Recharge to View Analytics</Text>

            <Text style={styles.description}>
              Your wallet balance is ₹{balance.toLocaleString("en-IN")}. Recharge to access personalized study insights and analytics.
            </Text>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width: "100%", maxHeight: SCREEN_HEIGHT * 0.35 }}
            >
              <View style={styles.featuresList}>
                {analyticsFeatures.map((feature, index) => (
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
                <Text style={styles.buttonText}>Recharge & View Dashboard</Text>
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
    fontFamily: "Mukta-Bold",
    color: "#1F2937",
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: scaleFont(14),
    lineHeight: 24,
    fontFamily: "Mukta-Regular",
    color: "#6B7280",
    marginBottom: 24,
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
    fontSize: scaleFont(14),
    fontWeight: "500",
    fontFamily: "Mukta-Bold",
    letterSpacing: 0.3,
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
    color: "#1F2937",
    fontFamily: "Mukta-Medium",
    flex: 1,
    paddingTop: 1,
  },
  closeModalMain: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
});

export default UnlockAnalyticsDashboardPopup;
