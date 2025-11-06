import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "../ChatScreenCompo.styles";
import {
  ArrowUpRight,
  ChevronRight,
  CircleChevronRight,
  IndianRupee,
} from "lucide-react-native";
import {
  moderateScale,
  scaleFont,
  verticalScale,
} from "../../../utils/responsive";
import { useDispatch } from "react-redux";
import {
  setToggleSubTopics,
  setToggleTopicsPopup,
} from "../../../redux/slices/toggleSlice";
import { setCurrentSelectedTopic } from "../../../redux/slices/globalDataSlice";

const Topics = ({ item, index }) => {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      onPress={() => {
        if (index == 5) {
          dispatch(setToggleTopicsPopup(true));
          dispatch(setToggleSubTopics(false));
          dispatch(setCurrentSelectedTopic(null));
        } else {
          dispatch(setToggleTopicsPopup(true));
          dispatch(setCurrentSelectedTopic(item?.title));
          dispatch(setToggleSubTopics(true));
        }
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
          {index == 5 && <CircleChevronRight strokeWidth={1.5} />}
        </View>

        <Text style={styles.topicTitle}>{item?.title}</Text>
        <Text style={styles.topicDesc}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  topicsMain: {
    width: "48%",
    minHeight: verticalScale(110),
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
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  topicTitle: {
    fontSize: moderateScale(14),
    fontWeight: 600,
  },
  topicDesc: {
    fontSize: moderateScale(12),
    fontWeight: 400,
    color: "#757575",
  },
});

export default Topics;
