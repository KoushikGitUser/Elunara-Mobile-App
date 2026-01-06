import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { scaleFont } from "../../utils/responsive";
import PencilIcon from "../../../assets/SvgIconsComponent/ProfilePageOptionsIcons/PencilIcon";
import profilePic from "../../assets/images/profilepic.png";
import { Marker } from "react-native-svg";
import InfoIcon from "../../../assets/SvgIconsComponent/ProfilePageOptionsIcons/InfoIcon";
import { triggerToast } from "../../services/toast";
import { useDispatch, useSelector } from "react-redux";
import { setToggleUpdateProfilePicPopup } from "../../redux/slices/toggleSlice";
import UpdateProfilePicPopup from "../../components/ProfileAndSettings/EditProfileCompo/UpdateProfilePicPopup";
import corporateAvatar from "../../assets/images/Corporate2.png";
import teacherAvatar from "../../assets/images/Teacher2.png";
import maleStudentAvatar from "../../assets/images/Student Male2.png";
import femaleStudentAvatar from "../../assets/images/Student Female2.png";
import MobileVerificationPopup from "../../components/ChatScreen/MobileVerificationPopup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { commonFunctionForAPICalls } from "../../redux/slices/apiCommonSlice";
import UpdateEmailPopup from "../../components/ProfileAndSettings/EditProfileCompo/UpdateEmailPopup";
import UpdatePasswordPopup from "../../components/ProfileAndSettings/EditProfileCompo/UpdatePasswordPopup";
import ForgotPasswordPopupProfile from "../../components/ProfileAndSettings/EditProfileCompo/ForgotPasswordPopupProfile";


