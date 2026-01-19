import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Globe } from "lucide-react-native";
import GradientText from "../../common/GradientText";
import { scaleFont } from "../../../utils/responsive";
import ChakraIcon from "../../../../assets/SvgIconsComponent/ResponseStyleIcons/ChakraIcon";
import PaidPlanChakraIcon from "../../../../assets/SvgIconsComponent/PaymentBillingIcons/PaidPlanChakraIcon";
import { useDispatch } from "react-redux";
import { setToggleIsPaidOrProUser } from "../../../redux/slices/toggleSlice";

const PaidPlanCard = ({setIsPaidUser}) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.content}>
      <Text style={styles.header}>Current Plan:</Text>
      <View style={styles.planCard}>
        <View style={styles.planHeader}>
          <PaidPlanChakraIcon/>
          <GradientText fontSize={22} children="Elunara Pro" fullWidth={true} />
        </View>

        <Text style={styles.price}>₹1,999 per month</Text>

        <Text style={styles.billingText}>
          Your next billing date is{" "}
          <Text style={styles.billingDate}>8 August 2025</Text>
        </Text>

        <TouchableOpacity onPress={()=> dispatch(setToggleIsPaidOrProUser(false))} style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel Subscription</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    width:"100%"
  },
  header: {
    fontSize: scaleFont(14),
    fontWeight: "400",
    fontFamily: "Mukta-Regular",
    color: "#64748b",
    marginBottom: 14,
    marginTop:20
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
    gap:10
  },
  planTitle: {
    fontSize: 36,
    fontWeight: "700",
    fontFamily: "Mukta-Bold",
    color: "#1e293b",
    marginLeft: 12,
  },
  planTitlePro: {
    color: "#94a3b8",
    fontWeight: "400",
    fontFamily: "Mukta-Regular",
  },
  price: {
    fontSize: scaleFont(24),
    fontWeight: "600",
    fontFamily: "Mukta-Bold",
    color: "#0f172a",
    marginBottom: 10,
  },
  billingText: {
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Regular",
    color: "#64748b",
    marginBottom: 25,
    lineHeight: 26,
  },
  billingDate: {
    fontWeight: "600",
    fontFamily: "Mukta-Bold",
    color: "#1e293b",
  },
  cancelButton: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#1e293b",
    borderRadius: 50,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    fontSize: scaleFont(14),
    fontWeight: "600",
    fontFamily: "Mukta-Bold",
    color: "#1e293b",
  },
});

export default PaidPlanCard;
