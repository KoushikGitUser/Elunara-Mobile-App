import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
} from "react-native";
import React, { useEffect, useMemo } from "react";
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
  setToggleChatScreenGuideStart,
  setToggleElunaraProWelcomePopup,
  setToggleIsChattingWithAI,
} from "../../redux/slices/toggleSlice";
import ChatOptionsPopup from "../Modals/ChatScreen/ChatOptionsPopup";
import { setChatMessagesArray } from "../../redux/slices/globalDataSlice";
import { scaleFont } from "../../utils/responsive";
import PenNib from "../../../assets/SvgIconsComponent/PenNib";
import ArchiveDarkIcon from "../../../assets/SvgIconsComponent/ArchiveDarkIcon";
import SparkleIcon from "../../../assets/SvgIconsComponent/SparkleIcon";
import { triggerToast, triggerToastWithAction } from "../../services/toast";
import { useFonts } from "expo-font";

const ChatHeader = ({ translateX, }) => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { globalDataStates } = useSelector((state) => state.Global);
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const action = ()=>{
    console.log("action");
  }


  return (
    <View style={[styles.chatHeader, {}]}>
      <View style={styles.rightChatHeaderIcons}>
        <TouchableOpacity
          onPress={() => {
            Animated.timing(translateX, {
              toValue: toggleStates.toggleChatHistorySidebar
                ? 0
                : SCREEN_WIDTH * 0.75,
              duration: 100,
              useNativeDriver: true,
            }).start();
            dispatch(
              setToggleChatHistorySidebar(
                !toggleStates.toggleChatHistorySidebar
              )
            );
          }}
        >
          <Feather name="menu" size={30} color="black" />
        </TouchableOpacity>
        {toggleStates.toggleIsChattingWithAI && (
          <TouchableOpacity style={{}}>
            <EllipsisVertical color="#FAFAFA" strokeWidth={1.25} size={30} />
          </TouchableOpacity>
        )}
      </View>

      {toggleStates.toggleIsChattingWithAI ? ( 
        <View style={styles.chatnameAndSection}>
          <Text style={{ fontSize: scaleFont(15), fontWeight: 600,fontFamily:'Mukta-Bold' }}>
            First Chat with AI
          </Text>
          <TouchableOpacity style={styles.topicNamemain}>
            <IndianRupee size={15} color="#406DD8" strokeWidth={1.25} />
            <Text style={{ fontSize: 12, fontWeight: 400, color: "#406DD8",fontFamily:'Mukta-Regular' }}>
              Finance
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          onPress={()=>{
            // triggerToast("Connection Failed","Please check your API key and try again.","alert",1000)
            triggerToastWithAction("This is toast","This desc of toast","success",5000,"Upgrade",action)
          }}
          style={styles.upgradeButton}
        >
          <SparkleIcon />
          <Text style={{ fontSize: 14, fontWeight: 600,fontFamily:'Mukta-Bold' }}>Upgrade Plan</Text>
        </TouchableOpacity>
      )}

      <View style={styles.rightChatHeaderIcons}>
        <TouchableOpacity
          onPress={() => {
            dispatch(setChatMessagesArray([]));
            dispatch(setToggleIsChattingWithAI(false));
            dispatch(setToggleChatScreenGuideStart(true))
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
