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
  BackHandler,
  Modal,
  ActivityIndicator,
  NativeModules,
  NativeEventEmitter,
  Platform,
  AppState,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import HyperSdkReact from "hyper-sdk-react";
import { scaleFont } from "../../utils/responsive";
import chakraLogo from "../../assets/images/BigGrayChakra.png";
import paymentSuccessLogo from "../../assets/images/paymentSuccess.jpg";
import paymentSuccessText from "../../assets/images/Title.png";
import authLoader from "../../assets/images/authLoader.gif";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  setSettingsInnerPageHeaderTitle,
  setHideSettingsBackButton,
} from "../../redux/slices/globalDataSlice";
import {
  setIsPaymentInitiated,
  setPaymentSuccess,
} from "../../redux/slices/toggleSlice";
import { commonFunctionForAPICalls, resetPaymentInitiated, resetVerifyPayment } from "../../redux/slices/apiCommonSlice";
import { rechargePresets } from "../../data/datas";
import AuthGradientText from "../../components/common/AuthGradientText";
import PaymentSuccessFrame from "../../../assets/SvgIconsComponent/PaymentBillingIcons/PaymentSuccessFrame";
import { Gift, Wallet, X, ArrowLeft } from "lucide-react-native";
import { BlurView } from "@react-native-community/blur";
import { appColors } from "../../themes/appColors";

// Module-level: tracks which MakePaymentPage instance owns the current payment
let currentPaymentSessionId = 0;

