import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Pressable, Linking } from 'react-native'
import React from 'react'
import { Download } from 'lucide-react-native';
import WhatsappIcon from '../../../../../assets/SvgIconsComponent/MessagesIcons/WhatsappIcon';
import LinkedInIcon from '../../../../../assets/SvgIconsComponent/MessagesIcons/LinkedInIcon';
import ZoomIcon from '../../../../../assets/SvgIconsComponent/MessagesIcons/ZoomIcon';


const MessageSharePopup = ({setSharePopup,messageContent}) => {

  const openWhatsApp = () => {
  const url = `whatsapp://send?text=${encodeURIComponent(messageContent)}`;
  Linking.openURL(url).catch(() => {
    alert("Make sure WhatsApp is installed on your device");
  });
};



  return (
    <>
      <TouchableOpacity
        onPress={() => setSharePopup(false)}
        style={styles.optionsPopupWrapper}
      ></TouchableOpacity>
      <View style={styles.notesPopup}>
        <Pressable
          onPress={() => {
            setSharePopup(false);
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#EEF4FF" : "transparent",
            },
            styles.notesPopupOptions,
          ]}
        >
          <Download strokeWidth={1.25} />
          <Text style={{fontFamily:"Mukta-Regular",fontSize:17}}>Download</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setSharePopup(false);
            openWhatsApp();
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#EEF4FF" : "transparent",
            },
            styles.notesPopupOptions,
          ]}
        >
          <WhatsappIcon/>
          <Text style={{fontFamily:"Mukta-Regular",fontSize:17}}>Whatsapp</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setSharePopup(false);
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#EEF4FF" : "transparent",
            },
            styles.notesPopupOptions,
          ]}
        >
         <LinkedInIcon/>
          <Text style={{fontFamily:"Mukta-Regular",fontSize:17}}>LinkedIn</Text>
        </Pressable>
                <Pressable
          onPress={() => {
            setSharePopup(false);
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#EEF4FF" : "transparent",
            },
            styles.notesPopupOptions,
          ]}
        >
         <ZoomIcon/>
          <Text style={{fontFamily:"Mukta-Regular",fontSize:17}}>Zoom</Text>
        </Pressable>
      </View>
    </>
  )
}

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  notesPopup: {
    position: "absolute",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#D3DAE5",
    borderRadius: 21,
    padding: 7,
    width: "auto",
    bottom: 33,
    left: 27,
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
    paddingRight: 40,
  },
  optionsPopupWrapper: {
    position: "absolute",
    bottom: 0,
    left: -20,
    width,
    height,
    zIndex: 99,
    backgroundColor: "transparent",
  },
});

export default MessageSharePopup