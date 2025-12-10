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
import {
  setToggleAddChatToLearningLabPopup,
  setToggleChatMenuPopup,
  setToggleDeleteChatConfirmPopup,
  setToggleRenameChatPopup,
  setToggleUnlockArchiveLimitPopup,
} from "../../../redux/slices/toggleSlice";
import { triggerToast } from "../../../services/toast";

const ChatOptionsPopup = () => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { width, height } = Dimensions.get("window");

  const commonFunctions = (type) => {
    if (type == "Open Notes") {
       dispatch(setToggleChatMenuPopup(false))
      navigation.navigate("notes");
    } else if (type == "Add to Learning Lab") {
       dispatch(setToggleChatMenuPopup(false))
      dispatch(setToggleAddChatToLearningLabPopup(true));
    } else if (type == "Rename") {
       dispatch(setToggleChatMenuPopup(false))
      dispatch(setToggleRenameChatPopup(true));
    } else if (type == "Pin") {
       dispatch(setToggleChatMenuPopup(false))
      setTimeout(() => {
        triggerToast(
          "Chat Pinned",
          "Your chat has been successfully pinned",
          "success",
          3000
        );
      }, 200);
    } else if (type == "Archive") {
       dispatch(setToggleChatMenuPopup(false))
      dispatch(setToggleUnlockArchiveLimitPopup(true));
    } else if (type == "Delete") {
       dispatch(setToggleChatMenuPopup(false))
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
        top: -5,
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
                commonFunctions(options.option);
              }}
              key={optionIndex}
            >
              {options.icon}
              <Text
                numberOfLines={1}
                style={{
                  fontSize: moderateScale(16),
                  flexShrink: 1,
                  fontFamily: "Mukta-Regular",
                }}
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
