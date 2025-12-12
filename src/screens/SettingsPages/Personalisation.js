import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { scaleFont } from "../../utils/responsive";
import Personal from "../../components/ProfileAndSettings/PersonalitionCompo/Personal";
import Education from "../../components/ProfileAndSettings/PersonalitionCompo/Education";
import Learning from "../../components/ProfileAndSettings/PersonalitionCompo/Learning";
import { appColors } from "../../themes/appColors";

const Personalisation = () => {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const screen_height = Dimensions.get("window").height;
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

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

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: scaleFont(12), fontFamily: "Mukta-Regular" }}>
        Share about yourself for tailored responses!
      </Text>
      <View style={styles.categorySections}>
        <TouchableOpacity
          onPress={() => setSelectedCategory(1)}
          style={[
            styles.sections,
            {
              borderColor:
                selectedCategory == 1 ? appColors.navyBlueShade : "#E2E2E2",
            },
          ]}
        >
          <Text
            style={[
              styles.sectionText,
              {
                color:
                  selectedCategory == 1 ? appColors.navyBlueShade : "#757575",
              },
            ]}
          >
            Personal
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedCategory(2)}
          style={[
            styles.sections,
            {
              borderColor:
                selectedCategory == 2 ? appColors.navyBlueShade : "#E2E2E2",
            },
          ]}
        >
          <Text
            style={[
              styles.sectionText,
              {
                color:
                  selectedCategory == 2 ? appColors.navyBlueShade : "#757575",
              },
            ]}
          >
            Education
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedCategory(3)}
          style={[
            styles.sections,
            {
              borderColor:
                selectedCategory == 3 ? appColors.navyBlueShade : "#E2E2E2",
            },
          ]}
        >
          <Text
            style={[
              styles.sectionText,
              {
                color:
                  selectedCategory == 3 ? appColors.navyBlueShade : "#757575",
              },
            ]}
          >
            Learning
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingTop: 30, flex: 1 }}
        >
          {selectedCategory == 1 ? (
            <Personal />
          ) : selectedCategory == 2 ? (
            <Education />
          ) : (
            <Learning />
          )}
          {keyboardVisible && (
            <View style={{ height: screen_height * 0.4 }}></View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
  },
  categorySections: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
  },
  sectionText: {
    color: "#757575",
    fontFamily: "Mukta-Medium",
  },
  sections: {
    width: "33%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "lightgrey",
    paddingVertical: 10,
  },
});

export default Personalisation;
