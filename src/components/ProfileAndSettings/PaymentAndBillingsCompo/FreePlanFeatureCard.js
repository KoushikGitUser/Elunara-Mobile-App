import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Check, IndianRupee, RefreshCw } from 'lucide-react-native';
import { freePlanFeature, proPlanFeature } from '../../../data/datas';
import freePlanIcon from '../../../assets/images/freeplanIcon.jpg'
import { scaleFont } from '../../../utils/responsive';

const FreePlanFeatureCard = () => {
  return (
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
           <Image style={{height:40,width:40}} source={freePlanIcon} />
          </View>
          <Text style={styles.title}>Free Plan</Text>
        </View>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          You are currently enjoying these features at no cost
        </Text>

        {/* Features List */}
        <View style={styles.featuresList}>
          {freePlanFeature.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Check size={24} color="#888888" strokeWidth={1.5} style={styles.checkIcon} />
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
  iconContainer: {
    position: 'relative',
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  refreshIcon: {
    position: 'absolute',
    bottom: -2,
    right: -2,
  },
  title: {
    fontSize: scaleFont(24),
    fontWeight: '700',
    color: '#374151',
  },
  subtitle: {
    fontSize: scaleFont(15),
    lineHeight: 24,
    color: '#6B7280',
    fontWeight: '400',
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
  checkIcon: {
    marginTop: 2,
    flexShrink: 0,
  },
  featureText: {
    fontSize: scaleFont(13),
    lineHeight: 24,
    color: '#374151',
    fontWeight: '500',
    flex: 1,
  },
});

export default FreePlanFeatureCard