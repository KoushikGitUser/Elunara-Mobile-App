import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
} from "react-native";
import React, { useMemo, useRef, forwardRef, useImperativeHandle } from "react";
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
import { setChatMessagesArray, setGuidedTourStepsCount } from "../../redux/slices/globalDataSlice";
import { scaleFont } from "../../utils/responsive";
import PenNib from "../../../assets/SvgIconsComponent/PenNib";
import ArchiveDarkIcon from "../../../assets/SvgIconsComponent/ArchiveDarkIcon";
import SparkleIcon from "../../../assets/SvgIconsComponent/SparkleIcon";
import { triggerToast, triggerToastWithAction } from "../../services/toast";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChatHeader = forwardRef(({ translateX }, ref) => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { globalDataStates } = useSelector((state) => state.Global);
  const { chatsStates } = useSelector((state) => state.API);
  const SCREEN_WIDTH = Dimensions.get("window").width;

  // Get chat details
  const chatDetails = chatsStates.allChatsDatas.createdChatDetails;
  const fullChatTitle = chatDetails?.name || "Chat Name";
  const chatTitle = fullChatTitle.length > 15 ? fullChatTitle.substring(0, 15) + "..." : fullChatTitle;
  const roomName = chatDetails?.room?.name;

  // Refs for guided tour measurement
  const menuIconRef = useRef(null);
  const chatOptionsIconRef = useRef(null);

  // Expose measurement methods via ref
  useImperativeHandle(ref, () => ({
    measureMenuIcon: () => {
      return new Promise((resolve) => {
        if (menuIconRef.current) {
          menuIconRef.current.measureInWindow((x, y, width, height) => {
            resolve({ x, y, width, height });
          });
        } else {
          resolve(null);
        }
      });
    },
    measureChatOptionsIcon: () => {
      return new Promise((resolve) => {
        if (chatOptionsIconRef.current) {
          chatOptionsIconRef.current.measureInWindow((x, y, width, height) => {
            resolve({ x, y, width, height });
          });
        } else {
          resolve(null);
        }
      });
    },
  }));

  const action = () => {
    console.log("action");
  };

  return (
    <View
      style={[
        styles.chatHeader,
        {
          borderWidth:
            toggleStates.toggleKeyboardVisibilityOnChatScreen == true ||
            globalDataStates.selectedFiles.length > 0 ||
            toggleStates.toggleIsChattingWithAI
              ? 1
              : 0,
        },
      ]}
    >
      <View style={styles.rightChatHeaderIcons}>
        <TouchableOpacity
          ref={menuIconRef}
          style={toggleStates.toggleChatScreenGuideStart && globalDataStates.guidedTourStepsCount == 2?styles.menuIconGuide:styles.menuIcon}
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
          <Text
            style={{
              fontSize: scaleFont(15),
              fontWeight: 600,
              fontFamily: "Mukta-Bold",
            }}
          >
            {chatTitle}
          </Text>
          {roomName && (
            <TouchableOpacity style={styles.topicNamemain}>
              <IndianRupee size={15} color="#406DD8" strokeWidth={1.25} />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 400,
                  color: "#406DD8",
                  fontFamily: "Mukta-Regular",
                }}
              >
                {roomName}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => {
            // triggerToast("Connection Failed","Please check your API key and try again.","alert",1000)
            // triggerToastWithAction(
            //   "This is toast",
            //   "This desc of toast",
            //   "success",
            //   5000,
            //   "Upgrade",
            //   action
            // );
            dispatch(setToggleElunaraProWelcomePopup(true))
          }}
          style={styles.upgradeButton}
        >
          <SparkleIcon />
          <Text
            style={{ fontSize: 14, fontWeight: 600, fontFamily: "Mukta-Bold" }}
          >
            Upgrade Plan
          </Text>
        </TouchableOpacity>
      )}

      <View style={styles.rightChatHeaderIcons}>
        <TouchableOpacity
          onPress={async() => {
            dispatch(setChatMessagesArray([]));
            dispatch(setToggleIsChattingWithAI(false));
            // dispatch(setToggleChatScreenGuideStart(true));
            // dispatch(setGuidedTourStepsCount(1))
            //  await AsyncStorage.setItem("isNewUser", "true");
          }}
        >
          <MessageCirclePlus size={30} strokeWidth={1.25} />
        </TouchableOpacity>
        {toggleStates.toggleIsChattingWithAI && (
          <TouchableOpacity
            ref={chatOptionsIconRef}
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
});

export default ChatHeader;
