import { View, Text, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import { createStyles } from "../../screens/Rooms/Rooms.styles";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setToggleChatHistorySidebar } from "../../redux/slices/toggleSlice";
import { Feather } from "@expo/vector-icons";
import { EllipsisVertical, Plus } from "lucide-react-native";

const RoomsHeader = () => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { toggleChatHistorySidebar } = useSelector((state) => state.Toggle);

  return (
    <View style={styles.roomsHeader}>
      <TouchableOpacity
        onPress={() =>
          dispatch(setToggleChatHistorySidebar(!toggleChatHistorySidebar))
        }
      >
        <Feather name="menu" size={30} color="black" />
      </TouchableOpacity>
      <View style={styles.rightHeaderIcons}>
        <TouchableOpacity
          onPress={() =>
            dispatch(setToggleChatHistorySidebar(!toggleChatHistorySidebar))
          }
        >
          <Plus size={35} strokeWidth={1.5} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            dispatch(setToggleChatHistorySidebar(!toggleChatHistorySidebar))
          }
        >
          <EllipsisVertical strokeWidth={2} size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RoomsHeader;
