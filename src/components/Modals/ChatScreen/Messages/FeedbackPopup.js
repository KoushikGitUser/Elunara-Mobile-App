import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { ThumbsDown, ThumbsUp } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setToggleNotHelpfulFeedbackPopup } from "../../../../redux/slices/toggleSlice";
import { commonFunctionForAPICalls } from "../../../../redux/slices/apiCommonSlice";
import { triggerToast } from "../../../../services/toast";

const FeedbackPopup = ({ close }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const RadioButton = ({ selected }) => (
    <View style={[styles.radioOuter, { borderColor: selected ? "black" : "" }]}>
      {selected && <View style={styles.radioInner} />}
    </View>
  );

  const handleHelpfulPress = async () => {
    if (isSubmitting) return;

    setSelectedStyle(0);
    setIsSubmitting(true);

    try {
      // Submit helpful feedback to API and wait for response
      await dispatch(
        commonFunctionForAPICalls({
          method: "POST",
          url: "/settings/help-center/feedback",
          data: {
            type: "general",
            message: "The response is really helpful to me and I would recommend to all",
          },
          name: "submitHelpCenterFeedback",
        })
      ).unwrap();

      close(false);
      triggerToast(
        "Thank You!",
        "Your feedback has been submitted",
        "success",
        3000
      );
    } catch (error) {
      console.error("Feedback submission error:", error);
      triggerToast(
        "Error",
        "Failed to submit feedback. Please try again.",
        "error",
        3000
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => close(false)}
        style={styles.optionsPopupWrapper}
      ></TouchableOpacity>
      <View style={styles.notesPopup}>
        <View 
          style={[
            styles.notesPopupOptions,
            { borderBottomWidth: 1, borderColor: "#D3DAE5" },
          ]}
        >
          <Text style={{ fontWeight: 600,color:"#3A3A3A",fontFamily:"Mukta-Bold" }}>This response is</Text>
        </View>
        <Pressable
          onPress={handleHelpfulPress}
          disabled={isSubmitting}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#EEF4FF" : "transparent",
              opacity: isSubmitting ? 0.6 : 1,
            },
            styles.notesPopupOptions,
          ]}
        >
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <ThumbsUp strokeWidth={1.25} />
            <Text style={{fontFamily:"Mukta-Regular",fontSize:17}}>Helpful</Text>
          </View>
          {isSubmitting && selectedStyle === 0 ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <RadioButton selected={selectedStyle === 0} />
          )}
        </Pressable>
        <Pressable
          onPress={() => {
            setSelectedStyle(1);
            setTimeout(() => {
              close(false);
              dispatch(setToggleNotHelpfulFeedbackPopup(true))
            }, 300);
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#EEF4FF" : "transparent",
            },
            styles.notesPopupOptions,
          ]}
        >
          <View style={{ flexDirection: "row", gap: 10 }}>
            <ThumbsDown strokeWidth={1.25} />
            <Text style={{fontFamily:"Mukta-Regular",fontSize:17}}>Not Helpful</Text>
          </View>
          <RadioButton selected={selectedStyle === 1} />
        </Pressable>
      </View>
    </>
  );
};

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  notesPopup: {
    position: "absolute",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#D3DAE5",
    borderRadius: 21,
    padding: 7,
    width: "auto",
    bottom: 33,
    left: 85,
    zIndex: 999,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 5,
  },
  notesPopupOptions: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 30,
    alignItems: "center",
    width: "100%",
    height: 45,
    padding: 9,
    borderRadius: 12,
    paddingRight: 10,
  },
  optionsPopupWrapper: {
    position: "absolute",
    bottom: 0,
    left: -20,
    width,
    height,
    zIndex: 99,
    backgroundColor: "transparent",
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#D3DAE5",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    marginLeft:"auto"
  },
  radioInner: {
    width: "80%",
    height: "80%",
    borderRadius: 50,
    backgroundColor: "#000000ff",
  },
});

export default FeedbackPopup;
