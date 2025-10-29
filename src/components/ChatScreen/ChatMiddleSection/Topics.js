import { View, Text, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "../ChatScreenCompo.styles";
import { IndianRupee } from "lucide-react-native";

const Topics = ({ title, desc,bgColor,borderColor,iconColor}) => {
  const styleProps = {
    borderColor:"abcd",
    backgroundColor:"white"
  };
  const styles = useMemo(() => createStyles(styleProps), []); 
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.topicsMain}>
        <View style={[styles.topicIcon,{backgroundColor:bgColor,borderColor:borderColor,marginBottom:7}]}>
            <IndianRupee size={15} color={iconColor} strokeWidth={1.25} />
        </View>
        <Text style={styles.topicTitle}>
            {title}
        </Text>
        <Text style={styles.topicDesc}>
            {desc}
        </Text>
    </TouchableOpacity>
  );
};

export default Topics;
