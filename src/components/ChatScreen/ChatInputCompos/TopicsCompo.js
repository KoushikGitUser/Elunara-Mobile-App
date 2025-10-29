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
import React, { useState } from "react";
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

const screenHeight = Dimensions.get("window").height;
const TopicsCompo = () => {
  const { toggleStates } = useSelector((state) => state.Toggle);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [toggleSubTopics, setToggleSubTopics] = useState(false);
  const [currentSubTopic,setCurrentSubTopic] = useState("Finance");

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
          {toggleSubTopics ? (
            <SubTopicsCompo setToggleSubTopics={setToggleSubTopics} currentSubTopic={currentSubTopic} />
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
              <Text style={styles.title}>Explore Subjects</Text>

              {/* Description */}
              <Text style={styles.description}>
                Choose a topic to get started - browse subtopics or jump right
                in
              </Text>

              <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.optionsContainer}
                contentContainerStyle={styles.scrollContent}
              >
                <View style={styles.grid}>
                  {topicsSheet.map((topics, topicIndex) => {
                    return <TopicsCards setCurrentSubTopic={setCurrentSubTopic} setToggleSubTopics={setToggleSubTopics} key={topicIndex} item={topics} />;
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
    maxHeight: screenHeight * 0.6,
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
    fontSize: scaleFont(23),
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: scaleFont(12),
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
