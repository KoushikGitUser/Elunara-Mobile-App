import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

// Responsive scaling functions
const scale = (size) => (width / 375) * size;
const verticalScale = (size) => (height / 812) * size;
const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

export const createStyles = (props = {}) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor:'#FFFFFF',
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: '#FFFFFF',
  },
  header: {
    marginTop: 50,
    marginBottom: 10,
    width:"90%",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"start",
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  mainLogo:{
    height:40,
    width:130
  }, 
  chakraLogo:{
    height:165,
    width:115,
    position:"absolute",
    right:-25,
    marginTop:15,
    zIndex:99
  },
  logo: {
    fontSize: moderateScale(30, 0.2),
    fontWeight: '300',
    color: props.logoColor || '#0F1419',
    letterSpacing: 0.3,
  },
  registered: {
    fontSize: moderateScale(9),
    color: props.logoColor || '#0F1419',
    marginLeft: scale(1),
    marginTop: verticalScale(3),
    fontWeight: '400',
  },
  tagline: {
    fontSize: moderateScale(12.5),
    color: props.taglineColor || '#5A6B7D',
    marginTop: verticalScale(4),
    fontWeight: '400',
    letterSpacing: 0.1,
  },
  content: {
    flex: 1,
    width:"90%",
    marginBottom:20
  },
  flowerContainer: {
    position: 'absolute',
    right: -scale(50),
    top: verticalScale(-15),
    zIndex: 0,
  },
  headingContainer: {
    marginTop: 80,
  },
  heading: {
    fontSize: 40,
    fontWeight: '700',
    color: props.headingColor || '#4D5F75',
    letterSpacing: -0.8,
  },
  subheading: {
    fontSize: 15,
    color: props.subheadingColor || '#939FA9',
    lineHeight: moderateScale(25, 0.2),
    fontWeight: '400',
    marginTop:10,
    marginBottom: 30,
    letterSpacing: 0.1,
  },
  progressContainer: {
    flexDirection: 'row',
    gap: scale(12),
    marginBottom: verticalScale(10),
  },
  progressBar: {
    width: scale(34),
    height: verticalScale(3.5),
    backgroundColor: props.progressBarInactive || '#D9DFE5',
    borderRadius: 2,
  },
  progressActive: {
    backgroundColor: props.progressBarActive || '#2C3E50',
  },
  buttonsContainer: {
    paddingBottom: 20,
    width:"100%",
    flexDirection:"column",
    justifyContent:"space-between",
    alignItems:"center",
    marginTop:30
  },
  socialButton: {
    flexDirection: 'row',
    width:"90%",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: props.socialButtonBg || '#FFFFFF',
    borderWidth: 1.5,
    borderColor: "#999999ff",
    paddingVertical:12,
    borderRadius: moderateScale(100),
    marginBottom: 15,
  },
  socialButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: props.socialButtonTextColor || '#1E2329',
    letterSpacing: -0.1,
    marginLeft: scale(12),
  },
  socialIcons:{
    height:25,
    width:25
  },
  divider: {
    textAlign: 'center',
    fontSize: 12,
    color: props.dividerColor || '#8A97A3',
    marginVertical: 10,
    fontWeight: '400',
  },
  emailButton: {
    backgroundColor: "#162845ff",
    borderRadius: moderateScale(100),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical:16,
    width:"90%",
    marginBottom: 10,
  },
  emailButtonText: {
    fontSize: 11,
    fontWeight: '600',
    color: props.emailButtonTextColor || '#FFFFFF',
    letterSpacing: -0.2,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    marginTop:10
  },
  signupText: {
    fontSize: 10,
    color: props.signupTextColor || '#5A6B7D',
    fontWeight: '400',
  },
  signupLink: {
  fontSize: 10,
  color: '#0F1419',
  fontWeight: '600',
  // remove textDecorationLine for manual underline
},
customUnderline: {
  height: 2,
  backgroundColor: '#0F1419',
  width: "100%",        // adjust based on text width
  marginTop: 1,     // pushes the line slightly downward
},
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerLink: {
    fontSize: 10,
    color: props.footerLinkColor || '#7A8794',
    fontWeight: '400',
  },
  footerDot: {
    fontSize: 10,
    color: props.footerLinkColor || '#7A8794',
  },
  homeIndicator: {
    width: scale(134),
    height: verticalScale(5),
    backgroundColor: props.homeIndicatorColor || '#1C1C1E',
    borderRadius: 100,
    alignSelf: 'center',
    marginBottom: verticalScale(8),
    opacity: 1,
  },
});

// Export scaling functions for use in component if needed
export { scale, verticalScale, moderateScale };