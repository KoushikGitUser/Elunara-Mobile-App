import { View, Text, TouchableOpacity, Pressable, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';
import { scaleFont } from '../../../utils/responsive';
import { File } from 'lucide-react-native';

const { width,height} = Dimensions.get("window");

const SourcesPopup = ({setSourcesPopup}) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => setSourcesPopup(false)}
        style={styles.optionsPopupWrapper}
      ></TouchableOpacity>
      <View style={styles.notesPopup}>
        <Pressable
          onPress={() => {
            setSourcesPopup(false);
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#EEF4FF" : "transparent",
            },
            styles.notesPopupOptions,
          ]}
        >
          <File strokeWidth={1.25} />
          <Text>Add File</Text>
        </Pressable>
        <Pressable
        onPress={()=>setSourcesPopup(false)}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#EEF4FF" : "transparent",
            },
            styles.notesPopupOptions,
          ]}
        >
          <Feather name="link" size={20} color="black" />
          <Text>Add Link</Text>
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
      top: 50,
      right: 0,
      zIndex: 9999,
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
      bottom: -50,
      left: -20,
      width,
      height,
      zIndex: 9999,
      backgroundColor:"transparent"
    },
});

export default SourcesPopup