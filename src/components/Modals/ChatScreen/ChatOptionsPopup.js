import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import React, { useMemo } from "react";
import { createStyles } from "./chatModals.styles";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { menuOptions } from "../../../data/datas";
import { moderateScale } from "../../../utils/responsive";
import { setToggleChatMenuPopup } from "../../../redux/slices/toggleSlice";

const ChatOptionsPopup = () => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { width, height } = Dimensions.get("window");

  return (
    <View
      style={{
        backgroundColor: "transparent",
        position: "absolute",
        width,
        height,
        top: 0,
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
              }}
              key={optionIndex}
            >
              {options.icon}
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
