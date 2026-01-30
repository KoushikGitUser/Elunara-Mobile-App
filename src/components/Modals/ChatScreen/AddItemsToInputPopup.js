import {
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Pressable,
  Alert,
} from "react-native";
import React, { useMemo } from "react";
import { createStyles } from "./chatModals.styles";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setToggleAddItemsToInputPopup, setToggleUnlockMaxUploadLimitPopup } from "../../../redux/slices/toggleSlice";
import { setSelecetdFiles, addUploadedAttachmentId, setIsUploadingAttachment } from "../../../redux/slices/globalDataSlice";
import { addItemsOptions } from "../../../data/datas";
import { Camera, File, Image } from "lucide-react-native";
import { scaleFont } from "../../../utils/responsive";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { triggerToast } from "../../../services/toast";
import { commonFunctionForAPICalls } from "../../../redux/slices/apiCommonSlice";
import { SUPPORTED_DOCUMENT_TYPES, SUPPORTED_EXTENSIONS } from "../../../components/ChatScreen/ChatInputCompos/SelectedFilesCompo/DocumentFile";

const MAX_ATTACHMENTS = 3;
const MAX_FILE_SIZE_MB = 2;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024; // 2MB in bytes

// Supported MIME types for all files
const SUPPORTED_IMAGE_TYPES = ["image/png", "image/jpg", "image/jpeg"];
const SUPPORTED_PDF_TYPE = "application/pdf";

// Combined list of all supported MIME types
const ALL_SUPPORTED_TYPES = [
  ...SUPPORTED_IMAGE_TYPES,
  SUPPORTED_PDF_TYPE,
  ...SUPPORTED_DOCUMENT_TYPES,
];

// Check if file type is supported
const isFileTypeSupported = (mimeType, fileName) => {
  // Check MIME type first
  if (mimeType && ALL_SUPPORTED_TYPES.includes(mimeType)) {
    return true;
  }

  // Fallback to extension check for files with generic MIME types
  if (fileName) {
    const ext = fileName.split(".").pop()?.toLowerCase();
    const allExtensions = ["png", "jpg", "jpeg", "pdf", ...SUPPORTED_EXTENSIONS];
    return allExtensions.includes(ext);
  }

  return false;
};

