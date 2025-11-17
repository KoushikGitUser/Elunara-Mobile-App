import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { scaleFont } from '../../../utils/responsive';
import { AlertTriangle } from 'lucide-react-native';

const ShiftedToFreePlanCard = () => {
  return (
      <View style={styles.card}>
        <View style={styles.headerContainer}>
          <AlertTriangle size={25} color="#f59e0b" strokeWidth={1.5} />
          <Text style={styles.headerText}>
            Your account is now on the Free Plan
          </Text>
        </View>

        <Text style={styles.descriptionText}>
          We couldn't process your payment. Update your info to keep enjoying Elunara Pro, or your account will switch to Free.
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.outlineButton}
          >
            <Text style={styles.outlineButtonText}>Update Payment Information</Text>
          </TouchableOpacity>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 28,
    padding: 16,
    borderWidth:1,
    borderColor:"#D3DAE5",
    marginBottom:20
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerText: {
    fontSize: scaleFont(15),
    fontWeight: '600',
    color: '#1e293b',
    marginLeft: 12,
    flex: 1,
  },
  descriptionText: {
    fontSize: scaleFont(13),
    color: '#535862',
    lineHeight: 24,
    marginBottom: 28,
  },
  buttonContainer: {
    flexDirection: 'column',
    gap: 12,
  },
  outlineButton: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#0f172a',
    borderRadius: 50,
    paddingVertical: 13,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0f172a',
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#0f172a',
    borderRadius: 50,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default ShiftedToFreePlanCard