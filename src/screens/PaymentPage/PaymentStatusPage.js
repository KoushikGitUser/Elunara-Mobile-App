import { View, Text, Image, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setSettingsInnerPageHeaderTitle } from "../../redux/slices/globalDataSlice";
import { scaleFont } from "../../utils/responsive";
import chakraLogo from "../../assets/images/BigGrayChakra.png";
import authLoader from "../../assets/images/authLoader.gif";
import PaymentSuccessFrame from "../../../assets/SvgIconsComponent/PaymentBillingIcons/PaymentSuccessFrame";
import AuthGradientText from "../../components/common/AuthGradientText";
import { Wallet, X } from "lucide-react-native";

const PaymentStatusPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();
  const status = route.params?.status;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Auto go back 3 seconds after status is shown
  useEffect(() => {
    if (!isLoading) {
      const goBackTimer = setTimeout(() => {
        dispatch(setSettingsInnerPageHeaderTitle("Payment and Billings"));
        navigation.navigate("settingsInnerPages", { page: 2 });
      }, 3000);
      return () => clearTimeout(goBackTimer);
    }
  }, [isLoading]);

  if (isLoading) {
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
            <Image source={chakraLogo} style={{ height: 200, width: 160,objectFit:"contain" }} />
          </View>
          <View style={styles.successfulIconAndText}>
            <PaymentSuccessFrame/>
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
          <Text style={styles.errorDescription}>
            Something went wrong with your payment. Please try again or contact
            support if the issue persists.
          </Text>
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
