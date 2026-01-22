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
import SpotlightOverlay from "./SpotlightOverlay";

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
  // New props for manual guided tour
  isManualTour = false,
  currentStep,
  totalSteps,
  onNextPress,
  onBackPress,
  showBackButton = true,
  showUnlockButton = false,
  onUnlockPress,
  spotlightRect,
}) => {
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { globalDataStates } = useSelector((state) => state.Global);
  const dispatch = useDispatch();

  // Determine if we should show based on manual tour or automatic new user tour
  const isVisible = isManualTour
    ? globalDataStates.manualGuidedTourRunning
    : toggleStates.toggleChatScreenGuideStart;

  const handleBackdropPress = async () => {
    if (isManualTour) {
      // Don't advance on backdrop tap for manual tour
      return;
    }
    // Original behavior for new user tour
    dispatch(setGuidedTourStepsCount(globalDataStates.guidedTourStepsCount + 1));
    if (globalDataStates.guidedTourStepsCount == 2) {
      dispatch(setToggleChatScreenGuideStart(false));
      await AsyncStorage.setItem("isNewUser", "false");
    }
  };

  const renderTooltipContent = () => (
    <View
      style={[
        styles.modalSheet,
        {
          top: modalPosition == "up" ? top : "",
          bottom: modalPosition == "down" ? bottom : "",
          left: modalAlignment == "left" ? left : "",
          right: modalAlignment == "right" ? right : "",
        },
      ]}
    >
      {/* Pointer */}
      <View
        style={[
          styles.pointer,
          {
            transform: [{ rotate: "45deg" }],
            bottom: pointerPosition == "up" ? "" : -5,
            top: pointerPosition == "up" ? -5 : "",
            left: pointerAlignment == "left" ? pointerLeft : "",
            right: pointerAlignment == "right" ? pointerRight : "",
          },
        ]}
      />

      {/* Header with step counter and close button */}
      <View style={styles.closeModalMain}>
        <View style={{ flexDirection: "row", gap: 10, marginLeft: 17, alignItems: "center" }}>
          {/* Step counter for manual tour */}
          {isManualTour && currentStep && totalSteps && (
            <Text style={styles.stepCounter}>{currentStep}/{totalSteps}</Text>
          )}
          <Text style={styles.title}>{title}</Text>
        </View>
        {!isManualTour && (
          <AntDesign
            style={{ marginRight: 17 }}
            onPress={() => dispatch(setToggleChatScreenGuideStart(false))}
            name="close"
            size={16}
            color="white"
          />
        )}
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Description */}
        <Text style={styles.description}>{description}</Text>

        {/* Manual Tour Buttons */}
        {isManualTour && (
          <View style={styles.manualTourButtonsContainer}>
            {showUnlockButton ? (
              // Learning Labs - Unlock + Back buttons
              <>
                <TouchableOpacity
                  style={styles.outlineButton}
                  onPress={onBackPress}
                  activeOpacity={0.8}
                >
                  <Text style={styles.outlineButtonText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.unlockButton}
                  onPress={onUnlockPress}
                  activeOpacity={0.8}
                >
                  <Text style={styles.unlockButtonText}>Unlock</Text>
                </TouchableOpacity>
              </>
            ) : (
              // Regular Next + Back buttons
              <>
                {showBackButton && currentStep > 1 && (
                  <TouchableOpacity
                    style={styles.outlineButton}
                    onPress={onBackPress}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.outlineButtonText}>Back</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={[
                    styles.outlineButton,
                    !showBackButton || currentStep === 1 ? { flex: 1 } : {},
                  ]}
                  onPress={onNextPress}
                  activeOpacity={0.8}
                >
                  <Text style={styles.outlineButtonText}>Next</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}

        {/* Original button for non-manual tour */}
        {!isManualTour && isBelowButtonPresent && (
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
  );

  // For manual tour with spotlight
  if (isManualTour) {
    return (
      <Modal
        visible={isVisible}
        transparent={true}
        animationType="none"
        onRequestClose={() => {}}
      >
        <SpotlightOverlay
          targetRect={spotlightRect}
          borderColor="#FFFFFF"
          borderRadius={12}
          borderWidth={4}
          blurAmount={7}
        >
          <TouchableOpacity
            style={styles.backdrop}
            activeOpacity={1}
            onPress={handleBackdropPress}
          />
          {renderTooltipContent()}
        </SpotlightOverlay>
      </Modal>
    );
  }

  // Original behavior for non-manual tour
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => dispatch(setToggleChatScreenGuideStart(false))}
    >
      <View style={styles.container}>
        {/* Blur Background */}
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={handleBackdropPress}
        />
        {renderTooltipContent()}
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
    zIndex: 1,
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
    zIndex: 10,
  },
  btnsMain: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    paddingHorizontal: 17,
    paddingVertical: 5,
    paddingBottom: 15,
  },
  title: {
    fontSize: scaleFont(14),
    fontWeight: "600",
    color: "#ffffffff",
    fontFamily: "Mukta-Bold",
  },
  description: {
    fontSize: scaleFont(12),
    lineHeight: 18,
    color: "#ffffffff",
    letterSpacing: 0.2,
    marginBottom: 10,
    fontFamily: "Mukta-Regular",
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
  closeModalMain: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    alignItems: "center",
  },
  // New styles for manual tour
  stepCounter: {
    fontSize: scaleFont(12),
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "Mukta-Regular",
  },
  manualTourButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    marginTop: 5,
  },
  outlineButton: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
    backgroundColor: "transparent",
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  outlineButtonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(13),
    fontWeight: "500",
    letterSpacing: 0.3,
    fontFamily: "Mukta-Bold",
  },
  unlockButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  unlockButtonText: {
    color: "#24487C",
    fontSize: scaleFont(13),
    fontWeight: "600",
    letterSpacing: 0.3,
    fontFamily: "Mukta-Bold",
  },
});

export default UniversalTooltip;
