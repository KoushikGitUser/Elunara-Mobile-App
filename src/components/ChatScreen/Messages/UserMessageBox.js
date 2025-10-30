import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { moderateScale, verticalScale } from '../../../utils/responsive'

const UserMessageBox = ({message}) => {
  return (
    <View style={styles.mainBox}>
        <View style={styles.messageBox}>
      <Text style={styles.message}>{message} </Text>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    mainBox:{
        width:"100%",
        flexDirection:"row",
        justifyContent:"flex-end",
        alignItems:"center",
        marginTop:20
    },
    messageBox:{
        minHeight:verticalScale(45),
        maxWidth:"80%",
        backgroundColor:"#EBF1FB",
        borderWidth:1,
        borderColor:"#D3DAE5",
        borderRadius:20,
        borderTopRightRadius:0,
        paddingHorizontal:20,
        paddingVertical:13,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    message:{
        fontSize:moderateScale(16),
        fontWeight:400
    }
})

export default UserMessageBox