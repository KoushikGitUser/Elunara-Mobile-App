import {
  View,
  Text,
  TouchableWithoutFeedback,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useMemo } from "react";
import { createStyles } from "../../screens/AllChatsPage/AllChatsPageStyles.style";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  setToggleAllChatsOptionsPopup,
  setToggleChatMenuPopup,
} from "../../redux/slices/toggleSlice";
import { allChatsOptionsPopupData } from "../../data/datas";
import { moderateScale } from "../../utils/responsive";

const OptionsPopup = () => {
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
    <>
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 0,
          left: -20,
          width,
          height,
          zIndex: 999999,
          backgroundColor: "transparent",
        }}
        onPress={() => dispatch(setToggleAllChatsOptionsPopup(false))}
      ></TouchableOpacity>
      <View style={styles.menuModalMain}>
        {allChatsOptionsPopupData.map((options, optionIndex) => {
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
                style={{ fontSize: moderateScale(13), flexShrink: 1 }}
              >
                {options?.title}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </>
  );
};

export default OptionsPopup;
