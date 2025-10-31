import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useMemo } from "react";
import { FolderPlus, MessageCirclePlus, Search } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "./chatSidebarStyles.styles";
import chakraLogo from "../../../assets/images/chakraFull.png";
import elunaraLogo from "../../../assets/images/elunaraLogo.png";
import folderplus from '../../../assets/images/FolderPlus.png'

const SidebarHeader = () => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();

  return (
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
          <Image source={folderplus} style={{height:25,width:25,objectFit:"contain"}} />
          <Text style={[styles.btnTexts, { fontWeight: 400 }]}>
            New Learning Lab
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SidebarHeader;
