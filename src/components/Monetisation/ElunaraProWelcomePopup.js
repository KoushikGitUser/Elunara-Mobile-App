import {
  View,
  Text,
  Platform,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { scaleFont } from "../../utils/responsive";
import { BlurView } from "@react-native-community/blur";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import icon from "../../assets/images/bookBulb.png";
import { setToggleElunaraProWelcomePopup } from "../../redux/slices/toggleSlice";
import GradientText from "../common/GradientText";
import { elunaraProWelcome } from "../../data/datas";
import { Check } from "lucide-react-native";

const { height, width } = Dimensions.get("window");

const ElunaraProWelcomePopup = () => {
  const { toggleStates } = useSelector((state) => state.Toggle);
  const dispatch = useDispatch();
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [selectedCredit, setSelectedCredit] = useState(null);
  const SCREEN_HEIGHT = Dimensions.get("window").height;

  return (
    <Modal
      visible={toggleStates.toggleElunaraProWelcomePopup}
      transparent={true}
      animationType="slide"
      onRequestClose={() => dispatch(setToggleElunaraProWelcomePopup(false))}
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
          onPress={() => dispatch(setToggleElunaraProWelcomePopup(false))}
        />

        {/* Modal Sheet */}
        <View style={styles.modalSheet}>
          {/* Handle Bar */}
          <View style={styles.closeModalMain}>
            <AntDesign
              style={{ marginRight: 20 }}
              onPress={() => dispatch(setToggleElunaraProWelcomePopup(false))}
              name="close"
              size={20}
              color="black"
            />
          </View>

          {/* Content */}
          <View style={styles.content}>
            {/* Icon */}
            <View style={styles.iconContainer}>
              {/* icon */}
              <Image
                style={{ height: 50, width: 50, objectFit: "contain" }}
                source={icon}
              />
            </View>

            {/* Title */}
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Text style={styles.title}>Welcome to</Text>
              <GradientText
                children="Elunara Pro!"
                fullWidth={true}
                fontSize={25}
                marginTop={5}
              />
            </View>

            {/* Description */}
            <Text style={styles.description}>
              You've unlocked the full potential of your AI learning companion.
            </Text>

            <View style={styles.featuresList}>
              {elunaraProWelcome.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Check size={24} color="#10B981" strokeWidth={1.7} />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>

            {/* Button */}
            <View style={styles.btnsMain}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => dispatch(setToggleElunaraProWelcomePopup(false))}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>
                 Start Exploring
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalSheet: {
    backgroundColor: "#FFFFFF",
    borderRadius: 19,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 20,
    width: width - 40,
  },
  btnsMain: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  verifiedIcon: {
    height: 55,
    width: 50,
    objectFit: "contain",
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  iconContainer: {
    marginBottom: 10,
  },
  title: {
    fontSize: scaleFont(25),
    fontWeight: "500",
    fontFamily: "Mukta-Bold",
    color: "#1F2937",
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Regular",
    lineHeight: 24,
    color: "#6B7280",
    marginBottom: 18,
    letterSpacing: 0.2,
  },
  button: {
    width: "100%",
    backgroundColor: "#081A35",
    paddingVertical: 13,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(14),
    fontWeight: "500",
    fontFamily: "Mukta-Bold",
    letterSpacing: 0.3,
  },
  featuresList: {
    gap: 10,
    marginBottom: 30,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 12,
  },
  featureText: {
    fontSize: scaleFont(15),
    lineHeight: 24,
    color: "#1F2937",
    fontWeight: "500",
    fontFamily: "Mukta-Medium",
    flex: 1,
    paddingTop: 1,
  },
  cardsContainer: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
    marginBottom: 55,
  },
  priceCard: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    borderRadius: 20,
    padding: 13,
    borderWidth: 2,
    borderColor: "#D3DAE5",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedCard: {
    backgroundColor: "#EEF4FF",
    borderColor: "#081A35",
  },
  checkBadge: {
    position: "absolute",
    top: -17,
    right: 20,
    transform: [{ translateX: 12 }],
    width: 27,
    height: 27,
    borderRadius: 16,
    backgroundColor: "#081A35",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#ffffff",
  },
  saveBadge: {
    position: "absolute",
    top: -15,
    right: 15,
    backgroundColor: "#F3ECFF",
    borderWidth: 1,
    borderColor: "#7D1DE4",
    paddingHorizontal: 14,
    paddingVertical: 2,
    borderRadius: 20,
  },
  saveText: {
    color: "#7D1DE4",
    fontSize: 10,
    fontWeight: "600",
    fontFamily: "Mukta-Medium",
  },
  priceText: {
    fontSize: scaleFont(12.5),
    fontWeight: "600",
    fontFamily: "Mukta-Medium",
    color: "#1F2937",
    textAlign: "center",
  },
  periodText: {
    fontSize: scaleFont(12.5),
    fontWeight: "600",
    fontFamily: "Mukta-Medium",
    color: "#1F2937",
    textAlign: "center",
  },
  closeModalMain: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  categorySections: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionText: {
    color: "#757575",
    fontFamily: "Mukta-Regular",
  },
  sections: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 2,
    borderColor: "lightgrey",
    paddingVertical: 10,
  },
});

export default ElunaraProWelcomePopup;
