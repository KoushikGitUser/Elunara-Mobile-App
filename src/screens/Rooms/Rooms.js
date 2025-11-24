import { View, Text, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { createStyles } from "./Rooms.styles";
import { useNavigation } from "@react-navigation/native";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { setToggleChatHistorySidebar } from "../../redux/slices/toggleSlice";
import { useDispatch, useSelector } from "react-redux";
import { EllipsisVertical, Plus } from "lucide-react-native";
import RoomsHeader from "../../components/Rooms/RoomsHeader";
import ChatInputMain from "../../components/ChatScreen/ChatInputMain";
import RoomsMiddle from "../../components/Rooms/RoomsMiddle";

const Rooms = ({route}) => {
  const {roomName} = route.params
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { toggleChatHistorySidebar } = useSelector((state) => state.Toggle);

  return (
    <SafeAreaView style={styles.mainWrapper}>
        <RoomsHeader/>
        <RoomsMiddle roomName={roomName}/>
        <ChatInputMain/>
    </SafeAreaView>
  );
};

export default Rooms;
