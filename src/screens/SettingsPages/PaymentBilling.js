import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { scaleFont } from "../../utils/responsive";
import ProPlanFeatureCard from "../../components/ProfileAndSettings/PaymentAndBillingsCompo/ProPlanFeatureCard";
import FreePlanFeatureCard from "../../components/ProfileAndSettings/PaymentAndBillingsCompo/FreePlanFeatureCard";
import { Check, Download, Globe } from "lucide-react-native";
import FreePlanUsageCard from "../../components/ProfileAndSettings/PaymentAndBillingsCompo/FreePlanUsageCard";
import GradientText from "../../components/common/GradientText";
import PaidPlanCard from "../../components/ProfileAndSettings/PaymentAndBillingsCompo/PaidPlanCard";
import { billingData } from "../../data/datas";
import GpayIcon from "../../../assets/SvgIconsComponent/PaymentBillingIcons/GpayIcon";
import MasterCardIcon from "../../../assets/SvgIconsComponent/PaymentBillingIcons/MasterCardIcon";
import PaymentUpdationAlertCard from "../../components/ProfileAndSettings/PaymentAndBillingsCompo/PaymentUpdationAlertCard";
import ShiftedToFreePlanCard from "../../components/ProfileAndSettings/PaymentAndBillingsCompo/ShiftedToFreePlanCard";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setSettingsInnerPageComponentToRender, setSettingsInnerPageHeaderTitle } from "../../redux/slices/globalDataSlice";

const PaymentBilling = () => {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const [isPaidUser, setIsPaidUser] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const PaymentIcon = ({ method }) => {
    if (method === "gpay") {
      return <GpayIcon />;
    } else if (method === "mastercard") {
      return <MasterCardIcon />;
    }
    return null;
  };

  const BillingItem = ({ item }) => (
    <View style={styles.billingItem}>
      <View style={styles.leftSection}>
        <Text style={styles.dateText}>{item.date}</Text>
        <View style={styles.paymentMethodContainer}>
          <PaymentIcon method={item.paymentMethod} />
          <Text style={styles.paymentInfoText}>{item.paymentInfo}</Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        <Text style={styles.amountText}>{item.amount}</Text>
        <TouchableOpacity style={styles.downloadButton}>
          <Download size={18} color="#1e293b" strokeWidth={2.5} />
          <Text style={styles.downloadText}>Download Invoice</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {!isPaidUser && (
        <View style={styles.categorySections}>
          <TouchableOpacity
            onPress={() => setSelectedCategory(1)}
            style={[
              styles.sections,
              { borderColor: selectedCategory == 1 ? "black" : "#E2E2E2" },
            ]}
          >
            <Text
              style={[
                styles.sectionText,
                { color: selectedCategory == 1 ? "black" : "#757575" },
              ]}
            >
              Upgrade Plan
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedCategory(2)}
            style={[
              styles.sections,
              { borderColor: selectedCategory == 2 ? "black" : "#E2E2E2" },
            ]}
          >
            <Text
              style={[
                styles.sectionText,
                { color: selectedCategory == 2 ? "black" : "#757575" },
              ]}
            >
              Current free plan
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.cardsMainContainer}>
        {selectedCategory == 1 ? (
          <React.Fragment>
            {isPaidUser ? (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.paidPlanMain}
              >
                <ShiftedToFreePlanCard />
                <PaymentUpdationAlertCard />
                <PaidPlanCard setIsPaidUser={setIsPaidUser} />
                <Text style={styles.header}>Billing History</Text>
                <View>
                  {billingData.map((item) => (
                    <BillingItem key={item.id} item={item} />
                  ))}
                </View>
              </ScrollView>
            ) : (
              <>
                <ProPlanFeatureCard />
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                    width: "100%",
                  }}
                >
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
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("settingsInnerPages", { page: 12 });
                      dispatch(
                        setSettingsInnerPageHeaderTitle("Payment Method")
                      );
                      dispatch(
                        setSettingsInnerPageComponentToRender("Make Payment")
                      );
                    }}
                    style={[styles.verifyButton]}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.verifyButtonText}>
                      Verify and Secure Account
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </React.Fragment>
        ) : (
          <ScrollView
            style={{ flex: 1, paddingTop: 25 }}
            showsVerticalScrollIndicator={false}
          >
            <FreePlanFeatureCard />
            <FreePlanUsageCard />
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
  },
  categorySections: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionText: {
    color: "#757575",
  },
  sections: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "lightgrey",
    paddingVertical: 10,
  },
  cardsMainContainer: {
    width: "100%",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paidPlanMain: {
    width: "100%",
    flex: 1,
  },
  cardsContainer: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  priceCard: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    borderRadius: 20,
    padding: 15,
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
  verifyButton: {
    backgroundColor: "#081A35",
    paddingVertical: 13,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    width: "100%",
  },
  verifyButtonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(14),
    fontWeight: "500",
    letterSpacing: 0.3,
  },
  header: {
    fontSize: scaleFont(20),
    fontWeight: "600",
    color: "#1e293b",
    paddingTop: 30,
    paddingBottom: 5,
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
    color: "#1e293b",
    marginBottom: 10,
  },
  paymentMethodContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  gpayContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  gpayG: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#ffffff",
    borderWidth: 1.5,
    borderColor: "#4285f4",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 2,
  },
  gpayText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#4285f4",
  },
  payText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#5f6368",
  },
  mastercardContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 28,
    height: 18,
    marginRight: 8,
    position: "relative",
  },
  mastercardCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    position: "absolute",
  },
  mastercardRed: {
    backgroundColor: "#ff001eec",
    left: 0,
  },
  mastercardOrange: {
    backgroundColor: "#ff5e00ff",
    left: 8,
    opacity: 0.9,
  },
  paymentInfoText: {
    fontSize: scaleFont(12),
    color: "#64748b",
    fontWeight: "400",
    paddingLeft: 5,
  },
  rightSection: {
    alignItems: "flex-end",
  },
  amountText: {
    fontSize: scaleFont(18),
    fontWeight: "700",
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
    color: "#1e293b",
    marginLeft: 6,
    textDecorationLine: "underline",
  },
});

export default PaymentBilling;
