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
import { useDispatch, useSelector } from "react-redux";
import {
  setToggleToolsPopup,
  setToggleToolsPopupStates,
  setToggleTopicsPopup,
} from "../../../../../redux/slices/toggleSlice";
import { setTempRoomProperty } from "../../../../../redux/slices/apiCommonSlice";
import { citationStyles } from "../../../../../data/datas";
import PenNib from "../../../../../assets/images/penNib2.svg";

const CitationState = () => {
  const dispatch = useDispatch();
  const { roomsStates } = useSelector((state) => state.API);

  const initialSelection =
    roomsStates.tempRoomSettings?.citation_format_id !== null &&
    roomsStates.tempRoomSettings?.citation_format_id !== undefined
      ? roomsStates.tempRoomSettings.citation_format_id - 1
      : 0;

  const [selectedStyle, setSelectedStyle] = useState(initialSelection);

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
        <Text style={[styles.title, { fontFamily: "Mukta-Bold" }]}>
          Citation Format
        </Text>

        {/* Description */}
        <Text style={[styles.description, { fontFamily: "Mukta-Regular" }]}>
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
              onPress={() => {
                setSelectedStyle(styleOptions.id);
                dispatch(
                  setTempRoomProperty({
                    key: "citation_format_id",
                    value: styleOptions.id + 1, // Map 0 -> 1, 1 -> 2
                  })
                );
              }}
              activeOpacity={0.7}
            >
              <View style={styles.contentMain}>
                <View style={styles.iconContainer}>{styleOptions.icon}</View>
                <View style={styles.textContainer}>
                  <Text
                    style={[
                      styles.optionTitle,
                      {
                        fontSize: scaleFont(18),
                        fontWeight: 600,
                        fontFamily: "Mukta-Bold",
                      },
                    ]}
                  >
                    {styleOptions.style}
                  </Text>
                  <Text
                    style={[
                      styles.optionDescription,
                      {
                        fontSize: scaleFont(14),
                        fontWeight: 400,
                        color: "#8F8F8F",
                        fontFamily: "Mukta-Regular",
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
        <Text
          style={{
            fontSize: moderateScale(12),
            fontWeight: 400,
            color: "#3A3A3A",
            textAlign: "center",
            marginTop: 40,
            marginBottom: 20,
            fontFamily: "Mukta-Regular",
          }}
        >
          <Text
            style={{
              fontSize: moderateScale(12),
              fontWeight: 600,
              color: "black",
              fontFamily: "Mukta-Bold",
            }}
          >
            Note:
          </Text>{" "}
          Citations appear only in academic chats. Creative or general chats may
          not include resources.
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
    fontSize: scaleFont(26),
    color: "#1F2937",
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: scaleFont(13),
    lineHeight: 24,
    color: "#6B7280",
    marginBottom: 32,
    letterSpacing: 0.2,
  },
});

export default CitationState;
