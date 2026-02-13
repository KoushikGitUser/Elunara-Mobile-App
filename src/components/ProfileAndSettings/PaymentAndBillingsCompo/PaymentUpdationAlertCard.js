import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { AlertTriangle } from "lucide-react-native";
import { scaleFont } from "../../../utils/responsive";
import { useSelector } from "react-redux";

const PaymentUpdationAlertCard = () => {
  const { walletStates } = useSelector((state) => state.Toggle);
  const balance = walletStates.walletBalance;
  const amountNeeded = 799 - balance;

  return (
    <View style={styles.card}>
      <View style={styles.headerContainer}>
        <AlertTriangle size={25} color="#f59e0b" strokeWidth={1.5} />
        <Text style={styles.headerText}>
          Low Balance — File Uploads Disabled
        </Text>
      </View>

      <Text style={styles.descriptionText}>
        Your balance is ₹{balance.toLocaleString("en-IN")} which is below ₹799.
        File-related activities are disabled. Recharge at least ₹{amountNeeded.toLocaleString("en-IN")} to re-enable.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 28,
    padding: 16,
    borderWidth: 1,
    borderColor: "#D3DAE5",
    marginTop: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  headerText: {
    fontSize: scaleFont(16),
    fontWeight: "600",
    fontFamily: "Mukta-Bold",
    color: "#1e293b",
    marginLeft: 12,
    flex: 1,
  },
  descriptionText: {
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Regular",
    color: "#535862",
    lineHeight: 24,
  },
});

export default PaymentUpdationAlertCard;
