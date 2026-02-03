import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  Dimensions,
  StyleSheet,
  ScrollView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import DetailedIcon from "../../../../../../assets/SvgIconsComponent/ResponseStyleIcons/DetailedIcon";
import { scaleFont } from "../../../../../utils/responsive";
import ConciseIcon from "../../../../../../assets/SvgIconsComponent/ResponseStyleIcons/ConciseIcon";
import CreativeIcon from "../../../../../../assets/SvgIconsComponent/ResponseStyleIcons/CreativeIcon";
import ChakraIcon from "../../../../../../assets/SvgIconsComponent/ResponseStyleIcons/ChakraIcon";
import FormalIcon from "../../../../../../assets/SvgIconsComponent/ResponseStyleIcons/FormalIcon";
import ConversationalIcon from "../../../../../../assets/SvgIconsComponent/ResponseStyleIcons/ConversationalIcon";
const { width, height } = Dimensions.get("window");

// Helper function to get response style icon based on name
const getResponseStyleIcon = (name) => {
  const key = name?.toLowerCase();
  if (key?.includes("auto") || key?.includes("chakra")) {
    return <ChakraIcon />;
  } else if (key?.includes("concise")) {
    return <ConciseIcon />;
  } else if (key?.includes("formal")) {
    return <FormalIcon />;
  } else if (key?.includes("conversational")) {
    return <ConversationalIcon />;
  } else if (key?.includes("detailed")) {
    return <DetailedIcon />;
  } else if (key?.includes("creative")) {
    return <CreativeIcon />;
  }
  return <ChakraIcon />; // Default
};

const OtherStylesPopup = ({
  setIsExpandedFirst,
  setIsExpandedSecond,
  isFirst,
  currentStyleName,
  otherSelectedStyleName,
  allAvailableStyles,
  onStyleSelect,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { settingsStates } = useSelector((state) => state.API);

  // Get all available styles from API
  const availableStyles = allAvailableStyles || settingsStates?.settingsMasterDatas?.allResponseStylesAvailable || [];

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setIsExpandedFirst(false);
          setIsExpandedSecond(false);
        }}
        style={[styles.optionsPopupWrapper, { top: isFirst ? -250 : "", bottom: isFirst ? "" : -350 }]}
      ></TouchableOpacity>
      <View style={styles.notesPopup}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ maxHeight: 250 }}
        >
          {availableStyles
            ?.filter(style => !style.name?.toLowerCase()?.includes("auto"))
            ?.map((style, index) => {
              const isCurrentStyle = style.name === currentStyleName;
              const isOtherSelected = style.name === otherSelectedStyleName;
              const isDisabled = isCurrentStyle || isOtherSelected;
              const icon = getResponseStyleIcon(style.name);

              return (
                <Pressable
                  key={style.id || index}
                  onPress={() => {
                    if (!isDisabled && onStyleSelect) {
                      onStyleSelect(style);
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
                    {icon}
                    <Text style={[styles.styleNameText, { fontFamily: "Mukta-Regular" }]}>
                      {style.name}
                    </Text>
                  </View>
                  {isCurrentStyle && (
                    <TouchableOpacity style={styles.badge} disabled>
                      <Text style={styles.btnText}>Current</Text>
                    </TouchableOpacity>
                  )}
                  {isOtherSelected && !isCurrentStyle && (
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
  styleNameText: {
    fontSize: scaleFont(14),
    color: "#1A1A1A",
  },
});

export default OtherStylesPopup;
