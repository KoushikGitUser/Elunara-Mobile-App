import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  LayoutAnimation,
  StyleSheet,
} from "react-native";
import React, { useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import { moderateScale, scaleFont } from "../../../utils/responsive";
import { genderSelection } from "../../../data/datas";

const GenderDropdown = () => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const selectorRef = useRef(null);
  const screenHeight = Dimensions.get("window").height;

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
                fontSize: moderateScale(12),
                color: selected ? "black" : "#B5BECE",
                fontFamily:"Mukta-Regular",
              }}
            >
              {selected ? selected : "Select Gender"}
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
            {genderSelection?.map((item, itemIndex) => {
              return (
                <TouchableOpacity
                  key={itemIndex}
                  style={styles.option}
                  onPress={() => handleSelect(item)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.description}>{item} </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    </View>
  );
};

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
    paddingVertical: 8.5,
    width: "100%",
    backgroundColor: "white",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
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
    fontSize: scaleFont(11),
    color: "#757575",
    fontWeight: 600,
  },
});

export default GenderDropdown;