const EditProfile = () => {
  const [isMobileVerified, setIsMobileVerified] = useState(true);

  useEffect(() => {
    const checkMobileVerification = async () => {
      const verified = await AsyncStorage.getItem(
        "isMobileNumberVerifiedByOTP"
      );
      setIsMobileVerified(verified === "true");
    };
    checkMobileVerification();
  }, []);

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [mobileVerificationPopup, setMobileVerificationPopup] = useState(false);
  const [password, setPassword] = React.useState("12345678");
  const [hasPassword, setHasPassword] = useState(false);
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [isNameEditing, setIsNameEditing] = useState(false);
  const [originalFirstName, setOriginalFirstName] = useState("");
  const [originalLastName, setOriginalLastName] = useState("");
  const [updateEmailPopup,setUpdateEmailPopup] = useState(false);
  const [updatePasswordPopup,setUpdatePasswordPopup] = useState(false);
  const [forgotPassProfilePopup,setForgotPassProfilePopup] = useState(false);
  const firstNameInputRef = React.useRef(null);
  const lastNameInputRef = React.useRef(null);
  const emailInputRef = React.useRef(null);
  const passwordInputRef = React.useRef(null);
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { settingsStates } = useSelector((state) => state.API);
  const dispatch = useDispatch();

  const commonFunctionForFocusingInput = (inputRef) => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    const payload = {
      method: "GET",
      url: "/settings/profile",
      name: "getAllProfileInfos",
    };
    dispatch(commonFunctionForAPICalls(payload));
  }, []);

  useEffect(() => {
    const profileData = settingsStates?.allProfileInfos;
    if (profileData) {
      // Set profile image based on avatar_type and profile_image
      if (profileData.avatar_type === null && profileData.profile_image === null) {
        // Default from local asset (already null, will use profilePic in Image)
        setSelectedImage(null);
      } else if (profileData.avatar_type === null && profileData.profile_image) {
        // Profile image from API
        setSelectedImage(profileData.profile_image);
      } else if (profileData.profile_image === null && profileData.avatar_type) {
        // Set respective avatar from local assets
        switch (profileData.avatar_type) {
          case "corporate":
            setSelectedImage(corporateAvatar);
            break;
          case "teacher":
            setSelectedImage(teacherAvatar);
            break;
          case "student_male":
            setSelectedImage(maleStudentAvatar);
            break;
          case "student_female":
            setSelectedImage(femaleStudentAvatar);
            break;
          default:
            setSelectedImage(null);
        }
      }

      if (profileData.first_name) {
        setFirstName(profileData.first_name);
        setOriginalFirstName(profileData.first_name);
      }
      if (profileData.last_name) {
        setLastName(profileData.last_name);
        setOriginalLastName(profileData.last_name);
      }
      if (profileData.email) {
        setEmail(profileData.email);
      }
      setHasPassword(profileData.has_password);
    }
  }, [settingsStates?.allProfileInfos]);

  const handleFirstNameChange = (text) => {
    setFirstName(text);
    if (text !== originalFirstName || lastName !== originalLastName) {
      setIsNameEditing(true);
    } else if (text === originalFirstName && lastName === originalLastName) {
      setIsNameEditing(false);
    }
  };

  const handleLastNameChange = (text) => {
    setLastName(text);
    if (text !== originalLastName || firstName !== originalFirstName) {
      setIsNameEditing(true);
    } else if (text === originalLastName && firstName === originalFirstName) {
      setIsNameEditing(false);
    }
  };

  const handleUpdateName = () => {
    const payload = {
      method: "PUT",
      url: "/settings/profile/name",
      name: "updateProfileName",
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    };
    dispatch(commonFunctionForAPICalls(payload));
    setOriginalFirstName(firstName);
    setOriginalLastName(lastName);
    setIsNameEditing(false);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        width: "100%",
        paddingHorizontal: 20,
        backgroundColor: "#FAFAFA",
        paddingTop: 3,
      }}
    >
      <UpdateEmailPopup updateEmailPopup={updateEmailPopup} close={setUpdateEmailPopup}  />
      <UpdatePasswordPopup close={setUpdatePasswordPopup} updatePassPopup={updatePasswordPopup} />
      <ForgotPasswordPopupProfile visible={forgotPassProfilePopup} close={setForgotPassProfilePopup}  />
      <MobileVerificationPopup
        close={setMobileVerificationPopup}
        mobileVerificationPopup={mobileVerificationPopup}
        isFromProfile={true}
      />
      {toggleStates.toggleUpdateProfilePicPopup && (
        <UpdateProfilePicPopup setSelectedImage={setSelectedImage} />
      )}
      <View style={styles.profileImgContainer}>
        <View style={{ height: 120, width: 120 }}>
          <Image
            source={
              selectedImage
                ? typeof selectedImage === "string"
                  ? { uri: selectedImage }
                  : selectedImage
                : profilePic
            }
            style={{ height: "100%", width: "100%", borderRadius: 20 }}
          />
          <TouchableOpacity
            onPress={() => dispatch(setToggleUpdateProfilePicPopup(true))}
            style={styles.editBtnImg}
          >
            <PencilIcon />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.fullnameInput}>
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>First Name</Text>
          <View style={styles.input}>
            <TextInput
              ref={firstNameInputRef}
              style={styles.inputText}
              placeholder="Your first name"
              placeholderTextColor="#9CA3AF"
              value={firstName}
              onChangeText={handleFirstNameChange}
              returnKeyType="done"
            />
            <TouchableOpacity
              onPress={() => commonFunctionForFocusingInput(firstNameInputRef)}
            >
              <PencilIcon />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Last Name</Text>
          <View style={styles.input}>
            <TextInput
              ref={lastNameInputRef}
              style={styles.inputText}
              placeholder="Your last name"
              placeholderTextColor="#9CA3AF"
              value={lastName}
              onChangeText={handleLastNameChange}
              returnKeyType="done"
            />
            <TouchableOpacity
              onPress={() => commonFunctionForFocusingInput(lastNameInputRef)}
            >
              <PencilIcon />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={[styles.inputSection, { width: "100%" }]}>
        <Text style={styles.inputLabel}>Email</Text>
        <View style={styles.input}>
          <TextInput
            ref={emailInputRef}
            style={styles.inputText}
            placeholder="Your email"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={(text) => setEmail(text)}
            returnKeyType="done"
          />
          <TouchableOpacity
            onPress={() => setUpdateEmailPopup(true)}
          >
            <PencilIcon />
          </TouchableOpacity>
        </View>
      </View>
      {hasPassword && (
        <View style={[styles.inputSection, { width: "100%" }]}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.input}>
            <TextInput
              editable={false}
              ref={passwordInputRef}
              style={styles.inputText}
              placeholder="Your password"
              placeholderTextColor="#9CA3AF"
              value={password}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              returnKeyType="done"
            />
            <TouchableOpacity
              onPress={() => setUpdatePasswordPopup(true)}
            >
              <PencilIcon />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {isNameEditing && (
        <TouchableOpacity
          onPress={handleUpdateName}
          style={[
            styles.button,
            {
              backgroundColor: "white",
              borderWidth: 1,
              borderColor: "black",
              marginLeft: "auto",
              marginTop: 20,
            },
          ]}
        >
          <Text style={[styles.buttonText, { color: "black" }]}>Done</Text>
        </TouchableOpacity>
      )}
      {!isMobileVerified && (
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.headerTitleContainer}>
              <TouchableOpacity>
                <InfoIcon />
              </TouchableOpacity>
              <Text style={styles.title}>Verify Mobile no. in 10 Days</Text>
            </View>
            <Text style={styles.subtitle}>
              Verifying your mobile no. helps protect your account and enables
              important notifications.
            </Text>
            <TouchableOpacity
              onPress={() => setMobileVerificationPopup(true)}
              style={[styles.verifyButton]}
              activeOpacity={0.8}
            >
              <Text style={styles.verifyButtonText}>
                Verify and Secure Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inputSection: {
    marginBottom: 20,
    marginTop: 10,
    width: "48%",
  },
  inputLabel: {
    fontSize: scaleFont(12),
    fontWeight: "400",
    fontFamily: "Mukta-Regular",
    color: "#5E5E5E",
    marginBottom: 8,
    letterSpacing: 0.1,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#1F2937",
    letterSpacing: 0.2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  inputText: {
    backgroundColor: "#FFFFFF",
    fontSize: scaleFont(12),
    fontFamily: "Mukta-Regular",
    color: "#1F2937",
    letterSpacing: 0.2,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 35,
    marginTop: 15,
  },
  verifyButton: {
    backgroundColor: "#081A35",
    paddingVertical: 13,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  verifyButtonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(14),
    fontWeight: "500",
    fontFamily: "Mukta-Bold",
    letterSpacing: 0.3,
  },
  fullnameInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  profileImgContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  editBtnImg: {
    backgroundColor: "#F3F3F3",
    borderWidth: 2,
    borderColor: "#FAFAFA",
    padding: 6,
    paddingRight: 9,
    paddingBottom: 9,
    position: "absolute",
    borderRadius: 9,
    right: -15,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#D3DAE5",
    marginBottom: 45,
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: scaleFont(16),
    fontFamily: "Mukta-Bold",
    color: "#1F2937",
    paddingLeft: 10,
  },
  subtitle: {
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Regular",
    color: "#6B7280",
    marginTop: 10,
  },
  settingDescription: {
    fontSize: scaleFont(13),
    fontFamily: "Mukta-Regular",
    color: "#6B7280",
  },
  button: {
    width: "48%",
    backgroundColor: "#081A35",
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(14),
    fontWeight: "500",
    fontFamily: "Mukta-Bold",
    letterSpacing: 0.3,
  },
});

export default EditProfile;
