import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import { moderateScale, scaleFont } from "../../../utils/responsive";
import { genderSelection } from "../../../data/datas";
import { appColors } from "../../../themes/appColors";
import { useDispatch, useSelector } from "react-redux";
import { commonFunctionForAPICalls } from "../../../redux/slices/apiCommonSlice";

const GenderDropdown = ({ triggerAPICall }) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const selectorRef = useRef(null);
  const dispatch = useDispatch();
  const { settingsStates } = useSelector((state) => state.API);

  useEffect(() => {
    const payload = {
      method: "GET",
      url: "/master/genders",
      name: "getAllGendersAvailable",
    };
    dispatch(commonFunctionForAPICalls(payload));
  }, []);

  useEffect(() => {
    if (settingsStates.allPersonalisationsSettings.personalInfos.gender?.name) {
      setSelected(
        settingsStates.allPersonalisationsSettings.personalInfos.gender?.name,
      );
    }
  }, [settingsStates.allPersonalisationsSettings.personalInfos.gender?.name]);

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
    setSelected(item?.name ?? item);
    setVisible(false);
    triggerAPICall(item?.id);
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "100%" }}>
        <TouchableOpacity
          ref={selectorRef}
          style={[
            styles.selector,
            visible && { borderColor: appColors.navyBlueShade },
          ]}
          onPress={toggleDropdown}
          activeOpacity={0.7}
        >
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Text
              style={{
                fontWeight: "400",
                fontSize: moderateScale(12),
                color: selected ? "black" : "#B5BECE",
                fontFamily: "Mukta-Regular",
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

        <Modal
          visible={visible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setVisible(false)}
          >
            <View
              style={[
                styles.dropdown,
                {
                  position: "absolute",
                  top: dropdownPosition.top,
                  left: dropdownPosition.left,
                  width: dropdownPosition.width,
                },
              ]}
            >
              {settingsStates.settingsMasterDatas.allGendersAvailable?.map(
                (item, itemIndex) => {
                  return (
                    <TouchableOpacity
                      key={item?.id ?? itemIndex}
                      style={styles.option}
                      onPress={() => handleSelect(item)}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.description}>
                        {item?.name ?? item}
                      </Text>
                    </TouchableOpacity>
                  );
                },
              )}
            </View>
          </TouchableOpacity>
        </Modal>
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
    fontFamily: "Mukta-Medium",
  },
});

export default GenderDropdown;
