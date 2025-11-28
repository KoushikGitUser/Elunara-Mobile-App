import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Star } from "lucide-react-native";
import React from "react";

const CreditPackCard = ({
  selected,
  credits,
  price,
  desc,
  badgeText,
  validity,
  setSelectedCredit,
  id
}) => {
  return (
    <TouchableOpacity onPress={()=>setSelectedCredit(id)} style={[styles.card, selected && styles.selectedCard]}>
      <Star size={22} strokeWidth={1.6} color="#555" />
      <View style={{flex:1}}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <View style={styles.leftSection}>
            <View style={styles.titleRow}>
              <Text style={styles.creditsText}>{credits} </Text>
            </View>

            <Text style={styles.subtitle}>{desc} </Text>
          </View>

          <View style={styles.rightSection}>
            <Text style={styles.price}>{price} </Text>
            <Text style={styles.validity}>{validity} </Text>
          </View>
        </View>
        <View style={[styles.badge,{borderColor:selected?"#93BCFD":"#E2E2E2",backgroundColor:selected?"#C5DAF8":"#F3F3F3"}]}>
          <Text style={styles.badgeText}>{badgeText} </Text>
        </View>
      </View>

      <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
        {selected && <View style={styles.radioInner} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 13,
    paddingVertical: 15,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: "#D5DDE5",
    marginVertical: 10,
    width: "100%",
    gap: 10,
  },
  selectedCard: {
    borderColor: "#081A35",
    backgroundColor: "#EEF4FF",
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 2,
  },
  creditsText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1B1B1B",
  },
  subtitle: {
    fontSize: 13,
    color: "#6C6C6C",
    marginTop: 2,
  },
  badge: {
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: "#F3F3F3",
    borderRadius: 18,
    alignSelf: "flex-start",
    borderWidth:1.5
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#555",
  },
  rightSection: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1B1B1B",
  },
  validity: {
    marginTop: 5,
    fontSize: 12,
    color: "#797979",
  },
  radioOuter: {
    width: 22,
    height: 22,
    marginTop: 3,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#B8BFC7",
    position: "relative",
  },
  radioOuterSelected: {
    borderColor: "#081A35",
  },
  radioInner: {
    width: 14,
    height: 14,
    borderRadius: 10,
    backgroundColor: "#081A35",
    position: "absolute",
    left: 2.5,
    top: 2.5,
  },
});

export default CreditPackCard;
