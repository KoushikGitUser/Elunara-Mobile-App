import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setSettingsInnerPageHeaderTitle, setHideSettingsBackButton } from "../../redux/slices/globalDataSlice";
import { setIsPaymentInitiated, resetPaymentFlow } from "../../redux/slices/toggleSlice";
import { commonFunctionForAPICalls } from "../../redux/slices/apiCommonSlice";
import { scaleFont } from "../../utils/responsive";
import chakraLogo from "../../assets/images/BigGrayChakra.png";
import authLoader from "../../assets/images/authLoader.gif";
import PaymentSuccessFrame from "../../../assets/SvgIconsComponent/PaymentBillingIcons/PaymentSuccessFrame";
import AuthGradientText from "../../components/common/AuthGradientText";
import { Wallet, X, ArrowLeft } from "lucide-react-native";
import { appColors } from "../../themes/appColors";

const PaymentStatusPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const orderId = route.params?.order_id;

  const apiWalletStates = useSelector((state) => state.API.walletStates);
  const isVerifying = apiWalletStates.isVerifyingPayment;
  const status = apiWalletStates.verifyPaymentStatus;
  const message = apiWalletStates.verifyPaymentMessage;
  const amount = apiWalletStates.verifyPaymentAmount;

  // Reset MakePaymentPage states on mount
  useEffect(() => {
    dispatch(setIsPaymentInitiated(false));
    dispatch(resetPaymentFlow());
    dispatch(setHideSettingsBackButton(false));
  }, []);

  // Hit verify API on mount
  useEffect(() => {
    if (orderId) {
      dispatch(
        commonFunctionForAPICalls({
          method: "POST",
          url: `/payments/verify/${orderId}`,
          name: "verifyPayment",
        })
      );
    }
  }, [orderId]);

  const handleGoBack = () => {
    dispatch(setSettingsInnerPageHeaderTitle("Payment and Billings"));
    navigation.navigate("settingsInnerPages", { page: 2 });
  };

  if (isVerifying) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loaderContainer}>
          <Image
            source={authLoader}
            style={{ width: 150, height: 150 }}
            resizeMode="contain"
          />
        </View>
      </SafeAreaView>
    );
  }

  if (status === "success") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.successContainer}>
          <View style={styles.chakraLogo}>
            <Image source={chakraLogo} style={{ height: 200, width: 160, objectFit: "contain" }} />
          </View>
          <View style={styles.successfulIconAndText}>
            <PaymentSuccessFrame />
            <View style={styles.successInfoCard}>
              <Text style={styles.successInfoTitle}>Order ID - {orderId}</Text>
              <Text style={styles.successAmount}>
               Amount - <Text style={{ color: "#10B981" }}>₹{amount ? amount.toLocaleString("en-IN") : "0"}</Text>
              </Text>
              <Text style={styles.successMessage}>
                Your Payment is successful and your wallet has been credited.
              </Text>
            </View>
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleGoBack}
              activeOpacity={0.8}
            >
              <ArrowLeft size={24} color="#FFFFFF" strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (status === "error") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <View style={styles.chakraLogo}>
            <Image source={chakraLogo} style={{ height: 200, width: 160, objectFit: "contain" }} />
          </View>
          <View style={styles.errorIconWrapper}>
            <Wallet size={90} color="#6B7280" strokeWidth={1.2} />
            <View style={styles.crossBadge}>
              <X size={24} color="#FFFFFF" strokeWidth={3} />
            </View>
          </View>
          <AuthGradientText fontSize={25}>
            Payment Failed
          </AuthGradientText>
          {message && (
            <Text style={styles.errorReason}>
              {message}
            </Text>
          )}
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleGoBack}
            activeOpacity={0.8}
          >
            <ArrowLeft size={24} color="#FFFFFF" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>PaymentStatusPage</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
  successfulIconAndText: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  successInfoCard: {
    backgroundColor: "#FFFFFF",
    borderWidth:2,
    borderColor:"#D3DAE5",
    borderRadius: 20,
    padding: 20,
    marginTop: 16,
    marginHorizontal: 30,
    alignItems: "center",
    width: "85%",
  },
  successInfoTitle: {
    fontSize: scaleFont(13),
    fontFamily: "Mukta-Medium",
    color: "#6B7280",
    marginBottom: 8,
  },
  successAmount: {
    fontSize: scaleFont(20),
    fontFamily: "Mukta-Bold",
    color: "#5E5E5E",
    marginBottom: 12,
  },
  successMessage: {
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
  errorDescription: {
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Regular",
    color: "#6B7280",
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 32,
  },
});

export default PaymentStatusPage;
