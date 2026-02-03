import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import React from "react";
import { BlurView } from "@react-native-community/blur";
import { scaleFont } from "../../../utils/responsive";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { setToggleRoomToolsPopup } from "../../../redux/slices/toggleSlice";
import RoomToolsContainer from "../RoomToolsContainer";
import RoomLLMState from "./RoomLLMState";
import RoomResponseStyleState from "./RoomResponseStyleState";
import RoomResponseLangState from "./RoomResponseLangState";
import RoomCitationState from "./RoomCitationState";
import Toaster from "../../UniversalToaster/Toaster";

const RoomToolsOptionsPopup = () => {
  const { toggleStates } = useSelector((state) => state.Toggle);
  const dispatch = useDispatch();

  return (
    <Modal
      visible={toggleStates.toggleRoomToolsPopup}
      transparent={true}
      animationType="slide"
      onRequestClose={() => dispatch(setToggleRoomToolsPopup(false))}
    >
      <Toaster/>
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
          onPress={() => dispatch(setToggleRoomToolsPopup(false))}
        />

        {/* Modal Sheet */}
        {toggleStates.toggleRoomToolsPopupStates == 0 ? (
          <View style={styles.modalSheet}>
            {/* Content */}
            <View style={styles.content}>
              <View style={styles.closeModalMain}>
                <TouchableOpacity
                  onPress={() => dispatch(setToggleRoomToolsPopup(false))}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <AntDesign name="close" size={24} color="black" />
                </TouchableOpacity>
              </View>
              {/* Title */}
              <Text style={[styles.title, { fontFamily: "Mukta-Bold" }]}>
                Room Tools
              </Text>

              {/* Description */}
              <Text style={[styles.description, { fontFamily: "Mukta-Regular" }]}>
                Customise how Elunara responds in this room - choose your model,
                tone, language, and citations
              </Text>
              <View style={styles.mainOptionsContainer}>
                <RoomToolsContainer />
              </View>
            </View>
          </View>
        ) : toggleStates.toggleRoomToolsPopupStates == 1 ? (
          <RoomLLMState />
        ) : toggleStates.toggleRoomToolsPopupStates == 2 ? (
          <RoomResponseStyleState />
        ) : toggleStates.toggleRoomToolsPopupStates == 3 ? (
          <RoomResponseLangState />
        ) : (
          <RoomCitationState />
        )}
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
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalSheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: Platform.OS === "ios" ? 40 : 24,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  closeModalMain: {
    width: "100%",
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: scaleFont(26),
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: scaleFont(14),
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
    gap: 15,
  },
});

export default RoomToolsOptionsPopup;
