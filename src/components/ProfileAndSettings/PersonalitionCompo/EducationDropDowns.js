import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, ScrollView, Dimensions, Keyboard, Platform } from 'react-native'

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
import React, { useEffect, useRef, useState } from 'react'
import { ChevronDown, ChevronUp, Search } from 'lucide-react-native';
import { moderateScale, scaleFont } from '../../../utils/responsive';
import { appColors } from '../../../themes/appColors';

const EducationDropDowns = ({dataArray, placeholder, triggerAPICall, initialValue, maxHeightPercent = 0.4, searchable = false, maxDisplayLength = 0, adjustForKeyboard = true}) => {
      const [visible, setVisible] = useState(false);
      const [selected, setSelected] = useState(null);
      const [searchText, setSearchText] = useState("");
      const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
      const selectorRef = useRef(null);
      const searchInputRef = useRef(null);
      const [keyboardHeight, setKeyboardHeight] = useState(0);

      useEffect(() => {
        if (!searchable || !adjustForKeyboard) return;
        const showEvent = Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
        const hideEvent = Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";
        const showSub = Keyboard.addListener(showEvent, (e) => setKeyboardHeight(e.endCoordinates.height));
        const hideSub = Keyboard.addListener(hideEvent, () => setKeyboardHeight(0));
        return () => { showSub.remove(); hideSub.remove(); };
      }, [searchable, adjustForKeyboard]);

      useEffect(() => {
        if (initialValue !== null && initialValue !== undefined && initialValue !== "") {
          // Find the matching item from dataArray
          const matchedItem = dataArray?.find((item) => {
            // Handle both object and string formats
            if (typeof item === "object" && item !== null) {
              // If initialValue is also an object, compare by id
              if (typeof initialValue === "object" && initialValue !== null) {
                return item.id === initialValue.id || item.name === initialValue.name;
              }
              // If initialValue is a string, compare with item's name or id
              return item.id === initialValue || item.name === initialValue ||
                     (typeof item.name === "string" && typeof initialValue === "string" &&
                      item.name.toLowerCase() === initialValue.toLowerCase());
            }
            // Both are strings - case-insensitive comparison
            if (typeof item === "string" && typeof initialValue === "string") {
              return item === initialValue || item.toLowerCase() === initialValue.toLowerCase();
            }
            // Direct comparison as fallback
            return item === initialValue;
          });
          setSelected(matchedItem || initialValue);
        }
      }, [initialValue, dataArray]);

      const toggleDropdown = () => {
        if (selectorRef.current) {
          selectorRef.current.measureInWindow((x, y, width, height) => {
            setDropdownPosition({
              top: y + height + 30,
              left: x,
              width: width,
            });
            setVisible((prev) => !prev);
          });
        }
      };

      const handleSelect = (item) => {
        setSelected(item);
        setSearchText("");
        setVisible(false);
        if (triggerAPICall) {
          triggerAPICall(item?.id?item?.id:item);
        }
      };

      const filteredData = searchable && searchText.trim()
        ? dataArray?.filter((item) => {
            const name = item?.name ?? item;
            return typeof name === "string" && name.toLowerCase().includes(searchText.toLowerCase());
          })
        : dataArray;

      const dropdownMaxHeight = SCREEN_HEIGHT * maxHeightPercent;
      const availableSpace = SCREEN_HEIGHT - keyboardHeight - 10;
      const adjustedTop = keyboardHeight > 0 && (dropdownPosition.top + dropdownMaxHeight) > availableSpace
        ? Math.max(10, availableSpace - dropdownMaxHeight)
        : dropdownPosition.top;

  return (
    <View style={styles.container}>
      <View style={{ width: "100%" }}> 
        <TouchableOpacity
          ref={selectorRef}
          style={[styles.selector, visible && { borderColor: appColors.navyBlueShade}]}
          onPress={toggleDropdown}
          activeOpacity={0.7}
        >
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center", flex: 1 }}>
              <Text
                style={{
                  fontWeight: "400",
                  fontSize: scaleFont(13),
                  color: selected ? "black" : "#B5BECE",
                  fontFamily:"Mukta-Regular",
                }}
              >
                {selected
                  ? (() => {
                      const displayText = selected?.name ?? selected;
                      return maxDisplayLength > 0 && displayText.length > maxDisplayLength
                        ? displayText.substring(0, maxDisplayLength) + "..."
                        : displayText;
                    })()
                  : placeholder}
              </Text>
          </View>

          {visible ? (
            <ChevronUp size={32} strokeWidth={1.25} />
          ) : (
            <ChevronDown size={32} strokeWidth={1.25} />
          )}
        </TouchableOpacity>

        <Modal
          visible={visible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => { setVisible(false); setSearchText(""); }}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => { setVisible(false); setSearchText(""); }}
          >
            <View
              style={[
                styles.dropdown,
                {
                  position: "absolute",
                  top: adjustedTop,
                  left: dropdownPosition.left,
                  width: dropdownPosition.width,
                  maxHeight: keyboardHeight > 0
                    ? Math.min(dropdownMaxHeight, availableSpace - adjustedTop)
                    : dropdownMaxHeight,
                },
              ]}
            >
              {searchable && (
                <View style={styles.searchBarWrapper}>
                  <View style={styles.searchBar}>
                    <TextInput
                      ref={searchInputRef}
                      style={styles.searchInput}
                      placeholder="Search..."
                      placeholderTextColor="#9CA3AF"
                      value={searchText}
                      onChangeText={setSearchText}
                      autoFocus={adjustForKeyboard}
                    />
                    <Search size={16} color="#9CA3AF" strokeWidth={2} />
                  </View>
                </View>
              )}
              <ScrollView showsVerticalScrollIndicator={true} nestedScrollEnabled={true} keyboardShouldPersistTaps="handled">
                {filteredData?.map((item, itemIndex) => {
                  return (
                    <TouchableOpacity
                      key={item?.id ?? itemIndex}
                      style={styles.option}
                      onPress={() => handleSelect(item)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.description}>{item?.name ?? item}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  selector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: "100%",
    backgroundColor: "white",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "transparent",
  },
  dropdown: {
    width: "100%",
    backgroundColor: "#ffffffff",
    borderRadius: 17,
    paddingVertical: 8,
    borderWidth: 1,
    marginTop: 10,
    borderColor: "#D3DAE5",
    elevation: 5,
    shadowColor: "#afafafff",
  },
  searchBarWrapper: {
    paddingHorizontal: 10,
    paddingTop: 6,
    paddingBottom: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  searchInput: {
    flex: 1,
    fontWeight: "400",
    fontSize: scaleFont(13),
    color: "black",
    fontFamily: "Mukta-Regular",
    padding: 0,
  },
  option: {
    flexDirection: "column",
    alignItems: "flex-start",
    paddingHorizontal: 17,
    paddingVertical: 10,
  },
  iconImage: {
    height: 23,
    width: 23,
  },
  title: {
    fontSize: moderateScale(13),
    fontWeight: "600",
    color: "#000",
  },
  description: {
    fontSize: scaleFont(14),
    color: "#757575",
    fontWeight: 600,
    fontFamily:"Mukta-Regular",
  },
});

export default EducationDropDowns