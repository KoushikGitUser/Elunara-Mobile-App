import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { moderateScale, scaleFont } from "../../../../../utils/responsive";
import { ArrowLeft } from "lucide-react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import {
    setToggleToolsPopup,
  setToggleToolsPopupStates,
  setToggleTopicsPopup,
} from "../../../../../redux/slices/toggleSlice";
import { citationStyles } from "../../../../../data/datas";
import PenNib from '../../../../../assets/images/penNib2.svg'

const CitationState = () => {
  const dispatch = useDispatch();
  const [selectedStyle, setSelectedStyle] = useState(0);

  const RadioButton = ({ selected }) => (
    <View style={[styles.radioOuter, { borderColor: selected ? "black" : "" }]}>
      {selected && <View style={styles.radioInner} />}
    </View>
  );

  return (
    <View style={styles.modalSheet}>
      {/* Content */}
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
        <Text style={styles.title}>Citation Format</Text>

        {/* Description */}
        <Text style={styles.description}>
          Select your preferred popular citation style — APA or Harvard for your
          submissions.
        </Text>
        <View style={{ flexDirection: "column", gap: 25 }}>
          {citationStyles.map((styleOptions, optionsIndex) => (
            <TouchableOpacity
              key={optionsIndex} 
              style={[
                styles.card,
                {
                  backgroundColor:
                    selectedStyle == styleOptions.id ? "#EEF4FF" : "white",
                  borderColor:
                    selectedStyle == styleOptions.id ? "black" : "#D3DAE5",
                },
              ]}
              onPress={() => setSelectedStyle(styleOptions.id)}
              activeOpacity={0.7}
            >
              <View style={styles.contentMain}>
                <View style={styles.iconContainer}>
                  {styleOptions.icon}
                </View>
                <View style={styles.textContainer}>
                  <Text
                    style={[
                      styles.optionTitle,
                      { fontSize: scaleFont(16), fontWeight: 600 },
                    ]}
                  >
                    {styleOptions.style}
                  </Text>
                  <Text
                    style={[
                      styles.optionDescription,
                      {
                        fontSize: scaleFont(12),
                        fontWeight: 400,
                        color: "#8F8F8F",
                      },
                    ]}
                  >
                    {styleOptions.description}
                  </Text>
                </View>
              </View>
              <RadioButton selected={selectedStyle === styleOptions.id} />
            </TouchableOpacity>
          ))}
        </View>
        <Text style={{ fontSize: moderateScale(11), fontWeight: 400,color:"#3A3A3A",textAlign:"center",marginTop:40,marginBottom:20 }}>
          <Text style={{ fontSize: moderateScale(11), fontWeight: 600,color:"black" }}>
            Note:
          </Text>{" "}
          Note: Citations appear only in academic chats. Creative or general chats may not include resources.
        </Text>
      </View>
    </View>
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
});

export default CitationState;
