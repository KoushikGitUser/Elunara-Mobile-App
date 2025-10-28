import {
  View,
  Text,
  Platform,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import {
  moderateScale,
  scaleFont,
  verticalScale,
} from "../../../../../utils/responsive";
import { ArrowLeft } from "lucide-react-native";
import { AntDesign } from "@expo/vector-icons";
import DropDowns from "../DropDowns";
import { LLMOptionsAvailable } from "../../../../../data/datas";
import { useDispatch } from "react-redux";
import {
  setToggleToolsPopup,
  setToggleToolsPopupStates,
} from "../../../../../redux/slices/toggleSlice";
import verifyIcon from "../../../../../assets/images/verifyIcon.png";
import FindAPIKeyNoticeState from "./FindAPIKeyNoticeState";

const screenHeight = Dimensions.get("window").height;

const IntegrateAIAccState = () => {
  const dispatch = useDispatch();
  const [selectedCountsArray, setSelectedCountsArray] = useState([]);
  const [toggleFindApiKey, setToggleFindApiKey] = useState(false);
  const [apiKey, setApiKey] = useState("");
  return (
    <>
      {toggleFindApiKey ? (
        <FindAPIKeyNoticeState close={setToggleFindApiKey} />
      ) : (
        <View style={styles.content}>
          <View style={styles.closeModalMain}>
            <ArrowLeft
              onPress={() => dispatch(setToggleToolsPopupStates(0))}
              size={30}
              strokeWidth={2}
            />
            <AntDesign
              onPress={() => dispatch(setToggleToolsPopup(false))}
              name="close"
              size={24}
              color="black"
            />
          </View>
          {/* Title */}
          <Text style={styles.title}>Integrate Your AI account</Text>

          {/* Description */}
          <Text style={styles.description}>
            Receive responses in your preferred LLMs! Pick up to 3 now to easily
            toggle between them
          </Text>

          <ScrollView style={{ maxHeight: screenHeight * 0.6 }}>
            <View style={styles.noteSection}>
              <Image
                source={verifyIcon}
                style={{ height: 20, width: 20, marginTop: 5 }}
              />
              <Text
                style={{
                  fontSize: moderateScale(11),
                  fontWeight: 400,
                  width: "90%",
                }}
              >
                Your API key is used to securely connect your AI account. Keep
                it private and do not share it publicly.
              </Text>
            </View>

            <Text
              style={{
                fontSize: moderateScale(10),
                color: "#5E5E5E",
                marginTop: 40,
              }}
            >
              Select AI Model
            </Text>
            <DropDowns
              selectedCounts={selectedCountsArray}
              setSelectedCounts={setSelectedCountsArray}
              selectOptionsArray={LLMOptionsAvailable}
            />
            <View style={styles.inputSection}>
              <Text
                style={{
                  fontSize: moderateScale(10),
                  color: "#5E5E5E",
                  marginTop: 10,
                  marginBottom: 10,
                }}
              >
                {" "}
                Enter Your API Key
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Paste your API key here"
                placeholderTextColor="#9CA3AF"
                value={apiKey}
                onChangeText={(text) => {
                  setApiKey(text);
                  setSelectedCountsArray([...selectedCountsArray, "t"]);
                }}
                keyboardType="text"
                returnKeyType="done"
              />
            </View>
            <TouchableOpacity style={{marginTop:10}} onPress={()=>setToggleFindApiKey(true)}>
              <Text
                style={{
                  fontSize: scaleFont(12),
                  fontWeight: 600,
                  textDecorationLine: "underline",
                }}
              >
                Where Can I Find My API Key?
              </Text>
            </TouchableOpacity>

            {/* Button */}
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor:
                    selectedCountsArray?.length >= 2 &&
                    selectedCountsArray.includes("t")
                      ? "#081A35"
                      : "#CDD5DC",
                },
              ]}
              onPress={() => setIsLLMSaved(true)}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Connect API Key</Text>
            </TouchableOpacity>
            <Text
              style={{
                fontSize: moderateScale(11),
                fontWeight: 600,
                textDecorationLine: "underline",
                textAlign: "center",
              }}
            >
              <Text
                style={{
                  fontSize: moderateScale(11),
                  fontWeight: 400,
                  paddingRight: 5,
                  textDecorationLine: "none",
                }}
              >
                More LLMS? Update your list in{" "}
              </Text>
              Settings
            </Text>
          </ScrollView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  modalSheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: Platform.OS === "ios" ? 40 : 24,
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
    marginTop: 5,
  },
  closeModalMain: {
    width: "100%",
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
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
  optionsMain: {
    flexDirection: "column",
    gap: 25,
    alignItems: "center",
  },
  buttonContainer: {
    backgroundColor: "#F3F3F3",
    width: "auto",
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#081A35",
    paddingVertical: 13,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 30,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(11),
    fontWeight: "500",
    letterSpacing: 0.3,
  },
  inputSection: {
    marginBottom: 5,
    marginTop: 25,
  },
  inputLabel: {
    fontSize: scaleFont(10),
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
    letterSpacing: 0.1,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: scaleFont(10),
    color: "#1F2937",
    letterSpacing: 0.2,
  },
  card: {
    borderWidth: 1,
    borderColor: "#D3DAE5",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 18,
    backgroundColor: "white",
  },
  contentMain: {
    flexDirection: "row",
    gap: 10,
    width: "85%",
    alignItems: "flex-start",
  },
  textContainer: {
    flexDirection: "column",
    gap: 5,
    alignItems: "flex-start",
  },
  noteSection: {
    width: "100%",
    minHeight: verticalScale(70),
    borderWidth: 1,
    gap: 10,
    borderColor: "#D3DAE5",
    borderRadius: 16,
    backgroundColor: "#F3F3F3",
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  radioOuter: {
    width: 23,
    height: 23,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#D3DAE5",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  radioInner: {
    width: "80%",
    height: "80%",
    borderRadius: 50,
    backgroundColor: "#000000ff",
  },
});

export default IntegrateAIAccState;
