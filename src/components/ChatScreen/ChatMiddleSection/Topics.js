import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useEffect, useMemo } from "react";
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
  isProMaxIphone,
  isRegularIphone,
} from "../../../utils/responsive";
import { useDispatch, useSelector } from "react-redux";
import {
  setToggleSubTopics,
  setToggleTopicsPopup,
  setToggleNoBalanceModal,
} from "../../../redux/slices/toggleSlice";
import { setCurrentSelectedTopic, setSelectedSubjectID } from "../../../redux/slices/globalDataSlice";
import { useFonts } from "expo-font";
import { commonFunctionForAPICalls } from "../../../redux/slices/apiCommonSlice";

const Topics = ({ item, index, isFromRooms = false }) => {


  const dispatch = useDispatch();
  const { walletStates } = useSelector((state) => state.Toggle);
  const isZeroBalance = walletStates.walletBalance <= 0 && !walletStates.isPromotionalUser;
  // Larger title/desc fonts only on Pro Max iPhones within ChatScreen — Rooms
  // reuses this card and must stay at the standard size.
  const usePromaxScale = isProMaxIphone && !isFromRooms;
  // Subtle 1-pt bump on regular (non-Pro-Max) iPhones, also limited to
  // ChatScreen. Mutually exclusive with usePromaxScale — exactly one of the
  // two can be true on iOS, neither on Android/iPad.
  const useSmallIphoneScale = isRegularIphone && !isFromRooms;

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
        if (isZeroBalance) {
          dispatch(setToggleNoBalanceModal(true));
          return;
        }
        if (index == 5) {
          dispatch(setToggleTopicsPopup(true));
          dispatch(setToggleSubTopics(false));
          dispatch(setCurrentSelectedTopic(null));
        } else {
          fetchAllTopicsOfSelectedSubjects();
          dispatch(setSelectedSubjectID(item?.id));
          dispatch(setToggleTopicsPopup(true));
          dispatch(setCurrentSelectedTopic(item?.name));
          dispatch(setToggleSubTopics(true));
        }
      }}
      style={styles.topicsMain}
    >
      <View style={styles.contentWrapper}>
        <View style={styles.imageandIcon}>
          {item?.icon_url ? (
            <Image
              source={{ uri: item.icon_url }}
              style={{ width: 26, height: 26, resizeMode: "contain", marginBottom: 7 }}
            />
          ) : item?.icon ? (
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
          ) : null}
          {index == 5 && <CircleChevronRight strokeWidth={1.5} />}
        </View>

        <Text
          style={[
            styles.topicTitle,
            { fontFamily: "Mukta-Bold" },
            usePromaxScale && { fontSize: moderateScale(16) },
            useSmallIphoneScale && { fontSize: moderateScale(15) },
          ]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item?.name}
        </Text>
        <Text
          style={[
            styles.topicDesc,
            { fontFamily: "Mukta-Regular" },
            usePromaxScale && { fontSize: moderateScale(14), lineHeight: 18 },
            useSmallIphoneScale && { fontSize: moderateScale(13), lineHeight: 16 },
          ]}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {item.description}
        </Text>
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
    borderRadius: 17,
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
    lineHeight: 15,
  },
});

export default Topics;
