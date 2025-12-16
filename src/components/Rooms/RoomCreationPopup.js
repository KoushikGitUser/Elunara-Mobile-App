import {
  View,
  Text,
  Modal,
  KeyboardAvoidingView,
  TouchableOpacity,
  Animated,
  ScrollView,
  TextInput,
  Keyboard,
  Platform,
  StyleSheet,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { BlurView } from "@react-native-community/blur";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setToggleRoomCreationPopup } from "../../redux/slices/toggleSlice";
import { useNavigation } from "@react-navigation/native";
import { scaleFont } from "../../utils/responsive";
import { triggerToast } from "../../services/toast";

const RoomCreationPopup = () => {
  const [roomName, setRoomName] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const inputRefs = useRef([]);
  const animatedValue = useState(new Animated.Value(0))[0];
  const { toggleStates } = useSelector((state) => state.Toggle);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    const keyboardDidShow = Keyboard.addListener("keyboardDidShow", (e) => {
      const height = e.endCoordinates.height;
      setKeyboardVisible(true);
      setKeyboardHeight(height);
      Animated.timing(animatedValue, {
        toValue: height / 2.5, // pushes up slightly, not fully
        duration: 250,
        useNativeDriver: false,
      }).start();
    });

    const keyboardDidHide = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    });

    return () => {
      keyboardDidShow.remove();
      keyboardDidHide.remove();
    };
  }, []);

  return (
    <Modal
      visible={toggleStates.toggleRoomCreationPopup}
      transparent={true}
      animationType="slide"
      onRequestClose={() => dispatch(setToggleRoomCreationPopup(false))}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={[styles.container]}
      >
        {/* Blur Background */}
        <BlurView
          style={styles.blurView}
          blurType="light"
          blurAmount={5}
          reducedTransparencyFallbackColor="rgba(0,0,0,0.4)"
        />
        <View style={styles.androidBlur} />
        <View
          style={[
            styles.gapFiller,
            { height: isKeyboardVisible ? "50%" : "30%" },
          ]}
        />

        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={0.5}
          onPress={() => {
           dispatch(setToggleRoomCreationPopup(false))
            Keyboard.dismiss();
          }}
        />
        <Animated.View
          style={{
            transform: [
              {
                translateY: animatedValue.interpolate({
                  inputRange: [0, 320], // average keyboard height
                  outputRange: [
                    0, -(keyboardHeight * 2.3),
                  ],
                  // perfect lift without large gap
                  extrapolate: "clamp",
                }),
              },
            ],
          }}
        >
          {/* Modal Sheet */}
          <ScrollView
            contentContainerStyle={[styles.scrollContent]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.modalSheet}>
              {/* Content */}
              <View style={styles.content}>
                <View style={styles.closeModalMain}>
                  <AntDesign onPress={()=> dispatch(setToggleRoomCreationPopup(false))} name="close" size={24} color="black" />
                </View>
                {/* Title */}
                <Text style={styles.title}>Create New Learning Lab</Text>

                {/* Description */}
                <Text style={styles.description}>
                  Group chats, notes, and resources into one
                </Text>

                <Text style={styles.description}> space — ideal for assignments or research.</Text>

                {/* Input Section */}
                <View style={styles.inputSection}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Room Name"
                    placeholderTextColor="#9CA3AF"
                    value={roomName}
                    onChangeText={setRoomName}
                    keyboardType="text"
                    returnKeyType="done"
                  />
                </View>

                {/* Verify Button */}
                <TouchableOpacity
                  style={[
                    styles.verifyButton,
                    !roomName && styles.verifyButtonDisabled,
                    { marginBottom:85 },
                  ]}
                  onPress={() => {
                    dispatch(setToggleRoomCreationPopup(false));
                    navigation.navigate("rooms",{roomName});
                    setTimeout(() => {
                      triggerToast("Room Added","Room <room name> has been added successfully","success",3000)
                    }, 500);
                    
                  }}
                  activeOpacity={0.8}
                  disabled={!roomName}
                >
                  <Text style={styles.verifyButtonText}>Create Room</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </Animated.View>
      </KeyboardAvoidingView>
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
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  gapFiller: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  closeModalMain: {
    width: "100%", 
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  modalSheet: {
    backgroundColor: "#ffffffff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 20,
    marginBottom: 0,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  title: {
    fontSize: scaleFont(25),
    fontFamily: "Mukta-Bold",
    color: "#1F2937",
    marginBottom: 5,
    lineHeight: 36,
  },
  description: {
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Regular",
    lineHeight: 24,
    color: "#6B7280",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginBottom: 35,
    marginTop: 40,
    gap: 10,
  },
  otpInput: {
    width: 65,
    height: 65,
    borderWidth: 1.5,
    borderColor: "#d1d5db",
    borderRadius: 16,
    textAlign: "center",
    fontSize: scaleFont(15),
    fontFamily: "Mukta-Medium",
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 80,
  },
  resendText: {
    fontSize: scaleFont(10),
    fontFamily: "Mukta-Regular",
    color: "#6b7280",
  },
  resendLink: {
    fontSize: scaleFont(10),
    fontFamily: "Mukta-Medium",
    color: "#111827",
    textDecorationLine: "underline",
  },
  inputSection: {
    marginBottom: 24,
    marginTop: 30,
  },
  inputLabel: {
    fontSize: scaleFont(10),
    fontFamily: "Mukta-Medium",
    color: "#374151",
    marginBottom: 8,

  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Regular",
    color: "#1F2937",
  },
  verifyButton: {
    backgroundColor: "#081A35",
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  verifyButtonDisabled: {
    backgroundColor: "#CDD5DC",
  },
  verifyButtonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Bold",
  },
  skipButton: {
    alignItems: "center",
    paddingVertical: 12,
    marginBottom: 10,
  },
  skipButtonText: {
    color: "#0F172A",
    fontSize: scaleFont(10),
    fontFamily: "Mukta-Medium",
    textDecorationLine: "underline",
    letterSpacing: 0.2,
  },
  noteContainer: {
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  noteText: {
    fontSize: scaleFont(9),
    fontFamily: "Mukta-Regular",
    lineHeight: 20,
    color: "#6B7280",
    letterSpacing: 0.1,
  },
  noteBold: {
    fontFamily: "Mukta-Bold",
    color: "#374151",
  },
});


export default RoomCreationPopup;
