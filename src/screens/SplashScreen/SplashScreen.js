import { DarkTheme } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, StatusBar, ImageBackground, Image } from 'react-native';
import { scaleFont } from '../../utils/responsive';
import chakraLogoSplash from '../../assets/images/chakraBig.png';
import elunaraLogoSplash from '../../assets/images/ElunaraLogoSplash.png'

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('allRooms');
    }, 200); // 2.5 seconds

    return () => clearTimeout(timer);   
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ImageBackground resizeMode='contain' style={styles.bigLogo} imageStyle={{opacity:0.2}} source={chakraLogoSplash}> 
        <Image source={elunaraLogoSplash} style={styles.elunaraLogoSplash} />
      <StatusBar backgroundColor="#081A35" barStyle='light-content' />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#081A35',
  },
  logo: {
    fontSize: scaleFont(48),
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  elunaraLogoSplash:{
    height:100,
    width:300,
    opacity:1
  },
  bigLogo:{
    flex: 1,
    width:"100%",
    justifyContent: 'center',
    alignItems: 'center',

  },
  tagline: {
    fontSize: scaleFont(16),
    color: '#E1BEE7',
    marginBottom: 40,
  },
  loader: {
    marginTop: 20,
  },
});

export default SplashScreen;
