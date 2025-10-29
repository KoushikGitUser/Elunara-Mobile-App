import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { ArrowUpRight, File } from 'lucide-react-native'
import { scaleFont } from '../../../utils/responsive'

const SubTopicsCard = ({item}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(subtopic)}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        <View style={styles.leftContent}>
           <File size={22} strokeWidth={1.5}  color="#888888"  />
          <Text style={styles.cardTitle}>{item.title}</Text>
        </View>
        <ArrowUpRight strokeWidth={1.5} />
      </View>
    </TouchableOpacity>
  )
}


const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    marginBottom: 20,
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: scaleFont(12 ),
    fontWeight: '500',
    color: '#1A1A1A',
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
});

export default SubTopicsCard