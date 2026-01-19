import {
  View,
  Text,
  StatusBar,
  Dimensions,
  ScrollView,
  FlatList,
  Animated,
} from "react-native";
import React, { useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AllChatsHeader from "../../components/AllChatsPage/AllChatsHeader";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { createStyles } from "./AllChatsPageStyles.style";
import SearchAndIcons from "../../components/AllChatsPage/SearchAndIcons";
import { allChatsData } from "../../data/datas";
import ChatsComponent from "../../components/AllChatsPage/ChatsComponent";
import OptionsPopup from "../../components/AllChatsPage/OptionsPopup";
import ChatHistorySidebar from "../../components/ChatScreen/ChatHistorySidebar/ChatHistorySidebar";

const AllChatsPage = () => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const { toggleStates } = useSelector((state) => state.Toggle);
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const translateX = React.useRef(new Animated.Value(0)).current;

  const [isSearching, setIsSearching] = useState(false);
  const [popupPosition, setPopupPosition] = useState(null);

  const handleChatPress = (item) => {
    console.log("Chat pressed:", item.title);
  };

  const handleMenuPress = (item) => {
    console.log("Menu pressed for:", item.title);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FAFAFA",
        marginTop: -StatusBar.currentHeight,
      }}
    >
      <ChatHistorySidebar translateX={translateX} />
      <StatusBar
        backgroundColor="#000000ff"
        barStyle="dark-content"
        hidden={false}
        translucent={false}
        animated
      />
      <Animated.View style={{ flex: 1, transform: [{ translateX }] }}>
        <View
          style={{
            height: StatusBar.currentHeight,
            width: "100%",
            backgroundColor: "#FAFAFA",
            zIndex: 9999,
          }}
        ></View>
        <AllChatsHeader
          translateX={translateX}
          isSearching={isSearching}
          setIsSearching={setIsSearching}
        />
        <SearchAndIcons
          isSearching={isSearching}
          setIsSearching={setIsSearching}
        />
        <ScrollView
          contentContainerStyle={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
          style={styles.allChatsScrollMain}
        >
          {allChatsData.map((chat, chatsIndex) => {
            return (
              <ChatsComponent
              key={chatsIndex}
              index={chat.id}
              title={chat.title}
              subject={chat.subject}
              roomName={chat.roomName}
            />
            );
          })}
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

export default AllChatsPage;
