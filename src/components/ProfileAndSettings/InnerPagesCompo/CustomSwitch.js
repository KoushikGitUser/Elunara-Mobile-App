import React, { use } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { setToggleUnlockPremiumPopup } from '../../../redux/slices/toggleSlice';

const CustomSwitch = ({ value, onValueChange,skipAd }) => {
  const animatedValue = React.useRef(new Animated.Value(value ? 1 : 0)).current;
  const dispatch = useDispatch();

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 250,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  }, [value]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [3, 31], // Adjusted for proper thumb movement
  });

  const trackBackgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255, 255, 255, 1)', '#081A35'], // Gray to dark blue
  });

  const handlePress = () => {
    onValueChange(!value);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={()=>{
        if(!skipAd){
          handlePress()
        }
        else{
            dispatch(setToggleUnlockPremiumPopup(true));
        }
      }}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.track,
          {
            backgroundColor: trackBackgroundColor,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            {
              transform: [{ translateX }],
              backgroundColor:value == 1?"white":"#B5BECE"
            },
          ]}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  track: {
    width: 55,
    height: 28,
    borderRadius: 22,
    justifyContent: 'center',
    position: 'relative',
    borderWidth:1,
    borderColor:"#B5BECE"
  },
  thumb: {
    width: 18,
    height: 18,
    borderRadius: 45,
    backgroundColor: '#B5BECE',
  },
});

export default CustomSwitch;