import { View, Text, TouchableOpacity } from 'react-native'
import React, { useMemo } from 'react'
import { useNavigation } from '@react-navigation/native';
import { createStyles } from '../../screens/Notes/Notes.styles';
import { Search, Trash } from 'lucide-react-native';

const NotesOptions = () => {
      const styleProps = {};
      const styles = useMemo(() => createStyles(styleProps), []);
      const navigation = useNavigation();

  return (
    <View style={styles.notesPopup}>
        <TouchableOpacity style={styles.notesPopupOptions}>
            <Search strokeWidth={1.25} />
            <Text>
                Find in Notes
            </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notesPopupOptions}>
            <Trash strokeWidth={1.25} />
            <Text>
                Delete content
            </Text>
        </TouchableOpacity>
    </View>
  )
}

export default NotesOptions