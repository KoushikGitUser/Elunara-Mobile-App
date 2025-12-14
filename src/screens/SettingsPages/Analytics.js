import { View, Text, ScrollView, StyleSheet, } from "react-native";
import React, { useState } from "react";
import { Droplet, Flame, Image, Info } from "lucide-react-native";
import { scaleFont } from "../../utils/responsive";
import AnalyticsFlameIcon from "../../../assets/SvgIconsComponent/AnalyticsIcons/AnalyticsFlameIcon";
import YourStatisticsCard from "../../components/ProfileAndSettings/AnalyticsCompo/YourStatisticsCard";
import TopicsCoveredCompo from "../../components/ProfileAndSettings/AnalyticsCompo/TopicsCoveredCompo";
import AnalyticsGraphCompo from "../../components/ProfileAndSettings/AnalyticsCompo/AnalyticsGraphCompo";
import WhatIsStreakPopup from "../../components/ProfileAndSettings/AnalyticsCompo/WhatIsStreakPopup";

const Analytics = ({ handleScroll }) => {
  const [whatIsStreakPopup,setWhatIsStreakPopup] = useState(false);
  return (
    <ScrollView
      onScroll={handleScroll}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
      style={[
        styles.container,
        {
          flex: 1,
          width: "100%",
          paddingHorizontal: 25,
          paddingTop: 15,
          backgroundColor: "#FAFAFA",
        },
      ]}
    >
      <WhatIsStreakPopup close={setWhatIsStreakPopup} verificationMailSent={whatIsStreakPopup} />
      <View style={styles.container}>
        <View style={styles.content}>
          {/* Left side - Number and Day Streak */}
          <View
            style={[
              styles.leftSection,
              { flexDirection: "column", justifyContent: "flex-start" },
            ]}
          >
            <Text style={styles.number}>10</Text>
            <View style={styles.streakContainer}>
              <Text style={styles.streakText}>Day Streak</Text>
              <Info onPress={()=>setWhatIsStreakPopup(true)} size={22} color="#666666" strokeWidth={2} />
            </View>
          </View>

          {/* Right side - Water Drop Icon */}
          <View style={styles.rightSection}>
            <AnalyticsFlameIcon />
          </View>
        </View>
      </View>
      
      <YourStatisticsCard isFilled={false}/>
      <YourStatisticsCard isFilled={true} />
       
       <Text style={{fontSize:scaleFont(18),fontWeight:600,fontFamily:"Mukta-Medium",textAlign:"left",width:"100%",marginTop:30}}>
        Topics covered
       </Text>
      <TopicsCoveredCompo isFilled={false}/>
      <TopicsCoveredCompo isFilled={true} />

      <AnalyticsGraphCompo isFilled={false}/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%",
  },
  number: {
    fontSize: scaleFont(75),
    fontFamily: "Mukta-Bold",
    lineHeight: 76,
    color: "#2D2D2D",
    marginBottom: 10,
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  streakText: {
    fontSize: scaleFont(25),
    fontFamily: "Mukta-Bold",
    color: "#2D2D2D",
  },
  rightSection: {
    justifyContent: "center",
    alignItems: "center",
  },
  

});

export default Analytics;
