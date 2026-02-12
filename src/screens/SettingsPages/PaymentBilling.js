import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { scaleFont } from "../../utils/responsive";
import { Download } from "lucide-react-native";
import GpayIcon from "../../../assets/SvgIconsComponent/PaymentBillingIcons/GpayIcon";
import MasterCardIcon from "../../../assets/SvgIconsComponent/PaymentBillingIcons/MasterCardIcon";
import PaymentUpdationAlertCard from "../../components/ProfileAndSettings/PaymentAndBillingsCompo/PaymentUpdationAlertCard";
import ShiftedToFreePlanCard from "../../components/ProfileAndSettings/PaymentAndBillingsCompo/ShiftedToFreePlanCard";
import PaidPlanCard from "../../components/ProfileAndSettings/PaymentAndBillingsCompo/PaidPlanCard";
import ProPlanFeatureCard from "../../components/ProfileAndSettings/PaymentAndBillingsCompo/ProPlanFeatureCard";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setSettingsInnerPageComponentToRender, setSettingsInnerPageHeaderTitle } from "../../redux/slices/globalDataSlice";
import { sampleWalletTransactions } from "../../data/datas";

const PaymentBilling = ({ handleScroll }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { walletStates } = useSelector((state) => state.Toggle);
  const balance = walletStates.walletBalance;
  const isActive = balance > 0 || walletStates.isPromotionalUser;
  const isFileFeaturesEnabled = balance >= 799;
  const transactions = walletStates.walletTransactions?.length > 0
    ? walletStates.walletTransactions
    : sampleWalletTransactions;

  const navigateToRecharge = () => {
    navigation.navigate("settingsInnerPages", { page: 11 });
    dispatch(setSettingsInnerPageHeaderTitle("Recharge Wallet"));
    dispatch(setSettingsInnerPageComponentToRender("Make Payment"));
  };

  const PaymentIcon = ({ method }) => {
    if (method === "gpay") return <GpayIcon />;
    if (method === "mastercard") return <MasterCardIcon />;
    return null;
  };

  const TransactionItem = ({ item }) => (
    <View style={styles.billingItem}>
      <View style={styles.leftSection}>
        <Text style={styles.dateText}>{item.date}</Text>
        <View style={styles.paymentMethodContainer}>
          {item.paymentMethod && <PaymentIcon method={item.paymentMethod} />}
          <Text style={styles.paymentInfoText}>{item.paymentInfo}</Text>
        </View>
      </View>
      <View style={styles.rightSection}>
        <Text style={[
          styles.amountText,
          { color: item.type === "recharge" ? "#10B981" : "#1e293b" }
        ]}>
          {item.amount}
        </Text>
        {item.type === "recharge" && (
          <TouchableOpacity style={styles.downloadButton}>
            <Download size={18} color="#1e293b" strokeWidth={2.5} />
            <Text style={styles.downloadText}>Download Invoice</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        onScroll={handleScroll}
        showsVerticalScrollIndicator={false}
        style={styles.scrollMain}
      >
        {/* Zero balance lockout */}
        {!isActive && !walletStates.isPromotionalUser && (
          <ShiftedToFreePlanCard />
        )}

        {/* Low balance warning for file features */}
        {isActive && !isFileFeaturesEnabled && (
          <PaymentUpdationAlertCard />
        )}

        {/* Promotional Banner */}
        {walletStates.isPromotionalUser && walletStates.promotionalDaysRemaining > 0 && (
          <View style={styles.promoBanner}>
            <Text style={styles.promoText}>
              Free trial: {walletStates.promotionalDaysRemaining} days remaining
            </Text>
            <Text style={styles.promoSubText}>
              Recharge ₹999 before your trial ends to continue using the platform
            </Text>
          </View>
        )}

        {/* Wallet Balance Card */}
        <PaidPlanCard />

        {/* Recharge Button */}
        <TouchableOpacity
          onPress={navigateToRecharge}
          style={styles.rechargeButton}
          activeOpacity={0.8}
        >
          <Text style={styles.rechargeButtonText}>Recharge Wallet</Text>
        </TouchableOpacity>

        {/* Platform Features */}
        <ProPlanFeatureCard />

        {/* Transaction History */}
        <Text style={styles.header}>Transaction History</Text>
        <View style={{ marginBottom: 40 }}>
          {transactions.length > 0 ? (
            transactions.map((item) => (
              <TransactionItem key={item.id} item={item} />
            ))
          ) : (
            <Text style={styles.noTransactions}>No transactions yet</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
  },
  scrollMain: {
    width: "100%",
    flex: 1,
  },
  promoBanner: {
    backgroundColor: "#EEF4FF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#081A35",
    marginBottom: 20,
    marginTop: 20,
  },
  promoText: {
    fontSize: scaleFont(16),
    fontWeight: "600",
    fontFamily: "Mukta-Bold",
    color: "#081A35",
    marginBottom: 4,
  },
  promoSubText: {
    fontSize: scaleFont(12),
    fontFamily: "Mukta-Regular",
    color: "#535862",
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
  header: {
    fontSize: scaleFont(20),
    fontWeight: "600",
    fontFamily: "Mukta-Medium",
    color: "#1e293b",
    paddingTop: 30,
    paddingBottom: 5,
  },
  noTransactions: {
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Regular",
    color: "#64748b",
    textAlign: "center",
    paddingVertical: 30,
  },
  billingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  leftSection: {
    flex: 1,
  },
  dateText: {
    fontSize: scaleFont(16),
    fontWeight: "400",
    fontFamily: "Mukta-Regular",
    color: "#1e293b",
    marginBottom: 10,
  },
  paymentMethodContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  paymentInfoText: {
    fontSize: scaleFont(12),
    color: "#64748b",
    fontWeight: "400",
    fontFamily: "Mukta-Regular",
    paddingLeft: 5,
  },
  rightSection: {
    alignItems: "flex-end",
  },
  amountText: {
    fontSize: scaleFont(18),
    fontFamily: "Mukta-Bold",
    color: "#1e293b",
    marginBottom: 10,
  },
  downloadButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  downloadText: {
    fontSize: scaleFont(14),
    fontWeight: "500",
    fontFamily: "Mukta-Medium",
    color: "#1e293b",
    marginLeft: 6,
    textDecorationLine: "underline",
  },
});

export default PaymentBilling;
