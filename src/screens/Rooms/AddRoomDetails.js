import {
  View,
  Text,
  Animated,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React, { useRef, useState } from "react";
import AddRoomDetailsHeader from "../../components/Rooms/AddRoomDetailsHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import ScrollListIcon from "../../../assets/SvgIconsComponent/RoomsIcons/ScrollListIcon";
import { scaleFont } from "../../utils/responsive";
import BrainMindIcon from "../../../assets/SvgIconsComponent/RoomsIcons/BrainMindIcon";
import SlidersToolsIcon from "../../../assets/SvgIconsComponent/RoomsIcons/SlidersToolsIcon";
import ToolsContainers from "../../components/ChatScreen/ChatInputCompos/ToolsContainers";
import { MoreVertical, Paperclip, Plus } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import ToolsOptionsPopup from "../../components/ChatScreen/ChatInputCompos/ToolsOptionsPopup";
import { useDispatch, useSelector } from "react-redux";
import SourcesPopup from "../../components/Modals/Rooms/SourcesPopup";
import { setToggleAddedRoomDetails } from "../../redux/slices/toggleSlice";
import pdfLogo from "../../assets/images/pdf.png";
const { width } = Dimensions.get("window");

const AddRoomDetails = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [sourcesPopup, setSourcesPopup] = useState(false);
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );
  const { toggleStates } = useSelector((state) => state.Toggle);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <SafeAreaView
      style={{ flex: 1, width: "100%", backgroundColor: "#FAFAFA" }}
    >
      {/* {sourcesPopup && <TouchableOpacity style={styles.sourcesPopupWrapper} ></TouchableOpacity>} */}
      {toggleStates.toggleToolsPopup && <ToolsOptionsPopup />}
      <AddRoomDetailsHeader scrollY={scrollY} />
      <ScrollView
        onScroll={handleScroll}
        style={{ flex: 1, width: "100%", zIndex: 9 }}
      >
        <View style={styles.header}>
          <View style={styles.headerTitleContainer}>
            <ScrollListIcon />
            <Text style={styles.title}>Add Description</Text>
          </View>
          <Text style={styles.subtitle}>
            Briefly describe what this Room is about
          </Text>
          <View style={[styles.inputLarge, ,]}>
            <TextInput
              style={styles.inputText}
              placeholder="e.g. “Preparing for final exams in biology”..."
              placeholderTextColor="#9CA3AF"
              returnKeyType="done"
            />
          </View>
        </View>
        <View style={[styles.header, { marginTop: 35 }]}>
          <View style={styles.headerTitleContainer}>
            <BrainMindIcon />
            <Text style={styles.title}>Add Instructions</Text>
          </View>
          <Text style={styles.subtitle}>
            Help Elunara AI support you better by outlining goals or task
            instructions here
          </Text>
          <View style={[styles.inputLarge, ,]}>
            <TextInput
              style={styles.inputText}
              placeholder="Answer as if I'm new — keep it beginner-friendly."
              placeholderTextColor="#9CA3AF"
              returnKeyType="done"
            />
          </View>
        </View>
        <View style={[styles.header, { marginTop: 35 }]}>
          <View style={styles.headerTitleContainer}>
            <SlidersToolsIcon />
            <Text style={styles.title}>Tools</Text>
          </View>
          <Text style={styles.subtitle}>
            Help Elunara AI support you better by outlining goals or task
            instructions here
          </Text>
        </View>
        <View style={styles.mainOptionsContainer}>
          <View style={styles.toolsContainer}>
            <ToolsContainers />
          </View>
        </View>
        <View style={[styles.card, { marginTop: 10 }]}>
          <View style={styles.contentWrapper}>
            {sourcesPopup && <SourcesPopup setSourcesPopup={setSourcesPopup} />}
            {/* Left Content */}
            <View style={styles.leftContent}>
              {/* Header with Icon and Title */}
              <View style={[styles.titleSection, { marginBottom: 15 }]}>
                <Paperclip size={26} color="#888888" strokeWidth={1.5} />
                <Text style={styles.title}>Sources (Files or Links)</Text>
              </View>

              {/* Description */}
              <Text style={[styles.description, { width: "100%" }]}>
                Share references you want the AI to use
              </Text>
            </View>

            {/* Plus Button - Centered to left content */}
            <TouchableOpacity
              onPress={() => setSourcesPopup(true)}
              style={styles.addButton}
            >
              <Plus size={28} color="#1F2937" strokeWidth={1.5} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.linksMain}>
            {/* Link Icon */}
            <View style={styles.pdfLogoContainer}>
              <Image
                source={pdfLogo}
                style={{ height: 25, width: 25, objectFit: "contain" }}
              />
            </View>

            {/* Link Details */}
            <View style={styles.linkDetails}>
              <Text style={styles.url}>Finance.pdf </Text>
              <Text style={styles.description}>PDF </Text>
            </View>

            {/* More Options Button */}
            <TouchableOpacity style={styles.moreButton}>
              <MoreVertical size={24} color="#1F2937" strokeWidth={2} />
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.verifyButton, { marginBottom: 25 }]}
            onPress={() => {
              navigation.navigate("rooms", { roomName: "Room name" });
              dispatch(setToggleAddedRoomDetails(true));
            }}
            activeOpacity={0.8}
          >
            <Text style={styles.verifyButtonText}>Save details</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 15,
  },
  bellIcon: {
    marginRight: 16,
  },
  title: {
    fontSize: scaleFont(17),
    fontWeight: "600",
    color: "#1F2937",
    letterSpacing: -0.5,
    paddingLeft: 10,
  },
  subtitle: {
    fontSize: scaleFont(13),
    color: "#6B7280",
    marginTop: 10,
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  bellIcon: {
    marginRight: 16,
  },
  title: {
    fontSize: scaleFont(17),
    fontWeight: "600",
    color: "#1F2937",
    letterSpacing: -0.5,
    paddingLeft: 10,
  },
  subtitle: {
    fontSize: scaleFont(13),
    color: "#6B7280",
    marginTop: 10,
  },
  inputLarge: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    borderRadius: 26,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#1F2937",
    letterSpacing: 0.2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    height: 120,
    marginTop: 20,
  },
  inputText: {
    backgroundColor: "#FFFFFF",
    fontSize: scaleFont(10),
    color: "#1F2937",
    letterSpacing: 0.2,
  },
  mainOptionsContainer: {
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
  },
  toolsContainer: {
    width: "100%",
    paddingVertical: 7,
    paddingHorizontal: 20,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
    borderWidth: 1,
    borderColor: "#D3DAE5",
    backgroundColor: "white",
    borderRadius: 19,
  },
  contentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    position: "relative",
  },
  leftContent: {
    width: "80%",
  },
  titleSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  title: {
    fontSize: scaleFont(18),
    fontWeight: "600",
    color: "#1F2937",
  },
  addButton: {
    width: 52,
    height: 52,
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: "#1F2937",
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    fontSize: scaleFont(14),
    lineHeight: 20,
    color: "#757575",
    fontWeight: "400",
  },
  card: {
    borderRadius: 16,
    padding: 20,
    width: "100%",
    zIndex: 9999,
  },
  verifyButton: {
    backgroundColor: "#081A35",
    paddingVertical: 13,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 70,
  },
  verifyButtonDisabled: {
    backgroundColor: "#CDD5DC",
  },
  verifyButtonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(13),
    fontWeight: "500",
    letterSpacing: 0.3,
  },
  sourcesPopupWrapper: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "red",
    top: 0,
    left: 0,
    zIndex: 99,
  },
  iconContainer: {
    width: 55,
    height: 50,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CDD5DC",
  },
  linkDetails: {
    flex: 1,
    gap: 4,
  },
  url: {
    fontSize: scaleFont(14),
    fontWeight: "600",
    color: "#1F2937",
    lineHeight: 24,
  },
  moreButton: {
    padding: 4,
  },
  linksMain: {
    backgroundColor: "#EBF1FB",
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 11,
    flexDirection: "row",
    alignItems: "center",
    width: width - 32,
    gap: 14,
    alignSelf: "center",
    marginTop: 20,
  },
    pdfLogoContainer: {
    height: "100%",
    width: 60,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#c3cddcff",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddRoomDetails;
