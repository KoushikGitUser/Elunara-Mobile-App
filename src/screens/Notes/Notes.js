import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Keyboard,
  Dimensions,
} from "react-native";
import React, { useEffect, useMemo, useState, useRef } from "react";
import { RichEditor, actions } from "react-native-pell-rich-editor";
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
  ChevronLeft,
  ChevronUp,
  CircleX,
  Download,
  EllipsisVertical,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  Plus,
  Redo,
  Search,
  Tally1,
  TextAlignCenter,
  TextAlignEnd,
  TextAlignJustify,
  TextAlignStart,
  Type,
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
import TextSizeSmallIcon from "../../../assets/SvgIconsComponent/NotesSectionIcons/TextSizeSmallIcon";
import TextSizeMediumIcon from "../../../assets/SvgIconsComponent/NotesSectionIcons/TextSizeMediumIcon";
import TextSizeLargeIcon from "../../../assets/SvgIconsComponent/NotesSectionIcons/TextSizeLargeIcon";
import NotesOptions from "../../components/Modals/Notes/NotesOptions";
import DeleteNoteConfirmPopup from "../../components/Notes/DeleteNoteConfirmPopup";
import { scaleFont } from "../../utils/responsive";
import { Octicons } from "@expo/vector-icons";

const Notes = () => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [toggleTextActionTab, setToggleTextActionTab] = useState(true);
  const [toggleOptionsPopup, setToggleOptionsPopup] = useState(false);
  const [findInNotes, setFindInNotes] = useState(false);
  const [toggleDeleteNotePopup, setToggleDeleteNotePopup] = useState(false);
  const [noteContent, setNoteContent] = useState("");
  const [showSizingOptions, setShowSizingOptions] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [matchCount, setMatchCount] = useState(0);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);

  const richTextRef = useRef();

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

  // Insert an image into the RichEditor using Expo Image Picker
  const insertImage = async () => {
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
      base64: true,
    });

    if (result.canceled) return;

    const asset = result.assets[0];
    const base64 = asset.base64;

    // Determine the image type from mimeType or URI
    const mimeType = asset.mimeType || (asset.uri.toLowerCase().endsWith(".png") ? "image/png" : "image/jpeg");
    const dataUri = `data:${mimeType};base64,${base64}`;

    // Insert image into rich editor
    richTextRef.current?.insertImage(dataUri, "width: 90%; height: 200px; border-radius: 8px; object-fit: cover; margin-bottom: 10px;");
  };

  // Search and highlight functionality
  const highlightSearchMatches = (query) => {
    if (!query || query.trim() === "") {
      clearHighlights();
      setMatchCount(0);
      setCurrentMatchIndex(0);
      return;
    }

    const script = `
      (function() {
        // Remove existing highlights
        var highlights = document.querySelectorAll('.search-highlight');
        highlights.forEach(function(el) {
          var parent = el.parentNode;
          parent.replaceChild(document.createTextNode(el.textContent), el);
          parent.normalize();
        });

        var searchText = '${query.replace(/'/g, "\\'")}';
        var regex = new RegExp('(' + searchText + ')', 'gi');
        var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        var textNodes = [];
        var count = 0;

        while(walker.nextNode()) {
          if (walker.currentNode.parentNode.tagName !== 'SCRIPT' &&
              walker.currentNode.parentNode.tagName !== 'STYLE' &&
              !walker.currentNode.parentNode.classList.contains('search-highlight')) {
            textNodes.push(walker.currentNode);
          }
        }

        textNodes.forEach(function(node) {
          if (regex.test(node.textContent)) {
            var span = document.createElement('span');
            span.innerHTML = node.textContent.replace(regex, '<mark class="search-highlight" style="background-color: #EEF4FF; padding: 0 2px; border-radius: 2px;">$1</mark>');
            node.parentNode.replaceChild(span, node);
            count += (node.textContent.match(regex) || []).length;
          }
        });

        window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'searchCount', count: count }));
      })();
    `;
    richTextRef.current?.injectJavascript(script);
  };

  const clearHighlights = () => {
    const script = `
      (function() {
        var highlights = document.querySelectorAll('.search-highlight');
        highlights.forEach(function(el) {
          var parent = el.parentNode;
          parent.replaceChild(document.createTextNode(el.textContent), el);
          parent.normalize();
        });
        // Clean up wrapper spans
        var wrappers = document.querySelectorAll('span:not([class])');
        wrappers.forEach(function(wrapper) {
          if (wrapper.childNodes.length === 1 && wrapper.childNodes[0].nodeType === 3) {
            wrapper.parentNode.replaceChild(wrapper.childNodes[0], wrapper);
          }
        });
        document.body.normalize();
      })();
    `;
    richTextRef.current?.injectJavascript(script);
  };

  const navigateToMatch = (index) => {
    const script = `
      (function() {
        var highlights = document.querySelectorAll('.search-highlight');
        if (highlights.length === 0) return;

        // Reset all highlights to default color
        highlights.forEach(function(el) {
          el.style.backgroundColor = '#FFEB3B';
        });

        // Highlight current match with different color
        var currentIndex = ${index} % highlights.length;
        if (highlights[currentIndex]) {
          highlights[currentIndex].style.backgroundColor = '#FF9800';
          highlights[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      })();
    `;
    richTextRef.current?.injectJavascript(script);
  };

  const goToNextMatch = () => {
    if (matchCount === 0) return;
    const nextIndex = (currentMatchIndex + 1) % matchCount;
    setCurrentMatchIndex(nextIndex);
    navigateToMatch(nextIndex);
  };

  const goToPrevMatch = () => {
    if (matchCount === 0) return;
    const prevIndex = (currentMatchIndex - 1 + matchCount) % matchCount;
    setCurrentMatchIndex(prevIndex);
    navigateToMatch(prevIndex);
  };

  const handleSearchChange = (text) => {
    setSearchText(text);
    highlightSearchMatches(text);
    setCurrentMatchIndex(0);
  };

  const closeSearch = () => {
    setFindInNotes(false);
    setSearchText("");
    setMatchCount(0);
    setCurrentMatchIndex(0);
    clearHighlights();
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
          <TouchableOpacity onPress={() => richTextRef.current?.sendAction(actions.undo, 'result')}>
            <Undo size={25} strokeWidth={1.5} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => richTextRef.current?.sendAction(actions.redo, 'result')}>
            <Redo size={25} strokeWidth={1.5} />
          </TouchableOpacity>
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
      <ScrollView
        style={styles.textPlusImgArea}
        keyboardDismissMode="none"
        nestedScrollEnabled={true}
      >
        <RichEditor
          ref={richTextRef}
          placeholder="Type your notes here..."
          initialContentHTML={noteContent}
          onChange={(html) => setNoteContent(html)}
          onMessage={(message) => {
            try {
              const data = JSON.parse(message.data);
              if (data.type === "searchCount") {
                setMatchCount(data.count);
                if (data.count > 0) {
                  navigateToMatch(0);
                }
              }
            } catch (e) {
              // Ignore non-JSON messages
            }
          }}
          editorStyle={{
            backgroundColor: "transparent",
            contentCSSText: `
              font-family: 'Mukta-Regular';
              font-size: ${scaleFont(16)}px;
              line-height: 27px;
              color: #3A3A3A;
              padding: 10px 0;
            `,
            placeholderColor: "#B5BECE",
          }}
          style={{ minHeight: 300, flex: 1 }}
        />
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
              value={searchText}
              onChangeText={handleSearchChange}
              autoFocus
            />
            {matchCount > 0 && (
              <Text style={{ color: "#B5BECE", fontSize: 12, marginRight: 5 }}>
                {currentMatchIndex + 1}/{matchCount}
              </Text>
            )}
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity onPress={goToPrevMatch}>
              <ChevronUp size={35} strokeWidth={1.25} />
            </TouchableOpacity>
            <TouchableOpacity onPress={goToNextMatch}>
              <ChevronDown size={35} strokeWidth={1.25} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={closeSearch}
            style={styles.crossIcon}
          >
            <X size={20} strokeWidth={1.25} />
          </TouchableOpacity>
        </View>
      )}

      {toggleTextActionTab && !findInNotes && !showSizingOptions && (
        <View
          style={[
            styles.footerActions,
            { bottom: keyboardVisible ? keyboardHeight : 0 },
          ]}
        >
          <TouchableOpacity onPress={() => setShowSizingOptions(true)}>
            <CharacterCaseIcon />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              richTextRef.current?.sendAction(actions.setBold, "result")
            }
          >
            <TextBoldIcon />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              richTextRef.current?.sendAction(actions.setItalic, "result")
            }
          >
            <TextItalicIcon />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              richTextRef.current?.sendAction(actions.setUnderline, "result")
            }
          >
            <TextUnderlineIcon />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              richTextRef.current?.sendAction(actions.justifyFull, "result")
            }
          >
            <TextJustifyIcon />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              richTextRef.current?.sendAction(actions.alignLeft, "result")
            }
          >
            <TextStartIcon />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              richTextRef.current?.sendAction(actions.alignCenter, "result")
            }
          >
            <TextCenterIcon />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              richTextRef.current?.sendAction(actions.alignRight, "result")
            }
          >
            <TextEndIcon />
          </TouchableOpacity>
          <Feather onPress={insertImage} name="image" size={24} color="black" />
          <TouchableOpacity
            onPress={() => setToggleTextActionTab(false)}
            style={styles.crossIcon}
          >
            <X size={20} strokeWidth={1.25} />
          </TouchableOpacity>
        </View>
      )}

      {toggleTextActionTab && !findInNotes && showSizingOptions && (
        <View
          style={[
            styles.footerActions,
            { bottom: keyboardVisible ? keyboardHeight : 0 },
          ]}
        >
          <View style={styles.sizingOptionsMain}>
            <TouchableOpacity style={styles.backFromSize} onPress={() => setShowSizingOptions(false)}>
              <ChevronLeft size={30} strokeWidth={2} />
            </TouchableOpacity>
            <Type strokeWidth={2} />

            <TouchableOpacity
              onPress={() => richTextRef.current?.setFontSize(2)}
            >
              <Heading1 strokeWidth={2} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => richTextRef.current?.setFontSize(4)}
            >
             <Heading2 strokeWidth={2} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => richTextRef.current?.setFontSize(5)}
            >
              <Heading3 strokeWidth={2} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => richTextRef.current?.sendAction(actions.insertBulletsList, 'result')}
            >
             <List strokeWidth={2} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => richTextRef.current?.sendAction(actions.insertOrderedList, 'result')}
            >
              <Octicons name="list-ordered" size={24} color="black" />
            </TouchableOpacity>
          </View>
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
