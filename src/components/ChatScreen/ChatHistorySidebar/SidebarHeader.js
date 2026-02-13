import {
  View,
  Text,
  TouchableOpacity,          
  Image,
  Animated,
  Dimensions,
} from "react-native";
import React, { useMemo, useRef, forwardRef, useImperativeHandle } from "react";
import { FolderPlus, MessageCirclePlus, Search } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "./chatSidebarStyles.styles";
import chakraLogo from "../../../assets/images/chakraFull.png";
import elunaraLogo from "../../../assets/images/elunaraLogo.png";
import AddFolderIcon from "../../../../assets/SvgIconsComponent/ChatHistorySidebarIcons/AddFolderIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  setToggleChatHistorySidebar,
  setToggleLearningLabUnlockPopup,
  setToggleRoomCreationPopup,
  setToggleUnlockNewChatPopup,
  setToggleIsChattingWithAI,
  setToggleNoBalanceModal,
} from "../../../redux/slices/toggleSlice";
import {
  setChatMessagesArray,
  setMessageIDsArray,
  setCurrentAIMessageIndexForRegeneration,
  setUserMessagePrompt,
  setSelecetdFiles,
} from "../../../redux/slices/globalDataSlice";
import { scaleFont } from "../../../utils/responsive";

const SidebarHeader = forwardRef(({ translateX }, ref) => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { toggleStates, walletStates } = useSelector((state) => state.Toggle);
  const isZeroBalance = walletStates.walletBalance <= 0 && !walletStates.isPromotionalUser;
  const SCREEN_WIDTH = Dimensions.get("window").width;

  // Ref for Learning Lab button
  const learningLabBtnRef = useRef(null);

  // Expose measurement methods via ref
  useImperativeHandle(ref, () => ({
    measureLearningLabBtn: () => {
      return new Promise((resolve) => {
        if (learningLabBtnRef.current) {
          learningLabBtnRef.current.measureInWindow((x, y, width, height) => {
            resolve({ x, y, width, height });
          });
        } else {
          resolve(null);
        }
      });
    },
  }));

  return (
    <View style={styles.chatHistorySidebarHeader}>
      <TouchableOpacity
        onPress={() => {
          // Reset chat state for new chat
          dispatch(setChatMessagesArray([]));
          dispatch(setMessageIDsArray([]));
          dispatch(setCurrentAIMessageIndexForRegeneration(null));
          dispatch(setToggleIsChattingWithAI(false));
          dispatch(setUserMessagePrompt(""));
          dispatch(setSelecetdFiles([]));

          Animated.timing(translateX, {
            toValue: toggleStates.toggleChatHistorySidebar
              ? 0
              : SCREEN_WIDTH * 0.75,
            duration: 300,
            useNativeDriver: true,
          }).start();
          dispatch(
            setToggleChatHistorySidebar(!toggleStates.toggleChatHistorySidebar),
          );
          navigation.navigate("chat");
        }}
        style={styles.sidebarTopImageMain}
      >
        <Image style={styles.elunaraLogoSidebar} source={elunaraLogo} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.searchInputMain}
        onPress={() => {
          Animated.timing(translateX, {
            toValue: toggleStates.toggleChatHistorySidebar
              ? 0
              : SCREEN_WIDTH * 0.75,
            duration: 300,
            useNativeDriver: true,
          }).start();
          dispatch(
            setToggleChatHistorySidebar(!toggleStates.toggleChatHistorySidebar),
          );
          navigation.navigate("universalSearch");
        }}
        activeOpacity={0.7}
      >
        <Search
          size={25}
          strokeWidth={1.25}
          color="#B5BECE"
          style={styles.searchIcon}
        />
        <View
          style={[
            styles.searchInput,
            { fontFamily: "Mukta-Regular", fontSize: scaleFont(15), justifyContent: "center", paddingVertical: 10 },
          ]}
        >
          <Text style={{ color: "#B5BECE", fontFamily: "Mukta-Regular", fontSize: scaleFont(15) }}>
            Search
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.newButtonsMain}>
        <TouchableOpacity
          onPress={() => {
            // Reset chat state for new chat
            dispatch(setChatMessagesArray([]));
            dispatch(setMessageIDsArray([]));
            dispatch(setCurrentAIMessageIndexForRegeneration(null));
            dispatch(setToggleIsChattingWithAI(false));
            dispatch(setUserMessagePrompt(""));
            dispatch(setSelecetdFiles([]));

            Animated.timing(translateX, {
              toValue: toggleStates.toggleChatHistorySidebar
                ? 0
                : SCREEN_WIDTH * 0.75,
              duration: 300,
              useNativeDriver: true,
            }).start();
            dispatch(
              setToggleChatHistorySidebar(
                !toggleStates.toggleChatHistorySidebar,
              ),
            );
            navigation.navigate("chat");
          }}
          style={styles.newChatBtn}
        >
          <MessageCirclePlus size={25} strokeWidth={1.25} />
          <Text style={[styles.btnTexts, { fontFamily: "Mukta-Bold" }]}>
            New Chat
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          ref={learningLabBtnRef}
          onPress={() => {
            if (isZeroBalance) {
              Animated.timing(translateX, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
              }).start();
              dispatch(setToggleChatHistorySidebar(false));
              dispatch(setToggleNoBalanceModal(true));
              return;
            }
            Animated.timing(translateX, {
              toValue: toggleStates.toggleChatHistorySidebar
                ? 0
                : SCREEN_WIDTH * 0.75,
              duration: 300,
              useNativeDriver: true,
            }).start();
            dispatch(
              setToggleChatHistorySidebar(
                !toggleStates.toggleChatHistorySidebar,
              ),
            );
            dispatch(setToggleLearningLabUnlockPopup(true));
          }}
          style={styles.newLearningTabBtn}
        >
          <AddFolderIcon />
          <Text
            style={[
              styles.btnTexts,
              { fontWeight: 400, fontFamily: "Mukta-Regular" },
            ]}
          >
            New Learning Lab
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default SidebarHeader;
