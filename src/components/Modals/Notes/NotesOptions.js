import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React, { useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "../../../screens/Notes/Notes.styles";
import { Search, Trash } from "lucide-react-native";
import TrashIcon from "../../../../assets/SvgIconsComponent/ChatMenuOptionsIcons/TrashIcon";

const NotesOptions = ({ close, setFindInNotes, setToggleDeleteNotePopup }) => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity
        onPress={() => close(false)}
        style={styles.optionsPopupWrapper}
      ></TouchableOpacity>
      <View style={styles.notesPopup}>
        <Pressable
          onPress={() => {
            setFindInNotes(true);
            close(false);
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#EEF4FF" : "transparent",
            },
            styles.notesPopupOptions,
          ]}
        >
          <Search strokeWidth={1.25} />
          <Text>Find in Notes</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            close(false);
            setTimeout(() => {
              setToggleDeleteNotePopup(true);
            }, 300);
          }}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#EEF4FF" : "transparent",
            },
            styles.notesPopupOptions,
          ]}
        >
          <TrashIcon />
          <Text>Delete content</Text>
        </Pressable>
      </View>
    </>
  );
};

export default NotesOptions;
