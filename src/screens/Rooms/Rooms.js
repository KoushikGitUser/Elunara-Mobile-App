import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StatusBar,
} from "react-native";
import React, { useEffect, useMemo } from "react";
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
import AddChatToRoomPopup from "../../components/Rooms/AddChatToRoomPopup";
import { useFonts } from "expo-font";

const Rooms = ({ route }) => {
  const { roomName } = route.params;
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { toggleStates } = useSelector((state) => state.Toggle);
  const translateX = React.useRef(new Animated.Value(0)).current;
    const [fontsLoaded] = useFonts({
      "Mukta-Bold": require("../../../assets/fonts/Mukta-Bold.ttf"),
      "Mukta-Regular": require("../../../assets/fonts/Mukta-Regular.ttf"),
    });
  
    useEffect(() => {
      if (fontsLoaded) {
      }
    }, [fontsLoaded]);
  
    // Show nothing (or a loader) while fonts are loading
    if (!fontsLoaded) {
      return null;
    }


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
          {toggleStates.toggleAddExistingChatToRoomPopup && <AddChatToRoomPopup />}

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
