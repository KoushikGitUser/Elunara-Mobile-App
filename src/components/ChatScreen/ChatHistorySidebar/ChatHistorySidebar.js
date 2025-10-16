import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "../ChatScreenCompo.styles";
import chakraLogo from "../../../assets/images/chakraFull.png";
import elunaraLogo from "../../../assets/images/elunaraLogo.png";
import { FolderPlus, MessageCirclePlus, Search } from "lucide-react-native";

const ChatHistorySidebar = () => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.chatHistorySidebarBackgroundWrapper}></View>
      <View style={styles.chatHistorySidebarWrapper}>
        {/* chat history header */}
        <View style={styles.chatHistorySidebarHeader}>
          <View style={styles.sidebarTopImageMain}>
            <Image style={styles.chakraLogoSidebar} source={chakraLogo} />
            <Image style={styles.elunaraLogoSidebar} source={elunaraLogo} />
          </View>
          <View style={styles.searchInputMain}>
            <Search
              size={25}
              strokeWidth={1.25}
              color="#B5BECE"
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Search"
              placeholderTextColor="#B5BECE"
              style={styles.searchInput}
            />
          </View>
          <View style={styles.newButtonsMain}>
            <TouchableOpacity style={styles.newChatBtn}>
              <MessageCirclePlus size={25} strokeWidth={1.25} />
              <Text style={styles.btnTexts}>New Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.newLearningTabBtn}>
              <FolderPlus size={25} strokeWidth={1.25} />
              <Text style={[styles.btnTexts,{fontWeight:400}]}>New Learning Tab</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* chat history header */}

        {/* chat history middle */}
        <View style={styles.chatHistorySidebarMiddle}></View>
        {/* chat history middle */}

        {/* chat history footer */}
        <View style={styles.chatHistorySidebarFooter}>
            
        </View>
        {/* chat history footer */}
      </View>
    </>
  );
};

export default ChatHistorySidebar;
