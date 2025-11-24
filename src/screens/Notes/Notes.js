import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Keyboard,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "./Notes.styles";
import * as ImagePicker from "expo-image-picker";
import Feather from "@expo/vector-icons/Feather";
import {
  ArrowLeft,
  Bold,
  CaseSensitive,
  ChevronDown,
  ChevronUp,
  CircleX,
  Download,
  EllipsisVertical,
  Italic,
  Plus,
  Redo,
  Search,
  TextAlignCenter,
  TextAlignEnd,
  TextAlignJustify,
  TextAlignStart,
  Underline,
  Undo,
  X,
} from "lucide-react-native";

import CharacterCaseIcon from "../../../assets/SvgIconsComponent/NotesSectionIcons/CharacterCaseIcon";
import TextJustifyIcon from "../../../assets/SvgIconsComponent/NotesSectionIcons/TextJustifyIcon";
import TextStartIcon from "../../../assets/SvgIconsComponent/NotesSectionIcons/TextStartIcon";
import TextCenterIcon from "../../../assets/SvgIconsComponent/NotesSectionIcons/TextCenterIcon";
import TextEndIcon from "../../../assets/SvgIconsComponent/NotesSectionIcons/TextEndIcon";
import TextBoldIcon from "../../../assets/SvgIconsComponent/NotesSectionIcons/TextBoldIcon";
import TextItalicIcon from "../../../assets/SvgIconsComponent/NotesSectionIcons/TextItalicIcon";
import TextUnderlineIcon from "../../../assets/SvgIconsComponent/NotesSectionIcons/TextUnderlineIcon";
import NotesOptions from "../../components/Modals/Notes/NotesOptions";
import DeleteNoteConfirmPopup from "../../components/Notes/DeleteNoteConfirmPopup";

const Notes = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [toggleTextActionTab, setToggleTextActionTab] = useState(true);
  const [toggleOptionsPopup, setToggleOptionsPopup] = useState(false);
  const [findInNotes, setFindInNotes] = useState(false);
  const [toggleDeleteNotePopup, setToggleDeleteNotePopup] = useState(false);

  const [blocksForRichText, setBlocksForRichText] = useState([
    { id: Date.now(), type: "text", value: "" },
  ]);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", (e) => {
      setKeyboardVisible(true);
      setKeyboardHeight(e.endCoordinates.height); // <-- set height
    });

    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
      setKeyboardHeight(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  // Insert an image block using Expo Image Picker
  const addImageBlock = async () => {
    // Ask for permission
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.status !== "granted") {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 0.8,
      allowsMultipleSelection: false,
    });

    if (result.canceled) return;

    const uri = result.assets[0].uri;

    setBlocksForRichText((prev) => [
      ...prev,
      { id: Date.now(), type: "image", uri },
      { id: Date.now() + 1, type: "text", value: "" }, // Auto add new text block
    ]);
  };

  const screenHeight = Dimensions.get("window").height;

  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.notesMainWrapper}>
      {toggleOptionsPopup && (
        <NotesOptions
          setToggleDeleteNotePopup={setToggleDeleteNotePopup}
          setFindInNotes={setFindInNotes}
          close={setToggleOptionsPopup}
        />
      )}
      <DeleteNoteConfirmPopup
        setToggleDeleteNotePopup={setToggleDeleteNotePopup}
        toggleDeleteNotePopup={toggleDeleteNotePopup}
      />

      {/* header */}
      <View style={styles.notesHeader}>
        <TouchableOpacity
          onPress={() => navigation.navigate("chat")}
          style={styles.backBtn}
        >
          <ArrowLeft size={25} strokeWidth={1.5} />
        </TouchableOpacity>
        <View style={styles.rightOptionsMain}>
          <Undo size={25} strokeWidth={1.5} />
          <Redo size={25} strokeWidth={1.5} />
          <Download size={25} strokeWidth={1.5} />
          <TouchableOpacity
            onPress={() => setToggleOptionsPopup(true)}
            style={styles.menuDots}
          >
            <EllipsisVertical size={25} strokeWidth={1.5} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.doneBtn}>
            <Text style={{ fontWeight: 600 }}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* header */}

      {/* middle */}
      <ScrollView style={styles.textPlusImgArea}>
        {blocksForRichText.map((block, index) =>
          block.type === "text" ? (
            <TextInput
              key={block.id}
              multiline
              style={{ fontSize: 18, paddingVertical: 10 }}
              value={block.value}
              onChangeText={(text) => {
                const updated = [...blocksForRichText];
                updated[index].value = text;
                setBlocksForRichText(updated);
              }}
            />
          ) : (
            <Image
              key={block.id}
              source={{ uri: block.uri }}
              style={{
                width: "95%",
                height: 200,
                borderRadius: 8,
                marginVertical: 10,
              }}
            />
          )
        )}
        <View style={{ height: keyboardVisible ? screenHeight : 100 }} />
      </ScrollView>

      {/* middle */}

      {/* Footer actions */}
      {!toggleTextActionTab && !findInNotes && (
        <TouchableOpacity
          onPress={() => setToggleTextActionTab(true)}
          style={[
            styles.collapsedButton,
            { bottom: keyboardVisible ? keyboardHeight + 70 : 60 },
          ]}
        >
          <Plus size={25} color="white" strokeWidth={1.25} />
        </TouchableOpacity>
      )}

      {findInNotes && (
        <View
          style={[
            styles.footerActions,
            { bottom: keyboardVisible ? keyboardHeight : 0 },
          ]}
        >
          <View style={styles.searchInputMain}>
            <Search
              size={25}
              strokeWidth={1.25}
              color="#B5BECE"
              style={styles.searchIcon}
            />
            <TextInput
              placeholder="Search"
              placeholderTextColor="#B5BECE"
              style={styles.searchInput}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <ChevronDown size={35} strokeWidth={1.25} />
            <ChevronUp size={35} strokeWidth={1.25} />
          </View>

          <TouchableOpacity
            onPress={() => setFindInNotes(false)}
            style={styles.crossIcon}
          >
            <X size={20} strokeWidth={1.25} />
          </TouchableOpacity>
        </View>
      )}

      {toggleTextActionTab && !findInNotes && (
        <View
          style={[
            styles.footerActions,
            { bottom: keyboardVisible ? keyboardHeight : 0 },
          ]}
        >
          <TouchableOpacity>
            <CharacterCaseIcon />
          </TouchableOpacity>

          <TouchableOpacity>
            <TextBoldIcon />
          </TouchableOpacity>
          <TouchableOpacity>
            <TextItalicIcon />
          </TouchableOpacity>
          <TouchableOpacity>
            <TextUnderlineIcon />
          </TouchableOpacity>
          <TouchableOpacity>
            <TextJustifyIcon />
          </TouchableOpacity>
          <TouchableOpacity>
            <TextStartIcon />
          </TouchableOpacity>
          <TouchableOpacity>
            <TextCenterIcon />
          </TouchableOpacity>
          <TouchableOpacity>
            <TextEndIcon />
          </TouchableOpacity>
          <Feather
            onPress={addImageBlock}
            name="image"
            size={24}
            color="black"
          />
          <TouchableOpacity
            onPress={() => setToggleTextActionTab(false)}
            style={styles.crossIcon}
          >
            <X size={20} strokeWidth={1.25} />
          </TouchableOpacity>
        </View>
      )}

      {/* Footer actions */}
    </SafeAreaView>
  );
};

export default Notes;
