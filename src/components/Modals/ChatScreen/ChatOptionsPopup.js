import { View, Text, TouchableOpacity } from 'react-native'
import React, { useMemo } from 'react'
import { createStyles } from './chatModals.styles';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { menuOptions } from '../../../data/datas';
import { moderateScale } from '../../../utils/responsive';

const ChatOptionsPopup = () => {
      const styleProps = {};
      const styles = useMemo(() => createStyles(styleProps), []);
      const navigation = useNavigation();
      const dispatch = useDispatch();
      const { toggleStates } = useSelector((state) => state.Toggle);

  return (
    <View style={styles.menuModalMain}> 
      {menuOptions.map((options,optionIndex)=>{
        return(
          <TouchableOpacity onPressIn={()=>{
            console.log("innn");
            
          }} style={styles.menuOptionsMain} onPress={(e)=>{
            e.stopPropagation();
          }} key={optionIndex}>
            {options.icon}
            <Text numberOfLines={1} style={{fontSize:moderateScale(12),flexShrink:1}}>
              {options?.option}
            </Text>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default ChatOptionsPopup