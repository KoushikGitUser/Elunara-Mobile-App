import { View, Text, StatusBar, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useMemo } from 'react'
import { createStyles } from './SignIn.styles';
import mainLogo from '../../../assets/images/Knowledge Chakra 1.png';
import chakraLogo from '../../../assets/images/Knowledge Chakra 2.png';
import google from '../../../assets/images/search.png';
import LinkedIn from '../../../assets/images/linkedin.png';
import apple from '../../../assets/images/apple-logo.png';


const SignIn = () => {
  // You can pass custom props to override default styles
  const styleProps = {
    // Example: backgroundColor: '#F5F5F5',
    // Example: headingColor: '#000000',
    // Add any dynamic values here
  };

  const styles = useMemo(() => createStyles(styleProps), []);




  return (
 <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image source={mainLogo} style={styles.mainLogo}  />
          </View>
          <View>
            <Image source={chakraLogo} style={styles.chakraLogo}  />
          </View>
        </View>

        {/* Content Section */}
        <View style={styles.content}>
          {/* Flower of Life Background */}
          <View style={styles.flowerContainer}>
          </View>

          {/* Main Heading */}
          <View style={styles.headingContainer}>
            <Text style={styles.heading}>Learning,</Text>
            <Text style={styles.heading}>Reimagined.</Text>
            <Text style={styles.heading}>Ethically.</Text>
          </View>

          {/* Subheading */}
          <Text style={styles.subheading}>
            Designed to combine transparency,{'\n'}privacy, and empathy to support{'\n'}your learning journey.
          </Text>

          {/* Progress Indicators */}
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, styles.progressActive]} />
            <View style={styles.progressBar} />
            <View style={styles.progressBar} />
          </View>
        </View>

        {/* Buttons Section */}
        <View style={styles.buttonsContainer}>
          {/* Google Button */}
          <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
            <Image source={google} style={styles.socialIcons} />
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          {/* LinkedIn Button */}
          <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
            <Image source={LinkedIn} style={styles.socialIcons} />
            <Text style={styles.socialButtonText}>Continue with LinkedIn</Text>
          </TouchableOpacity>

          {/* Apple Button */}
          <TouchableOpacity style={[styles.socialButton,{marginBottom:0}]} activeOpacity={0.7}>
          <Image source={apple} style={styles.socialIcons} />
            <Text style={styles.socialButtonText}>Continue with Apple</Text>
          </TouchableOpacity>

          {/* Divider */}
          <Text style={styles.divider}>or</Text>

          {/* Email Button */}
          <TouchableOpacity style={styles.emailButton} activeOpacity={0.8}>
            <Text style={styles.emailButtonText}>Login with Email</Text>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          {/* Footer Links */}
          <View style={styles.footer}>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.footerLink}>Terms Of Use</Text>
            </TouchableOpacity>
            <Text style={styles.footerDot}>  •  </Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.footerLink}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}


export default SignIn