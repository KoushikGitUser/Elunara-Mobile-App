import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { AlertTriangle } from "lucide-react-native";
import { scaleFont } from "../../../utils/responsive";
import { useDispatch } from "react-redux";
import { setToggleIsPaidOrProUser } from "../../../redux/slices/toggleSlice";

const PaymentUpdationAlertCard = () => {
    const dispatch = useDispatch();
  return (
      <View style={styles.card}>
        <View style={styles.headerContainer}>
          <AlertTriangle size={25} color="#f59e0b" strokeWidth={1.5} />
          <Text style={styles.headerText}>
            Update your payment Information!
          </Text>
        </View> 

        <Text style={styles.descriptionText}>
          Update your info to avoid switching to the Free Plan.
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
          onPress={()=>dispatch(setToggleIsPaidOrProUser(false))}
            style={styles.outlineButton}
          >
            <Text style={styles.outlineButtonText}>Switch to free version</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>Complete Payment</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 28,
    padding: 16,
    borderWidth:1,
    borderColor:"#D3DAE5"
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

export default PaymentUpdationAlertCard;
