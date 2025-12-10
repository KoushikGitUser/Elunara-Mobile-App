import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  Keyboard,
} from "react-native";
import React, { useMemo, useState, useEffect } from "react";
import { createStyles } from "../../screens/Rooms/Rooms.styles";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setToggleChatHistorySidebar } from "../../redux/slices/toggleSlice";
import { Feather } from "@expo/vector-icons";
import { EllipsisVertical, Plus } from "lucide-react-native";
import PlusButtonPopup from "../Modals/Rooms/PlusButtonPopup";
import RoomsOptionsPopup from "../Modals/Rooms/RoomsOptionsPopup";

const RoomsHeader = ({ translateX }) => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { toggleStates } = useSelector((state) => state.Toggle);
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const [addOptionsPopup,setAddOptionsPopup] = useState(false);
  const [roomOptionsPopup,setRoomOptionsPopup] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={[styles.roomsHeader, isKeyboardVisible && { borderBottomWidth: 1, borderBottomColor: '#D3DAE5' }]}>
      {addOptionsPopup && <PlusButtonPopup setAddOptionsPopup={setAddOptionsPopup} />}
      {roomOptionsPopup && <RoomsOptionsPopup setRoomOptionsPopup={setRoomOptionsPopup} />}
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
        <TouchableOpacity onPress={()=>setAddOptionsPopup(true)}>
          <Plus size={35} strokeWidth={1.5} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setRoomOptionsPopup(true)}>
          <EllipsisVertical strokeWidth={2} size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RoomsHeader;
