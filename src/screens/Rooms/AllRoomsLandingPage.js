import { View, Text, Animated, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import ChatHistorySidebar from "../../components/ChatScreen/ChatHistorySidebar/ChatHistorySidebar";
import AllRoomsPageHeader from "../../components/Rooms/AllRoomsPageHeader";
import AllRoomsPageSearchIcons from "../../components/Rooms/AllRoomsPageSearchIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { verticalScale } from "../../utils/responsive";
import { allChatsData } from "../../data/datas";
import ChatsScrollForAllRoomsPage from "../../components/Rooms/ChatsScrollForAllRoomsPage";

const AllRoomsLandingPage = () => {
  const translateX = React.useRef(new Animated.Value(0)).current;
  const [isSearching, setIsSearching] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
      <ChatHistorySidebar translateX={translateX} />
      <Animated.View style={{ flex: 1, transform: [{ translateX }] }}>
        <AllRoomsPageHeader
          translateX={translateX}
          isSearching={isSearching}
          setIsSearching={setIsSearching}
        />
        <AllRoomsPageSearchIcons />
        <ScrollView
          contentContainerStyle={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
          style={styles.allChatsScrollMain}
        >
          {allChatsData.map((chat, chatsIndex) => {
            return (
              <ChatsScrollForAllRoomsPage
                key={chatsIndex}
                index={chat.id}
                title={chat.title}
                subject={chat.subject}
              />
            );
          })}
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  allChatsScrollMain: {
    width: "100%",
    marginTop: 30,
    paddingHorizontal: 20,
  },
});

export default AllRoomsLandingPage;
