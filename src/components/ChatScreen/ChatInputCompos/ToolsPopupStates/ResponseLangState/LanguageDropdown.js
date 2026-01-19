import {
  View,
  Text,
  TouchableOpacity,
  Image,
  LayoutAnimation,
  Dimensions,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, Search } from "lucide-react-native";
import { moderateScale, scaleFont } from "../../../../../utils/responsive";
import { commonFunctionForAPICalls } from "../../../../../redux/slices/apiCommonSlice";
import { useDispatch, useSelector } from "react-redux";

const LanguageDropdown = ({ onSelect, selectedId }) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const selectorRef = useRef(null);
  const screenHeight = Dimensions.get("window").height;
  const { settingsStates } = useSelector((state) => state.API);
  const dispatch = useDispatch();

  useEffect(() => {
    const payload = {
      method: "GET",
      url: "/master/languages",
      name: "getAllLanguagesAvailable",
    };
    dispatch(commonFunctionForAPICalls(payload));
  }, []);

  useEffect(() => {
    if (
      selectedId &&
      settingsStates.settingsMasterDatas.allLanguagesAvailable
    ) {
      const lang =
        settingsStates.settingsMasterDatas.allLanguagesAvailable.find(
          (item) => item.id == selectedId
        );
      if (lang) {
        setSelected(lang);
      }
    }
  }, [selectedId, settingsStates.settingsMasterDatas.allLanguagesAvailable]);

  const toggleDropdown = () => {
    if (selectorRef.current) {
      selectorRef.current.measure((_x, _y, _width, height, _pageX, pageY) => {
        const spaceBelow = screenHeight - pageY - height;
        const spaceAbove = pageY;
        const openUp = spaceBelow < 240 && spaceAbove > spaceBelow;
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setVisible((prev) => !prev);
      });
    }
  };
  const handleSelect = (item) => {
    setSelected(item);
    setVisible(false);
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "100%" }}>
        <TouchableOpacity
          ref={selectorRef}
          style={styles.selector}
          onPress={toggleDropdown}
          activeOpacity={0.7}
        >
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Text
              style={{
                fontWeight: "400",
                fontSize: moderateScale(14),
                color: selected ? "black" : "#B5BECE",
                fontFamily: "Mukta-Regular",
              }}
            >
              {selected == null
                ? "Select"
                : selected.name + "  " + selected.native_name}
            </Text>
          </View>

          {visible ? (
            <ChevronUp size={32} strokeWidth={1.25} />
          ) : (
            <ChevronDown size={32} strokeWidth={1.25} />
          )}
        </TouchableOpacity>

        {visible && (
          <View style={[styles.dropdown]}>
            <View style={styles.searchContainer}>
              <View style={styles.searchInputWrapper}>
                <Search size={16} color="#9CA3AF" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search..."
                  placeholderTextColor="#9CA3AF"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
            </View>
            <ScrollView style={{ maxHeight: 200 }} nestedScrollEnabled={true}>
              {settingsStates.settingsMasterDatas.allLanguagesAvailable
                ?.filter(
                  (item) =>
                    item.name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    item.native_name
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                )
                .map((item, itemIndex) => {
                  return (
                    <TouchableOpacity
                      key={itemIndex}
                      style={styles.option}
                      onPress={() => handleSelect(item)}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          styles.description,
                          { fontFamily: "Mukta-Bold" },
                        ]}
                      >
                        {item.name} {item.native_name}{" "}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
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
    paddingVertical: 10,
    width: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  dropdown: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 17,
    paddingVertical: 8,
    borderWidth: 1,
    marginTop: 10,
    borderColor: "#D3DAE5",
    elevation: 5,
    shadowColor: "#afafafff",
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
    fontSize: scaleFont(13),
    color: "#757575",
    fontWeight: 600,
  },
  searchContainer: {
    paddingHorizontal: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    marginBottom: 8,
  },
  searchInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 36,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: moderateScale(13),
    color: "#1F2937",
    paddingVertical: 0,
    fontFamily: "Mukta-Regular",
  },
});

export default LanguageDropdown;
