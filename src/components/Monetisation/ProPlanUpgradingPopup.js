import {
  View,
  Text,
  Platform,
  StyleSheet,
  Modal,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { scaleFont } from "../../utils/responsive";
import { BlurView } from "@react-native-community/blur";
import { AntDesign } from "@expo/vector-icons";
import { Check } from "lucide-react-native";
import { proPlanFeature } from "../../data/datas";
import { useDispatch, useSelector } from "react-redux";
import { setToggleProPlanUpgradePopup } from "../../redux/slices/toggleSlice";
import GradientText from "../common/GradientText";
import BigChakraIcon from '../../../assets/SvgIconsComponent/PaymentBillingIcons/BigChakraIcon'

const ProPlanUpgradingPopup = () => {
  const { toggleStates } = useSelector((state) => state.Toggle);
  const dispatch = useDispatch();
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const SCREEN_HEIGHT = Dimensions.get("window").height;
  return (
    <Modal
      visible={toggleStates.toggleProPlanUpgradePopup}
      transparent={true}
      animationType="slide"
      onRequestClose={() => dispatch(setToggleProPlanUpgradePopup(false))}
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
          onPress={() => dispatch(setToggleProPlanUpgradePopup(false))}
        />

        {/* Modal Sheet */}
        <View style={styles.modalSheet}>
          {/* Handle Bar */}
          <View style={styles.closeModalMain}>
            <AntDesign
              style={{ marginRight: 20 }}
              onPress={() => dispatch(setToggleProPlanUpgradePopup(false))}
              name="close"
              size={20}
              color="black"
            />
          </View>

          {/* Content */}
          <View style={styles.content}>
            {/* Icon */}
            <View style={styles.iconContainer}>
              {/* icon */}
              <BigChakraIcon/>
            </View>

            {/* Title */}
            <GradientText
            children="Pro Plan"
            fullWidth={true}
            fontSize={30}

            />

            {/* Description */}
            <Text style={styles.description}>
              Unlock smarter learning — go Pro and power up your progress
            </Text>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width: "100%", maxHeight: SCREEN_HEIGHT * 0.5 }}
            >
              <View style={styles.featuresList}>
                {proPlanFeature.map((feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <Check size={24} color="#10B981" strokeWidth={1.7} />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
              <View style={styles.cardsContainer}>
                {/* Monthly Plan Card */}
                <TouchableOpacity
                  style={[
                    styles.priceCard,
                    styles.monthlyCard,
                    selectedPlan === "monthly" && styles.selectedCard,
                  ]}
                  onPress={() => setSelectedPlan("monthly")}
                  activeOpacity={0.8}
                >
                  {/* Check Icon for Selected */}
                  {selectedPlan === "monthly" && (
                    <View style={styles.checkBadge}>
                      <Check size={14} color="#ffffff" strokeWidth={2} />
                    </View>
                  )}

                  <Text style={styles.priceText}>Upgrade for ₹1,999</Text>
                  <Text style={styles.periodText}>per month</Text>
                </TouchableOpacity>

                {/* Yearly Plan Card */}
                <TouchableOpacity
                  style={[
                    styles.priceCard,
                    styles.yearlyCard,
                    selectedPlan === "yearly" && styles.selectedCard,
                  ]}
                  onPress={() => setSelectedPlan("yearly")}
                  activeOpacity={0.8}
                >
                  {/* Save Badge */}
                  <View style={styles.saveBadge}>
                    <Text style={styles.saveText}>Save ₹14,088</Text>
                  </View>

                  {/* Check Icon for Selected */}
                  {selectedPlan === "yearly" && (
                    <View style={styles.checkBadge}>
                      <Check size={14} color="#ffffff" strokeWidth={2} />
                    </View>
                  )}

                  <Text style={styles.priceText}>Upgrade for ₹19,900</Text>
                  <Text style={styles.periodText}>per year</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>

            {/* Button */}
            <View style={styles.btnsMain}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => dispatch(setToggleProPlanUpgradePopup(false))}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>
                  Upgrade to Pro
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
    marginBottom: 10,
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
    fontSize: scaleFont(13),
    lineHeight: 24,
    color: "#1F2937",
    fontWeight: "500",
    flex: 1,
    paddingTop: 1,
  },
  cardsContainer: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
    marginBottom: 15,
  },
  priceCard: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    borderRadius: 20,
    padding: 13,
    borderWidth: 2,
    borderColor: "#D3DAE5",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedCard: {
    backgroundColor: "#EEF4FF",
    borderColor: "#081A35",
  },
  checkBadge: {
    position: "absolute",
    top: -17,
    right: 20,
    transform: [{ translateX: 12 }],
    width: 27,
    height: 27,
    borderRadius: 16,
    backgroundColor: "#081A35",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#ffffff",
  },
  saveBadge: {
    position: "absolute",
    top: -15,
    right: 15,
    backgroundColor: "#F3ECFF",
    borderWidth: 1,
    borderColor: "#7D1DE4",
    paddingHorizontal: 14,
    paddingVertical: 2,
    borderRadius: 20,
  },
  saveText: {
    color: "#7D1DE4",
    fontSize: 10,
    fontWeight: "600",
  },
  priceText: {
    fontSize: scaleFont(12.5),
    fontWeight: "600",
    color: "#1F2937",
    textAlign: "center",
  },
  periodText: {
    fontSize: scaleFont(12.5),
    fontWeight: "600",
    color: "#1F2937",
    textAlign: "center",
  },
  closeModalMain: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
});

export default ProPlanUpgradingPopup;
