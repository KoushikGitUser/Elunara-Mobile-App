import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React, { useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "./ChatScreen.styles";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const ChatScreen = () => {
  const styleProps = {};

  const styles = useMemo(() => createStyles(styleProps), []);

  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View style={styles.chatMainWrapper}>
        {/* Header section */}
        <View style={styles.chatHeader}>
          <Feather name="menu" size={30} color="black" />
          <TouchableOpacity style={styles.upgradeButton}>
            <MaterialCommunityIcons
              name="lightning-bolt-outline"
              size={24}
              color="black"
            />
            <Text>Upgrade Plan</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="chatbubble-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>
        {/* Header section */}

        {/* middle section */}
        <View style={styles.chatMiddleSectionWrapper}></View>
        {/* middle section */}

        {/* chatInput section */}
        <View style={styles.chatInputMainWrapper}>
          <View style={styles.chatInputMain}>
            <TextInput placeholder="Ask anything" placeholderTextColor="grey" style={styles.textInput} />
            <View style={styles.inputActionIconsMainWrapper}>
              <View style={styles.inputLeftActionIcons}>
                <Feather name="paperclip" size={30} color="black" />
                <MaterialCommunityIcons
                  name="book-open"
                  size={30}
                  color="black"
                />
                <Ionicons name="options-outline" size={30} color="black" />
              </View>
              <View style={styles.inputRightActionIcons}>
                <Feather name="mic" size={30} color="black" />
                <Feather name="send" size={30} color="black" />
              </View>
            </View>
          </View>
        </View>
        {/* chatInput section */}
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
