import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { scaleFont } from "../../../utils/responsive";
import PaidPlanChakraIcon from "../../../../assets/SvgIconsComponent/PaymentBillingIcons/PaidPlanChakraIcon";
import GradientText from "../../common/GradientText";
import { useSelector } from "react-redux";

const PaidPlanCard = () => {
  const { walletStates } = useSelector((state) => state.Toggle);
  const balance = walletStates.walletBalance;
  const isFileFeaturesEnabled = balance >= 799;

  const getStatusColor = () => {
    if (balance <= 0) return "#EF4444";
    if (balance < 799) return "#F59E0B";
    return "#10B981";
  };

  const getStatusText = () => {
    if (balance <= 0) return "Inactive";
    if (balance < 799) return "Limited";
    return "Active";
  };

  return (
    <View style={styles.content}>
      <Text style={styles.header}>Wallet Balance:</Text>
      <View style={styles.planCard}>
        <View style={styles.planHeader}>
          <PaidPlanChakraIcon />
          <GradientText fontSize={22} children="Elunara Wallet" fullWidth={true} />
        </View>

        <Text style={styles.price}>₹{balance.toLocaleString("en-IN")}</Text>

        <View style={styles.statusRow}>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor() }]} />
          <Text style={[styles.statusText, { color: getStatusColor() }]}>
            {getStatusText()}
          </Text>
        </View>

        {!isFileFeaturesEnabled && balance > 0 && (
          <Text style={styles.thresholdText}>
            File uploads disabled below ₹799. Recharge to re-enable.
          </Text>
        )}

        <Text style={styles.infoText}>
          Usage-based deduction — no expiry on balance
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    width: "100%",
  },
  header: {
    fontSize: scaleFont(14),
    fontWeight: "400",
    fontFamily: "Mukta-Regular",
    color: "#64748b",
    marginBottom: 14,
    marginTop: 20,
  },
  planCard: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#D3DAE5",
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
    color: "#0f172a",
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
  thresholdText: {
    fontSize: scaleFont(12),
    fontFamily: "Mukta-Regular",
    color: "#F59E0B",
    marginBottom: 8,
    lineHeight: 20,
  },
  infoText: {
    fontSize: scaleFont(12),
    fontFamily: "Mukta-Regular",
    color: "#64748b",
    lineHeight: 20,
  },
});

export default PaidPlanCard;
