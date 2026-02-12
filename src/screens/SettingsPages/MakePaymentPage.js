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
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react-native";
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

const MakePaymentPage = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [expandedSection, setExpandedSection] = useState("upi");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [userUPIID, setUserUPIID] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [rechargeAmount, setRechargeAmount] = useState("");
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [amountError, setAmountError] = useState("");

  const { walletStates } = useSelector((state) => state.Toggle);
  const isFirstRecharge = !walletStates.isInitialRechargeCompleted;
  const currentBalance = walletStates.walletBalance;

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

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? "" : section);
  };

  const selectPaymentMethod = (method) => {
    setSelectedPayment(method);
  };

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
    if (isFirstRecharge && amount < 999) {
      setAmountError("Initial recharge must be at least ₹999");
      return false;
    }
    if (!isFirstRecharge && amount < 99) {
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
      paymentMethod: selectedPayment || "gpay",
      paymentInfo: selectedPayment === "upiid" ? userUPIID : "Wallet Recharge",
    }));

    setPaymentSuccess(true);
  };

  const PaymentOption = ({ id, label, logo, logoType }) => (
    <TouchableOpacity
      style={styles.paymentOption}
      onPress={() => selectPaymentMethod(id)}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.radioOuter,
          { borderColor: selectedPayment == id ? "black" : "#D3DAE5" },
        ]}
      >
        {selectedPayment === id && <View style={styles.radioInner} />}
      </View>

      {logoType === "phonepe" && (
        <View style={styles.phonePeLogo}>
          <Text style={styles.phonePeText}>₹</Text>
        </View>
      )}

      {logoType === "gpay" && (
        <View style={styles.gpayLogoContainer}>
          <View style={styles.gpayG}>
            <Text style={styles.gpayGText}>G</Text>
          </View>
          <Text style={styles.gpayPayText}>Pay</Text>
        </View>
      )}

      {logoType === "paytm" && <Text style={styles.paytmLogo}>paytm</Text>}

      {logoType === "applepay" && (
        <View style={styles.applePayLogo}>
          <Text style={styles.appleIcon}></Text>
          <Text style={styles.applePayText}>Pay</Text>
        </View>
      )}

      {logoType === "upi" && <Text style={styles.upiLogo}>UPI</Text>}

      <Text style={styles.paymentLabel}>{label}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    setTimeout(() => {
      if (paymentSuccess) {
        navigation.navigate("settingsInnerPages", { page: 2 });
        dispatch(setSettingsInnerPageHeaderTitle("Payment and Billings"));
        setPaymentSuccess(false);
      }
    }, 4000);
  }, [paymentSuccess]);

  const toggleAccordion = () => {
    setIsExpanded(!isExpanded);
  };

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
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={[styles.containerScroll]}
        >
          {/* Recharge Amount Section */}
          <Text style={styles.headerText}>
            {isFirstRecharge
              ? "Initial recharge of ₹999 required to activate the platform"
              : "Enter recharge amount (₹99 - ₹9,999)"}
          </Text>

          {/* Current Balance */}
          <View style={styles.currentBalanceRow}>
            <Text style={styles.currentBalanceLabel}>Current Balance:</Text>
            <Text style={styles.currentBalanceValue}>₹{currentBalance.toLocaleString("en-IN")}</Text>
          </View>

          {/* Amount Input */}
          <View style={styles.amountInputContainer}>
            <Text style={styles.rupeeSymbol}>₹</Text>
            <TextInput
              style={styles.amountInput}
              placeholder={isFirstRecharge ? "999" : "Enter amount"}
              placeholderTextColor="#B5BECE"
              value={rechargeAmount}
              onChangeText={handleAmountChange}
              keyboardType="number-pad"
              maxLength={5}
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

          {/* Debit/Credit Card */}
          <View style={styles.accordionCard}>
            <TouchableOpacity
              style={styles.accordionHeader}
              onPress={toggleAccordion}
              activeOpacity={0.7}
            >
              <Text style={styles.accordionTitle}>Debit/Credit Card</Text>
              {isExpanded ? (
                <ChevronUp size={28} color="#1e293b" strokeWidth={1.5} />
              ) : (
                <ChevronDown size={28} color="#1e293b" strokeWidth={1.5} />
              )}
            </TouchableOpacity>

            {isExpanded && (
              <View style={styles.accordionContent}>
                <TextInput
                  style={styles.input}
                  placeholder="Card number"
                  placeholderTextColor="#B5BECE"
                  value={cardNumber}
                  onChangeText={setCardNumber}
                  keyboardType="number-pad"
                  maxLength={19}
                />

                <View style={styles.rowContainer}>
                  <TextInput
                    style={[styles.input, styles.halfInput]}
                    placeholder="Expiration date"
                    placeholderTextColor="#B5BECE"
                    value={expirationDate}
                    onChangeText={setExpirationDate}
                    keyboardType="number-pad"
                    maxLength={5}
                  />

                  <View
                    style={[
                      styles.input,
                      styles.halfInput,
                      styles.cvvContainer,
                    ]}
                  >
                    <TextInput
                      style={styles.cvvInput}
                      placeholder="CVV"
                      placeholderTextColor="#B5BECE"
                      value={cvv}
                      onChangeText={setCvv}
                      keyboardType="number-pad"
                      maxLength={4}
                      secureTextEntry
                    />
                    <TouchableOpacity style={styles.helpIcon}>
                      <HelpCircle size={22} color="#1e293b" strokeWidth={2} />
                    </TouchableOpacity>
                  </View>
                </View>

                <TextInput
                  style={[styles.input, { marginBottom: 5 }]}
                  placeholder="Name on card"
                  placeholderTextColor="#B5BECE"
                  value={nameOnCard}
                  onChangeText={setNameOnCard}
                  autoCapitalize="words"
                />
              </View>
            )}
          </View>

          {/* UPI Section */}
          <View style={[styles.accordionCard, { marginBottom: 100 }]}>
            <TouchableOpacity
              style={styles.accordionHeader}
              onPress={() => toggleSection("upi")}
              activeOpacity={0.7}
            >
              <Text style={styles.accordionTitle}>UPI</Text>
              {expandedSection === "upi" ? (
                <ChevronUp size={28} color="#1e293b" strokeWidth={1.5} />
              ) : (
                <ChevronDown size={28} color="#1e293b" strokeWidth={1.5} />
              )}
            </TouchableOpacity>

            {expandedSection === "upi" && (
              <View style={[styles.accordionContent]}>
                <PaymentOption
                  id="phonepe"
                  label="PhonePe"
                  logoType="phonepe"
                />
                <PaymentOption
                  id="googlepay"
                  label="Google Pay"
                  logoType="gpay"
                />
                <PaymentOption id="paytm" label="Paytm" logoType="paytm" />
                <PaymentOption
                  id="applepay"
                  label="Apple Pay"
                  logoType="applepay"
                />
                <PaymentOption id="upiid" label="UPI ID" logoType="upi" />
                {selectedPayment == "upiid" && (
                  <TextInput
                    style={[styles.input, { marginBottom: 5 }]}
                    placeholder="Enter UPI ID here"
                    placeholderTextColor="#B5BECE"
                    value={userUPIID}
                    onChangeText={setUserUPIID}
                    autoCapitalize="words"
                  />
                )}
              </View>
            )}
          </View>
          {keyboardVisible && (
            <View style={{ height: screenHeight * 0.4 }}></View>
          )}
        </ScrollView>
      )}

      {!paymentSuccess && (
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
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
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
    borderRadius: 14,
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
    fontFamily: "Mukta-Bold",
    color: "#1e293b",
    paddingVertical: 14,
  },
  errorText: {
    fontSize: scaleFont(12),
    fontFamily: "Mukta-Regular",
    color: "#EF4444",
    marginBottom: 8,
  },
  presetsContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
    marginTop: 8,
  },
  presetChip: {
    flex: 1,
    paddingVertical: 10,
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
  accordionCard: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#ABB8CC",
    overflow: "hidden",
    marginBottom: 30,
  },
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
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
  accordionTitle: {
    fontSize: scaleFont(17),
    fontWeight: "600",
    fontFamily: "Mukta-Bold",
    color: "#1e293b",
  },
  accordionContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ABB8CC",
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Regular",
    color: "#1e293b",
    marginBottom: 15,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  cvvContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 16,
  },
  cvvInput: {
    flex: 1,
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Regular",
    color: "#1e293b",
    padding: 0,
  },
  helpIcon: {
    marginLeft: 8,
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  radioOuter: {
    width: 23,
    height: 23,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#D3DAE5",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    marginRight: 15,
  },
  radioInner: {
    width: "80%",
    height: "80%",
    borderRadius: 50,
    backgroundColor: "#000000ff",
  },
  paymentLabel: {
    fontSize: scaleFont(16),
    fontWeight: "600",
    fontFamily: "Mukta-Medium",
    color: "#1e293b",
  },
  phonePeLogo: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#5f259f",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  phonePeText: {
    fontSize: 22,
    fontWeight: "700",
    fontFamily: "Mukta-Bold",
    color: "#ffffff",
  },
  gpayLogoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  gpayG: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    borderWidth: 1.5,
    borderColor: "#4285f4",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 2,
  },
  gpayGText: {
    fontSize: 11,
    fontWeight: "700",
    fontFamily: "Mukta-Bold",
    color: "#4285f4",
  },
  gpayPayText: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Mukta-Medium",
    color: "#5f6368",
  },
  paytmLogo: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "Mukta-Bold",
    color: "#00baf2",
    marginRight: 16,
  },
  applePayLogo: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  appleIcon: {
    fontSize: 20,
    fontWeight: "600",
    fontFamily: "Mukta-Medium",
    color: "#1e293b",
    marginRight: 2,
  },
  applePayText: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "Mukta-Medium",
    color: "#1e293b",
  },
  upiLogo: {
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Mukta-Bold",
    color: "#1e293b",
    letterSpacing: 0.5,
    marginRight: 16,
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
