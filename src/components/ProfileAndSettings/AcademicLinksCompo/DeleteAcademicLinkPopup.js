import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Platform,
  Image,
} from "react-native";
import { BlurView } from "@react-native-community/blur";
import deleteBin from "../../../assets/images/deleteBin.png";
import { scaleFont } from "../../../utils/responsive";
import { useDispatch, useSelector } from "react-redux";
import { commonFunctionForAPICalls } from "../../../redux/slices/apiCommonSlice";

/**
 * Delete-confirmation popup for an academic link.
 * Visual structure mirrors DeleteConfirmPopup (chat delete) — delete-bin icon
 * above the title, Cancel + Delete buttons below.
 */
const DeleteAcademicLinkPopup = ({ visible, link, deleteId, onClose }) => {
  const dispatch = useDispatch();
  const { settingsStates } = useSelector((state) => state.API);
  const isDeleting = settingsStates.deletingAcademicLink === true;

  const handleConfirmDelete = () => {
    if (deleteId === undefined || deleteId === null) {
      onClose();
      return;
    }
    dispatch(
      commonFunctionForAPICalls({
        method: "DELETE",
        url: `/settings/academic-links/${deleteId}`,
        name: "deleteAcademicLink",
      }),
    );
  };

  // Close popup automatically once the delete API resolves (handler flips
  // deletingAcademicLink back to false and academicLinkDeleted to true).
  React.useEffect(() => {
    if (visible && settingsStates.academicLinkDeleted === true) {
      onClose();
    }
  }, [settingsStates.academicLinkDeleted, visible]);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
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
          onPress={onClose}
        />

        <View style={styles.modalSheet}>
          <View style={styles.handleContainer}>
            <View style={styles.handle} />
          </View>

          <View style={styles.content}>
            <View style={styles.iconContainer}>
              <Image source={deleteBin} style={styles.deleteIcon} />
            </View>

            <Text
              style={[styles.title, { fontFamily: "Mukta-Bold" }]}
              numberOfLines={2}
              ellipsizeMode="middle"
            >
              Delete {link?.url || ""}?
            </Text>

            <Text
              style={[styles.description, { fontFamily: "Mukta-Regular" }]}
            >
              Are you sure you want to delete this academic link? You will no
              longer have quick access to it.
            </Text>

            <View style={styles.btnsMain}>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor: "white",
                    borderWidth: 1,
                    borderColor: "black",
                  },
                ]}
                onPress={onClose}
                activeOpacity={0.8}
                disabled={isDeleting}
              >
                <Text
                  style={[
                    styles.buttonText,
                    { color: "black", fontFamily: "Mukta-Regular" },
                  ]}
                >
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, isDeleting && { opacity: 0.7 }]}
                onPress={handleConfirmDelete}
                activeOpacity={0.8}
                disabled={isDeleting}
              >
                <Text
                  style={[styles.buttonText, { fontFamily: "Mukta-Regular" }]}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </Text>
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
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: Platform.OS === "ios" ? 0 : 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 20,
  },
  handleContainer: {
    alignItems: "center",
    paddingTop: 8,
  },
  handle: {
    width: 0,
    height: 0,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  iconContainer: {
    marginBottom: 24,
  },
  deleteIcon: {
    height: 55,
    width: 50,
    objectFit: "contain",
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
  btnsMain: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
});

export default DeleteAcademicLinkPopup;
