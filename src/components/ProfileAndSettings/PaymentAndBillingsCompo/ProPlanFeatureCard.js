import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { platformFeatures } from "../../../data/datas";
import { Check } from "lucide-react-native";
import BigChakraIcon from "../../../../assets/SvgIconsComponent/PaymentBillingIcons/BigChakraIcon";
import { scaleFont } from "../../../utils/responsive";
import { LinearGradient as ExpoLinearGradient } from "expo-linear-gradient";
import GradientText from '../../common/GradientText'

const ProPlanFeatureCard = () => {
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.gradientWrapper}>
        <ExpoLinearGradient
          colors={["#1B365D", "#A5C0E7"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientBackground}
        />
      </View>
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <BigChakraIcon />
          <GradientText children="Platform Features" fontSize={24} fullWidth={true}  />
        </View>
        {/* Subtitle */}
        <Text style={styles.subtitle}>
          All features included with your Elunara wallet
        </Text>

        {/* Features List */}
        <View style={styles.featuresList}>
          {platformFeatures.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Check size={24} color="#10B981" strokeWidth={1.7} />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gradientWrapper: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    borderRadius: 24,
    overflow: 'hidden',
  },
  gradientBackground: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    paddingVertical:13,
    paddingHorizontal:20,
    marginRight: 4,
    marginBottom: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  cardWrapper: {
    position: "relative",
    width: "100%",
    marginTop:30
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    fontFamily: "Mukta-Bold",
    color: "#3B5580",
  },
  subtitle: {
    fontSize: scaleFont(15),
    lineHeight: 24,
    color: "#6B7280",
    fontWeight: "400",
    fontFamily: "Mukta-Regular",
    marginBottom: 24,
  },
  featuresList: {
    gap: 10,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 12,
  },
  featureText: {
    fontSize: scaleFont(14),
    lineHeight: 24,
    color: "#1F2937",
    fontWeight: "500",
    fontFamily: "Mukta-Medium",
    flex: 1,
    paddingTop: 1,
  },
});

export default ProPlanFeatureCard;
