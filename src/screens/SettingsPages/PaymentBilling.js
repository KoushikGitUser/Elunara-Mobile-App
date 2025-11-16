import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { scaleFont } from "../../utils/responsive";
import ProPlanFeatureCard from "../../components/ProfileAndSettings/PaymentAndBillingsCompo/ProPlanFeatureCard";
import FreePlanFeatureCard from "../../components/ProfileAndSettings/PaymentAndBillingsCompo/FreePlanFeatureCard";
import { Check } from "lucide-react-native";
import FreePlanUsageCard from "../../components/ProfileAndSettings/PaymentAndBillingsCompo/FreePlanUsageCard";

const PaymentBilling = () => {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState("monthly");

  return (
    <View style={styles.container}>
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
      <View style={styles.cardsMainContainer}>
        {selectedCategory == 1 ? (
          <React.Fragment >
            <ProPlanFeatureCard />
            <View
              style={{ flexDirection: "column", alignItems: "center", gap: 10,width:"100%" }}
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
                style={[styles.verifyButton]}
                activeOpacity={0.8}
              >
                <Text style={styles.verifyButtonText}>
                  Verify and Secure Account
                </Text>
              </TouchableOpacity>
            </View>
          </React.Fragment>
        ) : (
          <ScrollView style={{flex:1,paddingTop:25}} showsVerticalScrollIndicator={false}>
          <FreePlanFeatureCard />
          <FreePlanUsageCard/>
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
    marginTop:20,
    width:"100%",
  },
    verifyButtonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(14),
    fontWeight: "500",
    letterSpacing: 0.3,
  },
});

export default PaymentBilling;
