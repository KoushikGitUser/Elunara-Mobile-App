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
import { setToggleAddItemsToInputPopup } from "../../../redux/slices/toggleSlice";
import { setSelecetdFiles } from "../../../redux/slices/globalDataSlice";
import { addItemsOptions } from "../../../data/datas";
import { Camera, File, Image } from "lucide-react-native";
import { scaleFont } from "../../../utils/responsive";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";

const AddItemsToInputPopup = () => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { width, height } = Dimensions.get("window");
  const { globalDataStates } = useSelector((state) => state.Global);

  const commonFunction = async (type) => {
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
          // Add captured photo to Redux
          const currentFiles = globalDataStates.selectedFiles || [];
          dispatch(setSelecetdFiles([...currentFiles, result.assets[0]]));
          dispatch(setToggleAddItemsToInputPopup(false));
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
          type: "*/*",
          copyToCacheDirectory: true,
        });

        if (!result.canceled) {
          console.log("Selected file:", result.assets[0]);
          // Add selected file to Redux
          const currentFiles = globalDataStates.selectedFiles || [];
          dispatch(setSelecetdFiles([...currentFiles, result.assets[0]]));
          dispatch(setToggleAddItemsToInputPopup(false));
          navigation.navigate("chat");
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
          if(result.assets[0].mimeType == "image/png" || result.assets[0].mimeType == "image/jpg" || result.assets[0].mimeType == "image/jpeg"){
          // Add selected photo to Redux
          const currentFiles = globalDataStates.selectedFiles || [];
          dispatch(setSelecetdFiles([...currentFiles, result.assets[0]]));
          dispatch(setToggleAddItemsToInputPopup(false));
          console.log(result.assets[0].mimeType,"fileinfo");

          }
          else{
            Alert.alert("Invalid type","The type of image you selected is not supported.")
          }

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
                  <Text style={{fontSize:scaleFont(13), fontWeight: pressed ? 600 : 400}}>{items?.text}</Text>
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
