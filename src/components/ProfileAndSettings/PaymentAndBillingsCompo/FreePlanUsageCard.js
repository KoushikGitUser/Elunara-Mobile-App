import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { scaleFont } from "../../../utils/responsive";
import { useSelector } from "react-redux";
import { Wallet, FileText, CheckCircle } from "lucide-react-native";

const FreePlanUsageCard = () => {
  const { walletStates } = useSelector((state) => state.Toggle);
  const balance = walletStates.walletBalance;
  const isFileFeaturesEnabled = balance >= 799;

  const items = [
    {
      title: "Wallet Balance",
      Icon: Wallet,
      value: `₹${balance.toLocaleString("en-IN")}`,
      color: balance > 0 ? "#10B981" : "#EF4444",
    },
    {
      title: "File Features",
      Icon: FileText,
      value: isFileFeaturesEnabled ? "Enabled" : "Disabled",
      color: isFileFeaturesEnabled ? "#10B981" : "#F59E0B",
    },
    {
      title: "Platform Access",
      Icon: CheckCircle,
      value: balance > 0 ? "Active" : "Inactive",
      color: balance > 0 ? "#10B981" : "#EF4444",
    },
  ];

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Wallet Status</Text>

      {items.map((item, i) => (
        <View key={i} style={styles.row}>
          <View style={styles.labelRow}>
            <item.Icon size={20} color="#555" strokeWidth={1.5} />
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <Text style={[styles.value, { color: item.color }]}>{item.value}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    paddingHorizontal: 13,
    paddingVertical: 15,
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#D3DAE5",
    marginBottom: 30,
    width: "100%",
  },
  heading: {
    fontSize: 22,
    fontFamily: "Mukta-Bold",
    color: "#333",
    marginBottom: 20,
  },
  row: {
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 15,
    color: "#757575",
    fontWeight: "500",
    fontFamily: "Mukta-Medium",
  },
  value: {
    fontSize: scaleFont(15),
    fontFamily: "Mukta-Bold",
    fontWeight: "600",
  },
});

export default FreePlanUsageCard;
