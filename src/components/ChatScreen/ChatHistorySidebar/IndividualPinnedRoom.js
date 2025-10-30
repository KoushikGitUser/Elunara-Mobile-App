import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useMemo, useState } from "react";
import { Folder } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "./chatSidebarStyles.styles";
import folder from '../../../assets/images/FolderSimple.png'

const IndividualPinnedRoom = ({title}) => {
  const [isLongPressed, setIsLongPressed] = useState(false);

  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();

  const truncateTitle = (title, limit = 20) => {
    if (title.length <= limit) return title;
    return title.slice(0, limit) + "...";
  };

  return (
    <TouchableOpacity
      onLongPress={() => setIsLongPressed(!isLongPressed)}
      style={styles.individualPinnedRooms}
    >
        <Image source={folder} style={{height:22,width:22,objectFit:"contain"}} />
      <Text>{truncateTitle(title)} </Text>
    </TouchableOpacity>
  );
};

export default IndividualPinnedRoom;
