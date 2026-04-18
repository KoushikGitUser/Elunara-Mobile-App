import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { profileAndSettingsOptions } from "../../data/datas";
import SparkleIcon from "../../../assets/SvgIconsComponent/ChatHistorySidebarIcons/SparkleIcon";
import GradientText from "../common/GradientText";
import { moderateScale, scaleFont, verticalScale } from "../../utils/responsive";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  setSettingsInnerPageComponentToRender,
  setSettingsInnerPageHeaderTitle,
} from "../../redux/slices/globalDataSlice";
import GeneralSettings from "../../screens/SettingsPages/GeneralSettings";
import Personalisation from "../../screens/SettingsPages/Personalisation";
import Analytics from "../../screens/SettingsPages/Analytics";
import PaymentBilling from "../../screens/SettingsPages/PaymentBilling";
import adImg from "../../assets/images/Upgrade.jpg";
import { setToggleAdFreeExpPopup, setToggleUnlockAnalyticsDashboardPopup } from "../../redux/slices/toggleSlice";
import { appColors } from "../../themes/appColors";
import { Wallet } from "lucide-react-native";
import { AntDesign } from "@expo/vector-icons";

const ProfileOptionsContainer = ({ setToggleLogOutConfirmPopup }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { walletStates } = useSelector((state) => state.API);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        justifyContent: "flex-start",
        alignItems: "flex-start",
      }}
      style={styles.container}
    >
      {/* Options */}
      {profileAndSettingsOptions?.map((option, optionIndex) => {
        return (
          <React.Fragment key={optionIndex}>
            <TouchableOpacity
              onPress={() => {
                if (optionIndex == 8) {
                  setToggleLogOutConfirmPopup(true);
                } else {
                  navigation.navigate("settingsInnerPages", {
                    page: optionIndex,
                  });
                  dispatch(setSettingsInnerPageHeaderTitle(option.title));
                }
              }}
              style={styles.itemContainer}
            >
              {option.icon}
              <Text style={[styles.title, { fontFamily: "Mukta-Regular" }]}>{option.title}</Text>
            </TouchableOpacity>
            {optionIndex == 5 && (
              <TouchableOpacity style={styles.adBox}>
                 <Text style={styles.adText}>
                  -- Ad Space --
                 </Text>
              </TouchableOpacity>
            )}
          </React.Fragment>
        );
      })}

      {/* Upgrade button */}
      <TouchableOpacity style={styles.upgradeBtn} onPress={() => {
        navigation.navigate("settingsInnerPages", { page: 11 });
        dispatch(setSettingsInnerPageHeaderTitle(walletStates?.isInitialRechargeCompleted ? "Add Learning Points" : "Activate Learning Points"));
        dispatch(setSettingsInnerPageComponentToRender("Make Payment"));
      }}>
        <View style={styles.coinstar}>
          <AntDesign name="star" size={18} color={appColors.navyBlueShade} />
        </View>
        {/* {walletStates?.isInitialRechargeCompleted ? (
          <Wallet size={29} strokeWidth={1.5} color={appColors.navyBlueShade} />
        ) : (
          <SparkleIcon color={appColors.navyBlueShade} />
        )} */}
        <View style={{ width: "100%" }}>
          <GradientText
            children={walletStates?.isInitialRechargeCompleted ? "Add Learning Points" : "Activate Learning Points"}
            fullWidth={true}
            fontSize={20}
          />
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    marginTop: 20,
  },
  itemContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    paddingVertical: 12,
  },
  icon: {
    marginRight: 15,
  },
  title: {
    fontSize: scaleFont(17),
    color: "#081A35",
    fontWeight: "500",
  },
  upgradeBtn: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#D3DAE5",
    borderRadius: 16,
    padding: 12,
    gap: 15,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 20,
    marginBottom: 30,
  },
  coinstar: {
    height: 30,
    width: 30,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: appColors.navyBlueShade,
    justifyContent: "center",
    alignItems: "center"
  },
  adBox: {
    width: "100%",
    marginTop: 10, 
    marginBottom: 10,
    height:100,
    backgroundColor:"#e1ebff",
    borderRadius:20,
    borderWidth:2,
    borderColor:"#c4d8ff",
    justifyContent:"center",
    alignItems:"center"
  },
  adText:{
    fontSize:20,
    fontFamily:"Mukta-Bold",
    color:"#7995cd"
  }
});

export default ProfileOptionsContainer;