const AddItemsToInputPopup = () => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { width, height } = Dimensions.get("window");
  const { globalDataStates } = useSelector((state) => state.Global);

  // Upload file to API and get attachment ID
  const uploadFileToAPI = async (file) => {
    const formData = new FormData();
    formData.append("file", {
      uri: file.uri,
      name: file.name || file.fileName || `file_${Date.now()}`,
      type: file.mimeType || "application/octet-stream",
    });

    const uploadPayload = {
      method: "POST",
      url: "/attachments",
      data: formData,
      name: "upload-attachment",
      headers: { "Content-Type": "multipart/form-data" },
    };

    console.log("📤 UPLOAD: Uploading file:", file.name || file.fileName);
    console.log("📤 UPLOAD: FormData payload:", { uri: file.uri, name: file.name || file.fileName, type: file.mimeType });

    try {
      const response = await dispatch(commonFunctionForAPICalls(uploadPayload)).unwrap();
      console.log("📤 UPLOAD: Response:", JSON.stringify(response, null, 2));
      if (response?.data?.status === "success" && response?.data?.data?.id) {
        console.log("📤 UPLOAD: Got attachment ID:", response.data.data.id);
        return response.data.data.id;
      }
      console.log("📤 UPLOAD: No attachment ID in response");
      return null;
    } catch (error) {
      console.error("📤 UPLOAD: Error:", error);
      return null;
    }
  };

  // Add file with upload - validates file type and size first before uploading
  const addFileWithUpload = async (file) => {
    // Validate file type BEFORE uploading
    if (!isFileTypeSupported(file.mimeType, file.name || file.fileName)) {
      triggerToast(
        "Unsupported File",
        "This file type is not supported. Please select images, PDF, Word, Excel, PowerPoint, or text files.",
        "error",
        3000
      );
      dispatch(setToggleAddItemsToInputPopup(false));
      return false;
    }

    // Validate file size BEFORE uploading (max 2MB)
    const fileSize = file.fileSize || file.size || 0;
    if (fileSize > MAX_FILE_SIZE_BYTES) {
      const fileSizeMB = (fileSize / (1024 * 1024)).toFixed(2);
      triggerToast(
        "File Too Large",
        `File size (${fileSizeMB}MB) exceeds the maximum limit of ${MAX_FILE_SIZE_MB}MB.`,
        "error",
        3000
      );
      dispatch(setToggleAddItemsToInputPopup(false));
      return false;
    }

    dispatch(setIsUploadingAttachment(true));
    dispatch(setToggleAddItemsToInputPopup(false)); // Close popup immediately

    const attachmentId = await uploadFileToAPI(file);
    dispatch(setIsUploadingAttachment(false));

    if (attachmentId) {
      // Add file to selectedFiles with attachmentId
      const fileWithId = { ...file, attachmentId };
      const currentFiles = globalDataStates.selectedFiles || [];
      console.log("📤 UPLOAD: Adding file with ID:", attachmentId);
      console.log("📤 UPLOAD: Current uploadedAttachmentIds before add:", globalDataStates.uploadedAttachmentIds);
      dispatch(setSelecetdFiles([...currentFiles, fileWithId]));
      dispatch(addUploadedAttachmentId(attachmentId));
      return true;
    } else {
      triggerToast("Upload Failed", "Failed to upload attachment", "error", 3000);
      return false;
    }
  };

  const commonFunction = async (type) => {
    // Check max attachment limit
    const currentFiles = globalDataStates.selectedFiles || [];
    if (currentFiles.length >= MAX_ATTACHMENTS) {
      triggerToast("Limit Reached", `Maximum ${MAX_ATTACHMENTS} attachments allowed`, "error", 3000);
      dispatch(setToggleAddItemsToInputPopup(false));
      return;
    }
    if(type=="Camera"){
      // Open camera functionality
      try {
        // First check current permission status
        const permissionResult = await ImagePicker.getCameraPermissionsAsync();

        if (permissionResult.status !== "granted") {
          // Request permission if not granted
          const requestResult = await ImagePicker.requestCameraPermissionsAsync();

          if (requestResult.status !== "granted") {
            Alert.alert(
              "Permission Denied",
              "Camera permission is required to take photos. Please enable it in your device settings."
            );
            return;
          }
        }

        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          quality: 1,
        });

        if (!result.canceled) {
          console.log("Camera photo:", result.assets[0]);
          // Upload and add captured photo
          await addFileWithUpload(result.assets[0]);
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
        Alert.alert("Error", "Failed to open camera.");
      }
    }
    else if(type=="Files"){
      // Open file picker functionality
      try {
        // First check current permission status
        const permissionResult = await ImagePicker.getMediaLibraryPermissionsAsync();

        if (permissionResult.status !== "granted") {
          // Request permission if not granted
          const requestResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

          if (requestResult.status !== "granted") {
            Alert.alert(
              "Permission Denied",
              "Storage permission is required to access files. Please enable it in your device settings."
            );
            return;
          }
        }

        const result = await DocumentPicker.getDocumentAsync({
          type: [
            "application/pdf",
            ...SUPPORTED_DOCUMENT_TYPES,
            "*/*", // Allow all but validate after selection
          ],
          copyToCacheDirectory: true,
        });

        if (!result.canceled) {
          const selectedFile = result.assets[0];
          console.log("Selected file:", selectedFile);

          // Validation happens inside addFileWithUpload
          const success = await addFileWithUpload(selectedFile);
          if (success) {
            navigation.navigate("chat");
          }
        }
      } catch (error) {
        console.error("Error picking document:", error);
        Alert.alert("Error", "Failed to pick document.");
      }
    }
    else if(type=="Photos"){
      // Open image gallery functionality
      try {
        // First check current permission status
        const permissionResult = await ImagePicker.getMediaLibraryPermissionsAsync();

        if (permissionResult.status !== "granted") {
          // Request permission if not granted
          const requestResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

          if (requestResult.status !== "granted") {
            Alert.alert(
              "Permission Denied",
              "Gallery permission is required to select photos. Please enable it in your device settings."
            );
            return;
          }
        }

        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          quality: 1,
        });

        if (!result.canceled) {
          const selectedPhoto = result.assets[0];
          console.log(selectedPhoto.mimeType, "fileinfo");
          // Validation happens inside addFileWithUpload
          await addFileWithUpload(selectedPhoto);
        }
      } catch (error) {
        console.error("Error picking image:", error);
        Alert.alert("Error", "Failed to pick image.");
      }
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => dispatch(setToggleAddItemsToInputPopup(false))}
        style={styles.fullScreenWrapper}
      ></TouchableOpacity>
      <View style={styles.addItemsMain}>
        {addItemsOptions.map((items, itemIndex) => {
          return (
            <Pressable
              onPress={() => {
                commonFunction(items.text);
              }}
              key={itemIndex}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "#EEF4FF" : "transparent",
                },
                styles.menuOptionsMain,
              ]}
            >
              {({ pressed }) => (
                <>
                  {items.text == "Camera" ? (
                    <Camera size={22} strokeWidth={1.25} />
                  ) : items.text == "Files" ? (
                    <File strokeWidth={1.25} size={22} />
                  ) : (
                    <Image size={22} strokeWidth={1.25}  />
                  )}
                  <Text style={{fontSize:scaleFont(15), fontWeight: pressed ? 600 : 400,fontFamily:pressed?"Mukta-Bold":"Mukta-Regular"}}>{items?.text}</Text>
                </>
              )}
            </Pressable>
          );
        })}
      </View>
    </>
  );
};

export default AddItemsToInputPopup;
