import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { scaleFont } from "../../../utils/responsive";
import { AlertTriangle } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setSettingsInnerPageComponentToRender, setSettingsInnerPageHeaderTitle } from "../../../redux/slices/globalDataSlice";

const ShiftedToFreePlanCard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={styles.card}>
      <View style={styles.headerContainer}>
        <AlertTriangle size={25} color="#EF4444" strokeWidth={1.5} />
        <Text style={styles.headerText}>
          All Features Disabled
        </Text>
      </View>

      <Text style={styles.descriptionText}>
        Your wallet balance is ₹0. All platform features are disabled.
        Recharge to continue using the platform.
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("settingsInnerPages", { page: 11 });
            dispatch(setSettingsInnerPageHeaderTitle("Recharge Wallet"));
            dispatch(setSettingsInnerPageComponentToRender("Make Payment"));
          }}
          style={styles.primaryButton}
        >
          <Text style={styles.primaryButtonText}>Recharge Now</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 20,
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
    marginBottom: 28,
  },
  buttonContainer: {
    flexDirection: "column",
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: "#0f172a",
    borderRadius: 50,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    fontSize: scaleFont(14),
    fontWeight: "600",
    fontFamily: "Mukta-Bold",
    color: "#ffffff",
  },
});

export default ShiftedToFreePlanCard;
