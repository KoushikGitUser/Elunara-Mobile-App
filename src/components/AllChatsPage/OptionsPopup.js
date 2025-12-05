import {
  View,
  Text,
  TouchableWithoutFeedback,
  Pressable,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
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
        onPress={() => setSharePopup(false)}
        style={styles.optionsPopupWrapper}
      ></TouchableOpacity>
      <View style={styles.notesPopup}>
        {allChatsOptionsPopupData?.map((options,optionIndex)=>{
          return(
        <Pressable
        key={optionIndex}
          onPress={() => {
            setSharePopup(false);
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#EEF4FF" : "transparent",
            },
            styles.notesPopupOptions,
          ]}
        >
          {options?.icon}
          <Text style={{fontFamily:"Mukta-Regular",fontSize:17}}>{options.title} </Text>
        </Pressable>
          )
        })}
      </View>
    </>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  notesPopup: {
    position: "absolute",
    backgroundColor: "#ffffffff",
    borderWidth: 1,
    borderColor: "#D3DAE5",
    borderRadius: 21,
    padding: 7,
    width: "auto",
    top: 33,
    left: 27,
    zIndex: 999,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 5,
  },
  notesPopupOptions: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 10,
    alignItems: "center",
    width: "100%",
    height: 45,
    padding: 9,
    borderRadius: 12,
    paddingRight: 40,
  },
  optionsPopupWrapper: {
    position: "absolute",
    bottom: 0,
    left: -20,
    width,
    height,
    zIndex: 99,
    backgroundColor: "transparent",
  },
});

export default OptionsPopup;
