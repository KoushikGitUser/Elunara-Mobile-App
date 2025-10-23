import { View, Text, ScrollView } from "react-native";
import React, { useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "../ChatScreenCompo.styles";
import ChatTopicsMain from "./ChatTopicsMain";
import GreetingsHeader from "./GreetingsHeader";
import { useDispatch, useSelector } from "react-redux";
import { chatMessages } from "../../../data/datas";
import UserMessageBox from "../Messages/UserMessageBox";
import AIMessageBox from "../Messages/AIMessageBox";

const ChatMiddleWrapper = () => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { toggleStates } = useSelector((state) => state.Toggle);

  return (
    <View style={styles.chatMiddleSectionWrapper}>
      {!toggleStates.toggleIsChattingWithAI && <GreetingsHeader />}
      {toggleStates.toggleIsChattingWithAI ? 
      <ScrollView contentContainerStyle={{
        justifyContent:"flex-end",
        gap:25,
        alignItems:"center",
      }} style={styles.messagesContainer}>
        {chatMessages.map((chats,chatsIndex)=>{
          if(chats.role == "user"){
            return(
              <UserMessageBox message={chats.message} key={chatsIndex} />
            )
          }
          else{
            return(
              <AIMessageBox message={chats.message} key={chatsIndex} />
            )
          }
        })}
      </ScrollView> : <ChatTopicsMain />}
    </View>
  );
};

export default ChatMiddleWrapper;
