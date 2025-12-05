import { View, Text, Pressable, Dimensions, TouchableOpacity } from "react-native";
import React, { useMemo, useState } from "react";
import { createStyles } from "../../screens/AllChatsPage/AllChatsPageStyles.style";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { MessageCircle, MoreVertical } from "lucide-react-native";
import OptionsPopup from "./OptionsPopup";
import { setToggleAllChatsOptionsPopup } from "../../redux/slices/toggleSlice";

const ChatsComponent = ({ title, subject, roomName, onPress, index }) => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const { toggleStates } = useSelector((state) => state.Toggle);
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const dispatch = useDispatch();
  const [optionsIndex,setOptionsIndex] = useState(null)

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={onPress} 
    >
      <View style={[styles.cardContent,]}>
         {(toggleStates.toggleAllChatsOptionsPopup && optionsIndex == index) && <OptionsPopup/>}
        {/* Chat Icon */}
        <View style={styles.iconContainer}>
          <MessageCircle size={25} color="#9CA3AF" strokeWidth={1.5} />
        </View>

        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitleText}>{subject}</Text>
            {roomName && (
              <>
                <Text style={styles.dotSeparator}>•</Text>
                <Text style={[styles.subtitleText,{fontWeight:500}]}>{roomName}</Text>
              </>
            )}
          </View>
        </View>

        {/* Menu Icon */}
        <Pressable
          style={({ pressed }) => [
            styles.menuButton,
            pressed && styles.menuPressed,
          ]}
          onPress={() => {dispatch(setToggleAllChatsOptionsPopup(true));
             setOptionsIndex(index);
          }}
        >
          <MoreVertical size={24} color="#000000ff" strokeWidth={2} />
        </Pressable>
      </View>
    </TouchableOpacity>
  );
};

export default ChatsComponent;
