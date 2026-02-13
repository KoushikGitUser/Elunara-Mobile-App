import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { scaleFont } from "../../../utils/responsive";
import PaidPlanChakraIcon from "../../../../assets/SvgIconsComponent/PaymentBillingIcons/PaidPlanChakraIcon";
import AuthGradientText from "../../common/AuthGradientText";
import { useSelector, useDispatch } from "react-redux";
import { LinearGradient as ExpoLinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { setSettingsInnerPageComponentToRender, setSettingsInnerPageHeaderTitle } from "../../../redux/slices/globalDataSlice";
import { appColors } from "../../../themes/appColors";

const PaidPlanCard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { walletStates } = useSelector((state) => state.Toggle);
  const balance = walletStates.walletBalance;
  const isFileFeaturesEnabled = balance >= 799;
  const isPromoActive = walletStates.isPromotionalUser && walletStates.promotionalDaysRemaining > 0;
  const isPromoNotActivated = isPromoActive && !walletStates.isInitialRechargeCompleted;
  const isPromoActivated = isPromoActive && walletStates.isInitialRechargeCompleted;

  const getStatusColor = () => {
    if (isPromoActive) return "#10B981";
    if (balance <= 0) return "#EF4444";
    if (balance < 799) return "#F59E0B";
    return "#10B981";
  };

  const getStatusText = () => {
    if (isPromoNotActivated) return "Free Trial";
    if (isPromoActivated) return "Will be active";
    if (balance <= 0) return "Inactive";
    if (balance < 799) return "Limited";
    return "Active";
  };

  const getStatusDescription = () => {
    if (isPromoNotActivated) return `All features enabled until ${walletStates.promotionalDaysRemaining} days`;
    if (isPromoActivated) return "This recharge will be active after the free trial ends";
    if (balance <= 0) return "All features disabled until you recharge your wallet";
    if (balance < 799) return "File uploads disabled below ₹799";
    return "All features enabled";
  };

  return (
    <View style={styles.cardWrapper}>
        <View style={styles.gradientWrapper}>
          <ExpoLinearGradient
            colors={["#1B365D", "#A5C0E7"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientBackground}
          />
        </View>
        <View style={styles.planCard}>
          <View style={styles.planHeader}>
            <PaidPlanChakraIcon />
            <AuthGradientText fontSize={25} textAlign="left">Wallet Balance</AuthGradientText>
          </View>

          {isPromoNotActivated ? (
            <Text style={styles.freeTrialText}>Free Trial</Text>
          ) : (
            <Text style={[styles.price, { color: getStatusColor() }]}>₹{balance.toLocaleString("en-IN")}</Text>
          )}

          <View style={styles.statusRow}>
            <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
            <Text style={[styles.statusText, { color: getStatusColor() }]}>
              {getStatusText()}
            </Text>
            <Text style={[styles.statusDescription, { color: getStatusColor() }]}>
              — {getStatusDescription()}
            </Text>
          </View>

          {!isPromoNotActivated && (
            <Text style={styles.infoText}>
              Usage-based deduction — no expiry on balance
            </Text>
          )}

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("settingsInnerPages", { page: 11 });
              dispatch(setSettingsInnerPageHeaderTitle("Recharge Wallet"));
              dispatch(setSettingsInnerPageComponentToRender("Make Payment"));
            }}
            style={styles.rechargeButton}
            activeOpacity={0.8}
          >
            <Text style={styles.rechargeButtonText}>Recharge Wallet</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    position: "relative",
    width: "100%",
    marginTop: 30,
  },
  gradientWrapper: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    borderRadius: 24,
    overflow: 'hidden',
  },
  gradientBackground: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  planCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    paddingVertical: 13,
    paddingHorizontal: 20,
    marginRight: 4,
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  planHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },
  price: {
    fontSize: scaleFont(32),
    fontWeight: "600",
    fontFamily: "Mukta-Bold",
    color: appColors.navyBlueShade,
    marginBottom: 10,
  },
  freeTrialText: {
    fontSize: scaleFont(32),
    fontWeight: "600",
    fontFamily: "Mukta-Bold",
    color: "#10B981",
    marginBottom: 10,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  statusText: {
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Medium",
    fontWeight: "600",
  },
  statusDescription: {
    fontSize: scaleFont(12),
    fontFamily: "Mukta-Regular",
    flex: 1,
  },
  infoText: {
    fontSize: scaleFont(12),
    fontFamily: "Mukta-Regular",
    color: "#64748b",
    lineHeight: 20,
  },
  rechargeButton: {
    backgroundColor: "#081A35",
    paddingVertical: 14,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    width: "100%",
  },
  rechargeButtonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(14),
    fontWeight: "500",
    fontFamily: "Mukta-Medium",
    letterSpacing: 0.3,
  },
});

export default PaidPlanCard;
