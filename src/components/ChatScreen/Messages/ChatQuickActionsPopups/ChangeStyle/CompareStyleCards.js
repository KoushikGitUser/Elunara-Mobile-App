import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { scaleFont } from "../../../../../utils/responsive";
import { Check } from "lucide-react-native";
import { triggerToast } from "../../../../../services/toast";
import { setCompareResponseStyleItemsArray } from "../../../../../redux/slices/globalDataSlice";
const screenHeight = Dimensions.get("window").height;

const CompareStyleCards = ({
  item,
  selectedStyleForCompare,
  setSelectedStyleForCompare,
}) => {
  const dispatch = useDispatch();
  const { globalDataStates } = useSelector((state) => state.Global);

  const RadioButton = () => (
    <View
      style={[
        styles.radioOuter,
        {
          borderColor: selectedStyleForCompare?.includes(item?.id)
            ? "black"
            : "",
          backgroundColor: selectedStyleForCompare?.includes(item?.id)
            ? "black"
            : "transparent",
        },
      ]}
    >
      {selectedStyleForCompare?.includes(item?.id) && (
        <Check color="white" size={20} strokeWidth={1.5} />
      )}
    </View>
  );

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: selectedStyleForCompare?.includes(item?.id)
            ? "#EEF4FF"
            : "white",
          borderColor: selectedStyleForCompare?.includes(item?.id)
            ? "black"
            : "#D3DAE5",
        },
      ]}
      onPress={() => {
        if (selectedStyleForCompare?.length == 2) {
          if (selectedStyleForCompare?.includes(item?.id)) {
            const newArr = selectedStyleForCompare.filter((items) => {
              return items !== item.id;
            });
            setSelectedStyleForCompare(newArr);
          } else {
            triggerToast(
              "Error",
              "Only two items can be selected, to select another please deselect one of the selected items",
              "error",
              5000
            );
          }
        } else {
          if (selectedStyleForCompare?.includes(item?.id)) {
            const newArr = selectedStyleForCompare.filter((items) => {
              return items !== item.id;
            });
            setSelectedStyleForCompare(newArr);
          } else {
            setSelectedStyleForCompare([...selectedStyleForCompare, item.id]);
            dispatch(setCompareResponseStyleItemsArray([...globalDataStates.compareResponseStyleItemsArray,{
                title:item?.title
            }]))
          }
        }
      }}
      activeOpacity={0.7}
    >
      <View style={styles.contentMain}>
        <View style={styles.iconContainer}>{item.icon}</View>

        <View style={styles.textContainer}>
          <Text
            style={[
              styles.optionTitle,
              {
                fontSize: scaleFont(18),
                fontWeight: 600,
                fontFamily: "Mukta-Bold",
                lineHeight: 27,
              },
            ]}
          >
            {item.title}
          </Text>
          <Text
            style={[
              styles.optionDescription,
              {
                fontSize: scaleFont(14),
                fontWeight: 400,
                color: "#8F8F8F",
                fontFamily: "Mukta-Regular",
                lineHeight: 18,
              },
            ]}
          >
            {item.description}
          </Text>
        </View>
      </View>

      <RadioButton />
    </TouchableOpacity>
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
  card: {
    borderWidth: 1,
    borderColor: "#D3DAE5",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 13,
    paddingVertical: 13,
    borderRadius: 18,
    backgroundColor: "white",
    marginBottom: 20,
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
  radioOuter: {
    width: 23,
    height: 23,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#D3DAE5",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
});

export default CompareStyleCards;
