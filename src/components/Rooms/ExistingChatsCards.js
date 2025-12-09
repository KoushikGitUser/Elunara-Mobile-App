import { View, Text, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import React from "react";
import FolderIcon from "../../../assets/SvgIconsComponent/ChatHistorySidebarIcons/FolderIcon";
import { scaleFont } from "../../utils/responsive";
import { CirclePlus } from "lucide-react-native";

const ExistingChatsCards = ({ chatName, projects }) => {
  return (
    <TouchableOpacity style={styles.cardContainer}>
      <View style={[styles.cardContent]}>
        {/* Chat Icon */}
        <View style={styles.iconContainer}>
          <FolderIcon />
        </View>

        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{chatName}</Text>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitleText}>{projects} Projects</Text>
          </View>
        </View>

        {/* Menu Icon */}
        <Pressable
          style={({ pressed }) => [
            styles.menuButton,
            pressed && styles.menuPressed,
          ]}
          onPress={() => {
            dispatch(setToggleAllChatsOptionsPopup(true));
            setOptionsIndex(index);
          }}
        >
          <CirclePlus strokeWidth={2} size={27} />
        </Pressable>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    paddingVertical: 16,
    zIndex: 5,
    width: "100%",
  },
  cardPressed: {
    backgroundColor: "#F9FAFB",
  },
  cardContent: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  iconContainer: {
    alignSelf: "flex-start",
    marginTop: 3,
    marginRight: 18,
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
  },
  titleText: {
    fontSize: scaleFont(15),
    fontWeight: "600",
    color: "#3A3A3A",
    marginBottom: 4,
  },
  subtitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  subtitleText: {
    fontSize: scaleFont(13),
    color: "#757575",
    fontWeight: "400",
  },
  dotSeparator: {
    fontSize: 14,
    color: "#9CA3AF",
    marginHorizontal: 8,
  },
  menuButton: {
    marginLeft: "auto",
  },
  menuPressed: {
    opacity: 0.5,
  },
  separator: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginHorizontal: 16,
  },
});

export default ExistingChatsCards;
