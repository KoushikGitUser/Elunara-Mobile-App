import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  Pressable,
  Image,
} from "react-native";
import React, { useMemo } from "react";
import { createStyles } from "./chatModals.styles";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { menuOptions } from "../../../data/datas";
import { moderateScale } from "../../../utils/responsive";
import { setToggleChatMenuPopup, setToggleDeleteChatConfirmPopup, setToggleRenameChatPopup } from "../../../redux/slices/toggleSlice";

const ChatOptionsPopup = () => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { width, height } = Dimensions.get("window");

  const commonFunctions = (type) => {
    if (type == "Open Notes") {
    } else if (type == "Add to Learning Lab") {
    } else if (type == "Rename") {
      dispatch(setToggleRenameChatPopup(true));
    } else if (type == "Pin") {
    } else if (type == "Archive") {
    } else if (type == "Delete") {
      dispatch(setToggleDeleteChatConfirmPopup(true));
    }
  };

  return (
    <View
      style={{
        backgroundColor: "transparent",
        position: "absolute",
        width,
        height,
        top: 45,
        left: 0,
        zIndex: 99,
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => dispatch(setToggleChatMenuPopup(false))}
      >
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>
      <View style={styles.menuModalMain}>
        {menuOptions.map((options, optionIndex) => {
          return (
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "#EEF4FF" : "transparent",
                },
                styles.menuOptionsMain,
              ]}
              onPress={(e) => {
                e.stopPropagation();
                commonFunctions(options.option)
              }}
              key={optionIndex}
            >
              <Image
                source={options.icon}
                style={{ height: 25, width: 25, objectFit: "contain" }}
              />
              <Text
                numberOfLines={1}
                style={{ fontSize: moderateScale(12), flexShrink: 1 }}
              >
                {options?.option}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default ChatOptionsPopup;
