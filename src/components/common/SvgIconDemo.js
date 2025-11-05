import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import SvgIcon from './SvgIcon';

// Import your SVG icons
import HeartIcon from '../../../assets/icons/example-heart.svg';
import StarIcon from '../../../assets/icons/example-star.svg';

/**
 * SvgIcon Demo Component
 * This demonstrates how to use the SvgIcon component with local SVG files
 */
const SvgIconDemo = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>SVG Icon Demo</Text>

      {/* Example 1: Basic usage with default size */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Basic Usage (Default Size: 24x24)</Text>
        <View style={styles.iconRow}>
          <SvgIcon icon={HeartIcon} />
          <SvgIcon icon={StarIcon} />
        </View>
        <Text style={styles.code}>
          {'<SvgIcon icon={HeartIcon} />'}
        </Text>
      </View>

      {/* Example 2: Custom width and height */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Custom Width & Height</Text>
        <View style={styles.iconRow}>
          <SvgIcon icon={HeartIcon} width={32} height={32} />
          <SvgIcon icon={StarIcon} width={40} height={40} />
          <SvgIcon icon={HeartIcon} width={50} height={50} />
        </View>
        <Text style={styles.code}>
          {'<SvgIcon icon={HeartIcon} width={32} height={32} />'}
        </Text>
      </View>

      {/* Example 3: Custom colors */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Custom Colors</Text>
        <View style={styles.iconRow}>
          <SvgIcon icon={HeartIcon} width={36} height={36} color="#FF0000" />
          <SvgIcon icon={StarIcon} width={36} height={36} color="#FFD700" />
          <SvgIcon icon={HeartIcon} width={36} height={36} color="#FF1493" />
          <SvgIcon icon={StarIcon} width={36} height={36} color="#00CED1" />
        </View>
        <Text style={styles.code}>
          {'<SvgIcon icon={HeartIcon} width={36} height={36} color="#FF0000" />'}
        </Text>
      </View>

      {/* Example 4: Different sizes in a row */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Multiple Sizes</Text>
        <View style={styles.iconRow}>
          <SvgIcon icon={StarIcon} width={16} height={16} color="#FFD700" />
          <SvgIcon icon={StarIcon} width={24} height={24} color="#FFD700" />
          <SvgIcon icon={StarIcon} width={32} height={32} color="#FFD700" />
          <SvgIcon icon={StarIcon} width={48} height={48} color="#FFD700" />
          <SvgIcon icon={StarIcon} width={64} height={64} color="#FFD700" />
        </View>
        <Text style={styles.code}>
          {'<SvgIcon icon={StarIcon} width={16} height={16} color="#FFD700" />'}
        </Text>
      </View>

      {/* Example 5: With custom styles */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>5. With Custom Styles</Text>
        <View style={styles.iconRow}>
          <SvgIcon
            icon={HeartIcon}
            width={40}
            height={40}
            color="#FF69B4"
            style={styles.iconWithBackground}
          />
          <SvgIcon
            icon={StarIcon}
            width={40}
            height={40}
            color="#FFD700"
            style={styles.iconWithBackground}
          />
        </View>
        <Text style={styles.code}>
          {'<SvgIcon\n  icon={HeartIcon}\n  width={40}\n  height={40}\n  color="#FF69B4"\n  style={styles.iconWithBackground}\n/>'}
        </Text>
      </View>

      {/* Example 6: Direct SVG usage (without SvgIcon wrapper) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>6. Direct SVG Usage (Alternative)</Text>
        <View style={styles.iconRow}>
          <HeartIcon width={36} height={36} fill="#FF0000" />
          <StarIcon width={36} height={36} fill="#FFD700" stroke="#FFA500" />
        </View>
        <Text style={styles.code}>
          {'<HeartIcon width={36} height={36} fill="#FF0000" />'}
        </Text>
      </View>

      {/* Prop Reference */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SvgIcon Props Reference</Text>
        <Text style={styles.propText}>• icon: The imported SVG component (required)</Text>
        <Text style={styles.propText}>• width: Width in pixels (default: 24)</Text>
        <Text style={styles.propText}>• height: Height in pixels (default: 24)</Text>
        <Text style={styles.propText}>• color: Icon color as hex or name (default: '#000')</Text>
        <Text style={styles.propText}>• style: Additional View styles</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 10,
    paddingVertical: 10,
  },
  code: {
    fontSize: 12,
    fontFamily: 'monospace',
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
    color: '#333',
  },
  iconWithBackground: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  propText: {
    fontSize: 14,
    marginBottom: 8,
    color: '#555',
    lineHeight: 20,
  },
});

export default SvgIconDemo;
