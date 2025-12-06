import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  Platform,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { BlurView } from "@react-native-community/blur";
import { AntDesign } from "@expo/vector-icons";
import { LLMCardsOptions } from "../../../../../data/datas";
import LLMCards from "./LLMCards";
import { useDispatch, useSelector } from "react-redux";
import { setToggleChangeResponseLLMWhileChatPopup } from "../../../../../redux/slices/toggleSlice";
import { scaleFont } from "../../../../../utils/responsive";
import CompareLLMCards from "./CompareLLMCards";
import { ArrowRight } from "lucide-react-native";

const ChangeLLMPopup = () => {
  const { toggleStates } = useSelector((state) => state.Toggle);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [selectedLLMForResponse, setSelectedLLMForResponse] = useState(null);
  const [selectedLLMForCompare, setSelectedLLMForCompare] = useState(null);
  const SCREEN_HEIGHT = Dimensions.get("window").height;

  return (
    <Modal
      visible={toggleStates.toggleChangeResponseLLMWhileChatPopup}
      transparent={true}
      animationType="slide"
      onRequestClose={() =>
        dispatch(setToggleChangeResponseLLMWhileChatPopup(false))
      }
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
          onPress={() =>
            dispatch(setToggleChangeResponseLLMWhileChatPopup(false))
          }
        />

        {/* Modal Sheet */}
        <View style={styles.modalSheet}>
          {/* Handle Bar */}
          <View style={styles.closeModalMain}>
            <AntDesign
              style={{ marginRight: 20 }}
              onPress={() =>
                dispatch(setToggleChangeResponseLLMWhileChatPopup(false))
              }
              name="close"
              size={20}
              color="black"
            />
          </View>

          {/* Content */}
          <View style={styles.content}>
            <View style={styles.currentLLMMain}>
              <Text style={styles.currentResponse}>Current Response LLM</Text>

              <TouchableOpacity style={styles.badge}>
                <Text style={styles.btnText}>OpenAI</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.categorySections}>
              <TouchableOpacity
                onPress={() => setSelectedCategory(1)}
                style={[
                  styles.sections,
                  { borderColor: selectedCategory == 1 ? "black" : "#E2E2E2" },
                ]}
              >
                <Text
                  style={[
                    styles.sectionText,
                    {
                      color: selectedCategory == 1 ? "black" : "#757575",
                      fontWeight: selectedCategory == 1 ? 600 : 400,
                      fontSize: scaleFont(13),
                    },
                  ]}
                >
                  Select Another
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSelectedCategory(2)}
                style={[
                  styles.sections,
                  { borderColor: selectedCategory == 2 ? "black" : "#E2E2E2" },
                ]}
              >
                <Text
                  style={[
                    styles.sectionText,
                    {
                      color: selectedCategory == 2 ? "black" : "#757575",
                      fontWeight: selectedCategory == 2 ? 600 : 400,
                      fontSize: scaleFont(13),
                    },
                  ]}
                >
                  Compare Responses
                </Text>
              </TouchableOpacity>
            </View>
            {/* Description */}
            <Text style={styles.description}>
              Update the current answer by selecting a different LLM
            </Text>
            {selectedCategory == 1 ? (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                  width: "100%",
                  maxHeight: SCREEN_HEIGHT * 0.35,
                  paddingTop: 20,
                  marginBottom: 20,
                }}
              >
                {LLMCardsOptions?.map((credits, creditIndex) => {
                  return (
                    <LLMCards
                      icon={credits.icon}
                      useFor={credits.desc}
                      badgeText={credits.buttonText}
                      optionsIndex={creditIndex}
                      title={credits.title}
                      key={creditIndex}
                    />
                  );
                })}
              </ScrollView>
            ) : (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                  width: "100%",
                  maxHeight: SCREEN_HEIGHT * 0.35,
                  paddingTop: 20,
                }}
              >
                {LLMCardsOptions?.map((credits, creditIndex) => {
                  return (
                    <CompareLLMCards
                      icon={credits.icon}
                      useFor={credits.desc}
                      badgeText={credits.buttonText}
                      optionsIndex={creditIndex}
                      title={credits.title}
                      key={creditIndex}
                    />
                  );
                })}
                <View style={{ height: 50 }} />
              </ScrollView>
            )}

            <TouchableOpacity
              style={{ marginTop: 10,marginBottom:20,width:"auto",alignSelf:"flex-start",flexDirection:"row",alignItems:"center",gap:5 }}
              onPress={() => setToggleFindApiKey(true)}
            >
              <Text
                style={{
                  fontSize: scaleFont(13),
                  fontWeight: 400,
                  fontFamily: "Mukta-Bold",
                  borderBottomWidth:1
                }}
              >
               Integrate Your AI account
              </Text>
              <ArrowRight strokeWidth={1.25} />
            </TouchableOpacity>

            {/* Button */}
            <View style={styles.btnsMain}>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  dispatch(setToggleChangeResponseLLMWhileChatPopup(false))
                }
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>
                  {selectedCategory == 1
                    ? "Update Response LLM"
                    : "Compare LLMs"}
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 20,
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
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: scaleFont(12),
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
    fontSize: scaleFont(12),
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
    justifyContent: "flex-end",
    marginTop: 20,
  },
  categorySections: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
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
  currentLLMMain: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#D8DCE4",
    marginBottom: 20,
  },
  currentResponse: {
    fontSize: scaleFont(16),
    fontWeight: "600",
    color: "#1A1A1A",
    fontFamily: "Mukta-Bold",
  },
  badge: {
    backgroundColor: "#F3F3F3",
    borderColor: "#D8DCE4",
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 50,
  },
  btnText: {
    fontSize: scaleFont(12),
    fontWeight: "400",
    color: "#1A1A1A",
    fontFamily: "Mukta-Regular",
  },
});

export default ChangeLLMPopup;
