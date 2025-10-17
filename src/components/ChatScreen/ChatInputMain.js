import { View, Text, TextInput } from "react-native";
import React, { useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { Feather,Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LibraryBig, Mic, Paperclip, Send } from "lucide-react-native";
import { createStyles } from "./ChatHistorySidebar/chatSidebarStyles.styles";

const ChatInputMain = () => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();

  return (
    <View style={styles.chatInputMainWrapper}>
      <View style={styles.chatInputMain}>
        <TextInput
          placeholder="Ask anything"
          placeholderTextColor="grey"
          style={styles.textInput}
        />
        <View style={styles.inputActionIconsMainWrapper}>
          <View style={styles.inputLeftActionIcons}>
            <Paperclip size={30} strokeWidth={1.25} />
            <LibraryBig size={30} strokeWidth={1.25} />
            <Ionicons name="options-outline" size={30} color="black" />
          </View>
          <View style={styles.inputRightActionIcons}>
            <Mic size={30} strokeWidth={1.25} />
            <Send size={30} strokeWidth={1.25} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChatInputMain;
