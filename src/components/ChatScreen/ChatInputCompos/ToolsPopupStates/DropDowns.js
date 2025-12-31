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
import React, { useEffect, useRef, useState } from "react";
import { LLMOptionsAvailable } from "../../../../data/datas";
import { MaterialIcons } from "@expo/vector-icons";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import { moderateScale, scaleFont } from "../../../../utils/responsive";
import { commonFunctionForAPICalls } from "../../../../redux/slices/apiCommonSlice";
import { useDispatch, useSelector } from "react-redux";
import gemini from "../../../../assets/images/gemini.png";
import anthropic from "../../../../assets/images/antropic.png";
import mistral from "../../../../assets/images/mistral.png";
import chatgpt from "../../../../assets/images/chatgpt.png";

const providerImages = {
  "google": gemini,
  "anthropic": anthropic,
  "mistral ai": mistral,
  "open ai": chatgpt,
  "openai": chatgpt,
};

const getProviderImage = (provider) => {
  const key = provider?.toLowerCase();
  return providerImages[key] || anthropic;
};

const DropDowns = ({setSelectedCounts,selectedCounts,triggerAPICall,initialSetValue}) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const selectorRef = useRef(null);
  const screenHeight = Dimensions.get("window").height;
  const dispatch = useDispatch();
  const { settingsStates } = useSelector((state) => state.API);

    useEffect(()=>{
      const payload = {
        method:"GET",
        url:"/master/llms",
        name:"getAllLLMsAvailable"
      }
    dispatch(commonFunctionForAPICalls(payload))
    },[]);

    useEffect(()=>{
      if(initialSetValue){
        setSelected(initialSetValue);
        setSelectedIcon(getProviderImage(initialSetValue?.provider));
      }
    },[initialSetValue])

  const toggleDropdown = () => {
    if (selectorRef.current) {
      selectorRef.current.measure((_x, _y, _width, height, _pageX, pageY) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setVisible((prev) => !prev);
      });
    }
  };

  const handleSelect = (item) => {
    setSelected(item);
    setVisible(false);
    triggerAPICall(item?.id)
    setSelectedIcon(getProviderImage(item?.provider));
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
                fontSize: scaleFont(14),
                fontFamily:"Mukta-Bold",
                color: selected ? "black" : "#B5BECE",
                fontFamily:"Mukta-Regular",
              }}
            >
              {selected == null?"Select": selected.name}
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
            {settingsStates.settingsMasterDatas.allLLMsAvailable?.map((item, itemIndex) => {
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
                      gap: 10,
                      alignItems: "center",
                    }}
                  >
                    <Image style={styles.iconImage} source={getProviderImage(item?.provider)} />
                    <Text style={[styles.title,{fontFamily:"Mukta-Bold"}]}>{item.name}</Text>
                  </View>

                  <View>
                    <Text style={[styles.description,{fontFamily:"Mukta-Regular"}]}>{item.description}</Text>
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
    fontSize: moderateScale(14),
    fontWeight: "600",
    color: "#000",
  },
  description: {
    fontSize: scaleFont(12.5),
    color: "#757575",
  },
});

export default DropDowns;
