import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { scaleFont } from "../../utils/responsive";
import { setToggleChatScreenGuideStart } from "../../redux/slices/toggleSlice";
import { setGuidedTourStepsCount } from "../../redux/slices/globalDataSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { height, width } = Dimensions.get("window");

const UniversalTooltip = ({
  title,
  description,
  isBelowButtonPresent,
  isCrossPresent,
  pointerPosition,
  pointerAlignment,
  pointerRight,
  pointerLeft,
  buttonBgColor,
  isButtonBorder,
  isTextButton,
  isStepsPresent,
  modalPosition,
  modalAlignment,
  top,
  bottom,
  left,
  right,

}) => {
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { globalDataStates } = useSelector((state) => state.Global);
  const dispatch = useDispatch();
 
  return (
    <Modal
      visible={toggleStates.toggleChatScreenGuideStart}
      transparent={true}
      animationType="fade"
      onRequestClose={() => dispatch(setToggleChatScreenGuideStart(false))}
    >
      <View style={styles.container}>
        {/* Blur Background */}
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={async () => {dispatch(setGuidedTourStepsCount(globalDataStates.guidedTourStepsCount + 1));
            if(globalDataStates.guidedTourStepsCount == 2){
              dispatch(setToggleChatScreenGuideStart(false));
              await AsyncStorage.setItem("isNewUser", "false");
            }
          }}
        />

        {/* Modal Sheet */}
        <View style={[styles.modalSheet,{top:modalPosition == "up"?top:"",bottom:modalPosition == "down"?bottom:"",left:modalAlignment == "left"?left:"",right:modalAlignment == "right"?right:""}]}>
          {/* Handle Bar */}

          <View
            style={[
              styles.pointer,
              {
                transform: [{ rotate: "45deg" }],
                bottom: pointerPosition == "up" ? "" : -5,
                top: pointerPosition == "up" ? -5 : "",
                left:pointerAlignment == "left"?pointerLeft:"", 
                right:pointerAlignment == "right"?pointerRight:""
              },
            ]}
          />
          <View style={styles.closeModalMain}>
            {/* Title */}
            <View style={{ flexDirection: "row", gap: 10,marginLeft:17}}>
              <Text style={styles.title}>{title} </Text>
            </View>
            <AntDesign
              style={{ marginRight: 17 }}
              onPress={() => dispatch(setToggleChatScreenGuideStart(false))}
              name="close"
              size={16}
              color="white"
            />
          </View>

          {/* Content */}
          <View style={styles.content}>
            {/* Description */}
            <Text style={styles.description}>{description}</Text>

            {/* Button */}
            {isBelowButtonPresent && (
              <View style={styles.btnsMain}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => dispatch(setToggleChatScreenGuideStart(false))}
                  activeOpacity={0.8}
                >
                  <Text style={styles.buttonText}>Start Exploring</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  pointer: {
    height: 16,
    width: 16,
    borderRadius: 2,
    backgroundColor: "#24487C",
    position: "absolute",
  },
  modalSheet: {
    position: "absolute",
    backgroundColor: "#24487C",
    borderRadius: 19,
    width: width - 100,
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
    paddingHorizontal: 17,
    paddingVertical:5,
  },
  iconContainer: {
    marginBottom: 10,
  },
  title: {
    fontSize: scaleFont(14),
    fontWeight: "600",
    color: "#ffffffff",

  },
  description: {
    fontSize: scaleFont(12),
    lineHeight: 18,
    color: "#ffffffff",
    letterSpacing: 0.2,
    marginBottom:10
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
    fontSize: scaleFont(13),
    fontWeight: "500",
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
    fontSize: scaleFont(13),
    lineHeight: 24,
    color: "#1F2937",
    fontWeight: "500",
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
  },
  priceText: {
    fontSize: scaleFont(12.5),
    fontWeight: "600",
    color: "#1F2937",
    textAlign: "center",
  },
  periodText: {
    fontSize: scaleFont(12.5),
    fontWeight: "600",
    color: "#1F2937",
    textAlign: "center",
  },
  closeModalMain: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  categorySections: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionText: {
    color: "#757575",
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

export default UniversalTooltip;
