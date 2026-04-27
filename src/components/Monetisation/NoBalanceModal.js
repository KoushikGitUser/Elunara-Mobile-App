import {
  View,
  Text,
  Platform,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { scaleFont } from "../../utils/responsive";
import { useDispatch, useSelector } from "react-redux";
import { BlurView } from "@react-native-community/blur";
import { AntDesign } from "@expo/vector-icons";
import { Wallet, WalletMinimal } from "lucide-react-native";
import { setToggleNoBalanceModal } from "../../redux/slices/toggleSlice";
import { useNavigation } from "@react-navigation/native";
import { setSettingsInnerPageComponentToRender, setSettingsInnerPageHeaderTitle } from "../../redux/slices/globalDataSlice";
import { appColors } from "../../themes/appColors";

const NoBalanceModal = () => {
  const { toggleStates } = useSelector((state) => state.Toggle);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleRecharge = () => {
    dispatch(setToggleNoBalanceModal(false));
    navigation.navigate("settingsInnerPages", { page: 2 });
    dispatch(setSettingsInnerPageHeaderTitle("Payment and Billings"));
    dispatch(setSettingsInnerPageComponentToRender("Payment and Billings"));
  };

  return (
    <Modal
      visible={toggleStates.toggleNoBalanceModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => dispatch(setToggleNoBalanceModal(false))}
    >
      <View style={styles.container}>
        <BlurView
          style={styles.blurView}
          blurType="light"
          blurAmount={7}
          reducedTransparencyFallbackColor="rgba(0, 0, 0, 0.43)"
        />
        <View style={styles.androidBlur} />

        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={() => dispatch(setToggleNoBalanceModal(false))}
        />

        <View style={styles.modalSheet}>
          <View style={styles.closeModalMain}>
            <AntDesign
              style={{ marginRight: 20 }}
              onPress={() => dispatch(setToggleNoBalanceModal(false))}
              name="close"
              size={20}
              color="black"
            />
          </View>

          <View style={styles.content}>
            <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              {/* <View style={styles.coinstar}>
                <AntDesign  name="star" size={22} color={appColors.navyBlueShade} />
              </View> */}
              <Wallet color={appColors.navyBlueShade} size={30} />
            </View>
            
            </View>
{/* <Text style={styles.title}>No Learning Point</Text> */}
<Text style={styles.title}>No Balance!</Text>
            

            {/* <Text style={styles.description}>
              Your LP is 0 and you can't use any feature on this app. Recharge your LP to re-enable the features.
            </Text> */}
             <Text style={styles.description}>
              Your Balance is 0 and you can't use any feature on this app. Recharge your Wallet to re-enable the features.
            </Text>

            <View style={styles.btnsMain}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleRecharge}
                activeOpacity={0.8}
              >
                {/* <Text style={styles.buttonText}>Recharge Learning Points</Text> */}
                 <Text style={styles.buttonText}>Recharge Wallet</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  blurView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  androidBlur: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.18)",
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalSheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: Platform.OS === "ios" ? 0 : 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 20,
  },
  btnsMain: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  zeroBalance: {
    fontSize: scaleFont(28),
    fontFamily: "Mukta-Bold",
    color: "#EF4444",
  },
  title: {
    fontSize: scaleFont(25),
    fontFamily: "Mukta-Bold",
    color: "#ff5151",
    letterSpacing: -0.5,
    marginBottom:15
  },
  description: {
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Regular",
    lineHeight: 24,
    color: "#6B7280",
    marginBottom: 24,
  },
  button: {
    width: "100%",
    backgroundColor: "#081A35",
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(16),
    fontWeight: "500",
    fontFamily: "Mukta-Bold",
    letterSpacing: 0.3,
  },
  closeModalMain: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
    coinstar: {
    height: 35,
    width: 35,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: appColors.navyBlueShade,
    justifyContent: "center",
    alignItems: "center"
  },
    iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: "#EEF4FF",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default NoBalanceModal;
