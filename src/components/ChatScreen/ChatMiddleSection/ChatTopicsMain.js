import { View, Text } from "react-native";
import React, { useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "../ChatScreenCompo.styles";
import { topicsSheetInitial } from "../../../data/datas";
import Topics from "./Topics";
import { useSelector } from "react-redux";

const ChatTopicsMain = () => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const { chatsStates } = useSelector((state) => state.API);

  // Take first 5 items from API data and merge with icons from topicsSheetInitial
  const dynamicTopics = useMemo(() => {
    const apiTopics = chatsStates.allChatsDatas.allSubjectsAvailable.slice(0, 5);

    const topicsWithIcons = apiTopics.map((topic, index) => ({
      ...topic,
      icon: topicsSheetInitial[index]?.icon,
      iconBg: topicsSheetInitial[index]?.iconBg,
      borderColor: topicsSheetInitial[index]?.borderColor,
    }));

    // Add static 6th item - "All Subjects"
    const allSubjectsItem = {
      name: "All Subjects",
      description: "More vast topics",
      icon: topicsSheetInitial[5]?.icon,
      iconBg: topicsSheetInitial[5]?.iconBg,
      borderColor: topicsSheetInitial[5]?.borderColor,
    };

    return [...topicsWithIcons, allSubjectsItem];
  }, [chatsStates.allChatsDatas.allSubjectsAvailable]);

  return (
    <View style={styles.topicsMainWrapper}>
      <View style={styles.grid}>
        {dynamicTopics.map((topics, topicIndex) => {
          return <Topics index={topicIndex} key={topicIndex} item={topics} />;
        })}
      </View>
    </View>
  );
};

export default ChatTopicsMain;
