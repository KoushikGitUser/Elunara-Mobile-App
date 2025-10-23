import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "./Notes.styles";
import {
  ArrowLeft,
  Bold,
  CaseSensitive,
  CircleX,
  Download,
  EllipsisVertical,
  Image,
  Italic,
  Redo,
  TextAlignCenter,
  TextAlignEnd,
  TextAlignJustify,
  TextAlignStart,
  Underline,
  Undo,
} from "lucide-react-native";
import NotesOptions from "../../components/Notes/NotesOptions";

const Notes = () => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.notesMainWrapper}>
      {/* header */}
      <View style={styles.notesHeader}>
        <TouchableOpacity onPress={()=>navigation.navigate("chat")} style={styles.backBtn}>
          <ArrowLeft size={25} strokeWidth={1.5} />
        </TouchableOpacity>
        <View style={styles.rightOptionsMain}>
          <Undo size={25} strokeWidth={1.5} />
          <Redo size={25} strokeWidth={1.5} />
          <Download size={25} strokeWidth={1.5} />
          <TouchableOpacity style={styles.menuDots}>
          <EllipsisVertical size={25} strokeWidth={1.5} />
          {/* <NotesOptions/> */}
          </TouchableOpacity>

          <TouchableOpacity style={styles.doneBtn}>
            <Text style={{ fontWeight: 600 }}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* header */}

      {/* middle */}
        <TextInput
        placeholder="Type your notes here..."
        placeholderTextColor="grey"
          multiline
          numberOfLines={4000}
          textAlignVertical="top"
          style={styles.notesInput}
        />
      {/* middle */}

      {/* Footer actions */}
      <View style={styles.footerActions}>
        <CaseSensitive size={27} strokeWidth={1.5} />
        <Bold size={23} strokeWidth={1.5} />
        <Italic size={23} strokeWidth={1.5} />
        <Underline size={25} strokeWidth={1.5} />
        <TextAlignJustify size={25} strokeWidth={1.5} />
        <TextAlignStart size={25} strokeWidth={1.5} />
        <TextAlignCenter size={25} strokeWidth={1.5} />
        <TextAlignEnd size={25} strokeWidth={1.5} />
        <Image size={25} strokeWidth={1.5} />
        <CircleX size={27} strokeWidth={1.5} />
      </View>
      {/* Footer actions */}
    </SafeAreaView>
  );
};

export default Notes;
