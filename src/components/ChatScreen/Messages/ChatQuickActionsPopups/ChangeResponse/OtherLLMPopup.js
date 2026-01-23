import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { scaleFont } from "../../../../../utils/responsive";
import gemini from "../../../../../assets/images/gemini.png";
import anthropic from "../../../../../assets/images/antropic.png";
import mistral from "../../../../../assets/images/mistral.png";
import chatgpt from "../../../../../assets/images/chatgpt.png";

const { width, height } = Dimensions.get("window");

// Helper function to map provider names to icons
const providerImages = {
  google: gemini,
  anthropic: anthropic,
  "mistral ai": mistral,
  "open ai": chatgpt,
  openai: chatgpt,
};

const getProviderImage = (provider) => {
  const key = provider?.toLowerCase();
  return providerImages[key] || anthropic;
};

const OtherLLMPopup = ({
  isFirst,
  setIsExpandedFirst,
  setIsExpandedSecond,
  currentLLMName,
  otherSelectedLLMName,
  allAvailableLLMs,
  onLLMSelect,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { settingsStates } = useSelector((state) => state.API);

  // Get all available LLMs from API (exclude Auto option)
  const availableLLMs = allAvailableLLMs || settingsStates?.settingsMasterDatas?.allLLMsAvailable || [];

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setIsExpandedFirst(false);
          setIsExpandedSecond(false);
        }}
        style={[
          styles.optionsPopupWrapper,
          { top: isFirst ? -250 : "", bottom: isFirst ? "" : -350 },
        ]}
      ></TouchableOpacity>
      <View style={styles.notesPopup}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ maxHeight: 250 }}
        >
          {availableLLMs?.map((llm, index) => {
            const isCurrentLLM = llm.name === currentLLMName;
            const isOtherSelected = llm.name === otherSelectedLLMName;
            const isDisabled = isCurrentLLM || isOtherSelected;
            const icon = getProviderImage(llm.provider);

            return (
              <Pressable
                key={llm.id || index}
                onPress={() => {
                  if (!isDisabled && onLLMSelect) {
                    onLLMSelect(llm);
                  }
                  setIsExpandedFirst(false);
                  setIsExpandedSecond(false);
                }}
                disabled={isDisabled}
                style={({ pressed }) => [
                  {
                    backgroundColor: isDisabled
                      ? "#F9FAFB"
                      : pressed
                      ? "#EEF4FF"
                      : "transparent",
                    opacity: isDisabled ? 0.6 : 1,
                  },
                  styles.notesPopupOptions,
                ]}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Image style={{ height: 25, width: 25 }} source={icon} />
                  <Text style={[styles.llmNameText, { fontFamily: "Mukta-Regular" }]}>
                    {llm.name}
                  </Text>
                </View>
                {isCurrentLLM && (
                  <TouchableOpacity style={styles.badge} disabled>
                    <Text style={styles.btnText}>Current</Text>
                  </TouchableOpacity>
                )}
                {isOtherSelected && !isCurrentLLM && (
                  <TouchableOpacity style={styles.badge} disabled>
                    <Text style={styles.btnText}>In Use</Text>
                  </TouchableOpacity>
                )}
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  notesPopup: {
    position: "absolute",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#D3DAE5",
    borderRadius: 21,
    padding: 7,
    width: "auto",
    top: 40,
    right: 0,
    zIndex: 999,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 9,
    elevation: 15,
  },
  notesPopupOptions: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 40,
    alignItems: "center",
    width: "100%",
    padding: 9,
    borderRadius: 12,
    paddingRight: 10,
  },
  optionsPopupWrapper: {
    position: "absolute",
    top: 0,
    left: -20,
    width,
    height,
    zIndex: 99,
    backgroundColor: "transparent",
  },
  badge: {
    backgroundColor: "#F3F3F3",
    borderColor: "#D8DCE4",
    borderWidth: 1,
    paddingVertical: 4,
    paddingHorizontal: 15,
    borderRadius: 50,
  },
  btnText: {
    fontSize: scaleFont(12),
    color: "#1A1A1A",
    fontFamily: "Mukta-Regular",
  },
  llmNameText: {
    fontSize: scaleFont(14),
    color: "#1A1A1A",
  },
});

export default OtherLLMPopup;
