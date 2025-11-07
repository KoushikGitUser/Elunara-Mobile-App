import {
  View,
  Text,
  Dimensions,
  Animated,
  TouchableOpacity,
} from "react-native";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "../../screens/AllChatsPage/AllChatsPageStyles.style";
import { setToggleChatHistorySidebar } from "../../redux/slices/toggleSlice";
import { Feather } from "@expo/vector-icons";
import { scaleFont } from "../../utils/responsive";
import { ArrowLeft } from "lucide-react-native";

const AllChatsHeader = ({ isSearching,setIsSearching }) => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const { toggleStates } = useSelector((state) => state.Toggle);
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const dispatch = useDispatch();

  return (
    <View style={[styles.chatHeader]}>
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
            setToggleChatHistorySidebar(!toggleStates.toggleChatHistorySidebar)
          );
        }}
      >
        {isSearching ? (
          <ArrowLeft onPress={()=>setIsSearching(false)} strokeWidth={1.25} />
        ) : (
          <Feather name="menu" size={30} color="black" />
        )}
      </TouchableOpacity>
      <Text style={{ fontSize: scaleFont(18), fontWeight: 600 }}>
        {isSearching?"Search":"All Chats"}
      </Text>
    </View>
  );
};

export default AllChatsHeader;
