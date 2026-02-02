import { View, Text, TouchableOpacity, Dimensions, StyleSheet, LayoutAnimation } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import { useDispatch, useSelector } from "react-redux";
import { moderateScale, scaleFont } from "../../../utils/responsive";
import { commonFunctionForAPICalls, setIsCountrySelectionChanged, setSelectedCountryCode } from "../../../redux/slices/apiCommonSlice";

const RegionDropdown = ({ setSelectedCounts, selectedCounts, country, triggerAPICall, initialSetValue, disabled = false }) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const selectorRef = useRef(null);
  const screenHeight = Dimensions.get("window").height;
  const { settingsStates } = useSelector((state) => state.API);
  const dispatch = useDispatch();

    useEffect(() => {
      const payload = {
        method: "GET",
        url:country?"/master/countries":`/master/cities?country_id=${settingsStates.settingsMasterDatas.selectedCountryCode}`,
        name:country?"getAllCountriesAvailable":"getAllCitiesAvailable",
      };
      dispatch(commonFunctionForAPICalls(payload));
    }, [settingsStates.settingsMasterDatas.selectedCountryCode]);

    useEffect(() => {
      if (initialSetValue) {
        setSelected(initialSetValue);
        if (country) {
          dispatch(setSelectedCountryCode(initialSetValue?.id));
        }
      }
    }, [initialSetValue]);

    const toggleDropdown = () => {
      if (disabled) return;
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
      if(country){
        dispatch(setSelectedCountryCode(item?.id))
        dispatch(setIsCountrySelectionChanged(true));
      }
      triggerAPICall(item?.id);
      setSelectedCounts([...selectedCounts, 0]);
    };

    useEffect(()=>{
      if(settingsStates.settingsMasterDatas.isCountrySelectionChanged && !country){
        setSelected(null);
        dispatch(setIsCountrySelectionChanged(false));
      }
    },[settingsStates.settingsMasterDatas.isCountrySelectionChanged])



  return (
    <View style={styles.container}>
      <View style={{ width: "100%" }}>
        <TouchableOpacity
          ref={selectorRef}
          style={[styles.selector, disabled && styles.selectorDisabled]}
          onPress={toggleDropdown}
          activeOpacity={disabled ? 1 : 0.7}
          disabled={disabled}
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
              {selected
                ? selected.name
                : "Select"}
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
            {country?settingsStates.settingsMasterDatas.allCountriesAvailable?.map(
              (item, itemIndex) => {
                return (
                  <TouchableOpacity
                    key={itemIndex}
                    style={styles.option}
                    onPress={() => handleSelect(item)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[styles.description, { fontFamily: "Mukta-Bold" }]}
                    >
                      {item.name} {item.code}{" "}
                    </Text>
                  </TouchableOpacity>
                );
              }
            ):settingsStates.settingsMasterDatas.allCitiesAvailable?.map(
              (item, itemIndex) => {
                return (
                  <TouchableOpacity
                    key={itemIndex}
                    style={styles.option}
                    onPress={() => handleSelect(item)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[styles.description, { fontFamily: "Mukta-Bold" }]}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }
            )}
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
  selectorDisabled: {
    backgroundColor: "#F3F4F6",
    opacity: 0.6,
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
});

export default RegionDropdown;
