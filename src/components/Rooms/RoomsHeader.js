import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  Keyboard,
} from "react-native";
import React, { useMemo, useState, useEffect, useRef } from "react";
import { createStyles } from "../../screens/Rooms/Rooms.styles";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  setToggleChatHistorySidebar,
  setToggleChatMenuPopup,
} from "../../redux/slices/toggleSlice";
import { Feather } from "@expo/vector-icons";
import { EllipsisVertical, Plus } from "lucide-react-native";
import PlusButtonPopup from "../Modals/Rooms/PlusButtonPopup";
import RoomsOptionsPopup from "../Modals/Rooms/RoomsOptionsPopup";
import ChatOptionsPopup from "../Modals/ChatScreen/ChatOptionsPopup";
import { scaleFont } from "../../utils/responsive";

const RoomsHeader = ({ translateX }) => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { chatsStates, roomsStates } = useSelector((state) => state.API);
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const [addOptionsPopup, setAddOptionsPopup] = useState(false);
  const [roomOptionsPopup, setRoomOptionsPopup] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 60, right: 20 });
  const [plusPopupPosition, setPlusPopupPosition] = useState({ top: 60, right: 20 });
  const menuButtonRef = useRef(null);
  const plusButtonRef = useRef(null);

  // Get chat details for header when chatting
  const chatDetails = chatsStates?.allChatsDatas?.createdChatDetails;
  const fullChatTitle = chatDetails?.name || "New Chat";
  const chatTitle = fullChatTitle.length > 15 ? fullChatTitle.substring(0, 15) + "..." : fullChatTitle;
  const roomName = roomsStates?.currentRoom?.name || chatDetails?.room?.name;

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View
      style={[
        styles.roomsHeader,
        isKeyboardVisible && {
          borderBottomWidth: 1,
          borderBottomColor: "#D3DAE5",
        },
      ]}
    >
      <PlusButtonPopup
        visible={addOptionsPopup}
        setAddOptionsPopup={setAddOptionsPopup}
        popupPosition={plusPopupPosition}
      />
      <RoomsOptionsPopup
        visible={roomOptionsPopup}
        setRoomOptionsPopup={setRoomOptionsPopup}
        popupPosition={popupPosition}
      />
      {toggleStates.toggleChatMenuPopup && <ChatOptionsPopup />}

      {/* Left section - menu icon + hidden placeholder for balance */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
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
              setToggleChatHistorySidebar(!toggleStates.toggleChatHistorySidebar)
            );
          }}
        >
          <Feather name="menu" size={30} color="black" />
        </TouchableOpacity>
        {/* Hidden placeholder to balance right icons when chatting */}
        {toggleStates.toggleIsChattingWithAI && (
          <TouchableOpacity style={{}}>
            <EllipsisVertical color="#FAFAFA" strokeWidth={1.25} size={30} />
          </TouchableOpacity>
        )}
      </View>

      {/* Middle section - show chat title when chatting */}
      {toggleStates.toggleIsChattingWithAI && (
        <View style={{ flexDirection: "column", justifyContent: "space-between", alignItems: "center", gap: 5 }}>
          <Text
            style={{
              fontSize: scaleFont(15),
              fontWeight: "600",
              fontFamily: "Mukta-Bold",
            }}
          >
            {chatTitle}
          </Text>
          {roomName && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                paddingHorizontal: 10,
                paddingVertical: 2,
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#93BCFD",
                backgroundColor: "#E9F2FF",
                borderRadius: 24,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "400",
                  color: "#406DD8",
                  fontFamily: "Mukta-Regular",
                }}
              >
                {roomName}
              </Text>
            </View>
          )}
        </View>
      )}

      <View style={styles.rightHeaderIcons}>
        <TouchableOpacity
          ref={plusButtonRef}
          onPress={() => {
            plusButtonRef.current?.measure((x, y, width, height, pageX, pageY) => {
              setPlusPopupPosition({ top: pageY + height + 5, right: 20 });
              setAddOptionsPopup(true);
            });
          }}
        >
          <Plus size={35} strokeWidth={1.5} />
        </TouchableOpacity>
        {toggleStates.toggleIsChattingWithAI ? (
          <TouchableOpacity
            style={{
              backgroundColor: toggleStates.toggleChatMenuPopup ? "#E7ECF5" : "transparent",
              borderRadius: 5,
            }}
            onPress={() => dispatch(setToggleChatMenuPopup(!toggleStates.toggleChatMenuPopup))}
          >
            <EllipsisVertical strokeWidth={1.25} size={30} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            ref={menuButtonRef}
            onPress={() => {
              menuButtonRef.current?.measure((x, y, width, height, pageX, pageY) => {
                setPopupPosition({ top: pageY + height + 5, right: 20 });
                setRoomOptionsPopup(true);
              });
            }}
          >
            <EllipsisVertical strokeWidth={2} size={30} color="black" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default RoomsHeader;
