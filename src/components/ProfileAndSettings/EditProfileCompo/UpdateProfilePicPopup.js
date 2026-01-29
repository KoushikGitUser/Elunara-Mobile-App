import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
  Alert,
  Image,
} from "react-native";
import React from "react";
import { scaleFont } from "../../../utils/responsive";
import { BlurView } from "@react-native-community/blur";
import { useDispatch, useSelector } from "react-redux";
import { setToggleUpdateProfilePicPopup } from "../../../redux/slices/toggleSlice";
import { commonFunctionForAPICalls } from "../../../redux/slices/apiCommonSlice";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import ProfilePicUploadIcon from "../../../../assets/SvgIconsComponent/EditProfileIcon/ProfilePicUploadIcon";
import CorporateAvatarIcon from "../../../../assets/SvgIconsComponent/EditProfileIcon/CorporateAvatarIcon";
import TeacherAvatarIcon from "../../../../assets/SvgIconsComponent/EditProfileIcon/TeacherAvatarIcon";
import MaleStudentAvatarIcon from "../../../../assets/SvgIconsComponent/EditProfileIcon/MaleStudentAvatarIcon";
import FemaleStudentAvatarIcon from "../../../../assets/SvgIconsComponent/EditProfileIcon/FemaleStudentAvatarIcon";
import { setProfilePictureAvatar, setProfilePictureType } from "../../../redux/slices/globalDataSlice";
import { appColors } from "../../../themes/appColors";
import { Check } from "lucide-react-native";

