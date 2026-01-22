import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { moderateScale, scaleFont } from "../../../../../utils/responsive";
import { ArrowLeft } from "lucide-react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
    setToggleToolsPopup,
  setToggleToolsPopupStates,
  setToggleTopicsPopup,
  setSelectedCitationFormat,
} from "../../../../../redux/slices/toggleSlice";
import { commonFunctionForAPICalls } from "../../../../../redux/slices/apiCommonSlice";
import APAIcon from "../../../../../../assets/SvgIconsComponent/CitationFormatIcons/APAIcon";
import HavardIcon from "../../../../../../assets/SvgIconsComponent/CitationFormatIcons/HavardIcon";


// Helper function to get citation icon based on name
const getCitationIcon = (name, isSelected) => {
  const color = isSelected ? "#24487C" : "#888888";
  const key = name?.toLowerCase();
  if (key?.includes("apa")) {
    return <APAIcon color={color} />;
  } else if (key?.includes("harvard") || key?.includes("havard")) {
    return <HavardIcon color={color} />;
  }
  return <APAIcon color={color} />; // Default to APA
};

const CitationState = () => {
  const dispatch = useDispatch();
  const [selectedStyle, setSelectedStyle] = useState(0);
  const { settingsStates } = useSelector((state) => state.API);
  const { chatCustomisationStates } = useSelector((state) => state.Toggle);

  useEffect(() => {
    const payload = {
      method: "GET",
      url: "/master/citation-formats",
      name: "fetchCitationFormatsAvailable",
    };
    dispatch(commonFunctionForAPICalls(payload));
  }, []);

  // Initialize selected citation from Redux state
  const allCitationFormats = settingsStates?.settingsMasterDatas?.allCitationFormatsAvailable || [];

  useEffect(() => {
    if (chatCustomisationStates?.selectedCitationFormat?.id) {
      // Set to the actual ID, not the index
      setSelectedStyle(chatCustomisationStates.selectedCitationFormat.id);
    } else {
      // If no selection, set to the first item's ID (Harvard)
      if (allCitationFormats.length > 0) {
        setSelectedStyle(allCitationFormats[0]?.id || 0);
      } else {
        setSelectedStyle(0);
      }
    }
  }, [chatCustomisationStates?.selectedCitationFormat, allCitationFormats.length]);

  // Handle citation selection
  const handleCitationSelection = (citationOption) => {
    const selectedData = {
      id: citationOption.id,
      name: citationOption.name,
    };

    dispatch(setSelectedCitationFormat(selectedData));
    setSelectedStyle(citationOption.id);
  };

  const RadioButton = ({ selected }) => (
    <View style={[styles.radioOuter, { borderColor: selected ? "black" : "" }]}>
      {selected && <View style={styles.radioInner} />}
    </View>
  );

  return (
    <View style={styles.modalSheet}>
      {/* Content */}
      <View style={styles.content}>
        <View style={styles.closeModalMain}>
          <ArrowLeft
            onPress={() => dispatch(setToggleToolsPopupStates(0))}
            size={30}
            strokeWidth={2}
          />
          <AntDesign
            onPress={() => dispatch(setToggleToolsPopup(false))}
            name="close"
            size={24}
            color="black"
          />
        </View>
        <Text style={[styles.title, { fontFamily: "Mukta-Bold" }]}>Citation Format</Text>

        {/* Description */}
        <Text style={[styles.description, { fontFamily: "Mukta-Regular" }]}>
          Select your preferred popular citation style — APA or Harvard for your
          submissions.
        </Text>
        <View style={{ flexDirection: "column", gap: 25 }}>
          {(settingsStates?.settingsMasterDatas?.allCitationFormatsAvailable || [])?.map((styleOptions, optionsIndex) => {
            const isSelected = selectedStyle === styleOptions.id;
            const icon = getCitationIcon(styleOptions.name, isSelected);

            return (
              <TouchableOpacity
                key={styleOptions.id || optionsIndex}
                style={[
                  styles.card,
                  {
                    backgroundColor:
                      selectedStyle == styleOptions.id ? "#EEF4FF" : "white",
                    borderColor:
                      selectedStyle == styleOptions.id ? "black" : "#D3DAE5",
                  },
                ]}
                onPress={() => handleCitationSelection(styleOptions)}
                activeOpacity={0.7}
              >
                <View style={styles.contentMain}>
                  <View style={styles.iconContainer}>
                    {icon}
                  </View>
                  <View style={styles.textContainer}>
                    <Text
                      style={[
                        styles.optionTitle,
                        { fontSize: scaleFont(18), fontWeight: 600, fontFamily: "Mukta-Bold" },
                      ]}
                    >
                      {styleOptions.name}
                    </Text>
                    <Text
                      style={[
                        styles.optionDescription,
                        {
                          fontSize: scaleFont(14),
                          fontWeight: 400,
                          color: "#8F8F8F",
                          fontFamily: "Mukta-Regular"
                        },
                      ]}
                    >
                      {styleOptions.description}
                    </Text>
                  </View>
                </View>
                <RadioButton selected={selectedStyle === styleOptions.id} />
              </TouchableOpacity>
            );
          })}
        </View>
        <Text style={{ fontSize: moderateScale(12), fontWeight: 400,color:"#3A3A3A",textAlign:"center",marginTop:40,marginBottom:20,fontFamily:"Mukta-Regular" }}>
          <Text style={{ fontSize: moderateScale(12), fontWeight: 600,color:"black",fontFamily:"Mukta-Bold" }}>
            Note:
          </Text>{" "}
          Citations appear only in academic chats. Creative or general chats may not include resources.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalSheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: Platform.OS === "ios" ? 40 : 24,
  },
  verifiedIcon: {
    height: 55,
    width: 50,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  card: {
    borderWidth: 1,
    borderColor: "#D3DAE5",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 18,
    backgroundColor: "white",
  },
  contentMain: {
    flexDirection: "row",
    gap: 10,
    width: "85%",
    alignItems: "flex-start",
  },
  textContainer: {
    flexDirection: "column",
    gap: 5,
  },
  radioOuter: {
    width: 23,
    height: 23,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: "#D3DAE5",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  radioInner: {
    width: "80%",
    height: "80%",
    borderRadius: 50,
    backgroundColor: "#000000ff",
  },
  iconContainer: {
    marginTop: 5,
  },
  closeModalMain: {
    width: "100%",
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: scaleFont(26),
    color: "#1F2937",
    marginBottom: 10,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: scaleFont(13),
    lineHeight: 24,
    color: "#6B7280",
    marginBottom: 32,
    letterSpacing: 0.2,
  },
});

export default CitationState;
