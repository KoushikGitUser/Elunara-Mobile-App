import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { scaleFont } from "../../../utils/responsive";
import { Flame, Image } from "lucide-react-native";
import FireIcon from "../../../../assets/SvgIconsComponent/AnalyticsIcons/FireIcon";
import ClassRoomIcon from "../../../../assets/SvgIconsComponent/AnalyticsIcons/ClassRoomIcon";

const YourStatisticsCard = ({ isFilled }) => {
  return (
    <View style={{width:"100%"}}>
      {isFilled ? (
        <View style={styles.stastisticsMain}>
          {/* Title */}
          <Text style={styles.title}>Your Statistics</Text>

          {/* Card with statistics */}
          <View style={styles.card}>
            <View style={styles.statsContainer}>
              {/* Left stat - Best Streak */}
              <View style={styles.statItem}>
                <View style={styles.statHeader}>
                  <FireIcon/>
                  <Text style={styles.statNumber}>40</Text>
                </View>
                <Text style={styles.statLabel}>All time Best Streak</Text>
              </View>

              {/* Vertical Divider */}
              <View style={styles.divider} />

              {/* Right stat - Topics Learned */}
              <View style={styles.statItem}>
                <View style={styles.statHeader}>
                  <ClassRoomIcon/>
                  <Text style={styles.statNumber}>150</Text>
                </View>
                <Text style={styles.statLabel}>Topics learned</Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.stastisticsMain}>
          {/* Title */}
          <Text style={styles.title}>Your Statistics</Text>

          {/* Card with empty state message */}
          <View style={styles.card}>
            <Text style={styles.description}>
              Start learning to build your{"\n"}streak and see statistics
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  stastisticsMain: {
    backgroundColor: "#EBF1FB",
    paddingHorizontal: 15,
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: "center",
    width: "100%",
    marginTop: 30,
  },
  card: {
    backgroundColor: "#ffffffff",
    borderRadius: 20,
    minHeight: 85,
    paddingHorizontal: 40,
    paddingVertical: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    fontSize: scaleFont(16),
    fontFamily: "Mukta-Regular",
    color: "#8B8B8B",
    textAlign: "center",
  },

  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    
  },
  statHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginBottom: 12,
  },
  statNumber: {
    fontSize: scaleFont(20),
    fontFamily: "Mukta-Bold",
    color: "#2D2D2D",
  },
  statLabel: {
    fontSize: scaleFont(15),
    fontWeight: "400",
    fontFamily: "Mukta-Regular",
    color: "#8B8B8B",
    textAlign: "center",
  },
  divider: {
    width: 1,
    height: 50,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 20,
  },
  title: {
    fontSize: scaleFont(15),
    fontFamily: "Mukta-Bold",
    color: "#2D2D2D",
    marginBottom: 20,
    textAlign: "center",
  },
});

export default YourStatisticsCard;
