import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import { createStyles } from "../../screens/AllChatsPage/AllChatsPageStyles.style";
import { useDispatch } from "react-redux";
import { MessageCircle, MoreVertical } from "lucide-react-native";
import { setToggleAllChatsOptionsPopup } from "../../redux/slices/toggleSlice";

const ChatsComponent = ({ title, subject, roomName, onPress, setPopupPosition }) => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const dispatch = useDispatch();
  const menuButtonRef = React.useRef(null);

  const handleMenuPress = () => {
    menuButtonRef.current?.measureInWindow((x, y, width, height) => {
      setPopupPosition({ x: x + width, y: y + height });
      dispatch(setToggleAllChatsOptionsPopup(true));
    });
  };

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={onPress}
    >
      <View style={styles.cardContent}>
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

        {/* Menu Icon */}
        <Pressable
          ref={menuButtonRef}
          style={({ pressed }) => [
            styles.menuButton,
            pressed && styles.menuPressed,
          ]}
          onPress={handleMenuPress}
        >
          <MoreVertical size={24} color="#000000ff" strokeWidth={2} />
        </Pressable>
      </View>
    </TouchableOpacity>
  );
};

export default ChatsComponent;
