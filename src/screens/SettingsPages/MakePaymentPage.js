import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  Image,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { scaleFont } from "../../utils/responsive";
import chakraLogo from "../../assets/images/BigGrayChakra.png";
import paymentSuccessLogo from "../../assets/images/paymentSuccess.jpg";
import paymentSuccessText from "../../assets/images/Title.png";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setSettingsInnerPageHeaderTitle } from "../../redux/slices/globalDataSlice";
import {
  setToggleIsPaidOrProUser,
  setWalletBalance,
  setIsInitialRechargeCompleted,
  addWalletTransaction,
} from "../../redux/slices/toggleSlice";
import { rechargePresets } from "../../data/datas";
import AuthGradientText from "../../components/common/AuthGradientText";
import { Gift } from "lucide-react-native";

const MakePaymentPage = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [rechargeAmount, setRechargeAmount] = useState("");
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [amountError, setAmountError] = useState("");

  const { walletStates } = useSelector((state) => state.Toggle);
  const isFirstRecharge = !walletStates.isInitialRechargeCompleted;
  const currentBalance = walletStates.walletBalance;
  const isPromoActive = walletStates.isPromotionalUser && walletStates.promotionalDaysRemaining > 0;

  const getBalanceColor = () => { 
    if (currentBalance <= 0) return "#EF4444";
    if (currentBalance < 799) return "#F59E0B";
    return "#10B981";
  };

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardVisible(true);
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
      setKeyboardHeight(0);
    });
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const navigation = useNavigation();
  const dispatch = useDispatch();


  const handlePresetSelect = (preset) => {
    setSelectedPreset(preset.id);
    setRechargeAmount(String(preset.amount));
    setAmountError("");
  };

  const handleAmountChange = (text) => {
    // Only allow numbers
    const numericText = text.replace(/[^0-9]/g, "");
    setRechargeAmount(numericText);
    setSelectedPreset(null);
    setAmountError("");
  };

  const validateAmount = () => {
    const amount = parseInt(rechargeAmount);
    if (!amount || isNaN(amount)) {
      setAmountError("Please enter a valid amount");
      return false;
    }
    if (amount < 99) {
      setAmountError("Minimum recharge amount is ₹99");
      return false;
    }
    if (amount > 9999) {
      setAmountError("Maximum recharge amount is ₹9,999");
      return false;
    }
    // Check if recharging to re-enable file features
    if (currentBalance < 799 && currentBalance + amount < 799) {
      // Just a note, not blocking — user can still recharge any valid amount
    }
    return true;
  };

  const handleInitialRecharge = () => {
    const amount = 999;
    const newBalance = currentBalance + amount;

    dispatch(setWalletBalance(newBalance));
    dispatch(setIsInitialRechargeCompleted(true));
    dispatch(setToggleIsPaidOrProUser(true));

    const today = new Date();
    const dateStr = `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`;
    dispatch(addWalletTransaction({
      id: Date.now(),
      date: dateStr,
      amount: `+₹${amount.toLocaleString("en-IN")}`,
      type: "recharge",
      paymentMethod: "gpay",
      paymentInfo: "Initial Wallet Activation",
    }));

    setPaymentSuccess(true);
  };

  const handleMakePayment = () => {
    if (!validateAmount()) return;

    const amount = parseInt(rechargeAmount);
    const newBalance = currentBalance + amount;

    // Update wallet balance
    dispatch(setWalletBalance(newBalance));
    dispatch(setIsInitialRechargeCompleted(true));
    dispatch(setToggleIsPaidOrProUser(true));

    // Add transaction record
    const today = new Date();
    const dateStr = `${String(today.getDate()).padStart(2, "0")}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`;
    dispatch(addWalletTransaction({
      id: Date.now(),
      date: dateStr,
      amount: `+₹${amount.toLocaleString("en-IN")}`,
      type: "recharge",
      paymentMethod: "gpay",
      paymentInfo: "Wallet Recharge",
    }));

    setPaymentSuccess(true);
  };

  useEffect(() => {
    setTimeout(() => {
      if (paymentSuccess) {
        navigation.navigate("settingsInnerPages", { page: 2 });
        dispatch(setSettingsInnerPageHeaderTitle("Payment and Billings"));
        setPaymentSuccess(false);
      }
    }, 4000);
  }, [paymentSuccess]);

  const screenHeight = Dimensions.get("window").height;

  return (
    <View style={[styles.container]}>
      {paymentSuccess ? (
        <View
          style={{
            flex: 1,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.chakraLogo}>
            <Image source={chakraLogo} style={{ height: 210, width: 130 }} />
          </View>
          <View style={styles.successfulIconAndText}>
            <Image
              source={paymentSuccessLogo}
              style={{ height: 80, width: 80, objectFit: "contain" }}
            />
            <Image
              source={paymentSuccessText}
              style={{ height: 80, width: 270, objectFit: "contain" }}
            />
          </View>
        </View>
      ) : isFirstRecharge ? (
        <View style={{ flex: 1, width: "100%" }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={[styles.containerScroll]}
          >
            {/* Promotional Banner (only if promo active) */}
            {isPromoActive && (
              <View style={styles.promoBanner}>
                <View style={styles.promoHeader}>
                  <Gift size={25} color="#10B981" strokeWidth={1.5} />
                  <Text style={styles.promoText}>
                    Promotional Free Trial is Active
                  </Text>
                </View>
                <Text style={styles.promoSubText}>
                  Enjoy full access to all platform features. Recharge your wallet before the trial ends to continue uninterrupted.
                </Text>
              </View>
            )}

            {/* Initial Recharge Card */}
            <View style={styles.initialRechargeCard}>
              {/* Free Trial Badge (only if promo active) */}
              {isPromoActive && (
                <View style={styles.freeTrialBadge}>
                  <Gift size={16} color="#10B981" strokeWidth={2} />
                  <Text style={styles.freeTrialBadgeText}>
                    Free Trial — {walletStates.promotionalDaysRemaining} days remaining
                  </Text>
                </View>
              )}

              <AuthGradientText fontSize={25} textAlign="left">Activate Wallet</AuthGradientText>

              <Text style={styles.initialRechargeNotice}>
                An initial recharge of ₹999 is mandatory to activate the platform. Once activated, you can recharge with any custom amount starting from ₹99 to ₹9,999.
              </Text>

              <View style={styles.initialRechargeInfoRow}>
                <Text style={styles.initialRechargeInfoLabel}>Activation Amount</Text>
                <Text style={styles.initialRechargeInfoValue}>₹999</Text>
              </View>

              <View style={styles.initialRechargeInfoRow}>
                <Text style={styles.initialRechargeInfoLabel}>After Activation</Text>
                <Text style={styles.initialRechargeInfoValue}>₹99 - ₹9,999</Text>
              </View>

              <TouchableOpacity
                onPress={handleInitialRecharge}
                style={styles.initialRechargeButton}
                activeOpacity={0.8}
              >
                <Text style={styles.primaryButtonText}>Recharge for ₹999</Text>
              </TouchableOpacity>
            </View>

            <View style={{ marginBottom: 40 }} />
          </ScrollView>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[styles.containerScroll]}
        >
          {/* Current Balance */}
          <View style={styles.currentBalanceRow}>
            <Text style={styles.currentBalanceLabel}>Current Balance:</Text>
            <Text style={[styles.currentBalanceValue, { color: getBalanceColor() }]}>₹{currentBalance.toLocaleString("en-IN")}</Text>
          </View>

          {/* Recharge Amount Section */}
          <Text style={styles.headerText}>
            Enter recharge amount (₹99 - ₹9,999)
          </Text>

          {/* Amount Input */}
          <View style={styles.amountInputContainer}>
            <Text style={styles.rupeeSymbol}>₹</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="Enter amount"
              placeholderTextColor="#B5BECE"
              value={rechargeAmount}
              onChangeText={handleAmountChange}
              keyboardType="number-pad"
              maxLength={4}
            />
          </View>
          {amountError ? (
            <Text style={styles.errorText}>{amountError}</Text>
          ) : null}

          {/* Quick Recharge Presets */}
          <View style={styles.presetsContainer}>
            {rechargePresets.map((preset) => (
              <TouchableOpacity
                key={preset.id}
                style={[
                  styles.presetChip,
                  selectedPreset === preset.id && styles.presetChipSelected,
                ]}
                onPress={() => handlePresetSelect(preset)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.presetChipText,
                    selectedPreset === preset.id && styles.presetChipTextSelected,
                  ]}
                >
                  {preset.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Balance after recharge preview */}
          {rechargeAmount ? (
            <View style={styles.balancePreview}>
              <Text style={styles.balancePreviewText}>
                Balance after recharge:{" "}
                <Text style={{ fontFamily: "Mukta-Bold", color: "#10B981" }}>
                  ₹{(currentBalance + (parseInt(rechargeAmount) || 0)).toLocaleString("en-IN")}
                </Text>
              </Text>
              {currentBalance < 799 && (currentBalance + (parseInt(rechargeAmount) || 0)) >= 799 && (
                <Text style={styles.fileFeatureNote}>
                  File uploads will be re-enabled
                </Text>
              )}
            </View>
          ) : null}

          <View style={{ marginBottom: 100 }} />
          {keyboardVisible && (
            <View style={{ height: screenHeight * 0.4 }}></View>
          )}
        </ScrollView>
      )}

      {!paymentSuccess && !isFirstRecharge && (
        <View style={styles.primaryButtonMain}>
          <TouchableOpacity
            onPress={handleMakePayment}
            style={[
              styles.primaryButton,
              { opacity: !rechargeAmount ? 0.5 : 1 },
            ]}
            disabled={!rechargeAmount}
          >
            <Text style={styles.primaryButtonText}>
              {rechargeAmount
                ? `Recharge ₹${parseInt(rechargeAmount).toLocaleString("en-IN")}`
                : "Enter Amount"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    width: "100%",
  },
  headerText: {
    fontSize: scaleFont(14),
    fontWeight: "400",
    fontFamily: "Mukta-Regular",
    color: "#64748b",
    marginBottom: 20,
    marginTop: 20,
  },
  currentBalanceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  currentBalanceLabel: {
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Regular",
    color: "#64748b",
  },
  currentBalanceValue: {
    fontSize: scaleFont(20),
    fontFamily: "Mukta-Bold",
    color: "#1e293b",
  },
  amountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ABB8CC",
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  rupeeSymbol: {
    fontSize: scaleFont(24),
    fontFamily: "Mukta-Bold",
    color: "#1e293b",
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: scaleFont(24),
    fontFamily: "Mukta-Regular",
    color: "#1e293b",
    paddingVertical: 8,
  },
  errorText: {
    fontSize: scaleFont(12),
    fontFamily: "Mukta-Regular",
    color: "#EF4444",
    marginBottom: 8,
  },
  presetsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
    marginTop: 8,
  },
  presetChip: {
    paddingVertical: 6,
    paddingHorizontal: 24,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#D3DAE5",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  presetChipSelected: {
    backgroundColor: "#081A35",
    borderColor: "#081A35",
  },
  presetChipText: {
    fontSize: scaleFont(13),
    fontFamily: "Mukta-Medium",
    color: "#1e293b",
  },
  presetChipTextSelected: {
    color: "#FFFFFF",
  },
  balancePreview: {
    backgroundColor: "#F0FDF4",
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
  },
  balancePreviewText: {
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Regular",
    color: "#1e293b",
  },
  fileFeatureNote: {
    fontSize: scaleFont(12),
    fontFamily: "Mukta-Medium",
    color: "#10B981",
    marginTop: 4,
  },
  promoBanner: {
    backgroundColor: "#EEF4FF",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#406DD8",
    marginBottom: 20,
    marginTop: 10,
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
  initialRechargeCard: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#D3DAE5",
  },
  freeTrialBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#F0FDF4",
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 14,
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  freeTrialBadgeText: {
    fontSize: scaleFont(12),
    fontFamily: "Mukta-Medium",
    color: "#10B981",
  },
  initialRechargeNotice: {
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Regular",
    color: "#64748b",
    lineHeight: 22,
    marginTop: 12,
    marginBottom: 20,
  },
  initialRechargeInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
  },
  initialRechargeInfoLabel: {
    fontSize: scaleFont(13),
    fontFamily: "Mukta-Regular",
    color: "#64748b",
  },
  initialRechargeInfoValue: {
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Bold",
    color: "#1e293b",
  },
  initialRechargeButton: {
    backgroundColor: "#0f172a",
    width: "100%",
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  chakraLogo: {
    position: "absolute",
    top: 50,
    right: -20,
  },
  successfulIconAndText: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  primaryButtonMain: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: "100%",
    bottom: 0,
    left: 20,
    backgroundColor: "#FAFAFA",
  },
  primaryButton: {
    backgroundColor: "#0f172a",
    width: "100%",
    borderRadius: 50,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonText: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Mukta-Bold",
    color: "#ffffff",
  },
});

export default MakePaymentPage;
