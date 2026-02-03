import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { scaleFont } from "../../../utils/responsive";
import { ArrowLeft } from "lucide-react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  setToggleRoomToolsPopupStates,
  setToggleRoomToolsPopup,
  setSelectedRoomLanguage,
} from "../../../redux/slices/toggleSlice";
import { commonFunctionForAPICalls } from "../../../redux/slices/apiCommonSlice";
import { triggerToast } from "../../../services/toast";
import Toaster from "../../UniversalToaster/Toaster";

const screenHeight = Dimensions.get("window").height;

const RoomResponseLangState = () => {
  const dispatch = useDispatch();
  const [selectedLanguage, setSelectedLanguageLocal] = useState(null);
  const { settingsStates, roomsStates } = useSelector((state) => state.API);
  const { roomCustomisationStates } = useSelector((state) => state.Toggle);

  // Fetch languages on mount
  useEffect(() => {
    const payload = {
      method: "GET",
      url: "/master/languages",
      name: "getAllLanguagesAvailable",
    };
    dispatch(commonFunctionForAPICalls(payload));
  }, []);

  const allLanguages = settingsStates?.settingsMasterDatas?.allLanguagesAvailable || [];
  const isLoading = !allLanguages.length;

  useEffect(() => {
    if (roomCustomisationStates?.selectedRoomLanguage?.id !== undefined) {
      setSelectedLanguageLocal(roomCustomisationStates.selectedRoomLanguage.id);
    } else {
      // Find English as default
      const english = allLanguages.find(lang => lang.name?.toLowerCase() === "english");
      setSelectedLanguageLocal(english?.id || null);
    }
  }, [roomCustomisationStates?.selectedRoomLanguage, allLanguages.length]);

  // Handle language selection and update room
  const handleLanguageSelection = (langOption) => {
    const selectedData = {
      id: langOption.id,
      name: langOption.name,
    };
    dispatch(setSelectedRoomLanguage(selectedData));
    setSelectedLanguageLocal(langOption.id);

    // Update room with selected language
    const roomUuid = roomsStates.currentRoom?.uuid;
    if (roomUuid) {
      const payload = {
        method: "PUT",
        url: `/rooms/${roomUuid}`,
        name: "update-room",
        data: {
          response_language_id: langOption.id,
        },
      };
      dispatch(commonFunctionForAPICalls(payload))
        .unwrap()
        .then(() => {
          triggerToast("Success", `Language set to ${langOption.name}`, "success", 2000);
        })
        .catch(() => {
          triggerToast("Error", "Failed to update language", "error", 3000);
        });
    }
  };

  const RadioButton = ({ selected }) => (
    <View style={[styles.radioOuter, { borderColor: selected ? "black" : "#D3DAE5" }]}>
      {selected && <View style={styles.radioInner} />}
    </View>
  );

  return (
    <View style={styles.modalSheet}>
      <View style={styles.content}>
        <View style={styles.closeModalMain}>
          <TouchableOpacity
            onPress={() => dispatch(setToggleRoomToolsPopupStates(0))}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <ArrowLeft size={30} strokeWidth={2} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => dispatch(setToggleRoomToolsPopup(false))}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={[styles.title, { fontFamily: "Mukta-Bold" }]}>Response Language</Text>
        <Text style={[styles.description, { fontFamily: "Mukta-Regular" }]}>
          Choose the language for AI responses in this room.
        </Text>

        {isLoading ? (
          <View style={{ paddingVertical: 40, alignItems: "center" }}>
            <ActivityIndicator size="small" color="#081A35" />
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.optionsContainer}
          >
            <View style={{ flexDirection: "column" }}>
              {allLanguages?.map((langOption, optionsIndex) => {
                const isSelected = selectedLanguage === langOption.id;

                return (
                  <TouchableOpacity
                    key={langOption.id || optionsIndex}
                    style={[
                      styles.card,
                      {
                        backgroundColor: isSelected ? "#EEF4FF" : "white",
                        borderColor: isSelected ? "black" : "#D3DAE5",
                      },
                    ]}
                    onPress={() => handleLanguageSelection(langOption)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.contentMain}>
                      <View style={styles.textContainer}>
                        <Text
                          style={[
                            styles.optionTitle,
                            { fontSize: scaleFont(18), fontWeight: 600, fontFamily: "Mukta-Bold" },
                          ]}
                        >
                          {langOption.name}
                        </Text>
                      </View>
                    </View>
                    <RadioButton selected={isSelected} />
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalSheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: Platform.OS === "ios" ? 40 : 24,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
    maxHeight: screenHeight * 0.8,
  },
  closeModalMain: {
    width: "100%",
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: scaleFont(26),
    color: "#1F2937",
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: scaleFont(13),
    lineHeight: 24,
    color: "#6B7280",
    marginBottom: 32,
    letterSpacing: 0.2,
  },
  optionsContainer: {
    maxHeight: screenHeight * 0.55,
    flexDirection: "column",
  },
  card: {
    borderWidth: 1,
    borderColor: "#D3DAE5",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 18,
    backgroundColor: "white",
    marginBottom: 15,
  },
  contentMain: {
    flexDirection: "row",
    gap: 10,
    width: "85%",
    alignItems: "flex-start",
  },
  textContainer: {
    flexDirection: "column",
    gap: 5,
  },
  radioOuter: {
    width: 23,
    height: 23,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#D3DAE5",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  radioInner: {
    width: "80%",
    height: "80%",
    borderRadius: 50,
    backgroundColor: "#000000ff",
  },
});

export default RoomResponseLangState;
