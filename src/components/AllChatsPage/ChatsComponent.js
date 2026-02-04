import { View, Text, Pressable, TouchableOpacity, Animated } from "react-native";
import React, { useMemo, useEffect, useRef } from "react";
import { createStyles } from "../../screens/AllChatsPage/AllChatsPageStyles.style";
import { useDispatch } from "react-redux";
import { MessageCircle, MoreVertical, Check } from "lucide-react-native";
import { setToggleAllChatsOptionsPopup, setToggleIsChattingWithAI, setToggleRoomChatsOptionsPopup } from "../../redux/slices/toggleSlice";
import { useNavigation } from "@react-navigation/native";
import PinIcon from "../../../assets/SvgIconsComponent/ChatHistorySidebarIcons/PinIcon";
import { appColors } from "../../themes/appColors";
import { setCurrentActionChatDetails, commonFunctionForAPICalls } from "../../redux/slices/apiCommonSlice";

const ChatsComponent = ({
  title,
  subject,
  roomName,
  index,
  isPinned,
  isSelecting = false,
  setIsSelecting = () => {},
  selectedArray = [],
  setSelectedArray = () => {},
  setPopupPosition = () => {},
  chatData,
  isRoomContext = false,
  onChatPress = null,
  isHighlighted = false,
  onLayout = null,
}) => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const menuButtonRef = React.useRef(null);

  // Blink animation for highlight
  const blinkAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isHighlighted) {
      // Reset animation value first
      blinkAnim.setValue(0);

      // Create a glow animation that blinks 3 times
      const blinkAnimation = Animated.sequence([
        // Blink 1
        Animated.timing(blinkAnim, { toValue: 1, duration: 250, useNativeDriver: false }),
        Animated.timing(blinkAnim, { toValue: 0, duration: 250, useNativeDriver: false }),
        // Blink 2
        Animated.timing(blinkAnim, { toValue: 1, duration: 250, useNativeDriver: false }),
        Animated.timing(blinkAnim, { toValue: 0, duration: 250, useNativeDriver: false }),
        // Blink 3
        Animated.timing(blinkAnim, { toValue: 1, duration: 250, useNativeDriver: false }),
        Animated.timing(blinkAnim, { toValue: 0, duration: 250, useNativeDriver: false }),
      ]);

      blinkAnimation.start();

      return () => {
        blinkAnimation.stop();
        blinkAnim.setValue(0);
      };
    } else {
      // Reset to 0 when not highlighted
      blinkAnim.setValue(0);
    }
  }, [isHighlighted]);

  const highlightBackgroundColor = blinkAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', '#EBF1FB'],
  });

  const handleMenuPress = () => {
    menuButtonRef.current?.measureInWindow((x, y, width, height) => {
      setPopupPosition({ x: x + width, y: y + height });
      dispatch(setCurrentActionChatDetails(chatData));
      // Use appropriate toggle based on context
      if (isRoomContext) {
        dispatch(setToggleRoomChatsOptionsPopup(true));
      } else {
        dispatch(setToggleAllChatsOptionsPopup(true));
      }
    });
  };

  const handleChatPress = () => {
    // If custom onChatPress handler is provided (for room context), use it
    if (onChatPress && isRoomContext) {
      onChatPress(chatData);
      return;
    }

    // Navigate first
    navigation.navigate("chat");

    // Then fetch chat details and messages after a small delay to ensure ChatScreen has mounted
    setTimeout(() => {
      // Fetch chat details
      const chatDetailsPayload = {
        method: "GET",
        url: `/chats/${chatData?.id}`,
        name: "getAllDetailsOfChatByID",
      };
      dispatch(commonFunctionForAPICalls(chatDetailsPayload));

      // Fetch all messages of the chat
      const messagesPayload = {
        method: "GET",
        url: `/chats/${chatData?.id}/messages`,
        name: "getAllMessagesOfParticularChat",
      };
      dispatch(commonFunctionForAPICalls(messagesPayload));

      // Set chatting state after ChatScreen has mounted and cleared its state
      dispatch(setToggleIsChattingWithAI(true));
    }, 100);
  };  

  const CheckBox = ({ selected }) => {
    return (
      <View
        style={[styles.radioOuter, { borderColor: selected ? "black" : "", backgroundColor: selected ? "black" : "transparent" }]}
      >
        {selected && <Check size={19} color="white" strokeWidth={1.75} />}
      </View>
    );
  };

  // Determine background color
  const getBackgroundColor = () => {
    if (selectedArray.includes(index)) return "#EEF4FF";
    return "transparent";
  };

  return (
    <Animated.View
      style={[
        { backgroundColor: highlightBackgroundColor },
      ]}
      onLayout={onLayout}
    >
      <TouchableOpacity
        style={[styles.cardContainer, { backgroundColor: getBackgroundColor(), paddingLeft: isSelecting ? 10 : 0 }]}
        onLongPress={() => {
        setIsSelecting(true);
        setSelectedArray([...selectedArray, index])
      }}
      onPress={() => {
        if (isSelecting) {
          if (!selectedArray.includes(index)) {
            setSelectedArray([...selectedArray, index])
          }
          else {
            const newArray = [...selectedArray]
            newArray.splice(selectedArray.indexOf(index), 1)
            setSelectedArray(newArray);
            if (selectedArray.length == 1) {
              setIsSelecting(false)
            }
          }
        }
        else {
          handleChatPress();
        }
      }}
    >
      <View style={styles.cardContent}>
        {isSelecting && <CheckBox selected={selectedArray.includes(index)} />}

        {/* Chat Icon */}
        <View style={styles.iconContainer}>
          <MessageCircle size={25} color="#9CA3AF" strokeWidth={1.5} />
        </View>

        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitleText}>{subject}</Text>
            {roomName && (
              <>
                <Text style={styles.dotSeparator}>•</Text>
                <Text style={[styles.subtitleText,{fontWeight:500, fontFamily:"Mukta-Medium"}]}>{roomName}</Text>
              </>
            )}
          </View>
        </View>

        {/* Pin Icon */}
        {isPinned && (
          <View style={{ marginRight: 12 }}>
            <PinIcon color={appColors.navyBlueShade} />
          </View>
        )}

        {/* Menu Icon */}
        <Pressable
          ref={menuButtonRef}
          style={({ pressed }) => [
            styles.menuButton,
            pressed && styles.menuPressed,
          ]}
          onPress={(e) => {
            e.stopPropagation();
            handleMenuPress();
          }}
        >
          <MoreVertical size={24} color="#000000ff" strokeWidth={2} />
        </Pressable>
      </View>
    </TouchableOpacity>
    </Animated.View>
  );
};

export default ChatsComponent;
