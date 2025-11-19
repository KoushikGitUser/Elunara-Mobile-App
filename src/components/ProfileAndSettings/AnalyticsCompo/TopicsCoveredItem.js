import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { CheckCircle2, ChevronRight } from 'lucide-react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { scaleFont } from '../../../utils/responsive';

const TopicsCoveredItem = ({ 
  title, 
  completed, 
  total, 
  isComplete,
  onPress 
}) => {
     const progress = (completed / total) * 100;
  return (
    <TouchableOpacity 
      style={styles.courseItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {/* Left - Check Circle Icon */}
      <View style={styles.leftSection}>
        <CheckCircle2 
          size={25} 
          color="#A0A0A0" 
          strokeWidth={1.25}
        />
      </View>

      {/* Middle - Course Info */}
      <View style={styles.middleSection}>
        <Text style={styles.courseTitle}>{title}</Text>
        <Text style={styles.progressText}>
          {completed}/{total} topics completed
        </Text>
      </View>

      {/* Right - Progress Bar and Arrow */}
      <View style={styles.rightSection}>
        {/* Progress Bar */}
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground}>
            {isComplete ? (
              // Green gradient for completed courses
              <LinearGradient
                colors={['#03B32F', '#03B32F']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.progressBarFill, { width: `${progress}%` }]}
              />
            ) : (
              // Blue gradient for in-progress courses
              <LinearGradient
                colors={['#1B365D', '#A5C0E7']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.progressBarFill, { width: `${progress}%` }]}
              />
            )}
          </View>
        </View>

        {/* Arrow Icon */}
        <ChevronRight 
          size={35} 
          color="#2D2D2D" 
          strokeWidth={1.25}
        />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingVertical: 40,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    paddingVertical: 20,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  courseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  leftSection: {
    marginRight: 16,
  },
  middleSection: {
    flex: 1,
    marginRight: 12,
  },
  courseTitle: {
    fontSize: scaleFont(16),
    fontWeight: '700',
    color: '#2D2D2D',
    marginBottom: 4,
  },
  progressText: {
    fontSize: scaleFont(12),
    fontWeight: '400',
    color: '#888888',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  progressBarContainer: {
    width: 80,
  },
  progressBarBackground: {
    height: 7,
    backgroundColor: '#E8E8E8',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 10,
  },
});

export default TopicsCoveredItem