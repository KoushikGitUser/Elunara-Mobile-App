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
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "./Notes.styles";
import * as ImagePicker from "expo-image-picker";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import Feather from "@expo/vector-icons/Feather";
import { useDispatch, useSelector } from "react-redux";
import { commonFunctionForAPICalls } from "../../redux/slices/apiCommonSlice";
import { useRoute } from "@react-navigation/native";
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
import { scaleFont, moderateScale } from "../../utils/responsive";
import { Octicons } from "@expo/vector-icons";
import { appColors } from "../../themes/appColors";
import Markdown from "react-native-markdown-display";

const Notes = () => {
  const insets = useSafeAreaInsets();
  // Detect navigation bar type: gesture bar (~20-24dp) vs button bar (~48dp)
  const isGestureNavigation = insets.bottom > 0 && insets.bottom < 25;
  const isButtonNavigation = insets.bottom >= 30;

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
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [activeStyles, setActiveStyles] = useState([]);

  const richTextRef = useRef();

  // Default style for formatting buttons (consistent padding)
  const defaultButtonStyle = {
    padding: 4,
    borderRadius: 6,
  };

  // Get button style based on active state
  const getButtonStyle = (action) =>
    activeStyles.includes(action)
      ? { ...defaultButtonStyle, backgroundColor: "#EEF4FF" }
      : defaultButtonStyle;

  const { notesStates } = useSelector((state) => state.API);
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();
  const chatUuid = route.params?.chatUuid;

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

  // Fetch notes on mount
  useEffect(() => {
    if (chatUuid) {
      const payload = {
        method: "GET",
        url: `/chats/${chatUuid}/notes`,
        name: "get-notes",
      };
      dispatch(commonFunctionForAPICalls(payload));
    }
  }, [chatUuid]);

  // Update local state when notes are fetched
  useEffect(() => {
    if (notesStates.currentChatNotes) {
      setNoteContent(notesStates.currentChatNotes.content || "");
      richTextRef.current?.setContentHTML(
        notesStates.currentChatNotes.content || "",
      );
    }
  }, [notesStates.currentChatNotes]);

  const handleSaveNotes = () => {
    if (chatUuid) {
      const payload = {
        method: "PUT",
        url: `/chats/${chatUuid}/notes`,
        name: "update-notes",
        data: { content: noteContent },
      };
      dispatch(commonFunctionForAPICalls(payload)).then(() => {
        navigation.goBack();
      });
    }
  };

  const handleDeleteNotes = () => {
    if (chatUuid) {
      const payload = {
        method: "DELETE",
        url: `/chats/${chatUuid}/notes`,
        name: "delete-notes",
      };
      dispatch(commonFunctionForAPICalls(payload));
      setNoteContent("");
      richTextRef.current?.setContentHTML("");
    }
  };

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
    const mimeType =
      asset.mimeType ||
      (asset.uri.toLowerCase().endsWith(".png") ? "image/png" : "image/jpeg");
    const dataUri = `data:${mimeType};base64,${base64}`;

    // Insert image into rich editor
    richTextRef.current?.insertImage(
      dataUri,
      "width: 90%; height: 200px; border-radius: 8px; object-fit: cover; margin-bottom: 10px;",
    );
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
            span.innerHTML = node.textContent.replace(regex, '<mark class="search-highlight" style="background-color: #b8e4ffff; padding: 0 2px; border-radius: 2px;">$1</mark>');
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
        if (highlights.length === 0) return true;

        for (var i = 0; i < highlights.length; i++) {
          highlights[i].style.backgroundColor = '#b8e4ff';
        }

        var idx = ${index};
        if (idx < 0) idx = highlights.length + idx;
        idx = idx % highlights.length;
        if (idx >= 0 && idx < highlights.length) {
          highlights[idx].style.backgroundColor = '#FF9800';
          highlights[idx].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return true;
      })();
    `;
    richTextRef.current?.injectJavascript(script);
  };

  const goToNextMatch = () => {
    if (matchCount === 0) return;
    const nextIndex = (currentMatchIndex + 1) % matchCount;
    setCurrentMatchIndex(nextIndex);
    setTimeout(() => {
      navigateToMatch(nextIndex);
    }, 50);
  };

  const goToPrevMatch = () => {
    if (matchCount === 0) return;
    const prevIndex = (currentMatchIndex - 1 + matchCount) % matchCount;
    setCurrentMatchIndex(prevIndex);
    setTimeout(() => {
      navigateToMatch(prevIndex);
    }, 50);
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

  const downloadAsPdf = async () => {
    if (!noteContent || noteContent.trim() === "") {
      alert("Nothing to download. Please add some content first.");
      return;
    }

    try {
      // Create HTML document for PDF
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                font-family: 'Helvetica', 'Arial', sans-serif;
                font-size: 14px;
                line-height: 1.6;
                color: #333;
                padding: 40px;
                max-width: 100%;
              }
              img {
                max-width: 100%;
                height: auto;
                border-radius: 8px;
                margin: 10px 0;
              }
              p {
                margin: 10px 0;
              }
              ul, ol {
                margin: 10px 0;
                padding-left: 20px;
              }
              li {
                margin: 5px 0;
              }
            </style>
          </head>
          <body>
            ${noteContent}
          </body>
        </html>
      `;

      // Generate PDF file
      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        base64: false,
      });

      // Share the PDF file
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          mimeType: "application/pdf",
          dialogTitle: "Save or Share Note",
          UTI: "com.adobe.pdf",
        });
      } else {
        alert("Sharing is not available on this device");
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  const screenHeight = Dimensions.get("window").height;

  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);

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
        onDelete={handleDeleteNotes}
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
          <TouchableOpacity
            onPress={() =>
              richTextRef.current?.sendAction(actions.undo, "result")
            }
          >
            <Undo size={25} strokeWidth={1.5} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              richTextRef.current?.sendAction(actions.redo, "result")
            }
          >
            <Redo size={25} strokeWidth={1.5} />
          </TouchableOpacity>
          <TouchableOpacity onPress={downloadAsPdf}>
            <Download size={25} strokeWidth={1.5} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setToggleOptionsPopup(true)}
            style={styles.menuDots}
          >
            <EllipsisVertical size={25} strokeWidth={1.5} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.doneBtn} onPress={handleSaveNotes}>
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
          editorInitializedCallback={() => {
            richTextRef.current?.registerToolbar((items) => {
              setActiveStyles(items);
            });
          }}
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

        {/* Display Bookmarked Q&A Pairs */}
        {notesStates.currentChatNotes?.qa_pairs &&
          notesStates.currentChatNotes.qa_pairs.length > 0 && (
            <View style={{ paddingHorizontal: 20, paddingBottom: 100 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 15,
                  gap: 10,
                }}
              >
                <View
                  style={{ flex: 1, height: 1, backgroundColor: "#E5E7EB" }}
                />
                <Text
                  style={{
                    color: "#6B7280",
                    fontSize: 14,
                    fontWeight: "600",
                    fontFamily: "Mukta-Bold",
                  }}
                >
                  Saved Messages
                </Text>
                <View
                  style={{ flex: 1, height: 1, backgroundColor: "#E5E7EB" }}
                />
              </View>

              {notesStates.currentChatNotes.qa_pairs.map((pair, index) => (
                <View
                  key={index}
                  style={{
                    marginBottom: 20,
                    backgroundColor: "#F9FAFB",
                    borderRadius: 12,
                    padding: 15,
                    borderWidth: 1,
                    borderColor: "#E5E7EB",
                  }}
                >
                  {/* User Message */}
                  <View style={{ marginBottom: 12 }}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#9CA3AF",
                        marginBottom: 4,
                        fontFamily: "Mukta-Medium",
                      }}
                    >
                      YOU
                    </Text>
                    <Markdown
                      style={{
                        body: {
                          fontFamily: "Mukta-Regular",
                          fontSize: moderateScale(15),
                          color: "#1F2937",
                          lineHeight: 26,
                        },
                        strong: {
                          fontFamily: "Mukta-Bold",
                        },
                        heading1: {
                          fontFamily: "Mukta-Bold",
                          lineHeight: 36,
                        },
                        heading2: {
                          fontFamily: "Mukta-Bold",
                          lineHeight: 32,
                        },
                        heading3: {
                          fontFamily: "Mukta-Bold",
                          lineHeight: 28,
                        },
                        paragraph: {
                          marginVertical: 4,
                        },
                      }}
                    >
                      {pair.user_message.content}
                    </Markdown>
                  </View>

                  {/* Assistant Message */}
                  <View>
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#9CA3AF",
                        marginBottom: 4,
                        fontFamily: "Mukta-Medium",
                      }}
                    >
                      AI RESPONSE
                    </Text>
                    <Markdown
                      style={{
                        body: {
                          fontFamily: "Mukta-Regular",
                          fontSize: moderateScale(15),
                          color: "#5E5E5E",
                          lineHeight: 26,
                        },
                        strong: {
                          fontFamily: "Mukta-Bold",
                        },
                        heading1: {
                          fontFamily: "Mukta-Bold",
                          lineHeight: 36,
                        },
                        heading2: {
                          fontFamily: "Mukta-Bold",
                          lineHeight: 32,
                        },
                        heading3: {
                          fontFamily: "Mukta-Bold",
                          lineHeight: 28,
                        },
                        paragraph: {
                          marginVertical: 4,
                        },
                      }}
                    >
                      {pair.assistant_message.content}
                    </Markdown>
                  </View>
                </View>
              ))}
            </View>
          )}

        <View style={{ height: keyboardVisible ? screenHeight : 250 }} />
      </ScrollView>

      {/* middle */}

      {/* Footer actions */}
      {!toggleTextActionTab && !findInNotes && (
        <TouchableOpacity
          onPress={() => setToggleTextActionTab(true)}
          style={[
            styles.collapsedButton,
            {
              bottom: keyboardVisible
                ? keyboardHeight - insets.bottom + 70
                : 60,
            },
          ]}
        >
          <Plus size={25} color="white" strokeWidth={1.25} />
        </TouchableOpacity>
      )}

      {findInNotes && (
        <View
          style={[
            styles.footerActions,
            {
              bottom: keyboardVisible
                ? keyboardHeight - (isGestureNavigation ? 10 : 5)
                : 0,
            },
          ]}
        >
          <View
            style={[
              styles.searchInputMain,
              isSearchFocused && { borderColor: appColors.navyBlueShade },
            ]}
          >
            <Search
              size={20}
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
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              autoFocus
            />
            {searchText.length > 0 && (
              <Text
                style={{
                  color: "#6B7280",
                  fontSize: 12,
                  position: "absolute",
                  right: 10,
                }}
              >
                {matchCount > 0
                  ? `${currentMatchIndex + 1} of ${matchCount}`
                  : "0 of 0"}
              </Text>
            )}
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={goToPrevMatch}
              activeOpacity={0.6}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <ChevronUp size={35} strokeWidth={1.25} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={goToNextMatch}
              activeOpacity={0.6}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <ChevronDown size={35} strokeWidth={1.25} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={closeSearch} style={styles.crossIcon}>
            <X size={20} strokeWidth={1.25} />
          </TouchableOpacity>
        </View>
      )}

      {toggleTextActionTab && !findInNotes && !showSizingOptions && (
        <View
          style={[
            styles.footerActions,
            {
              bottom: keyboardVisible
                ? keyboardHeight - (isGestureNavigation ? 10 : 5)
                : 0,
            },
          ]}
        >
          <TouchableOpacity onPress={() => setShowSizingOptions(true)}>
            <CharacterCaseIcon />
          </TouchableOpacity>

          <TouchableOpacity
            style={getButtonStyle("bold")}
            onPress={() =>
              richTextRef.current?.sendAction(actions.setBold, "result")
            }
          >
            <TextBoldIcon />
          </TouchableOpacity>
          <TouchableOpacity
            style={getButtonStyle("italic")}
            onPress={() =>
              richTextRef.current?.sendAction(actions.setItalic, "result")
            }
          >
            <TextItalicIcon />
          </TouchableOpacity>
          <TouchableOpacity
            style={getButtonStyle("underline")}
            onPress={() =>
              richTextRef.current?.sendAction(actions.setUnderline, "result")
            }
          >
            <TextUnderlineIcon />
          </TouchableOpacity>
          <TouchableOpacity
            style={getButtonStyle("justifyFull")}
            onPress={() =>
              richTextRef.current?.sendAction(actions.justifyFull, "result")
            }
          >
            <TextJustifyIcon />
          </TouchableOpacity>
          <TouchableOpacity
            style={getButtonStyle("justifyLeft")}
            onPress={() =>
              richTextRef.current?.sendAction(actions.alignLeft, "result")
            }
          >
            <TextStartIcon />
          </TouchableOpacity>
          <TouchableOpacity
            style={getButtonStyle("justifyCenter")}
            onPress={() =>
              richTextRef.current?.sendAction(actions.alignCenter, "result")
            }
          >
            <TextCenterIcon />
          </TouchableOpacity>
          <TouchableOpacity
            style={getButtonStyle("justifyRight")}
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
            {
              bottom: keyboardVisible
                ? keyboardHeight - (isGestureNavigation ? 10 : 5)
                : 0,
            },
          ]}
        >
          <View style={styles.sizingOptionsMain}>
            <TouchableOpacity
              style={styles.backFromSize}
              onPress={() => setShowSizingOptions(false)}
            >
              <ChevronLeft size={30} strokeWidth={2} />
            </TouchableOpacity>
            <Type strokeWidth={2} />

            <TouchableOpacity
              style={defaultButtonStyle}
              onPress={() => richTextRef.current?.setFontSize(2)}
            >
              <Heading1 strokeWidth={2} />
            </TouchableOpacity>
            <TouchableOpacity
              style={defaultButtonStyle}
              onPress={() => richTextRef.current?.setFontSize(4)}
            >
              <Heading2 strokeWidth={2} />
            </TouchableOpacity>
            <TouchableOpacity
              style={defaultButtonStyle}
              onPress={() => richTextRef.current?.setFontSize(5)}
            >
              <Heading3 strokeWidth={2} />
            </TouchableOpacity>
            <TouchableOpacity
              style={getButtonStyle("unorderedList")}
              onPress={() =>
                richTextRef.current?.sendAction(
                  actions.insertBulletsList,
                  "result",
                )
              }
            >
              <List strokeWidth={2} />
            </TouchableOpacity>
            <TouchableOpacity
              style={getButtonStyle("orderedList")}
              onPress={() =>
                richTextRef.current?.sendAction(
                  actions.insertOrderedList,
                  "result",
                )
              }
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
