import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StatusBar,
} from "react-native";
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
import ChatHistorySidebar from "../../components/ChatScreen/ChatHistorySidebar/ChatHistorySidebar";

const Rooms = ({ route }) => {
  const { roomName } = route.params;
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const translateX = React.useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.mainWrapper}>
      <StatusBar
        backgroundColor="#ff0000ff"
        barStyle="dark-content"
        hidden={false}
        translucent={false}
        animated
      />
      <ChatHistorySidebar translateX={translateX} />
      <Animated.View
        style={[
          styles.mainWrapper,
          {
            flex: 1,
            transform: [{ translateX }],
            width: "100%",
            paddingHorizontal: 0,
          },
        ]}
      >
        <RoomsHeader translateX={translateX} />
        <RoomsMiddle roomName={roomName} />
        <ChatInputMain />
      </Animated.View>
    </SafeAreaView>
  );
};

export default Rooms;
