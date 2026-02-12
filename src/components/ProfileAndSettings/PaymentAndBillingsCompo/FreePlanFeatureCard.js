import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Check } from 'lucide-react-native';
import { platformFeatures } from '../../../data/datas';
import { scaleFont } from '../../../utils/responsive';
import BigChakraIcon from "../../../../assets/SvgIconsComponent/PaymentBillingIcons/BigChakraIcon";
import GradientText from '../../common/GradientText'

const FreePlanFeatureCard = () => {
  return (
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <BigChakraIcon />
          <GradientText children="Platform Features" fontSize={24} fullWidth={true} />
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
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    backgroundColor:"white",
    paddingVertical:13,
    paddingHorizontal:20,
    width: "100%",
    borderWidth: 2,
    borderColor: '#D3DAE5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: scaleFont(15),
    lineHeight: 24,
    color: '#6B7280',
    fontWeight: '400',
    fontFamily: 'Mukta-Regular',
    marginBottom: 15,
  },
  featuresList: {
    gap: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  featureText: {
    fontSize: scaleFont(14),
    lineHeight: 24,
    color: '#374151',
    fontWeight: '500',
    fontFamily: 'Mukta-Medium',
    flex: 1,
  },
});

export default FreePlanFeatureCard
