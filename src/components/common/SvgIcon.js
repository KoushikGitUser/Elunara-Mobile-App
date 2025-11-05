import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

/**
 * SvgIcon Component
 *
 * A wrapper component for rendering local SVG icons
 *
 * @param {React.Component} icon - The imported SVG component
 * @param {number} width - Width of the icon (default: 24)
 * @param {number} height - Height of the icon (default: 24)
 * @param {string} color - Color of the icon (default: '#000')
 * @param {object} style - Additional styles
 */
const SvgIcon = ({ icon: Icon, width = 24, height = 24, color = '#000', style, ...props }) => {
  // Validate icon prop
  if (!Icon) {
    console.error('SvgIcon Error: No icon provided. Make sure to pass icon={YourImportedIcon}');
    return (
      <View style={[styles.container, style]}>
        <Text style={styles.errorText}>No Icon</Text>
      </View>
    );
  }

  // Validate icon is a function or component
  if (typeof Icon !== 'function' && typeof Icon !== 'object') {
    console.error('SvgIcon Error: Invalid icon type. Expected a component but got:', typeof Icon);
    return (
      <View style={[styles.container, style]}>
        <Text style={styles.errorText}>Invalid</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <Icon width={width} height={height} fill={color} stroke={color} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
});

export default SvgIcon;
