import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useMemo, useState } from "react";
import { Folder } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "./chatSidebarStyles.styles";
import folder from '../../../assets/images/FolderSimple.png'
import FolderIcon from "../../../../assets/SvgIconsComponent/ChatHistorySidebarIcons/FolderIcon";
import { scaleFont } from "../../../utils/responsive";

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
    onPress={()=>navigation.navigate("rooms",{roomName:title})}
      onLongPress={() => setIsLongPressed(!isLongPressed)}
      style={styles.individualPinnedRooms}
    >
       <FolderIcon/>
      <Text style={{fontFamily:"Mukta-Regular",fontSize:scaleFont(14)}}>{truncateTitle(title)} </Text>
    </TouchableOpacity>
  );
};

export default IndividualPinnedRoom;
