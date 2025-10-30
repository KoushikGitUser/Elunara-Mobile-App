import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useMemo, useState } from "react";
import { ChevronDown, ChevronRight, ChevronUp, Folder, Pin } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "./chatSidebarStyles.styles";
import { moderateScale } from "../../../utils/responsive";
import { recentChats } from "../../../data/datas";
import IndividualRecentChat from "./IndividualRecentChat";
import IndividualPinnedChat from "./IndividualPinnedChat";
import IndividualPinnedRoom from "./IndividualPinnedRoom";
import pin from '../../../assets/images/pinGrey.png'
import room from '../../../assets/images/FolderSimple.png'
import chat from '../../../assets/images/ChatsTeardrop.png'



const SidebarMiddle = () => {
  const [recentChatsOpened, setRecentChatsOpened] = useState(false);
  const [pinnedChatsOpened,setPinnedChatsOpened] = useState(false);
  const [pinnedRoomsOpened,setPinnedRoomsOpened] = useState(false);
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.chatHistorySidebarMiddle}>
      <View style={styles.pinnedSectionMain}>
        <TouchableOpacity onPress={()=>setPinnedChatsOpened(!pinnedChatsOpened)} style={styles.pinnedBtn}>
         <Image source={pin} style={{height:25,width:25,objectFit:"contain"}} />
          <Text style={{ fontSize: moderateScale(11), marginLeft: 20 }}>
            Pinned Chats (06)
          </Text>
          <ChevronDown style={{ marginLeft: "auto" }} strokeWidth={1.25} />
        </TouchableOpacity>
         {pinnedChatsOpened && (
          <View style={styles.individualPinnedChatsMain}>
            {recentChats.map((chat, chatIndex) => {
              return (
                <IndividualPinnedChat key={chatIndex} title={chat?.title} />
              );
            })}
          </View>
        )}
        <TouchableOpacity onPress={()=>setPinnedRoomsOpened(!pinnedRoomsOpened)} style={styles.pinnedBtn}>
           <Image source={pin} style={{height:25,width:25,objectFit:"contain"}} />
          <Text style={{ fontSize: moderateScale(11), marginLeft: 20 }}>
            Pinned Learning Labs (10)
          </Text>
          <ChevronDown style={{ marginLeft: "auto" }} strokeWidth={1.25} />
        </TouchableOpacity>
        {pinnedRoomsOpened && (
          <View style={styles.individualPinnedChatsMain}>
            {recentChats.map((chat, chatIndex) => {
              return (
                <IndividualPinnedRoom key={chatIndex} title={chat?.title} />
              );
            })}
          </View>
        )}
      </View>
      <View style={styles.pinnedSectionMain}>
        <TouchableOpacity onPress={()=>setRecentChatsOpened(!recentChatsOpened)} style={[styles.pinnedBtn, { paddingLeft: 0 }]}>
          <Text style={{ fontSize: moderateScale(11), marginLeft: 20 }}>
            Recent chats
          </Text>
          {recentChatsOpened? <ChevronUp style={{ marginLeft: "auto" }} strokeWidth={1.25} />:<ChevronDown style={{ marginLeft: "auto" }} strokeWidth={1.25} />}
        </TouchableOpacity>
        {recentChatsOpened && (
          <View style={styles.individualRecentChatsMain}>
            {recentChats.map((chat, chatIndex) => {
              return (
                <IndividualRecentChat key={chatIndex} title={chat?.title} />
              );
            })}
            <TouchableOpacity  style={[styles.pinnedBtn,{paddingLeft:0,width:"90%"}]}>
         <Image source={chat} style={{height:25,width:25,objectFit:"contain"}} />
          <Text style={{ fontSize: moderateScale(11), marginLeft: 20 }}>
            View all Chats
          </Text>
          <ChevronRight style={{ marginLeft: "auto" }} strokeWidth={1.25} />
        </TouchableOpacity>
          </View>
        )}
      </View> 
      <View style={styles.pinnedSectionMain}>
        <TouchableOpacity onPress={()=>navigation.navigate("rooms")} style={[styles.pinnedBtn]}>
          <Image source={room} style={{height:25,width:25,objectFit:"contain"}} />
          <Text style={{ fontSize: moderateScale(11), marginLeft: 20 }}>
            Rooms
          </Text>
          <ChevronDown style={{ marginLeft: "auto" }} strokeWidth={1.25} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SidebarMiddle;
