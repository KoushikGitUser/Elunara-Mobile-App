import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
} from "react-native";
import React, { useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "./ChatScreenCompo.styles";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  EllipsisVertical,
  IndianRupee,
  MessageCirclePlus,
} from "lucide-react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  setToggleChatHistorySidebar,
  setToggleChatMenuPopup,
  setToggleIsChattingWithAI,
} from "../../redux/slices/toggleSlice";
import ChatOptionsPopup from "../Modals/ChatScreen/ChatOptionsPopup";
import spark from "../../assets/images/sparking.png";
import { setChatMessagesArray } from "../../redux/slices/globalDataSlice";
import { scaleFont } from "../../utils/responsive";

const ChatHeader = ({ translateX }) => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { globalDataStates } = useSelector((state) => state.Global);
  const SCREEN_WIDTH = Dimensions.get("window").width;

  return (
    <View
      style={[
        styles.chatHeader,
        {
          borderBottomWidth:
            toggleStates.toggleKeyboardVisibilityOnChatScreen == true ||
            globalDataStates.selectedFiles.length > 0 ||
            toggleStates.toggleIsChattingWithAI
              ? 1
              : 0,
        },
      ]}
    >
      <TouchableOpacity
        onPress={() => {
          Animated.timing(translateX, {
            toValue: toggleStates.toggleChatHistorySidebar ? 0 : SCREEN_WIDTH * 0.75,
            duration: 100,
            useNativeDriver: true,
          }).start();
          dispatch(
            setToggleChatHistorySidebar(!toggleStates.toggleChatHistorySidebar)
          );
        }}
      >
        <Feather name="menu" size={30} color="black" />
      </TouchableOpacity>
      {toggleStates.toggleIsChattingWithAI ? (
        <View style={styles.chatnameAndSection}>
          <Text style={{ fontSize: scaleFont(14), fontWeight: 600 }}>
            First Chat with AI
          </Text>
          <TouchableOpacity style={styles.topicNamemain}>
            <IndianRupee size={15} color="#406DD8" strokeWidth={1.25} />
            <Text style={{ fontSize: 11, fontWeight: 400, color: "#406DD8" }}>
              Finance
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity style={styles.upgradeButton}>
          <Image
            source={spark}
            style={{ height: 22, width: 22, objectFit: "contain" }}
          />
          <Text style={{ fontSize: 13, fontWeight: 600 }}>Upgrade Plan</Text>
        </TouchableOpacity>
      )}

      <View style={styles.rightChatHeaderIcons}>
        <TouchableOpacity
          onPress={() => {
            dispatch(setChatMessagesArray([]));
            dispatch(setToggleIsChattingWithAI(false));
          }}
        >
          <MessageCirclePlus size={30} strokeWidth={1.25} />
        </TouchableOpacity>
        {toggleStates.toggleIsChattingWithAI && (
          <TouchableOpacity
            style={{
              backgroundColor: toggleStates.toggleChatMenuPopup
                ? "#E7ECF5"
                : "transparent",
              zIndex: 9,
              borderRadius: 5,
            }}
            onPress={() =>
              dispatch(
                setToggleChatMenuPopup(!toggleStates.toggleChatMenuPopup)
              )
            }
          >
            <EllipsisVertical strokeWidth={1.25} size={30} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default ChatHeader;
