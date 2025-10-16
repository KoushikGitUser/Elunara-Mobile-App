import { View, Text } from "react-native";
import React, { useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "../ChatScreenCompo.styles";
import { topicsUnopened } from "../../../data/datas";
import Topics from "./Topics";

const ChatTopicsMain = () => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();

  return (
    <View style={styles.topicsMainWrapper}>
      <View style={styles.topicsContainerHalf}>
        {topicsUnopened?.map((topics, topicsIndex) => {
          if (topicsIndex % 2 == 0) {
            return (
              <Topics
                desc={topics?.desc}
                title={topics.title}
                bgColor={topics.bgColor}
                borderColor={topics.borderColor}
                iconColor={topics.iconColor}
                key={topicsIndex}
              />
            );
          }
        })}
      </View>
      <View style={styles.topicsContainerHalf}>
        {topicsUnopened?.map((topics, topicsIndex) => {
          if (topicsIndex % 2 !== 0) {
            return (
              <Topics
                desc={topics?.desc}
                title={topics.title}
                bgColor={topics.bgColor}
                borderColor={topics.borderColor}
                iconColor={topics.iconColor}
                key={topicsIndex}
              />
            );
          }
        })}
      </View>
    </View>
  );
};

export default ChatTopicsMain;
