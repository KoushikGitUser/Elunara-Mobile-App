import { View, Text, Dimensions, TouchableOpacity, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import RenameIcon from '../../../../assets/SvgIconsComponent/ChatMenuOptionsIcons/RenameIcon';
import FilesIcon from '../../../../assets/SvgIconsComponent/RoomsIcons/FilesIcon';
import PinIcon from '../../../../assets/SvgIconsComponent/ChatMenuOptionsIcons/PinIcon';
import TrashIcon from '../../../../assets/SvgIconsComponent/ChatMenuOptionsIcons/TrashIcon';

const { width,height} = Dimensions.get("window");

const RoomsOptionsPopup = ({setRoomOptionsPopup}) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => setRoomOptionsPopup(false)}
        style={styles.optionsPopupWrapper}
      ></TouchableOpacity>
      <View style={styles.notesPopup}>
        <Pressable
          onPress={() => {
            setRoomOptionsPopup(false);
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#EEF4FF" : "transparent",
            },
            styles.notesPopupOptions,
          ]}
        >
          <RenameIcon/>
          <Text>Rename</Text>
        </Pressable>
          <Pressable
          onPress={() => {
            setRoomOptionsPopup(false);
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#EEF4FF" : "transparent",
            },
            styles.notesPopupOptions,
          ]}
        >
          <FilesIcon/>
          <Text>Edit Details</Text>
        </Pressable>
          <Pressable
          onPress={() => {
            setRoomOptionsPopup(false);
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#EEF4FF" : "transparent",
            },
            styles.notesPopupOptions,
          ]}
        >
          <PinIcon/>
          <Text>Pin</Text>
        </Pressable>
        <Pressable
        onPress={()=>setRoomOptionsPopup(false)}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#EEF4FF" : "transparent",
            },
            styles.notesPopupOptions,
          ]}
        >
          <TrashIcon/>
          <Text>Delete</Text> 
        </Pressable>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
    notesPopup: {
      position: "absolute",
      backgroundColor: "white",
      borderWidth: 1,
      borderColor: "#D3DAE5",
      borderRadius: 21,
      padding: 7,
      width: "auto",
      top: 60,
      right: 0,
      zIndex: 999,
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 5,
    },
    notesPopupOptions: {
      flexDirection: "row",
      justifyContent: "flex-start",
      gap: 10,
      alignItems: "center",
      width: "100%",
      height: 45,
      padding: 9,
      borderRadius: 12,
      paddingRight:40
    },
    optionsPopupWrapper: {
      position: "absolute",
      top: 0,
      left: -20,
      width,
      height,
      zIndex: 99,
      backgroundColor:"transparent"
    },
});

export default RoomsOptionsPopup