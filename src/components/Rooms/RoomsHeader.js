import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import React, { useMemo } from "react";
import { createStyles } from "../../screens/Rooms/Rooms.styles";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setToggleChatHistorySidebar } from "../../redux/slices/toggleSlice";
import { Feather } from "@expo/vector-icons";
import { EllipsisVertical, Plus } from "lucide-react-native";

const RoomsHeader = ({ translateX }) => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { toggleStates } = useSelector((state) => state.Toggle);
  const SCREEN_WIDTH = Dimensions.get("window").width;

  return (
    <View style={styles.roomsHeader}>
      <TouchableOpacity
        onPress={() => {
          Animated.timing(translateX, {
            toValue: toggleStates.toggleChatHistorySidebar
              ? 0
              : SCREEN_WIDTH * 0.75,
            duration: 300,
            useNativeDriver: true,
          }).start();
          dispatch(
            setToggleChatHistorySidebar(!toggleStates.toggleChatHistorySidebar)
          );
        }}
      >
        <Feather name="menu" size={30} color="black" />
      </TouchableOpacity>
      <View style={styles.rightHeaderIcons}>
        <TouchableOpacity>
          <Plus size={35} strokeWidth={1.5} />
        </TouchableOpacity>
        <TouchableOpacity>
          <EllipsisVertical strokeWidth={2} size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RoomsHeader;
