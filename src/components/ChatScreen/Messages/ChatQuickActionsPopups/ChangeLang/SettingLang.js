import { View, Text, Platform, StyleSheet, ScrollView, TouchableOpacity, Pressable, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { moderateScale, scaleFont } from '../../../../../utils/responsive';
import LanguageDropdown from '../../../ChatInputCompos/ToolsPopupStates/ResponseLangState/LanguageDropdown';
import { languages } from '../../../../../data/datas';
const screenHeight = Dimensions.get("window").height;

const SettingLang = ({setIsLanguageSaved}) => {
      const [selectedCounts, setSelectedCounts] = useState([]);

  return (
    <>
      {/* Title */}
      <Text style={[styles.title, { fontFamily: "Mukta-Bold" }]}>Set Response Language</Text>
      {/* Description */}
      <Text style={[styles.description, { fontFamily: "Mukta-Regular" }]}>
       Receive responses in your chosen languages! Pick up to 3 languages now to easily toggle between them. 
      </Text>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollableContent}>
        <Text
          style={{
            fontSize: moderateScale(12),
            color: "#5E5E5E",
            marginTop: 40,
            fontFamily: "Mukta-Regular" 
          }}
        >
          Default Language
        </Text>
        <LanguageDropdown
          selectedCounts={selectedCounts}
          setSelectedCounts={setSelectedCounts}
          selectOptionsArray={languages}
        />
        <Text
          style={{
            textAlign: "center",
            color: "#757575",
            fontSize: scaleFont(13),
            paddingTop: 15,
            fontFamily: "Mukta-Regular" 
          }}
        >
          Select 2 more
        </Text>
        <Text
          style={{
            fontSize: moderateScale(12),
            color: "#5E5E5E",
            marginTop: 40,
            fontFamily: "Mukta-Regular" 
          }}
        >
          Language 2
        </Text>
        <LanguageDropdown
          selectedCounts={selectedCounts}
          setSelectedCounts={setSelectedCounts}
          selectOptionsArray={languages}
        />
        <Text
          style={{
            fontSize: moderateScale(12),
            color: "#5E5E5E",
            marginTop: 40,
            fontFamily: "Mukta-Regular" 
          }}
        >
          Language 3
        </Text>
        <LanguageDropdown
          selectedCounts={selectedCounts}
          setSelectedCounts={setSelectedCounts}
          selectOptionsArray={languages}
        />
        {/* Button */}
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor:
                selectedCounts?.length >= 3 ? "#081A35" : "#CDD5DC",
            },
          ]}
          onPress={() => setIsLanguageSaved(true)}
          activeOpacity={0.8}
        >
          <Text style={[styles.buttonText,{fontFamily: "Mukta-Regular" }]}>Save LLM Preferences</Text>
        </TouchableOpacity>
            <View style={{flexDirection:"row",width:"100%",justifyContent:"center",alignItems:"center"}}>
              <Text
                style={{
                  fontSize: moderateScale(13),
                  fontWeight: 400,
                  textAlign: "center",
                  fontFamily: "Mukta-Regular",
                }}
              >
                More LLMS? Update your list in{" "}
              </Text>
              <Pressable style={{borderBottomWidth:2}}>
                <Text style={{
                  fontSize: moderateScale(13),
                  lineHeight:15,
                  fontWeight: 600,
                  textAlign: "center",
                  fontFamily: "Mukta-Bold",
                }}>Settings</Text>
              </Pressable>
            </View>
      </ScrollView>
    </>
  )
}


const styles = StyleSheet.create({
  modalSheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: Platform.OS === "ios" ? 40 : 24,
  },
  verifiedIcon: {
    height: 55,
    width: 50,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
    maxHeight:0.8
  },
  iconContainer: {
    marginTop: 5,
  },
  closeModalMain: {
    width: "100%",
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: scaleFont(26),
    color: "#1F2937",
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: scaleFont(13),
    lineHeight: 24,
    color: "#6B7280",
    marginBottom: 5,
    letterSpacing: 0.2,
  },
    button: {
    backgroundColor: "#081A35",
    paddingVertical: 13,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 40,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(13),
    fontWeight: "500",
    letterSpacing: 0.3,
  },
  scrollableContent:{
    maxHeight:screenHeight*0.55
  }
});

export default SettingLang