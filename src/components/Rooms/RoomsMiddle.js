import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { createStyles } from '../../screens/Rooms/Rooms.styles';
import roomLogo from '../../assets/images/Group 40427.png';
import { moderateScale } from '../../utils/responsive';
import { Brain, Link } from 'lucide-react-native';

const RoomsMiddle = () => {
      const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={styles.roomMiddleMain}>
        <View style={styles.middleIconAndText}>
          <Image source={roomLogo} style={styles.roomLogo}/>
          <View>
            <Text style={{fontSize:moderateScale(24),fontWeight:600,}}>
                Finance Assignments
            </Text>
            <Text style={{fontSize:moderateScale(16),color:"#717680"}}>
                Your Study Lab: view chats, set context, add files, and start new conversations.
            </Text>
          </View>
        </View>
         <View style={styles.middleBelowAddSection}>
            <View style={styles.addDetailsOptions}>
              <Brain strokeWidth={1.5} size={25} style={{marginTop:5}} />
              <View style={{width:"85%"}}>
            <Text style={{fontSize:moderateScale(16),fontWeight:600,}}>
               Add Instructions
            </Text>
            <Text style={{fontSize:moderateScale(14),color:"#717680"}}>
                Tailor the way Elunara AI responds in this Room
            </Text>
          </View>
            </View>
            <View style={styles.addDetailsOptions}>
              <Link strokeWidth={1.5} size={25} style={{marginTop:5}} />
              <View style={{width:"85%"}}>
            <Text style={{fontSize:moderateScale(16),fontWeight:600,}}>
              Add Files or Links
            </Text>
            <Text style={{fontSize:moderateScale(14),color:"#717680"}}>
               Share sources to set the quicker context
            </Text>
          </View>
            </View>
            <TouchableOpacity style={styles.addDetailsBtn}>
                <Text  style={{fontSize:moderateScale(14),fontWeight:600,}}>
                    Add room details
                </Text>
            </TouchableOpacity>
            
        </View>

    </View>
  )
}

export default RoomsMiddle