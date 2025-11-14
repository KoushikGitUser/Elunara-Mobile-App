import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Check, IndianRupee, RefreshCw } from 'lucide-react-native';
import { freePlanFeature, proPlanFeature } from '../../../data/datas';

const FreePlanFeatureCard = () => {
  return (
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <IndianRupee size={28} color="#6B7280" strokeWidth={2.5} />
            <RefreshCw size={20} color="#6B7280" strokeWidth={2.5} style={styles.refreshIcon} />
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
              <Check size={24} color="#9CA3AF" strokeWidth={1.5} style={styles.checkIcon} />
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
    padding: 24,
    width: "100%",
    borderWidth: 2,
    borderColor: '#D3DAE5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
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
    fontSize: 32,
    fontWeight: '700',
    color: '#374151',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: '#6B7280',
    fontWeight: '400',
    marginBottom: 24,
  },
  featuresList: {
    gap: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  checkIcon: {
    marginTop: 2,
    flexShrink: 0,
  },
  featureText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
    fontWeight: '400',
    flex: 1,
  },
});

export default FreePlanFeatureCard