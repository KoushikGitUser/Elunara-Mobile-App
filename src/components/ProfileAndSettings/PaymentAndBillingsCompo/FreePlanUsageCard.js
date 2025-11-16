import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Upload, Palette, Languages } from "lucide-react-native";
import { scaleFont } from "../../../utils/responsive";

const FreePlanUsageCard = () => {
  const items = [
    {
      title: "Attachment's Upload",
      Icon: Upload,
      value: 2,
      max: 5,
      colors: ["#1B365D", "#A5C0E7"],
    },
    {
      title: "Change Response style",
      Icon: Palette,
      value: 3,
      max: 5,
      colors: ["#1B365D", "#A5C0E7"],
    },
    {
      title: "Change Response language",
      Icon: Languages,
      value: 1,
      max: 5,
      colors: ["#1B365D", "#A5C0E7"],
    },
  ];

  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Today’s Usage</Text>

      {items.map((item, i) => {
        const widthPercent = (item.value / item.max) * 100;

        return (
          <View key={i} style={styles.row}>
            <View style={{width:"90%"}}>
            <View style={styles.labelRow}>
              <Text style={styles.title}>{item.title}</Text>
            </View>

            {/* Background Bar */}
            <View style={styles.progressBg}>
              <LinearGradient
                colors={item.colors}
                start={[0, 0]}
                end={[1, 0]}
                style={[styles.progressFill, { width: `${widthPercent}%` }]}
              />
            </View>
            </View>


            <Text style={styles.count}>
             <Text style={{fontWeight:700}}> {item.value}
                </Text>/{item.max}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffffff",
    borderRadius: 20,
    paddingHorizontal:13,
    paddingVertical:15,
    marginTop: 20,
    borderWidth:1,
    borderColor:"#D3DAE5",
    marginBottom:30,
    width:"100%",
  },
  heading: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 20,
  },
  row: {
    marginBottom: 26,
    flexDirection:"row",
    alignItems:"flex-end",
    justifyContent:"space-between",
    width:"100%"
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  title: {
    fontSize: 15,
    color: "#757575",
    fontWeight: "500",
  },
  progressBg: {
    width:"100%",
    height: 8,
    backgroundColor: "#EEE",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 10,
  },
  count: {
    textAlign: "right",
    marginTop: 6,
    fontSize: scaleFont(12),
    color: "#555",
  },
});

export default FreePlanUsageCard;
