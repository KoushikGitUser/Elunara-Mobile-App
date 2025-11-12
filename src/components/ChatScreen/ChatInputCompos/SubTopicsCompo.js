import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  Platform,
  StyleSheet,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from "@react-native-community/blur";
import { AntDesign } from "@expo/vector-icons";
import { subTopics } from "../../../data/datas";
import { scaleFont } from "../../../utils/responsive";
import SubTopicsCard from "./SubTopicsCard";
import { ArrowLeft, Mic, Search } from "lucide-react-native";
import { setToggleSubTopics, setToggleTopicsPopup } from "../../../redux/slices/toggleSlice";
const screenHeight = Dimensions.get("window").height;
const SubTopicsCompo = () => {
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { globalDataStates } = useSelector((state) => state.Global);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [belowSearchText, setBelowSearchText] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        setKeyboardHeight(0);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={styles.content}>
      <View style={styles.closeModalMain}>
        <ArrowLeft
          onPress={() => dispatch(setToggleSubTopics(false))}
          size={30}
          strokeWidth={2}
        />
        <AntDesign
          onPress={() => dispatch(setToggleTopicsPopup(false))}
          name="close"
          size={24}
          color="black"
        />
      </View>
      {/* Title */}
      <Text style={styles.title}>{globalDataStates.currentSelectedTopic} </Text>
      {/* Description */}
      <Text style={styles.description}>Popular Topics</Text>
      <View style={styles.input}>
        <Search color="#B5BECE" strokeWidth={1.5} />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#B5BECE"
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text);
          }}
          keyboardType="text"
          returnKeyType="done"
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.optionsContainer}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.grid}>
          {subTopics.map((topics, topicIndex) => {
            return <SubTopicsCard key={topicIndex} item={topics} />;
          })}
        </View>
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        style={[styles.keyboardAvoidingView, { bottom: keyboardHeight - 10 }]}
      >
        <View style={styles.container}>
          <View style={styles.contents}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.belowInput}
                placeholder="Can't find a topic? Just type it,I've got you"
                placeholderTextColor="#B5BECE"
                value={belowSearchText}
                onChangeText={setBelowSearchText}
              />
              <TouchableOpacity style={styles.micButton} activeOpacity={0.7}>
                <Mic size={25} color="#1A1A1A" strokeWidth={1.5} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
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
  input: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#ABB8CC",
    borderRadius: 15,
    paddingHorizontal: 16,
    fontSize: scaleFont(10),
    color: "#1F2937",
    letterSpacing: 0.2,
    marginBottom: 30,
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
    maxHeight: screenHeight * 0.45,
    flexDirection: "column",
  },
  backdrop: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalSheet: {
    backgroundColor: "#FFFFFF",
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
    justifyContent: "space-between",
    alignItems: "center",
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
    paddingBottom: 64,
  },
  grid: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  keyboardAvoidingView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 20,
  },
  contents: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F8F9FA",
    borderRadius: 17,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ABB8CC",
    marginBottom: 12,
    backgroundColor: "white",
  },
  belowInput: {
    flex: 1,
    fontSize: scaleFont(12),
    color: "#1A1A1A",
    paddingVertical: 0,
    backgroundColor: "white",
  },
  micButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  indicator: {
    width: 134,
    height: 5,
    backgroundColor: "#1A1A1A",
    borderRadius: 100,
    alignSelf: "center",
  },
});

export default SubTopicsCompo;
