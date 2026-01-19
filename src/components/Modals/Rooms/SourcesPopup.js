import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { scaleFont } from "../../../utils/responsive";
import { File } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { useDispatch, useSelector } from "react-redux";
import { setToggleAddLinkPopup } from "../../../redux/slices/toggleSlice";
import { commonFunctionForAPICalls } from "../../../redux/slices/apiCommonSlice";

const { width, height } = Dimensions.get("window");

const SourcesPopup = ({ setSourcesPopup }) => {
  const { roomsStates } = useSelector((state) => state.API);

  const handleAddFile = async () => {
    // Request media library permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Please grant access to your photos and files to add attachments.",
      );
      return;
    }

    // Open document picker
    const result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    });

    if (result.canceled) return;

    const file = result.assets[0];
    const formData = new FormData();
    formData.append("file", {
      uri: file.uri,
      name: file.name,
      type: file.mimeType || "application/pdf",
    });

    const uploadPayload = {
      method: "POST",
      url: "/attachments",
      data: formData,
      name: "upload-attachment",
      headers: { "Content-Type": "multipart/form-data" },
    };

    dispatch(commonFunctionForAPICalls(uploadPayload)).then((response) => {
      if (response?.payload?.data?.status === "success") {
        const newAttachmentId = response.payload.data.data.id;
        const currentAttachmentIds =
          roomsStates.currentRoom?.attachments?.map((a) => a.id) || [];
        const updatedAttachmentIds = [...currentAttachmentIds, newAttachmentId];

        const updatePayload = {
          method: "PUT",
          url: `/rooms/${roomsStates.currentRoom.uuid}`,
          data: { attachments: updatedAttachmentIds },
          name: "update-room",
        };

        dispatch(commonFunctionForAPICalls(updatePayload)).then(() => {
          dispatch(
            commonFunctionForAPICalls({
              method: "GET",
              url: `/rooms/${roomsStates.currentRoom.uuid}`,
              name: "get-room",
            }),
          );
        });
      }
    });

    setSourcesPopup(false);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setSourcesPopup(false)}
        style={styles.optionsPopupWrapper}
      ></TouchableOpacity>
      <View style={styles.notesPopup}>
        <Pressable
          onPress={handleAddFile}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#EEF4FF" : "transparent",
            },
            styles.notesPopupOptions,
          ]}
        >
          <File strokeWidth={1.25} />
          <Text style={{ fontFamily: "Mukta-Regular" }}>Add File</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setSourcesPopup(false);
            dispatch(setToggleAddLinkPopup(true));
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#EEF4FF" : "transparent",
            },
            styles.notesPopupOptions,
          ]}
        >
          <Feather name="link" size={20} color="black" />
          <Text style={{ fontFamily: "Mukta-Regular" }}>Add Link</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  notesPopup: {
    position: "absolute",
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#D3DAE5",
    borderRadius: 21,
    padding: 7,
    width: "auto",
    top: 50,
    right: 0,
    zIndex: 9999,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 5,
  },
  notesPopupOptions: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 10,
    alignItems: "center",
    width: "100%",
    height: 45,
    padding: 9,
    borderRadius: 12,
    paddingRight: 40,
  },
  optionsPopupWrapper: {
    position: "absolute",
    bottom: -50,
    left: -20,
    width,
    height,
    zIndex: 9999,
    backgroundColor: "transparent",
  },
});

export default SourcesPopup;