import corporateAvatar from '../../../assets/images/Corporate2.png';
import teacherAvatar from '../../../assets/images/Teacher2.png';
import maleStudentAvatar from '../../../assets/images/Student Male2.png';
import femaleStudentAvatar from '../../../assets/images/Student Female2.png';

 
const UpdateProfilePicPopup = ({setSelectedImage}) => {
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { globalDataStates } = useSelector((state) => state.Global);

  const dispatch = useDispatch();

  const updateAvatarImage = (avatarType) => {
    const payload = {
      method: "PUT",
      url: "/settings/profile/avatar",
      name: "updateProfileAvatarImage",
      data: {
        avatar_type: avatarType,
      },
    };
    dispatch(commonFunctionForAPICalls(payload));
  };

    const triggerImagePicker = async () => {
    // Open image gallery functionality
    try {
      // First check current permission status
      const permissionResult =
        await ImagePicker.getMediaLibraryPermissionsAsync();

      if (permissionResult.status !== "granted") {
        // Request permission if not granted
        const requestResult =
          await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (requestResult.status !== "granted") {
          Alert.alert(
            "Permission Denied",
            "Gallery permission is required to select photos. Please enable it in your device settings."
          );
          return;
        }
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        quality: 1,
      });

      if (!result.canceled) {
        const selectedAsset = result.assets[0];
        const maxFileSize = 2 * 1024 * 1024; // 2MB in bytes

        // Check file size (max 2MB)
        if (selectedAsset.fileSize && selectedAsset.fileSize > maxFileSize) {
          Alert.alert(
            "File too large",
            "The selected image exceeds 2MB. Please select a smaller image."
          );
          return;
        }

        if (
          selectedAsset.mimeType == "image/png" ||
          selectedAsset.mimeType == "image/jpg" ||
          selectedAsset.mimeType == "image/jpeg"
        ) {
          console.log("inside pro img update");
          
          // Add selected photo to Redux
          setSelectedImage(selectedAsset.uri);

          // Create FormData and call API
          const formData = new FormData();
          formData.append("profile_image", {
            uri: selectedAsset.uri,
            type: selectedAsset.mimeType,
            name: selectedAsset.fileName || "profile_image.jpg",
          });

          const payload = {
            method: "POST",
            url: "/settings/profile/photo",
            data: formData,
            name: "updateProfileImage",
            headers: {
              "Content-Type": "multipart/form-data",
            },
          };
          console.log("inside pro img update2222", payload);
          dispatch(commonFunctionForAPICalls(payload));
          console.log("inside pro img update33333");
        } else {
          Alert.alert(
            "Invalid type",
            "The type of image you selected is not supported."
          );
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image.");
    }
  };

  return (
    <Modal
      visible={toggleStates.toggleUpdateProfilePicPopup}
      transparent={true}
      animationType="slide"
      onRequestClose={() => dispatch(setToggleUpdateProfilePicPopup(false))}
    >
      <View style={styles.container}>
        {/* Blur Background */}

        <BlurView
          style={styles.blurView}
          blurType="light"
          blurAmount={7}
          reducedTransparencyFallbackColor="rgba(0, 0, 0, 0.43)"
        />
        <View style={styles.androidBlur} />

        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={() => dispatch(setToggleUpdateProfilePicPopup(false))}
        />

        {/* Modal Sheet */}
        <View style={styles.modalSheet}>
          {/* Content */}
          <View style={styles.content}>
            {/* Title */}
            <Text style={[styles.title, { fontFamily: "Mukta-Bold" }]}>
              Edit Profile Picture
            </Text>

            <TouchableOpacity onPress={()=>{
                dispatch(setToggleUpdateProfilePicPopup(false));
                setTimeout(() => {
                  triggerImagePicker();
                }, 300);
            }} activeOpacity={0.7} style={styles.uploadBoxMain}>
              <View style={styles.innerContent}>
                <ProfilePicUploadIcon />

                {/* Title */}
                <Text style={styles.titleUpload}>
                  Click to upload from Gallery
                </Text>

                {/* Subtitle */}
                <Text style={styles.subtitle}>
                  SVG, PNG, JPG or GIF (max. 800×400px)
                </Text>
              </View>
            </TouchableOpacity>

            <Text
              style={[styles.subtitle, { marginTop: 20, marginBottom: 10 }]}
            >
              or
            </Text>

            <Text style={[styles.title, { fontFamily: "Mukta-Bold",fontSize:scaleFont(23),}]}>
             Choose your Avatar
            </Text>

            <View style={styles.avatarContainer}>
                <TouchableOpacity style={{position:"relative"}} onPress={()=>{
                  dispatch(setProfilePictureType("avatar"));
                  dispatch(setProfilePictureAvatar(1));
                  setSelectedImage(corporateAvatar);
                  updateAvatarImage("corporate");
                  setTimeout(() => {
                     dispatch(setToggleUpdateProfilePicPopup(false));
                  }, 500);

                }}>
                  <Image style={{height:80,width:80,objectFit:"contain",borderWidth:globalDataStates.profilePictureType == "avatar" && globalDataStates.profilePictureAvatar == 1?2.5:0,borderColor:"#081A35",borderRadius:16}} source={corporateAvatar} />
                  {globalDataStates.profilePictureType == "avatar" && globalDataStates.profilePictureAvatar == 1?<View style={styles.checkCircle}>
                    <Check size={16} color="#FFFFFF" strokeWidth={3} />
                  </View>:null}
                </TouchableOpacity>
                 <TouchableOpacity style={{position:"relative"}} onPress={()=>{
                  dispatch(setProfilePictureType("avatar"));
                  dispatch(setProfilePictureAvatar(2));
                  setSelectedImage(teacherAvatar);
                  updateAvatarImage("teacher");
                  setTimeout(() => {
                     dispatch(setToggleUpdateProfilePicPopup(false));
                  }, 500);
                 }}>
                  <Image style={{height:80,width:80,objectFit:"contain",borderWidth:globalDataStates.profilePictureType == "avatar" && globalDataStates.profilePictureAvatar == 2?2.5:0,borderColor:"#081A35",borderRadius:16}} source={teacherAvatar} />
                  {globalDataStates.profilePictureType == "avatar" && globalDataStates.profilePictureAvatar == 2?<View style={styles.checkCircle}>
                    <Check size={16} color="#FFFFFF" strokeWidth={3} />
                  </View>:null}
                </TouchableOpacity>
                 <TouchableOpacity style={{position:"relative"}} onPress={()=>{
                  dispatch(setProfilePictureType("avatar"));
                  dispatch(setProfilePictureAvatar(3));
                  setSelectedImage(maleStudentAvatar);
                  updateAvatarImage("student_male");
                  setTimeout(() => {
                     dispatch(setToggleUpdateProfilePicPopup(false));
                  }, 500);
                 }}>
                 <Image style={{height:80,width:80,objectFit:"contain",borderWidth:globalDataStates.profilePictureType == "avatar" && globalDataStates.profilePictureAvatar == 3?2.5:0,borderColor:"#081A35",borderRadius:16}} source={maleStudentAvatar} />
                 {globalDataStates.profilePictureType == "avatar" && globalDataStates.profilePictureAvatar == 3?<View style={styles.checkCircle}>
                   <Check size={16} color="#FFFFFF" strokeWidth={3} />
                 </View>:null}
                </TouchableOpacity>
                 <TouchableOpacity style={{position:"relative"}} onPress={()=>{
                  dispatch(setProfilePictureType("avatar"));
                  dispatch(setProfilePictureAvatar(4));
                  setSelectedImage(femaleStudentAvatar);
                  updateAvatarImage("student_female");
               setTimeout(() => {
                     dispatch(setToggleUpdateProfilePicPopup(false));
                  }, 500);
                 }}>
                    <Image style={{height:80,width:80,objectFit:"contain",borderWidth:globalDataStates.profilePictureType == "avatar" && globalDataStates.profilePictureAvatar == 4?2.5:0,borderColor:"#081A35",borderRadius:16}} source={femaleStudentAvatar} />
                    {globalDataStates.profilePictureType == "avatar" && globalDataStates.profilePictureAvatar == 4?<View style={styles.checkCircle}>
                      <Check size={16} color="#FFFFFF" strokeWidth={3} />
                    </View>:null}
                </TouchableOpacity>

            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  blurView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  androidBlur: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.18)",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalSheet: {
    backgroundColor: "#FAFAFA",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: Platform.OS === "ios" ? 40 : 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 20,
  },
  btnsMain: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  verifiedIcon: {
    height: 55,
    width: 50,
    objectFit: "contain",
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: scaleFont(26),
    color: "#1F2937",
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: scaleFont(13),
    lineHeight: 24,
    color: "#6B7280",
    marginBottom: 32,
    letterSpacing: 0.2,
  },
  button: {
    width: "48%",
    backgroundColor: "#081A35",
    paddingVertical: 13,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(13),
    fontWeight: "500",
    letterSpacing: 0.3,
  },
  uploadBoxMain: {
    borderWidth: 2,
    borderColor: "#B9C3D3",
    borderStyle: "dashed",
    borderRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "#ffffffff",
    marginTop: 10,
  },
  innerContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  titleUpload: {
    marginTop: 10,
    fontSize: scaleFont(14),
    color: "#081A35",
    fontFamily: "Mukta-Bold",
    textAlign: "center",
    borderBottomWidth: 1,
  },
  subtitle: {
    marginTop: 10,
    fontSize: scaleFont(12),
    color: "#757575",
    textAlign: "center",
  },
  avatarContainer:{
    width:"100%",
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    marginBottom:30
  },
  checkCircle:{
    position:"absolute",
    top:-6,
    right:-6,
    width:26,
    height:26,
    borderRadius:13,
    backgroundColor:appColors.navyBlueShade,
    borderWidth:2,
    borderColor:"#FAFAFA",
    alignItems:"center",
    justifyContent:"center",
  }
});

export default UpdateProfilePicPopup;
