import { View, Text, ScrollView, Image, Keyboard } from "react-native";
import React, { useMemo, useRef, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "../ChatScreenCompo.styles";
import ChatTopicsMain from "./ChatTopicsMain";
import GreetingsHeader from "./GreetingsHeader";
import { useDispatch, useSelector } from "react-redux";
import { chatMessages } from "../../../data/datas";
import UserMessageBox from "../Messages/UserMessageBox";
import AIMessageBox from "../Messages/AIMessageBox";
import chakraLogo from "../../../assets/images/Knowledge Chakra 2.png";
import chatLoader from "../../../assets/images/Loading chat mob.gif";

const  ChatMiddleWrapper = () => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { globalDataStates } = useSelector((state) => state.Global);

  // Get editing state
  const isEditingUserMessage = toggleStates.isEditingUserMessage;
  const editingMessageData = globalDataStates.editingMessageData;

  // Ref for ScrollView to enable auto-scroll
  const scrollViewRef = useRef(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollViewRef.current && globalDataStates.chatMessagesArray.length > 0) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [globalDataStates.chatMessagesArray]);

  // Auto-scroll to bottom when keyboard opens
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollToEnd({ animated: true });
        }
      }
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View style={styles.chatMiddleSectionWrapper}>
      {toggleStates.toggleIsChattingWithAI && (
        <Image source={chakraLogo} style={styles.chakraLogoRight} />
      )}
      {!toggleStates.toggleIsChattingWithAI && <GreetingsHeader />}
      {toggleStates.toggleIsChattingWithAI ? (
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: "flex-end",
            gap: 25,
            alignItems: "center",
          }} 
          style={[styles.messagesContainer,]}
        >
          <View style={{height:120}}></View>
          {isEditingUserMessage && editingMessageData ? (
            // Show only the editing message
            <>
              <UserMessageBox
                chat={editingMessageData.chat}
                messageIndex={editingMessageData.messageIndex}
                key="editing-message"
              />
              <View style={{ width: "100%", alignItems: "flex-end" }}>
                <Text style={{
                  fontSize: 13,
                  color: "#6B7280",
                  fontFamily: "Mukta-Regular",
                  textAlign: "right",
                  width: "80%",
                  marginTop: -15,
                  marginBottom: 20,
                }}>
                  Editing this message will restart the conversation from this point.
                </Text>
              </View>
            </>
          ) : (
            // Show all messages normally
            globalDataStates.chatMessagesArray.map((chats, chatsIndex) => {
              if (chats.role == "user") {
                return (
                  <UserMessageBox chat={chats} messageIndex={chatsIndex} key={chatsIndex} />
                );
              } else {
                return (
                  <AIMessageBox
                    message={chats.message}
                    messageUuid={chats.uuid}
                    messageIndex={chatsIndex}
                    isSavedToNotes={chats.is_saved_to_notes}
                    version={chats.version || 1}
                    totalVersions={chats.total_versions || 1}
                    key={chatsIndex}
                  />
                );
              }
            })
          )}
          {toggleStates.toggleIsWaitingForResponse && (
            <View style={styles.chatLoaderMain}>
              <Image
                source={chatLoader} 
                style={{ height: 70, width: 100, objectFit: "contain" }}
              />
            </View>
          )}
          <View style={{height:5}}></View>
        </ScrollView>
      ) : (
        <ChatTopicsMain />
      )}
    </View>
  );
};

export default ChatMiddleWrapper;
