import {
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useMemo } from "react";
import { createStyles } from "./chatModals.styles";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setToggleAddItemsToInputPopup } from "../../../redux/slices/toggleSlice";
import { addItemsOptions } from "../../../data/datas";
import { Camera, File, Image } from "lucide-react-native";

const AddItemsToInputPopup = () => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { width, height } = Dimensions.get("window");

  return (
    <>
      <TouchableOpacity
        onPress={() => dispatch(setToggleAddItemsToInputPopup(false))}
        style={styles.fullScreenWrapper}
      ></TouchableOpacity>
      <View style={styles.addItemsMain}>
        {addItemsOptions.map((items, itemIndex) => {
          return (
            <Pressable
              onPress={() => {}}
              key={itemIndex}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "#EEF4FF" : "transparent",
                },
                styles.menuOptionsMain,
              ]}
            >
              {items.text == "Camera" ? (
                <Camera size={22} strokeWidth={1.25} />
              ) : items.text == "Files" ? (
                <File strokeWidth={1.25} size={22} />
              ) : (
                <Image size={22} strokeWidth={1.25} />
              )}
              <Text>{items?.text}</Text>
            </Pressable>
          );
        })}
      </View>
    </>
  );
};

export default AddItemsToInputPopup;
