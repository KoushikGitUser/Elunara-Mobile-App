import { View, Text, TextInput, TouchableOpacity, Image, Animated, Dimensions } from "react-native";
import React, { useMemo } from "react";
import { FolderPlus, MessageCirclePlus, Search } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "./chatSidebarStyles.styles";
import chakraLogo from "../../../assets/images/chakraFull.png";
import elunaraLogo from "../../../assets/images/elunaraLogo.png";
import AddFolderIcon from "../../../../assets/SvgIconsComponent/ChatHistorySidebarIcons/AddFolderIcon";
import { useDispatch, useSelector } from "react-redux";
import { setToggleChatHistorySidebar, setToggleLearningLabUnlockPopup, setToggleRoomCreationPopup } from "../../../redux/slices/toggleSlice";

const SidebarHeader = ({ translateX }) => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {toggleStates} = useSelector((state) => state.Toggle);
  const SCREEN_WIDTH = Dimensions.get("window").width;

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
        <TouchableOpacity
          onPress={() => {
            Animated.timing(translateX, {
              toValue: toggleStates.toggleChatHistorySidebar
                ? 0
                : SCREEN_WIDTH * 0.75,
              duration: 300,
              useNativeDriver: true,
            }).start();
            dispatch(
              setToggleChatHistorySidebar(
                !toggleStates.toggleChatHistorySidebar
              )
            );
            navigation.navigate("chat");
          }}
          style={styles.newChatBtn}
        >
          <MessageCirclePlus size={25} strokeWidth={1.25} />
          <Text style={styles.btnTexts}>New Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={()=>dispatch(setToggleLearningLabUnlockPopup(true))}
        style={styles.newLearningTabBtn}>
          <AddFolderIcon />
          <Text style={[styles.btnTexts, { fontWeight: 400 }]}>
            New Learning Lab
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SidebarHeader;
