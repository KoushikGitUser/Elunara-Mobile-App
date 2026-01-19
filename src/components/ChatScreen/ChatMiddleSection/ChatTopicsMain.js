import { View, Text } from "react-native";
import React, { useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "../ChatScreenCompo.styles";
import {
  topicsSheet,
  topicsSheetInitial,
  topicsUnopened,
} from "../../../data/datas";
import Topics from "./Topics";

const ChatTopicsMain = () => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();

  return (
    <View style={styles.topicsMainWrapper}>
      <View style={styles.grid}>
        {topicsSheetInitial.map((topics, topicIndex) => {
          return <Topics index={topicIndex} key={topicIndex} item={topics} />;
        })}
      </View>
    </View>
  );
};

export default ChatTopicsMain;