const MakePaymentPage = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [rechargeAmount, setRechargeAmount] = useState("");
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [amountError, setAmountError] = useState("");
  const [showBackPressPopup, setShowBackPressPopup] = useState(false);
  const [paymentResultOrderId, setPaymentResultOrderId] = useState(null);
  const mySessionRef = useRef(null);

  const { walletStates, paymentStates } = useSelector((state) => state.Toggle);
  const apiWalletStates = useSelector((state) => state.API.walletStates);
  const isPaymentInitiated = paymentStates.isPaymentInitiated;
  const paymentSuccess = paymentStates.paymentSuccess;
  const isFirstRecharge = !walletStates.isInitialRechargeCompleted;
  const currentBalance = walletStates.walletBalance;
  const isPromoActive =
    walletStates.isPromotionalUser &&
    walletStates.promotionalDaysRemaining > 0;

  const getBalanceColor = () => {
    if (currentBalance <= 0) return "#EF4444";
    if (currentBalance < 799) return "#F59E0B";
    return "#10B981";
  };

  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Keyboard listeners
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

  // HyperSDK event listener — only resets state, does NOT navigate
  useEffect(() => {
    if (!NativeModules.HyperSdkReact) {
      console.log("[MakePayment] HyperSdkReact native module not available");
      return;
    }
    const hyperEmitter = new NativeEventEmitter(NativeModules.HyperSdkReact);
    const hyperListener = hyperEmitter.addListener("HyperEvent", (resp) => {
      try {
        const data = JSON.parse(resp);
        const event = data.event || "";
        console.log("[MakePayment] HyperEvent:", event);

        if (event === "process_result") {
          if (mySessionRef.current !== currentPaymentSessionId) {
            console.log("[MakePayment] Stale listener, ignoring process_result");
            return;
          }
          // Mark as received so AppState fallback doesn't trigger
          processResultReceivedRef.current = true;
          // Mark this session as handled so no duplicate fires
          currentPaymentSessionId++;

          const innerPayload = data.payload || {};
          const status = innerPayload.status || "";
          console.log("[MakePayment] process_result status:", status, "orderId:", data.orderId);

          // Reset ALL state — Redux + local
          dispatch(setIsPaymentInitiated(false));
          dispatch(setHideSettingsBackButton(false));
          dispatch(resetPaymentInitiated());
          setShowBackPressPopup(false);


          if (status === "backpressed" || status === "user_aborted") {
            console.log("[MakePayment] User cancelled payment");
          } else {
            // Show payment result modal + call verify API
            dispatch(resetVerifyPayment());
            setPaymentResultOrderId(data.orderId);
            dispatch(
              commonFunctionForAPICalls({
                method: "POST",
                url: `/payments/verify/${data.orderId}`,
                name: "verifyPayment",
              })
            );
          }
        }
      } catch (e) {
        console.log("[MakePayment] HyperEvent error:", e);
      }
    });

    return () => {
      hyperListener.remove();
    };
  }, []);

  // Fallback: if HyperSDK closes without firing process_result,
  // detect app returning to foreground and reset the stuck state
  const processResultReceivedRef = useRef(false);

  useEffect(() => {
    if (!isPaymentInitiated) return;
    processResultReceivedRef.current = false;

    const sub = AppState.addEventListener("change", (nextState) => {
      if (nextState === "active" && !processResultReceivedRef.current) {
        // App came to foreground but no process_result was received
        // Wait briefly in case the event fires slightly after
        setTimeout(() => {
          if (!processResultReceivedRef.current) {
            console.log("[MakePayment] Fallback: no process_result received, resetting state");
            dispatch(setIsPaymentInitiated(false));
            dispatch(setHideSettingsBackButton(false));
            dispatch(resetPaymentInitiated());
            setShowBackPressPopup(false);
          }
        }, 2000);
      }
    });

    return () => sub.remove();
  }, [isPaymentInitiated]);

  // BackHandler - show popup when payment is pending
  useEffect(() => {
    if (!isPaymentInitiated) return;

    if (Platform.OS === "android") {
      const backAction = () => {
        setShowBackPressPopup(true);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    } else {
      // iOS: prevent navigating back, show same popup
      const unsub = navigation.addListener("beforeRemove", (e) => {
        e.preventDefault();
        setShowBackPressPopup(true);
      });
      return unsub;
    }
  }, [isPaymentInitiated, navigation]);

  const startPaymentFlow = (amount) => {
    currentPaymentSessionId++;
    mySessionRef.current = currentPaymentSessionId;
    dispatch(
      commonFunctionForAPICalls({
        method: "POST",
        url: "/payments/initiate",
        data: { amount },
        name: "initiatePayment",
      })
    );
  };

  // On API fulfillment — open payment page directly
  useEffect(() => {
    if (apiWalletStates.isPaymentFulfilled === true) {
      dispatch(setIsPaymentInitiated(true));
      dispatch(setHideSettingsBackButton(true));

      const sdkPayload = apiWalletStates.hyperPayload?.sdk_payload;
      dispatch(resetPaymentInitiated());
      if (sdkPayload && HyperSdkReact) {
        try {
          HyperSdkReact.openPaymentPage(JSON.stringify(sdkPayload));
        } catch (e) {
          console.log("openPaymentPage error:", e);
          dispatch(setIsPaymentInitiated(false));
          dispatch(setHideSettingsBackButton(false));
        }
      } else if (!HyperSdkReact) {
        console.log("openPaymentPage: HyperSdkReact module not available");
        dispatch(setIsPaymentInitiated(false));
        dispatch(setHideSettingsBackButton(false));
      }
    }
  }, [apiWalletStates.isPaymentFulfilled]);

  const handlePresetSelect = (preset) => {
    setSelectedPreset(preset.id);
    setRechargeAmount(String(preset.amount));
    setAmountError("");
  };

  const handleAmountChange = (text) => {
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
    return true;
  };

  const handleInitialRecharge = () => {
    startPaymentFlow(999);
  };

  const handleMakePayment = () => {
    if (!validateAmount()) return;
    startPaymentFlow(parseInt(rechargeAmount));
  };

  const handlePaymentResultClose = () => {
    setPaymentResultOrderId(null);
    dispatch(setSettingsInnerPageHeaderTitle("Payment and Billings"));
    navigation.navigate("settingsInnerPages", { page: 2 });
  };

  const renderPaymentResultModal = () => {
    const isVerifying = apiWalletStates.isVerifyingPayment;
    const verifyStatus = apiWalletStates.verifyPaymentStatus;
    const verifyMessage = apiWalletStates.verifyPaymentMessage;
    const verifyAmount = apiWalletStates.verifyPaymentAmount;

    return (
      <Modal
        visible={!!paymentResultOrderId}
        transparent={false}
        animationType="fade"
        onRequestClose={() => {}}
      >
        <View style={statusStyles.container}>
          {isVerifying ? (
            <View style={statusStyles.loaderContainer}>
              <Image
                source={authLoader}
                style={{ width: 150, height: 150 }}
                resizeMode="contain"
              />
            </View>
          ) : verifyStatus === "success" ? (
            <View style={statusStyles.successContainer}>
              <View style={statusStyles.chakraLogo}>
                <Image source={chakraLogo} style={{ height: 200, width: 160, objectFit: "contain" }} />
              </View>
              <View style={statusStyles.centerContent}>
                <PaymentSuccessFrame />
                <View style={statusStyles.infoCard}>
                  <Text style={statusStyles.infoTitle}>Order ID - {paymentResultOrderId}</Text>
                  <Text style={statusStyles.infoAmount}>
                    Amount - <Text style={{ color: "#10B981" }}>₹{verifyAmount ? verifyAmount.toLocaleString("en-IN") : "0"}</Text>
                  </Text>
                  <Text style={statusStyles.infoMessage}>
                    Your Payment is successful and Learning Points has been credited.
                  </Text>
                </View>
                <TouchableOpacity
                  style={statusStyles.backButton}
                  onPress={handlePaymentResultClose}
                  activeOpacity={0.8}
                >
                  <ArrowLeft size={24} color="#FFFFFF" strokeWidth={2} />
                </TouchableOpacity>
              </View>
            </View>
          ) : verifyStatus === "error" ? (
            <View style={statusStyles.errorContainer}>
              <View style={statusStyles.chakraLogo}>
                <Image source={chakraLogo} style={{ height: 200, width: 160, objectFit: "contain" }} />
              </View>
              <View style={statusStyles.errorIconWrapper}>
                <Wallet size={90} color="#6B7280" strokeWidth={1.2} />
                <View style={statusStyles.crossBadge}>
                  <X size={24} color="#FFFFFF" strokeWidth={3} />
                </View>
              </View>
              <AuthGradientText fontSize={25}>
                Payment Failed
              </AuthGradientText>
              {verifyMessage && (
                <Text style={statusStyles.errorReason}>{verifyMessage}</Text>
              )}
              <TouchableOpacity
                style={statusStyles.backButton}
                onPress={handlePaymentResultClose}
                activeOpacity={0.8}
              >
                <ArrowLeft size={24} color="#FFFFFF" strokeWidth={2} />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </Modal>
    );
  };

  // Payment success redirect
  useEffect(() => {
    setTimeout(() => {
      if (paymentSuccess) {
        navigation.navigate("settingsInnerPages", { page: 2 });
        dispatch(setSettingsInnerPageHeaderTitle("Payment and Billings"));
        dispatch(setPaymentSuccess(false));
      }
    }, 4000);
  }, [paymentSuccess]);

  const screenHeight = Dimensions.get("window").height;

  // Back Press Popup
  const renderBackPressPopup = () => (
    <Modal
      visible={showBackPressPopup}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowBackPressPopup(false)}
    >
      <View style={styles.popupOverlay}>
        <BlurView
          style={styles.blurView}
          blurType="light"
          blurAmount={7}
          reducedTransparencyFallbackColor="rgba(0, 0, 0, 0.43)"
        />
        <View style={styles.androidBlur} />

        <TouchableOpacity
          style={styles.popupBackdrop}
          activeOpacity={1}
          onPress={() => setShowBackPressPopup(false)}
        />

        <View style={styles.popupSheet}>
          <View style={styles.popupHandleContainer}>
            <View style={styles.popupHandle} />
          </View>

          <View style={styles.popupContent}>
            <Text style={styles.popupTitle}>Payment Pending</Text>
            <Text style={styles.popupDescription}>
              You cannot go back at this stage, your payment is pending, either
              complete the payment or cancel the payment from browser if
              initiated by mistake.
            </Text>

            <TouchableOpacity
              style={styles.popupButton}
              onPress={() => setShowBackPressPopup(false)}
              activeOpacity={0.8}
            >
              <Text style={styles.popupButtonText}>OK, Got it</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={[styles.container]}>
      {renderBackPressPopup()}
      {renderPaymentResultModal()}

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
                  Enjoy full access to all platform features. Recharge your
                  wallet before the trial ends to continue uninterrupted.
                </Text>
                <Text style={styles.promoDaysCount}>
                  {walletStates.promotionalDaysRemaining} days remaining
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
                    Free Trial — {walletStates.promotionalDaysRemaining} days
                    remaining
                  </Text>
                </View>
              )}

              <AuthGradientText fontSize={25} textAlign="left">
                Activate Wallet
              </AuthGradientText>

              <Text style={styles.initialRechargeNotice}>
                An initial recharge of ₹999 is mandatory to activate the
                platform. Once activated, you can recharge with any custom amount
                starting from ₹99 to ₹9,999.
              </Text>

              <View style={styles.initialRechargeInfoRow}>
                <Text style={styles.initialRechargeInfoLabel}>
                  Activation Amount
                </Text>
                <Text style={styles.initialRechargeInfoValue}>₹999</Text>
              </View>

              <View style={styles.initialRechargeInfoRow}>
                <Text style={styles.initialRechargeInfoLabel}>
                  After Activation
                </Text>
                <Text style={styles.initialRechargeInfoValue}>
                  ₹99 - ₹9,999
                </Text>
              </View>

              <TouchableOpacity
                onPress={handleInitialRecharge}
                style={[styles.initialRechargeButton, apiWalletStates.isPaymentLoading && { opacity: 0.5 }]}
                activeOpacity={0.8}
                disabled={apiWalletStates.isPaymentLoading}
              >
                {apiWalletStates.isPaymentLoading ? (
                  <ActivityIndicator size="small" color="#ffffff" />
                ) : (
                  <Text style={styles.primaryButtonText}>
                    Recharge for ₹999
                  </Text>
                )}
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
            <Text style={styles.currentBalanceLabel}>Current LP:</Text>
            <Text
              style={[styles.currentBalanceValue, { color: appColors.navyBlueShade }]}
            >
               
              {currentBalance.toLocaleString("en-IN")}
            </Text>
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
                    selectedPreset === preset.id &&
                      styles.presetChipTextSelected,
                  ]}
                >
                  {preset.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>



          <View style={{ marginBottom: 100 }} />
          {keyboardVisible && (
            <View style={{ height: screenHeight * 0.4 }}></View>
          )}
        </ScrollView>
      )}

      {!paymentSuccess && !isFirstRecharge && !isPaymentInitiated && (
        <View style={styles.primaryButtonMain}>
          <TouchableOpacity
            onPress={handleMakePayment}
            style={[
              styles.primaryButton,
              { opacity: !rechargeAmount || apiWalletStates.isPaymentLoading ? 0.5 : 1 },
            ]}
            disabled={!rechargeAmount || apiWalletStates.isPaymentLoading}
          >
            {apiWalletStates.isPaymentLoading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={styles.primaryButtonText}>
                {rechargeAmount
                  ? `Recharge ₹${parseInt(rechargeAmount).toLocaleString("en-IN")}`
                  : "Enter Amount"}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      )}

      {/* Demo Buttons */}
      {/* <View style={styles.demoButtonsContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("paymentStatus", { status: "success" })}
          style={[styles.demoButton, { backgroundColor: "#10B981" }]}
          activeOpacity={0.8}
        >
          <Text style={styles.demoButtonText}>Demo: Payment Success</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("paymentStatus", { status: "error" })}
          style={[styles.demoButton, { backgroundColor: "#EF4444" }]}
          activeOpacity={0.8}
        >
          <Text style={styles.demoButtonText}>Demo: Payment Error</Text>
        </TouchableOpacity>
      </View> */}
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
    fontSize: scaleFont(17),
    fontWeight: "400",
    fontFamily: "Mukta-Regular",
    color: "#64748b",
    marginBottom: 20,
    marginTop: 5,
  },
  currentBalanceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  currentBalanceLabel: {
    fontSize: scaleFont(17),
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
    borderRadius: 17,
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
  promoDaysCount: {
    fontSize: scaleFont(22),
    fontFamily: "Mukta-Bold",
    color: "#10B981",
    marginTop: 12,
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


  // Back Press Popup Styles
  popupOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  blurView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  androidBlur: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.18)",
  },
  popupBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  popupSheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 20,
  },
  popupHandleContainer: {
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 8,
  },
  popupHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#D1D5DB",
  },
  popupContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 16,
  },
  popupTitle: {
    fontSize: scaleFont(22),
    fontFamily: "Mukta-Bold",
    color: "#1F2937",
    marginBottom: 12,
  },
  popupDescription: {
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Regular",
    color: "#6B7280",
    lineHeight: 22,
    marginBottom: 24,
  },
  popupButton: {
    backgroundColor: "#081A35",
    paddingVertical: 14,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  popupButtonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Bold",
  },
  demoButtonsContainer: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 10,
  },
  demoButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  demoButtonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(12),
    fontFamily: "Mukta-Bold",
  },
});

const statusStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  successContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  chakraLogo: {
    position: "absolute",
    top: 50,
    right: -20,
  },
  centerContent: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#D3DAE5",
    borderRadius: 20,
    padding: 20,
    marginTop: 16,
    marginHorizontal: 30,
    alignItems: "center",
    width: "85%",
  },
  infoTitle: {
    fontSize: scaleFont(13),
    fontFamily: "Mukta-Medium",
    color: "#6B7280",
    marginBottom: 8,
  },
  infoAmount: {
    fontSize: scaleFont(20),
    fontFamily: "Mukta-Bold",
    color: "#5E5E5E",
    marginBottom: 12,
  },
  infoMessage: {
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Regular",
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
  },
  backButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: appColors.navyBlueShade,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  errorIconWrapper: {
    position: "relative",
    marginBottom: 20,
  },
  crossBadge: {
    position: "absolute",
    bottom: -4,
    left: -4,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#EF4444",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FAFAFA",
  },
  errorReason: {
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Medium",
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 8,
  },
});

export default MakePaymentPage;
