import { StyleSheet, Dimensions, Platform } from 'react-native';
import { moderateScale, scale, scaleFont, verticalScale } from '../../../utils/responsive';
import { appColors } from '../../../themes/appColors';

const { width, height } = Dimensions.get('window');


export const createStyles = (props = {}) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor:'#FAFAFA',
  },
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: '#FAFAFA',
    gap:30
  },
  header: {
    marginTop: 30,
    marginBottom: 10,
    width:"90%",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"start",
  },
  logoContainer: {
    flexDirection: 'column',
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
    zIndex:99
  },
  headTitle:{
    fontSize: scaleFont(26),
    fontFamily: 'Mukta-Bold',
    color: '#3A3A3A',
    letterSpacing: -0.8,
    marginTop:15
  },
  headDesc:{
    fontSize: scaleFont(14),
    color: '#939FA9',
    fontFamily: 'Mukta-Regular',
    marginTop:15,

  },
  logo: {
    fontSize: moderateScale(30, 0.2),
    fontFamily: 'Mukta-Regular',
    color: props.logoColor || '#0F1419',
    letterSpacing: 0.3,
  },
  registered: {
    fontSize: moderateScale(9),
    color: props.logoColor || '#0F1419',
    marginLeft: scale(1),
    marginTop: verticalScale(3),
    fontFamily: 'Mukta-Regular',
  },
  tagline: {
    fontSize: moderateScale(12.5),
    color: props.taglineColor || '#5A6B7D',
    marginTop: verticalScale(4),
    fontFamily: 'Mukta-Regular',
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
    fontSize: scaleFont(40),
    fontFamily: 'Mukta-Bold',
    color: '#4D5F75',
    letterSpacing: -0.8,
  },
  subheading: {
    fontSize: scaleFont(15),
    color: '#939FA9',
    lineHeight: moderateScale(25, 0.2),
    fontFamily: 'Mukta-Regular',
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
    marginBottom:50
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
    fontSize: scaleFont(11),
    fontFamily: 'Mukta-Bold',
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
    fontSize: scaleFont(12),
    color: '#8A97A3',
    fontFamily: 'Mukta-Regular',
    marginTop:20
  },
  emailButton: {
    backgroundColor: appColors.navyBlueShade,
    borderRadius: moderateScale(100),
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical:10,
    width:"100%",
    marginTop:30
  },
  emailButtonText: {
    fontSize: scaleFont(14),
    fontFamily: 'Mukta-Bold',
    color: props.emailButtonTextColor || '#FFFFFF',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20
  },
  signupText: {
    fontSize: scaleFont(14),
    color: props.signupTextColor || '#5A6B7D',
    fontFamily: 'Mukta-Regular',
  },
  signupLink: {
  fontSize: scaleFont(14),
  color: '#0F1419',
  fontFamily: 'Mukta-Bold',
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
    fontSize: scaleFont(10),
    color: props.footerLinkColor || '#7A8794',
    fontFamily: 'Mukta-Regular',
  },
  footerDot: {
    fontSize: scaleFont(10),
    color: props.footerLinkColor || '#7A8794',
  },
  inputFieldsMain:{
   width:"90%",
  },
  label: {
    fontSize: scaleFont(12),
    color: "#4E4E4E",
    fontFamily: 'Mukta-Regular',
    marginBottom: 8,
    textAlign:'left'
  },
  input: {
    borderWidth: 1,
    borderColor: "#ABB8CC",
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: scaleFont(14),
    color: "#0F1419",
    backgroundColor:"white",
    fontFamily: 'Mukta-Regular',
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ABB8CC",
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingRight: 15,
    backgroundColor: "white",
  },
  inputField: {
    flex: 1,
    fontSize: scaleFont(14),
    color: "#0F1419",
    paddingVertical: 10,
    fontFamily: 'Mukta-Regular',
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ABB8CC",
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingRight: 10,
    backgroundColor:"white"
  },
  passwordInput: {
    flex: 1,
    fontSize: scaleFont(14),
    color: "#0F1419",
    paddingVertical: 10,
    fontFamily: 'Mukta-Regular',
  },
  eyeIconContainer: {
    padding: 6,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: 10,
    fontSize: scaleFont(14),
    color: "#0F1419",
    fontFamily: 'Mukta-Medium',
  },
  forgotPasswordMain:{
    borderBottomWidth:1.5,
    borderColor:"black",
    alignSelf:"flex-end",
    marginBottom:25
  },
  passwordHintsContainer: {
    marginTop: 8,
  },
  passwordHintText: {
    fontSize: scaleFont(12),
    color: "#6B7280",
    fontFamily: 'Mukta-Regular',
    lineHeight: 18,
    marginLeft: 6,
  },
  hintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  emailButtonDisabled: {
    backgroundColor: "#CDD5DC",
  },
    otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 35,
    marginTop: 5,
  },
  otpInput: {
    width: "14%",
    height: 50,
    borderWidth: 1,
    borderColor: "#B5BECE",
    backgroundColor: "white",
    color: "#828282",
    borderRadius: 12,
    textAlign: "center",
    fontSize: scaleFont(15),
    fontWeight: "600",
    fontFamily: "Mukta-Regular",
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 80,
  },
  resendText: {
    fontSize: scaleFont(14),
    color: "#8F8F8F",
    fontFamily: "Mukta-Regular",
  },
  resendLink: {
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Bold",
    color: appColors.navyBlueShade,
    borderBottomWidth: 1,
    borderColor: appColors.navyBlueShade,
  },
});

