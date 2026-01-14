import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { BlurView } from "@react-native-community/blur";
import { scaleFont } from "../../../utils/responsive";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { setToggleTopicsPopup } from "../../../redux/slices/toggleSlice";
import { ChevronRight, GitFork } from "lucide-react-native";
import { topicsSheet } from "../../../data/datas";
import TopicsCards from "./TopicsCards";
import SubTopicsCompo from "./SubTopicsCompo";
import { useFonts } from "expo-font";

const screenHeight = Dimensions.get("window").height;
const TopicsCompo = () => {
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { chatsStates } = useSelector((state) => state.API);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [currentSubTopic, setCurrentSubTopic] = useState("Finance");

  // Take first 7 items from API data and merge with icons from topicsSheet
  const dynamicTopics = useMemo(() => {
    const apiTopics = chatsStates.allChatsDatas.allSubjectsAvailable.slice(0, 7);

    const topicsWithIcons = apiTopics.map((topic, index) => ({
      title: topic.name,
      id:topic.id,
      description: topic.description,
      icon: topicsSheet[index]?.icon,
      iconBg: topicsSheet[index]?.iconBg,
      borderColor: topicsSheet[index]?.borderColor,
      popularTopics: topic.topics_count,
    }));

    // Add static 8th item - "Others"
    const othersItem = {
      title: "Others",
      description: "Tech, ethics, change & communication",
      icon: topicsSheet[7]?.icon,
      iconBg: topicsSheet[7]?.iconBg,
      borderColor: topicsSheet[7]?.borderColor,
      popularTopics: topicsSheet[7]?.popularTopics,
    };

    return [...topicsWithIcons, othersItem];
  }, [chatsStates.allChatsDatas.allSubjectsAvailable]);


  return (
    <Modal
      visible={toggleStates.toggleTopicsPopup}
      transparent={true}
      animationType="slide"
      onRequestClose={() => dispatch(setToggleTopicsPopup(false))}
    >
      <View style={styles.container}>
        {/* Blur Background */}

        <BlurView
          style={styles.blurView}
          blurType="light"
          blurAmount={7}
          reducedTransparencyFallbackColor="rgba(0, 0, 0, 0.43)"
        />
        <View style={styles.androidBlur} />

        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={() => dispatch(setToggleTopicsPopup(false))}
        />

        {/* Modal Sheet */}
        <View style={styles.modalSheet}>
          {/* Content */}
          {toggleStates.toggleSubTopics ? (
            <SubTopicsCompo />
          ) : (
            <View style={styles.content}>
              <View style={styles.closeModalMain}>
                <AntDesign
                  onPress={() => dispatch(setToggleTopicsPopup(false))}
                  name="close"
                  size={24}
                  color="black"
                />
              </View>
              {/* Title */}
              <Text style={[styles.title,{fontFamily:'Mukta-Bold'}]}>Explore Subjects</Text>

              {/* Description */}
              <Text style={[styles.description,{fontFamily:'Mukta-Regular'}]}>
                Choose a topic to get started - browse subtopics or jump right
                in
              </Text>

              <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.optionsContainer}
                contentContainerStyle={styles.scrollContent}
              >
                <View style={styles.grid}>
                  {dynamicTopics.map((topics, topicIndex) => {
                    return <TopicsCards key={topicIndex} item={topics} />;
                  })}
                </View>
              </ScrollView>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  blurView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  androidBlur: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.18)",
  },
  optionsContainer: {
    maxHeight: screenHeight * 0.5,
    flexDirection: "column",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalSheet: {
    backgroundColor: "#FAFAFA",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: Platform.OS === "ios" ? 40 : 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 20,
  },
  verifiedIcon: {
    height: 55,
    width: 50,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
    maxHeight: screenHeight * 0.8,
  },
  iconContainer: {
    marginBottom: 24,
  },
  closeModalMain: {
    width: "100%",
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: scaleFont(25),
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: scaleFont(15),
    lineHeight: 24,
    color: "#6B7280",
    marginBottom: 32,
    letterSpacing: 0.2,
  },
  mainOptionsContainer: {
    width: "100%",
    paddingVertical: 20,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
  },
  optionsMain: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    borderColor: "#D3DAE5",
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  button: {
    backgroundColor: "#081A35",
    paddingVertical: 13,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(11),
    fontWeight: "500",
    letterSpacing: 0.3,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});

export default TopicsCompo;
