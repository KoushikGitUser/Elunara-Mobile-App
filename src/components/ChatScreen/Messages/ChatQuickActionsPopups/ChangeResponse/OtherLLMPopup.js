import { View, Text, TouchableOpacity, Pressable, Image, StyleSheet, Dimensions } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import meta from '../../../../../assets/images/meta.png';
import mistral from '../../../../../assets/images/mistral.png';
import OpenAI  from '../../../../../assets/images/chatgpt.png';
import { scaleFont } from "../../../../../utils/responsive";
const { width, height } = Dimensions.get("window");

const OtherLLMPopup = ({isFirst,setIsExpandedFirst,setIsExpandedSecond,}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

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
        <Pressable
          onPress={() => {
           setIsExpandedFirst(false);
            setIsExpandedSecond(false)
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#EEF4FF" : "transparent",
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
            <Image style={{height:25,width:25}} source={meta} />
            <Text>Meta</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={() => {
           setIsExpandedFirst(false);
            setIsExpandedSecond(false)
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#EEF4FF" : "transparent",
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
         <Image style={{height:25,width:25}} source={mistral} />
            <Text>Mistral</Text>
          </View>
          <TouchableOpacity style={styles.badge}>
            <Text style={styles.btnText}>Current LLM</Text>
          </TouchableOpacity>
        </Pressable>
        <Pressable
          onPress={() => {
           setIsExpandedFirst(false);
            setIsExpandedSecond(false)
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#EEF4FF" : "transparent",
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
            <Image style={{height:25,width:25}} source={OpenAI} />
            <Text>OpenAI</Text>
          </View>
        </Pressable>
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
    elevation:15
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
});

export default OtherLLMPopup;
