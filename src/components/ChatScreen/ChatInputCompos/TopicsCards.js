import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useEffect } from "react";
import {
  moderateScale,
  scaleFont,
  verticalScale,
} from "../../../utils/responsive";
import { ArrowUpRight, ChevronRight } from "lucide-react-native";
import { useDispatch } from "react-redux";
import { setToggleSubTopics } from "../../../redux/slices/toggleSlice";
import { setCurrentSelectedTopic, setSelectedSubjectID } from "../../../redux/slices/globalDataSlice";
import { commonFunctionForAPICalls } from "../../../redux/slices/apiCommonSlice";

const TopicsCards = ({ item }) => {
  
  const dispatch = useDispatch();


  const fetchAllTopicsOfSelectedSubjects = ()=>{
    const subjectId = parseInt(item?.id, 10);

    const payload = {
      method:"GET",
      url:`/master/topics?subject_id=${subjectId}`,
      name:"getAllTopicsOfSelectedSubjects"
    }
    dispatch(commonFunctionForAPICalls(payload));
  }

  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(setSelectedSubjectID(item?.id)); // New action to set selected subject ID
        fetchAllTopicsOfSelectedSubjects()
        dispatch(setToggleSubTopics(true));
        dispatch(setCurrentSelectedTopic(item?.title));
      }}
      style={styles.topicsMain}
    >
      <View style={styles.contentWrapper}>
        <View style={styles.imageandIcon}>
          <View
            style={[
              styles.topicIcon,
              {
                backgroundColor: item?.iconBg,
                borderColor: item?.borderColor,
                marginBottom: 7,
              },
            ]}
          >
            <View style={styles.iconWrapper}>{item?.icon}</View>
          </View>
          <ArrowUpRight strokeWidth={1.5} />
        </View>

        <Text style={[styles.topicTitle,{fontFamily:'Mukta-Bold'}]}>{item?.title}</Text>
        <Text style={[styles.topicDesc,{fontFamily:'Mukta-Regular'}]}>{item.description}</Text>
      </View>
      <View style={styles.belowTopics}>
        <Text style={[styles.popularTopics,{fontFamily:'Mukta-Regular'}]}>
          {item?.popularTopics} Popular Topics
        </Text>
        <ChevronRight style={{ marginBottom: 5 }} size={22} strokeWidth={1.5} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  topicsMain: {
    width: "48%",
    minHeight: verticalScale(120),
    borderWidth: 1,
    borderColor: "#D3DAE5",
    borderRadius: 20,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 20,
    backgroundColor: "white",
  },
  contentWrapper: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    flex: 1,
  },
  imageandIcon: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  topicIcon: {
    height: 26,
    width: 26,
    borderWidth: 1,
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  topicTitle: {
    fontSize: moderateScale(15),
    fontWeight: 600,

  },
  topicDesc: {
    fontSize: moderateScale(13),
    fontWeight: 400,
    color: "#757575",
    lineHeight:18
  },
  belowTopics: {
    backgroundColor: "#F2F7FF",
    width: "100%",
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  popularTopics: {
    fontSize: scaleFont(12),
    color: "#757575",
  },
});

export default TopicsCards;
