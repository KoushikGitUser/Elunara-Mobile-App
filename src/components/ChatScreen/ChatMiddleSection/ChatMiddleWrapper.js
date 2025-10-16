import { View, Text } from 'react-native'
import React, { useMemo } from 'react'
import { useNavigation } from '@react-navigation/native';
import { createStyles } from '../ChatScreenCompo.styles';
import ChatTopicsMain from './ChatTopicsMain';
import GreetingsHeader from './GreetingsHeader';

const ChatMiddleWrapper = () => {
      const styleProps = {};
      const styles = useMemo(() => createStyles(styleProps), []);
      const navigation = useNavigation();

  return (
   <View style={styles.chatMiddleSectionWrapper}>
    <GreetingsHeader/>
    <ChatTopicsMain/>
   </View>
  )
}

export default ChatMiddleWrapper