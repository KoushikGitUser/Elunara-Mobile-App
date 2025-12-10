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
import DeleteConfirmPopup from "../../components/ChatScreen/ChatMiddleSection/ChatConversationActions/DeleteConfirmPopup";

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
    <SafeAreaView style={[styles.mainWrapper,{marginTop: -StatusBar.currentHeight }]}>
      <StatusBar
        backgroundColor="#000000ff"
        barStyle="dark-content"
        hidden={false}
        translucent={false}
        animated
      />
       {toggleStates.toggleDeleteChatConfirmPopup && <DeleteConfirmPopup from="rooms" />}
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
        <View
          style={{
            height: StatusBar.currentHeight,
            width: "100%",
            backgroundColor: "#FAFAFA",
            zIndex: 9999,
          }}
        ></View>
        <RoomsHeader translateX={translateX} />
        <RoomsMiddle roomName={roomName} />
        <View style={{ width: "100%", paddingHorizontal: 20 }}>
          <ChatInputMain />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default Rooms;
