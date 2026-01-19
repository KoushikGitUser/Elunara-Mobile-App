import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react-native";
import { graphData } from "../../../data/datas";
import { LinearGradient } from "expo-linear-gradient";
import { scaleFont } from "../../../utils/responsive";
import Svg, { Line } from "react-native-svg";
import { MaterialIcons } from "@expo/vector-icons";

const AnalyticsGraphCompo = ({
  isFilled,
  userAverage = "2h 43m",
  othersAverage = "1h 15m",
  percentageChange = 52,
}) => {
  const [currentWeek, setCurrentWeek] = useState("This week");

  // Calculate max height and average for the chart
  const maxHours = 4;
  const avgHours = 2.5;
  const chartHeight = 180;

  const getBarHeight = (hours) => {
    if (hours <= 0) return 0;
    return (hours / maxHours) * chartHeight;
  };

  const getAvgLinePosition = () => {
    return chartHeight - (avgHours / maxHours) * chartHeight;
  };

  const handlePreviousWeek = () => {
    console.log("Previous week");
  };

  const handleNextWeek = () => {
    console.log("Next week");
  };

  const DottedLine = ({ y }) => (
    <Svg
      height="2"
      width="100%"
      style={{ position: "absolute", top: y, left: 0, right: 0 }}
    >
      <Line
        x1="0"
        y1="1"
        x2="100%"
        y2="1"
        stroke="#B0B0B0"
        strokeWidth="1.5"
        strokeDasharray="6, 6"
      />
    </Svg>
  );

  return (
    <View style={{ width: "100%" }}>
      {isFilled ? (
        <View style={styles.container}>
          <View style={styles.card}>
            {/* Header Section */}
            <View style={styles.headerSection}>
              {/* Left - Your Daily Average */}
              <View style={styles.averageContainer}>
                <Text style={styles.averageLabel}>Your Daily Average</Text>
                <Text style={styles.averageValue}>{userAverage}</Text>
              </View>

              {/* Right - Others Daily Average */}
              <View style={styles.averageContainer}>
                <Text style={styles.averageLabel}>Others daily average</Text>
                <Text style={styles.averageValue}>{othersAverage}</Text>
                <View style={styles.percentageContainer}>
                  <MaterialIcons color="#4CAF50"  name="arrow-drop-up" size={25} />
                  <Text style={styles.percentageText}>
                    +{percentageChange}% from last week
                  </Text>
                </View>
              </View>
            </View>

            {/* Chart Section */}
            <View style={styles.chartSection}>
              {/* Y-axis labels */}
              <View style={styles.yAxisLabels}>
                <Text style={styles.yAxisLabel}>4h</Text>
                <Text style={styles.yAxisLabel}>avg</Text>
                <Text style={styles.yAxisLabel}>0h</Text>
              </View>

              {/* Chart area with bars */}
              <View style={styles.chartArea}>
                {/* Average line (dotted) */}
                <View
                  style={[styles.averageLine, { top: getAvgLinePosition() }]}
                />

                {/* Bars */}
                <View style={styles.barsContainer}>
                  {graphData.map((data, index) => (
                    <View key={index} style={styles.barWrapper}>
                      <View style={styles.barContainer}>
                        <View
                          style={[
                            styles.barSpace,
                            { height: chartHeight - getBarHeight(data.hours) },
                          ]}
                        />
                        <LinearGradient
                          colors={["#2C5F8D", "#5B8DB8", "#7BA5CE"]}
                          start={{ x: 0.5, y: 0 }}
                          end={{ x: 0.5, y: 1 }}
                          style={[
                            styles.bar,
                            { height: getBarHeight(data.hours) },
                          ]}
                        />
                      </View>
                      <Text style={styles.dayLabel}>{data.day}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>

            {/* Week Navigation */}
            <View style={styles.navigationSection}>
              <TouchableOpacity
                onPress={handlePreviousWeek}
                style={styles.navButton}
              >
                <ChevronLeft size={32} color="#2D2D2D" strokeWidth={2} />
              </TouchableOpacity>

              <Text style={styles.weekLabel}>{currentWeek}</Text>

              <TouchableOpacity
                onPress={handleNextWeek}
                style={styles.navButton}
              >
                <ChevronRight size={32} color="#2D2D2D" strokeWidth={2} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.card}>
            {/* Header Section */}
            <View style={styles.headerSection}>
              {/* Left - Your Daily Average */}
              <View style={styles.averageContainer}>
                <Text style={styles.averageLabel}>Your Daily Average</Text>
                <Text style={styles.averageValue}>{userAverage}</Text>
              </View>

              {/* Right - Others Daily Average */}
              <View
                style={[styles.averageContainer, { alignItems: "flex-end" }]}
              >
                <Text style={styles.averageLabel}>Others daily average</Text>
                <Text style={styles.averageValue}>{othersAverage}</Text>
                <View style={styles.percentageContainer}>
                  <TrendingUp size={18} color="#4CAF50" strokeWidth={2.5} />
                  <Text style={styles.percentageText}>
                    +{percentageChange}% from last week
                  </Text>
                </View>
              </View>
            </View>

            {/* Chart Section */}
            <View style={styles.cardGraph}>
              {/* Chart Section */}
              <View style={styles.chartSection}>
                {/* Chart area with bars */}
                <View style={styles.chartArea}>
                  {/* Top line (4h) */}
                  <View style={[styles.solidLine, { top: 0 }]} />

                  {/* Average dotted line */}
                  <View
                    style={[
                      styles.lineContainer,
                      { top: 100 },
                    ]}
                  >
                    <DottedLine y={0} />
                  </View>

                  {/* Bottom line (0h) */}
                  <View style={[styles.solidLine, { bottom: 0 }]} />

                  {/* Bars */}
                  <View style={styles.barsContainer}>
                    {graphData.map((data, index) => {
                      const barHeight = getBarHeight(data.hours);
                      return (
                        <View key={index} style={styles.barWrapper}>
                          <View style={styles.barContainer}>
                            {barHeight > 0 && (
                              <LinearGradient
                                colors={["#1B365D", "#A5C0E7",]}
                                start={{ x: 0.5, y: 0 }}
                                end={{ x: 0.5, y: 1 }}
                                style={[styles.bar, { height: barHeight }]}
                              />
                            )}
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </View>

                {/* Y-axis labels on the right */}
                <View style={styles.yAxisLabels}>
                  <Text style={styles.yAxisLabel}>4h</Text>
                  <Text style={styles.yAxisLabel}>avg</Text>
                  <Text style={styles.yAxisLabel}>0h</Text>
                </View> 
              </View>

              {/* Day labels */}
              <View style={styles.dayLabelsContainer}>
                {graphData.map((data, index) => (
                  <View key={index} style={styles.dayLabelWrapper}>
                    <Text style={styles.dayLabel}>{data.day}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Week Navigation */}
            <View style={styles.navigationSection}>
              <TouchableOpacity
                onPress={handlePreviousWeek}
                style={styles.navButton}
              >
                <ChevronLeft size={32} color="#2D2D2D" strokeWidth={2} />
              </TouchableOpacity>

              <Text style={styles.weekLabel}>{currentWeek}</Text>

              <TouchableOpacity
                onPress={handleNextWeek}
                style={styles.navButton}
              >
                <ChevronRight size={32} color="#2D2D2D" strokeWidth={2} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 50,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    paddingVertical: 32,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#D3DAE5",
  },

  // Header Section
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
    gap: 20,
  },
  averageContainer: {
    flex: 1,
  },
  lineContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 2,
    zIndex: 1,
  },
  solidLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "#D3DAE5",
    zIndex: 1,
  },
  averageLabel: {
    fontSize: scaleFont(13),
    fontWeight: "400",
    fontFamily: "Mukta-Regular",
    color: "#757575",
    marginBottom: 8,
  },
  averageValue: {
    fontSize: scaleFont(22),
    fontFamily: "Mukta-Bold",
    color: "#2D2D2D",
    marginBottom: 4,
  },
  percentageContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
  },
  percentageText: {
    fontSize: scaleFont(12),
    fontWeight: "400",
    fontFamily: "Mukta-Regular",
    color: "#888888",
  },

  // Chart Section
  chartSection: {
    flexDirection: "row",
    marginBottom: 24,
    height: 190,
  },
  yAxisLabels: {
    justifyContent: "space-between",
    marginRight: 12,
    width: 40,
    height: "100%",
  },
  yAxisLabel: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Mukta-Regular",
    color: "#888888",
    textAlign: "right",
  },
  chartArea: {
    flex: 1,
    position: "relative",
    height: "100%",
  },
  averageLine: {
    position: "absolute",
    left: 0,
    right: 0,
    borderStyle: "dotted",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    zIndex: 1,
  },
  barsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    height: "100%",
    paddingTop: 8,
  },
  barWrapper: {
    flex: 1,
    flexDirection:"row",
  },
  barContainer: {
    width: 16,
    height: "100%",
    alignItems:"flex-start",
    justifyContent: "flex-end",
  },
  barSpace: {
    width: "100%",
    backgroundColor:"black"
  },
  bar: {
    width: "100%",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    minHeight: 10,
  },
  dayLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666666",
    marginTop: 12,
  },

  cardGraph: {
    paddingVertical: 12,
  },

  // Navigation Section
  navigationSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    borderTopWidth: 0,
  },
  navButton: {
    padding: 8,
  },
  weekLabel: {
    fontSize: 22,
    fontFamily: "Mukta-Bold",
    color: "#2D2D2D",
  },
  dayLabelsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 0,
    width:"80%",
  },
  dayLabelWrapper: {
    alignItems: "center",
  },
  dayLabel: {
    fontSize: scaleFont(12),
    fontWeight: "500",
    fontFamily: "Mukta-Medium",
    color: "#666666",
  },
});

export default AnalyticsGraphCompo;
