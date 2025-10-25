import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Modal,
  TouchableOpacity,
  Dimensions,
  LayoutAnimation,
  Image,
} from "react-native";
import React, { useRef, useState } from "react";
import { LLMOptionsAvailable } from "../../../../data/datas";
import { MaterialIcons } from "@expo/vector-icons";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import { moderateScale, scaleFont } from "../../../../utils/responsive";

const DropDowns = ({ selectOptionsArray,setSelectedCounts,selectedCounts}) => {
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
    setSelectedIcon(item.icon);
    setSelectedCounts([...selectedCounts,0])
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
          <View style={{flexDirection:"row",gap:10,alignItems:"center"}}>
            {selected && (
              <Image style={styles.iconImage} source={selectedIcon} />
            )}
            <Text
              style={{
                fontWeight: "400",
                fontSize: moderateScale(12),
                color: selected ? "black" : "#B5BECE",
              }}
            >
              {selected ? selected.title : "Select"}
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
            {selectOptionsArray?.map((item, itemIndex) => {
              return (
                <TouchableOpacity
                  key={itemIndex}
                  style={styles.option}
                  onPress={() => handleSelect(item)}
                  activeOpacity={0.7}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 5,
                      alignItems: "center",
                    }}
                  >
                    <Image style={styles.iconImage} source={item?.icon} />
                    <Text style={styles.title}>{item.title}</Text>
                  </View>

                  <View>
                    <Text style={styles.description}>{item.description}</Text>
                  </View>
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
    marginTop: 5,
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
    fontSize: scaleFont(11),
    color: "#757575",
  },
});

export default DropDowns;
