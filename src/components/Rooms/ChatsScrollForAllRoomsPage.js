import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { Check, MessageCircle, MoreVertical } from "lucide-react-native";
import { scaleFont, verticalScale } from "../../utils/responsive";
import RoomsOptionsPopup from "../Modals/Rooms/RoomsOptionsPopup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import FolderIcon from "../../../assets/SvgIconsComponent/ChatHistorySidebarIcons/FolderIcon";
import { setToggleAllChatsOptionsPopup } from "../../redux/slices/toggleSlice";
import { setCurrentRoom } from "../../redux/slices/apiCommonSlice";

const ChatsScrollForAllRoomsPage = ({
  title,
  subject,
  roomName,
  onPress,
  index,
  isSelecting,
  setIsSelecting,
  selectedArray,
  setSelectedArray,
  room,
}) => {
  const navigation = useNavigation();
  const { toggleStates } = useSelector((state) => state.Toggle);
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const dispatch = useDispatch();
  const [optionsIndex, setOptionsIndex] = useState(null);

  const handleRoomPress = () => {
    if (isSelecting) {
      if (!selectedArray.includes(index)) {
        setSelectedArray([...selectedArray, index]);
      } else {
        const newArray = [...selectedArray];
        newArray.splice(selectedArray.indexOf(index), 1);
        setSelectedArray(newArray);
        if (selectedArray.length == 1) {
          setIsSelecting(false);
        }
      }
    } else {
      // Navigate to room when not in selection mode
      if (room) {
        dispatch(setCurrentRoom(room));
      }
      navigation.navigate("rooms", { roomName: title });
    }
  };

  const CheckBox = ({ selected }) => {
    return (
      <View
        style={[
          styles.radioOuter,
          {
            borderColor: selected ? "black" : "",
            backgroundColor: selected ? "black" : "transparent",
          },
        ]}
      >
        {selected && <Check size={19} color="white" strokeWidth={1.75} />}
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={[
        styles.cardContainer,
        {
          backgroundColor: selectedArray.includes(index)
            ? "#EEF4FF"
            : "transparent",
        },
      ]}
      onLongPress={() => {
        setIsSelecting(true);
        setSelectedArray([...selectedArray, index]);
      }}
      onPress={handleRoomPress}
    >
      <View
        style={[
          styles.cardContent,
          { zIndex: optionsIndex == index ? 99999 : 9 },
        ]}
      >
        {toggleStates.toggleAllChatsOptionsPopup && optionsIndex == index && (
          <RoomsOptionsPopup setRoomOptionsPopup={setOptionsIndex} />
        )}

        {isSelecting && <CheckBox selected={selectedArray.includes(index)} />}

        {/* Chat Icon */}
        <View style={styles.iconContainer}>
          <FolderIcon />
        </View>

        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitleText}>{subject}</Text>
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
          <MoreVertical size={24} color="#000000ff" strokeWidth={2} />
        </Pressable>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  allChatsScrollMain: {
    width: "100%",
    marginTop: 30,
    paddingHorizontal: 20,
  },
  cardContainer: {
    paddingVertical: 10,
    zIndex: 5,
    width: "100%",
    marginBottom: 8,
    paddingLeft: 10,
  },
  cardPressed: {
    backgroundColor: "#F9FAFB",
  },
  cardContent: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    position: "relative",
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
    fontFamily: "Mukta-Bold",
  },
  subtitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  subtitleText: {
    fontSize: scaleFont(13),
    color: "#757575",
    fontWeight: "400",
    fontFamily: "Mukta-Regular",
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
  radioOuter: {
    width: 25,
    height: 25,
    borderRadius: 2,
    borderWidth: 2,
    borderColor: "#D3DAE5",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    padding: 5,
    marginRight: 20,
  },
});

export default ChatsScrollForAllRoomsPage;
