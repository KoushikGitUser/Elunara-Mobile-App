import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useMemo, useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "./ChatScreenCompo.styles";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
  EllipsisVertical,
  House,
  IndianRupee,
  MessageCirclePlus,
  Wallet,
} from "lucide-react-native";
import CurriculumIcon from "../../../assets/SvgIconsComponent/CurriculumIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  setToggleChatHistorySidebar,
  setToggleChatMenuPopup,
  setToggleChatScreenGuideStart,
  setToggleElunaraProWelcomePopup,
  setToggleIsChattingWithAI,
  setToggleShowCurriculumView,
} from "../../redux/slices/toggleSlice";
import ChatOptionsPopup from "../Modals/ChatScreen/ChatOptionsPopup";
import { setChatMessagesArray, setMessageIDsArray, setCurrentAIMessageIndexForRegeneration, setGuidedTourStepsCount, setNavigationBasicsGuideTourSteps, setUserMessagePrompt, setSelecetdFiles, setSettingsInnerPageHeaderTitle, setSettingsInnerPageComponentToRender } from "../../redux/slices/globalDataSlice";
import { commonFunctionForAPICalls } from "../../redux/slices/apiCommonSlice";
import { scaleFont } from "../../utils/responsive";
import PenNib from "../../../assets/SvgIconsComponent/PenNib";
import ArchiveDarkIcon from "../../../assets/SvgIconsComponent/ArchiveDarkIcon";
import SparkleIcon from "../../../assets/SvgIconsComponent/SparkleIcon";
import { triggerToast, triggerToastWithAction } from "../../services/toast";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChatHeader = forwardRef(({ translateX }, ref) => {
  const insets = useSafeAreaInsets();
  const headerTop = Platform.OS === 'ios' ? insets.top : (StatusBar.currentHeight || 30);
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { globalDataStates } = useSelector((state) => state.Global);
  const { chatsStates, walletStates } = useSelector((state) => state.API);
  const SCREEN_WIDTH = Dimensions.get("window").width;
  // Fetch curriculum status
  useEffect(() => {
    dispatch(commonFunctionForAPICalls({
      method: "GET",
      url: "/curriculum/status",
      name: "getCurriculumStatus",
    }));
  }, []);

  const hasCurriculum = useSelector((state) => state.API?.settingsStates?.curriculumStatus?.hasCurriculum);

  // Get chat details
  const chatDetails = chatsStates.allChatsDatas.createdChatDetails;
  const fullChatTitle = chatDetails?.name || "Chat Name";
  const chatTitle = fullChatTitle.length > 15 ? fullChatTitle.substring(0, 15) + "..." : fullChatTitle;
  const roomName = chatDetails?.room?.name;

  // Refs for guided tour measurement
  const menuIconRef = useRef(null);
  const chatOptionsIconRef = useRef(null);

  // Expose measurement methods via ref
  useImperativeHandle(ref, () => ({
    measureMenuIcon: () => {
      return new Promise((resolve) => {
        if (menuIconRef.current) {
          menuIconRef.current.measureInWindow((x, y, width, height) => {
            resolve({ x, y, width, height });
          });
        } else {
          resolve(null);
        }
      });
    },
    measureChatOptionsIcon: () => {
      return new Promise((resolve) => {
        if (chatOptionsIconRef.current) {
          chatOptionsIconRef.current.measureInWindow((x, y, width, height) => {
            resolve({ x, y, width, height });
          });
        } else {
          resolve(null);
        }
      });
    },
  }));

  const action = () => {
    console.log("action");
  };

  return (
    <View
      style={[
        styles.chatHeader,
        {
          top: headerTop,
          borderWidth:
            toggleStates.toggleKeyboardVisibilityOnChatScreen == true ||
            globalDataStates.selectedFiles.length > 0 ||
            toggleStates.toggleIsChattingWithAI
              ? 1
              : 0,
        },
      ]}
    >
      <View style={styles.rightChatHeaderIcons}>
        <TouchableOpacity
          ref={menuIconRef}
          style={toggleStates.toggleChatScreenGuideStart && globalDataStates.guidedTourStepsCount == 2?styles.menuIconGuide:styles.menuIcon}
          onPress={() => {
            Animated.timing(translateX, {
              toValue: toggleStates.toggleChatHistorySidebar
                ? 0
                : SCREEN_WIDTH * 0.75,
              duration: 300,
              useNativeDriver: true,
            }).start();
            dispatch(
              setToggleChatHistorySidebar(
                !toggleStates.toggleChatHistorySidebar
              )
            );

            // If in Navigation Basics tour step 1, advance to step 2
            if (globalDataStates.manualGuidedTourRunning &&
                globalDataStates.navigationBasicsGuideTourSteps === 1) {
              setTimeout(() => {
                dispatch(setNavigationBasicsGuideTourSteps(2));
              }, 350);
            }
          }}
        >
          <Feather name="menu" size={30} color="black" />
        </TouchableOpacity>
        {toggleStates.toggleIsChattingWithAI && (
          <TouchableOpacity style={{}}>
            <EllipsisVertical color="#FAFAFA" strokeWidth={1.25} size={30} />
          </TouchableOpacity>
        )}
      </View>

      {toggleStates.toggleIsChattingWithAI ? (
        <View style={styles.chatnameAndSection}>
          <Text
            style={{
              fontSize: scaleFont(15),
              fontWeight: 600,
              fontFamily: "Mukta-Bold",
            }}
          >
            {chatTitle}
          </Text>
          {roomName && (
            <TouchableOpacity style={styles.topicNamemain}>
              
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: 400,
                  color: "#406DD8",
                  fontFamily: "Mukta-Regular",
                }}
              >
                {roomName}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        (!walletStates.isInitialRechargeCompleted || walletStates.walletBalance <= 0) && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("settingsInnerPages", { page: 11 });
              dispatch(setSettingsInnerPageHeaderTitle("Recharge Wallet"));
              dispatch(setSettingsInnerPageComponentToRender("Make Payment"));
            }}
            style={styles.upgradeButton}
          >
            {walletStates.isInitialRechargeCompleted ? <Wallet size={16} color="#000" /> : <SparkleIcon />}
            <Text
              style={{ fontSize: 14, fontWeight: 600, fontFamily: "Mukta-Bold",marginLeft: walletStates.isInitialRechargeCompleted ? 10 : 0 }}
            >
              {walletStates.isInitialRechargeCompleted ? "Add Money" : "Activate Wallet"}
            </Text>
          </TouchableOpacity>
        )
      )}  

      <View style={styles.rightChatHeaderIcons}>
        {toggleStates.toggleIsChattingWithAI ? (
          <TouchableOpacity
            onPress={async() => {
              dispatch(setChatMessagesArray([]));
              dispatch(setMessageIDsArray([]));
              dispatch(setCurrentAIMessageIndexForRegeneration(null));
              dispatch(setToggleIsChattingWithAI(false));
              // Clear chat input text and attachments
              dispatch(setUserMessagePrompt(""));
              dispatch(setSelecetdFiles([]));
            }}
          >
            <MessageCirclePlus size={30} strokeWidth={1.25} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              if (hasCurriculum) {
                dispatch(setToggleShowCurriculumView(!toggleStates.toggleShowCurriculumView));
              } else {
                triggerToast(
                  "No Curriculum found",
                  "Your Degree Program is not set in the Personalisation section, set it first to get curriculum subjects and topics.",
                  "alert",
                  8000
                );
              }
            }}
          >
            {toggleStates.toggleShowCurriculumView ? (
              <House size={30} strokeWidth={1.25} color="#000" />
            ) : (
              <CurriculumIcon size={28} color={hasCurriculum ? "#000" : "#B0B0B0"} strokeWidth={1.5} />
            )}
          </TouchableOpacity>
        )}
        {toggleStates.toggleIsChattingWithAI && (
          <TouchableOpacity
            ref={chatOptionsIconRef}
            style={{
              backgroundColor: toggleStates.toggleChatMenuPopup
                ? "#E7ECF5"
                : "transparent",
              zIndex: 9,
              borderRadius: 5,
            }}
            onPress={() =>
              dispatch(
                setToggleChatMenuPopup(!toggleStates.toggleChatMenuPopup)
              )
            }
          >
            <EllipsisVertical strokeWidth={1.25} size={30} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
});

export default ChatHeader;
