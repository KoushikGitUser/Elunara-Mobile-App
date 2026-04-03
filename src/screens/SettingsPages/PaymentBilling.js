import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { scaleFont } from "../../utils/responsive";
import { Gift } from "lucide-react-native";
import PaymentUpdationAlertCard from "../../components/ProfileAndSettings/PaymentAndBillingsCompo/PaymentUpdationAlertCard";
import ShiftedToFreePlanCard from "../../components/ProfileAndSettings/PaymentAndBillingsCompo/ShiftedToFreePlanCard";
import PaidPlanCard from "../../components/ProfileAndSettings/PaymentAndBillingsCompo/PaidPlanCard";
import { useSelector, useDispatch } from "react-redux";
import { commonFunctionForAPICalls } from "../../redux/slices/apiCommonSlice";
import {
  setWalletTransactions,
  setWalletBalance,
  setIsInitialRechargeCompleted,
  setIsPromotionalUser,
  setPromotionalDaysRemaining,
} from "../../redux/slices/toggleSlice";

const PaymentBilling = ({ handleScroll }) => {
  const dispatch = useDispatch();
  const { walletStates } = useSelector((state) => state.Toggle);
  const { walletStates: apiWalletStates } = useSelector((state) => state.API);
  const balance = walletStates.walletBalance;
  const isActive = balance > 0 || walletStates.isPromotionalUser;
  const isFileFeaturesEnabled = balance >= 799;
  const transactions = walletStates.walletTransactions || [];

  useEffect(() => {
    dispatch(commonFunctionForAPICalls({
      method: "GET",
      url: "/wallet",
      name: "getUserWalletInfo",
    }));
    dispatch(commonFunctionForAPICalls({
      method: "GET",
      url: "/wallet/transactions?type=credit",
      name: "getTransactions",
    }));
  }, []);

  // Sync wallet info to Toggle slice
  useEffect(() => {
    if (apiWalletStates.isWalletInfoFetched === true) {
      dispatch(setWalletBalance(apiWalletStates.walletBalance));
      dispatch(setIsInitialRechargeCompleted(apiWalletStates.isInitialRechargeCompleted));
      dispatch(setIsPromotionalUser(apiWalletStates.isPromotionalUser));
      dispatch(setPromotionalDaysRemaining(apiWalletStates.promotionalDaysRemaining));
    }
  }, [apiWalletStates.isWalletInfoFetched]);

  // Sync transactions to Toggle slice
  useEffect(() => {
    if (apiWalletStates.isTransactionsFetched === true) {
      dispatch(setWalletTransactions(apiWalletStates.walletTransactions));
    }
  }, [apiWalletStates.isTransactionsFetched]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatType = (type) => {
    switch (type) {
      case "credit": return "Credit";
      case "hold": return "Hold";
      case "hold_settle": return "Hold Settle";
      default: return type;
    }
  };

  const TransactionItem = ({ item }) => (
    <View style={styles.billingItem}>
      <View style={styles.leftSection}>
        <Text style={styles.dateText}>{formatDate(item.created_at)}</Text>
        <Text style={styles.paymentInfoText}>{item.description}</Text>
      </View>
      <View style={styles.rightSection}>
        <Text style={[
          styles.amountText,
          { color: item.type === "credit" ? "#10B981" : "#1e293b" }
        ]}>
          {item.type === "credit" ? "+" : "-"}₹{parseFloat(item.amount).toFixed(0)}
        </Text>
        <Text style={styles.typeText}>{formatType(item.type)}</Text>
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
        {isActive && !isFileFeaturesEnabled && !(walletStates.isPromotionalUser && walletStates.promotionalDaysRemaining > 0) && (
          <PaymentUpdationAlertCard />
        )}

        {/* Promotional Banner */}
        {walletStates.isPromotionalUser && walletStates.promotionalDaysRemaining > 0 && (
          <View style={styles.promoBanner}>
            <View style={styles.promoHeader}>
              <Gift size={25} color="#a4a4a4" strokeWidth={1.5} />
              <Text style={styles.promoText}>
                Promotional Free Trial is Active
              </Text>
            </View>
            <Text style={styles.promoSubText}>
              {walletStates.isInitialRechargeCompleted
                ? "Enjoy full access to all platform features. Your ₹999 initial recharge will be active after the free trial ends."
                : "Enjoy full access to all platform features. Recharge your wallet before the trial ends to continue uninterrupted."}
            </Text>
            <Text style={styles.promoDaysCount}>
              {walletStates.promotionalDaysRemaining} days remaining
            </Text>
          </View>
        )}

        {/* Wallet Balance Card */}
        <PaidPlanCard isLoading={apiWalletStates.isWalletInfoFetched !== true} />

        {/* Transaction History — hide for promo users who haven't activated */}
        {!(walletStates.isPromotionalUser && walletStates.promotionalDaysRemaining > 0 && !walletStates.isInitialRechargeCompleted) && (
          <>
            <Text style={styles.header}>Billing History</Text>
            <View style={{ marginBottom: 40 }}>
              {transactions.length > 0 ? (
                transactions.map((item) => (
                  <TransactionItem key={item.id} item={item} />
                ))
              ) : (
                <Text style={styles.noTransactions}>No transactions yet</Text>
              )}
            </View>
          </>
        )}
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
    borderColor: "#406DD8",
    marginBottom: 20,
    marginTop: 20,
  },
  promoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 10,
  },
  promoText: {
    fontSize: scaleFont(16),
    fontWeight: "600",
    fontFamily: "Mukta-Bold",
    color: "#1e293b",
    flex: 1,
  },
  promoSubText: {
    fontSize: scaleFont(12),
    fontFamily: "Mukta-Regular",
    color: "#535862",
    lineHeight: 20,
  },
  promoDaysCount: {
    fontSize: scaleFont(22),
    fontFamily: "Mukta-Bold",
    color: "#ff0000",
    marginTop: 12,
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
  paymentInfoText: {
    fontSize: scaleFont(12),
    color: "#64748b",
    fontWeight: "400",
    fontFamily: "Mukta-Regular",
  },
  rightSection: {
    alignItems: "flex-end",
  },
  amountText: {
    fontSize: scaleFont(18),
    fontFamily: "Mukta-Bold",
    color: "#1e293b",
    marginBottom: 5,
  },
  typeText: {
    fontSize: scaleFont(12),
    fontFamily: "Mukta-Regular",
    color: "#64748b",
  },
});

export default PaymentBilling;
