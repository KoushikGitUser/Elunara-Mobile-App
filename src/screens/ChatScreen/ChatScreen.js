import {
  View,
  Dimensions,
  Animated,
  StatusBar,
  BackHandler,
  Alert,
} from "react-native";
import React, { useEffect, useMemo, useCallback, useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { createStyles } from "./ChatScreen.styles";
import ChatInputMain from "../../components/ChatScreen/ChatInputMain";
import ChatHeader from "../../components/ChatScreen/ChatHeader";
import ChatMiddleWrapper from "../../components/ChatScreen/ChatMiddleSection/ChatMiddleWrapper";
import ChatHistorySidebar from "../../components/ChatScreen/ChatHistorySidebar/ChatHistorySidebar";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setToggleChatScreenGuideStart, setToggleChatHistorySidebar, setToggleChatActionsPopupOnLongPress } from "../../redux/slices/toggleSlice";
import {
  setGuidedTourStepsCount,
  setNavigationBasicsGuideTourSteps,
  setChatFunctionsGuideTourSteps,
  setLearningLabsGuideTourSteps,
  resetAllGuidedTourSteps,
  setChatMessagesArray,
  setChatTitleOnLongPress,
  setSettingsInnerPageHeaderTitle,
} from "../../redux/slices/globalDataSlice";
import ChatOptionsPopup from "../../components/Modals/ChatScreen/ChatOptionsPopup";
import ToolsOptionsPopup from "../../components/ChatScreen/ChatInputCompos/ToolsOptionsPopup";
import TopicsCompo from "../../components/ChatScreen/ChatInputCompos/TopicsCompo";
import DeleteConfirmPopup from "../../components/ChatScreen/ChatMiddleSection/ChatConversationActions/DeleteConfirmPopup";
import RenameChatPopup from "../../components/ChatScreen/ChatMiddleSection/ChatConversationActions/RenameChatPopup";
import UserMessageActionPopup from "../../components/ChatScreen/Messages/UserMessageActionPopup";
import ChatLongPressPopup from "../../components/ChatScreen/ChatHistorySidebar/ChatLongPressPopup";
import UnlockArchiveLimitPopup from "../../components/Monetisation/UnlockArchiveLimitPopup";
import UnlockPersonalisationLimitPopup from "../../components/Monetisation/UnlockPersonalisationLimitPopup";
import ElunaraProWelcomePopup from "../../components/Monetisation/ElunaraProWelcomePopup";
import UniversalTooltip from "../../components/GuidedTourTooltip/UniversalTooltip";
import ToasterWithAction from "../../components/UniversalToaster/ToasterWithAction";
import { useFonts } from "expo-font";
import ChangeLLMPopup from "../../components/ChatScreen/Messages/ChatQuickActionsPopups/ChangeResponse/ChangeLLMPopup";
import ChangeLangPopup from "../../components/ChatScreen/Messages/ChatQuickActionsPopups/ChangeLang/ChangeLangPopup";
import ChangeResponseStylePopup from "../../components/ChatScreen/Messages/ChatQuickActionsPopups/ChangeStyle/ChangeResponseStylePopup";
import NotHelpfulFeedbackPopup from "../../components/ChatScreen/Messages/ChatQuickActionsPopups/Feedback/NotHelpfulFeedbackPopup";
import AddChatToLearningLabPopup from "../../components/ChatScreen/ChatMiddleSection/ChatConversationActions/AddChatToLearningLabPopup";
import ExitAppConfirmationPopup from "../../components/ChatScreen/ExitAppConfirmationPopup";
import { commonFunctionForAPICalls } from "../../redux/slices/apiCommonSlice";

// Mock chat messages for Chat Functions tour step 2
const mockChatMessages = [
  {
    role: "user",
    message: "What is machine learning?",
    file: null,
  },
  {
    role: "ai",
    message: "Machine learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed. It focuses on developing algorithms that can access data, learn from it, and make predictions or decisions.",
    file: null,
  },
];

const ChatScreen = () => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { globalDataStates } = useSelector((state) => state.Global);
  const { chatsStates } = useSelector((state) => state.API);
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const SCREEN_HEIGHT = Dimensions.get("window").height;
  const translateX = useRef(new Animated.Value(0)).current;
  const [toggleExitAppConfirmPopup, setToggleExitAppConfirmPopup] = useState(false);

  // Store original chat messages before mock injection
  const [originalChatMessages, setOriginalChatMessages] = useState([]);

  // States for tracking chat creation and messages fetching
  const [isWaitingForChat, setIsWaitingForChat] = useState(false);
  const [isWaitingForMessages, setIsWaitingForMessages] = useState(false);

  const isChatCreatedWithAI = chatsStates?.loaderStates?.isChatCreatedWithAI;
  const createdChatDetails = chatsStates?.allChatsDatas?.createdChatDetails;
  const isMessagesFetched = chatsStates?.loaderStates?.isMessagesFetched;
  const chatMessages = chatsStates?.allChatsDatas?.chatMessages;

  // Refs for guided tour measurements
  const chatHeaderRef = useRef(null);
  const chatInputRef = useRef(null);
  const sidebarRef = useRef(null);

  // State for measured spotlight rectangles
  const [spotlightRects, setSpotlightRects] = useState({});

  const [fontsLoaded] = useFonts({
    "Mukta-Bold": require("../../../assets/fonts/Mukta-Bold.ttf"),
    "Mukta-Regular": require("../../../assets/fonts/Mukta-Regular.ttf"),
    "Mukta-Medium": require("../../../assets/fonts/Mukta-Medium.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
    } 
  }, [fontsLoaded]);

  useEffect(()=>{
    const payload = {
      method:"GET",
      url:"/master/subjects",
      name:"getAllSubjectsForChat",
    }
    dispatch(commonFunctionForAPICalls(payload));
  },[])

  // Track previous chat UUID to detect new chat creation
  const previousChatUuidRef = useRef(null);

  // When chat is created, send message to get AI response
  useEffect(() => {
    if (isChatCreatedWithAI === true && createdChatDetails?.id) {
      // Only proceed if this is a new chat (different ID)
      if (previousChatUuidRef.current !== createdChatDetails.id) {
        previousChatUuidRef.current = createdChatDetails.id;
        setIsWaitingForMessages(true);
        const chatId = createdChatDetails.id;
        Alert.alert("Chat Created", "ID: " + chatId + "\nNow sending message...");
        const payload = {
          method: "POST",
          url: `/chats/${chatId}/messages`,
          data: {
            content: globalDataStates.chatMessagesArray[globalDataStates.chatMessagesArray.length - 1]?.message || "Hello",
          },
          name: "getMessagesByChatUuid",
        };
        dispatch(commonFunctionForAPICalls(payload));
      }
    }
  }, [isChatCreatedWithAI, createdChatDetails]);

  // When messages are fetched, show alert
  useEffect(() => {
    if (isWaitingForMessages && isMessagesFetched === true) {
      setIsWaitingForMessages(false);
      const userMessage = chatMessages?.user_message;
      const id = userMessage?.id || "none";
      const content = userMessage?.content || "No content";
      Alert.alert("User Message", "ID: " + id + "\nContent: " + content);
    }
    // Handle rejected case
    if (isWaitingForMessages && isMessagesFetched === false) {
      setIsWaitingForMessages(false);
      Alert.alert("Messages API Failed", "getMessagesByChatUuid was rejected");
    }
  }, [isMessagesFetched, chatMessages, isWaitingForMessages]);

  useEffect(() => {
    const checkNewUser = async () => {
      const isNewUser = await AsyncStorage.getItem("isNewUser");
      if (isNewUser === null && !globalDataStates.manualGuidedTourRunning) {
        dispatch(setToggleChatScreenGuideStart(true));
        dispatch(setGuidedTourStepsCount(1));
      }
    };
    checkNewUser();
  }, []);

  // Handle sidebar auto-open for guided tours
  useEffect(() => {
    if (globalDataStates.manualGuidedTourRunning) {
      // Navigation Basics - auto open sidebar after step 1
      if (globalDataStates.navigationBasicsGuideTourSteps === 2 ||
          globalDataStates.navigationBasicsGuideTourSteps === 3 ||
          globalDataStates.navigationBasicsGuideTourSteps === 4) {
        if (!toggleStates.toggleChatHistorySidebar) {
          setTimeout(() => {
            Animated.timing(translateX, {
              toValue: SCREEN_WIDTH * 0.75,
              duration: 300,
              useNativeDriver: true,
            }).start();
            dispatch(setToggleChatHistorySidebar(true));
          }, 350);
        }
      }

      // Learning Labs - auto open sidebar
      if (globalDataStates.learningLabsGuideTourSteps === 1) {
        if (!toggleStates.toggleChatHistorySidebar) {
          setTimeout(() => {
            Animated.timing(translateX, {
              toValue: SCREEN_WIDTH * 0.75,
              duration: 300,
              useNativeDriver: true,
            }).start();
            dispatch(setToggleChatHistorySidebar(true));
          }, 350);
        }
      }

      // Navigation Basics Step 4 - trigger long press popup
      if (globalDataStates.navigationBasicsGuideTourSteps === 4) {
        setTimeout(() => {
          dispatch(setChatTitleOnLongPress("Demo Chat"));
          dispatch(setToggleChatActionsPopupOnLongPress(true));
        }, 400);
      }

      // Chat Functions Step 2 - inject mock messages
      if (globalDataStates.chatFunctionsGuideTourSteps === 2) {
        // Store original messages and inject mock
        setOriginalChatMessages(globalDataStates.chatMessagesArray || []);
        dispatch(setChatMessagesArray(mockChatMessages));
      }
    }
  }, [
    globalDataStates.navigationBasicsGuideTourSteps,
    globalDataStates.learningLabsGuideTourSteps,
    globalDataStates.chatFunctionsGuideTourSteps,
    globalDataStates.manualGuidedTourRunning,
  ]);

  // Measure elements for spotlight when guided tour steps change
  useEffect(() => {
    const measureElements = async () => {
      if (!globalDataStates.manualGuidedTourRunning) return;

      const padding = 8; // Add padding around measured elements
      const newRects = {};

      // Navigation Basics Tour measurements
      if (globalDataStates.navigationBasicsGuideTourSteps === 1) {
        // Measure menu icon
        if (chatHeaderRef.current?.measureMenuIcon) {
          const rect = await chatHeaderRef.current.measureMenuIcon();
          if (rect) {
            newRects.menuIcon = {
              x: rect.x - padding,
              y: rect.y - padding,
              width: rect.width + padding * 2,
              height: rect.height + padding * 2,
            };
          }
        }
      } else if (globalDataStates.navigationBasicsGuideTourSteps === 2) {
        // Measure recent chats section (delay for sidebar animation)
        setTimeout(async () => {
          if (sidebarRef.current?.measureRecentChatsSection) {
            const rect = await sidebarRef.current.measureRecentChatsSection();
            if (rect) {
              setSpotlightRects(prev => ({
                ...prev,
                recentChats: {
                  x: rect.x - padding,
                  y: rect.y - padding,
                  width: rect.width + padding * 2,
                  height: rect.height + padding * 2,
                },
              }));
            }
          }
        }, 500);
      } else if (globalDataStates.navigationBasicsGuideTourSteps === 3) {
        // Measure pinned section
        if (sidebarRef.current?.measurePinnedSection) {
          const rect = await sidebarRef.current.measurePinnedSection();
          if (rect) {
            newRects.pinnedSection = {
              x: rect.x - padding,
              y: rect.y - padding,
              width: rect.width + padding * 2,
              height: rect.height + padding * 2,
            };
          }
        }
      }

      // Chat Functions Tour measurements
      if (globalDataStates.chatFunctionsGuideTourSteps === 1) {
        // Measure input section
        if (chatInputRef.current?.measureInputSection) {
          const rect = await chatInputRef.current.measureInputSection();
          if (rect) {
            newRects.inputSection = {
              x: rect.x - padding,
              y: rect.y - padding,
              width: rect.width + padding * 2,
              height: rect.height + padding * 2,
            };
          }
        }
      } else if (globalDataStates.chatFunctionsGuideTourSteps === 3) {
        // Measure tools icon
        if (chatInputRef.current?.measureToolsIcon) {
          const rect = await chatInputRef.current.measureToolsIcon();
          if (rect) {
            newRects.toolsIcon = {
              x: rect.x - padding,
              y: rect.y - padding,
              width: rect.width + padding * 2,
              height: rect.height + padding * 2,
            };
          }
        }
      } else if (globalDataStates.chatFunctionsGuideTourSteps === 4) {
        // Measure chat options icon
        if (chatHeaderRef.current?.measureChatOptionsIcon) {
          const rect = await chatHeaderRef.current.measureChatOptionsIcon();
          if (rect) {
            newRects.chatOptionsIcon = {
              x: rect.x - padding,
              y: rect.y - padding,
              width: rect.width + padding * 2,
              height: rect.height + padding * 2,
            };
          }
        }
      }

      // Learning Labs Tour measurements
      if (globalDataStates.learningLabsGuideTourSteps === 1) {
        // Measure learning lab button (delay for sidebar animation)
        setTimeout(async () => {
          if (sidebarRef.current?.measureLearningLabBtn) {
            const rect = await sidebarRef.current.measureLearningLabBtn();
            if (rect) {
              setSpotlightRects(prev => ({
                ...prev,
                learningLabBtn: {
                  x: rect.x - padding,
                  y: rect.y - padding,
                  width: rect.width + padding * 2,
                  height: rect.height + padding * 2,
                },
              }));
            }
          }
        }, 500);
      }

      if (Object.keys(newRects).length > 0) {
        setSpotlightRects(prev => ({ ...prev, ...newRects }));
      }
    };

    measureElements();
  }, [
    globalDataStates.navigationBasicsGuideTourSteps,
    globalDataStates.chatFunctionsGuideTourSteps,
    globalDataStates.learningLabsGuideTourSteps,
    globalDataStates.manualGuidedTourRunning,
  ]);

  useEffect(() => {
    const backAction = () => {
      setToggleExitAppConfirmPopup(true);
      return true; // prevent default behavior (exit)
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // clean up
  }, [toggleExitAppConfirmPopup]);

  // Note: postAddToNotes should be called with actual message uuid when user clicks "Add to Notes"
  // Example usage:
  const handleAddToNotes = (messageUuid) => {
    const payload = {
      method: "POST",
      url: `/messages/${messageUuid}/add-to-notes`,
      name: "postAddToNotes",
    };
    dispatch(commonFunctionForAPICalls(payload));
  };

  // Helper function to close sidebar
  const closeSidebar = () => {
    Animated.timing(translateX, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    dispatch(setToggleChatHistorySidebar(false));
  };

  // Helper function to open sidebar
  const openSidebar = () => {
    Animated.timing(translateX, {
      toValue: SCREEN_WIDTH * 0.75,
      duration: 300,
      useNativeDriver: true,
    }).start();
    dispatch(setToggleChatHistorySidebar(true));
  };

  // Navigation Basics Tour Handlers
  const handleNavigationBasicsNext = (currentStep) => {
    if (currentStep === 1) {
      dispatch(setNavigationBasicsGuideTourSteps(2));
      // Sidebar will auto-open via useEffect
    } else if (currentStep === 2) {
      dispatch(setNavigationBasicsGuideTourSteps(3));
    } else if (currentStep === 3) {
      dispatch(setNavigationBasicsGuideTourSteps(4));
      // Long press popup will auto-trigger via useEffect
    } else if (currentStep === 4) {
      // Finish tour
      dispatch(setToggleChatActionsPopupOnLongPress(false));
      closeSidebar();
      dispatch(resetAllGuidedTourSteps());
      dispatch(setSettingsInnerPageHeaderTitle("Help Center"));
      navigation.navigate("settingsInnerPages", { page: 5 });
    }
  };

  const handleNavigationBasicsBack = (currentStep) => {
    if (currentStep === 2) {
      closeSidebar();
      dispatch(setNavigationBasicsGuideTourSteps(1));
    } else if (currentStep === 3) {
      dispatch(setNavigationBasicsGuideTourSteps(2));
    } else if (currentStep === 4) {
      dispatch(setToggleChatActionsPopupOnLongPress(false));
      dispatch(setNavigationBasicsGuideTourSteps(3));
    }
  };

  // Chat Functions Tour Handlers
  const handleChatFunctionsNext = (currentStep) => {
    if (currentStep === 1) {
      dispatch(setChatFunctionsGuideTourSteps(2));
      // Mock messages will be injected via useEffect
    } else if (currentStep === 2) {
      // Clear mock messages
      dispatch(setChatMessagesArray(originalChatMessages));
      dispatch(setChatFunctionsGuideTourSteps(3));
    } else if (currentStep === 3) {
      dispatch(setChatFunctionsGuideTourSteps(4));
    } else if (currentStep === 4) {
      // Finish tour
      dispatch(resetAllGuidedTourSteps());
      dispatch(setSettingsInnerPageHeaderTitle("Help Center"));
      navigation.navigate("settingsInnerPages", { page: 5 });
    }
  };

  const handleChatFunctionsBack = (currentStep) => {
    if (currentStep === 2) {
      // Clear mock messages
      dispatch(setChatMessagesArray(originalChatMessages));
      dispatch(setChatFunctionsGuideTourSteps(1));
    } else if (currentStep === 3) {
      // Re-inject mock messages
      dispatch(setChatMessagesArray(mockChatMessages));
      dispatch(setChatFunctionsGuideTourSteps(2));
    } else if (currentStep === 4) {
      dispatch(setChatFunctionsGuideTourSteps(3));
    }
  };

  // Learning Labs Tour Handlers
  const handleLearningLabsUnlock = () => {
    closeSidebar();
    dispatch(resetAllGuidedTourSteps());
    navigation.navigate("paymentsAndBilling");
  };

  const handleLearningLabsBack = () => {
    closeSidebar();
    dispatch(resetAllGuidedTourSteps());
    dispatch(setSettingsInnerPageHeaderTitle("Help Center"));
    navigation.navigate("settingsInnerPages", { page: 6 });
  };

  // Show nothing (or a loader) while fonts are loading
  if (!fontsLoaded) {
    return null;
  }

  // Get spotlight rectangle using measured values or fallbacks
  const getSpotlightRect = (tourType, step) => {
    const statusBarHeight = StatusBar.currentHeight || 0;

    // Navigation Basics
    if (tourType === "navigation") {
      switch (step) {
        case 1: // Menu icon
          return spotlightRects.menuIcon || { x: 15, y: statusBarHeight + 35, width: 46, height: 46 };
        case 2: // Recent chats section
          return spotlightRects.recentChats || { x: 10, y: statusBarHeight + 200, width: SCREEN_WIDTH * 0.7, height: 150 };
        case 3: // Pinned section
          return spotlightRects.pinnedSection || { x: 10, y: statusBarHeight + 100, width: SCREEN_WIDTH * 0.7, height: 100 };
        case 4: // Chat options popup (will be shown)
          return { x: SCREEN_WIDTH * 0.1, y: SCREEN_HEIGHT * 0.3, width: SCREEN_WIDTH * 0.55, height: 200 };
        default:
          return null;
      }
    }

    // Chat Functions
    if (tourType === "chatFunctions") {
      switch (step) {
        case 1: // Input section
          return spotlightRects.inputSection || { x: 10, y: SCREEN_HEIGHT - 120, width: SCREEN_WIDTH - 20, height: 80 };
        case 2: // Quick actions (AI message)
          return { x: 20, y: SCREEN_HEIGHT - 280, width: SCREEN_WIDTH - 40, height: 60 };
        case 3: // LLM customization icon
          return spotlightRects.toolsIcon || { x: 15, y: SCREEN_HEIGHT - 115, width: 46, height: 46 };
        case 4: // Top chat options
          return spotlightRects.chatOptionsIcon || { x: SCREEN_WIDTH - 55, y: statusBarHeight + 35, width: 46, height: 46 };
        default:
          return null;
      }
    }

    // Learning Labs
    if (tourType === "learningLabs") {
      return spotlightRects.learningLabBtn || { x: 10, y: statusBarHeight + 200, width: SCREEN_WIDTH * 0.7, height: 50 };
    }

    return null;
  };

  // Calculate tooltip position based on spotlight rect
  // Returns { top/bottom, left/right, pointerLeft/pointerRight } for tooltip positioning
  const getTooltipPosition = (spotlightRect, position = "below", alignment = "left") => {
    if (!spotlightRect) return {};

    const tooltipWidth = SCREEN_WIDTH - 100; // From UniversalTooltip styles
    const tooltipGap = 15; // Gap between spotlight and tooltip
    const pointerOffset = 25; // Offset for pointer from edge

    let result = {};

    // Vertical positioning
    if (position === "below") {
      result.top = spotlightRect.y + spotlightRect.height + tooltipGap;
    } else if (position === "above") {
      result.bottom = SCREEN_HEIGHT - spotlightRect.y + tooltipGap;
    }

    // Horizontal positioning and pointer alignment
    if (alignment === "left") {
      // Left-aligned tooltip
      result.left = Math.max(10, spotlightRect.x);
      // Pointer points to center of spotlight
      const spotlightCenter = spotlightRect.x + spotlightRect.width / 2;
      result.pointerLeft = Math.max(15, Math.min(spotlightCenter - result.left, tooltipWidth - 30));
    } else if (alignment === "right") {
      // Right-aligned tooltip
      result.right = Math.max(10, SCREEN_WIDTH - (spotlightRect.x + spotlightRect.width));
      // Pointer points to center of spotlight
      const spotlightCenter = spotlightRect.x + spotlightRect.width / 2;
      const tooltipLeft = SCREEN_WIDTH - result.right - tooltipWidth;
      result.pointerRight = Math.max(15, Math.min(SCREEN_WIDTH - spotlightCenter - tooltipLeft - 30, tooltipWidth - 30));
    } else if (alignment === "center") {
      // Center-aligned tooltip
      const spotlightCenter = spotlightRect.x + spotlightRect.width / 2;
      result.left = Math.max(10, spotlightCenter - tooltipWidth / 2);
      result.pointerLeft = tooltipWidth / 2 - 8; // Center pointer
    }

    return result;
  };

  return (
    <SafeAreaView
      style={{ flex: 1, width: "100%", marginTop: -StatusBar.currentHeight }}
    >
      <ChatHistorySidebar ref={sidebarRef} translateX={translateX} />
      <Animated.View style={{ flex: 1, transform: [{ translateX }] }}>
        <View
          style={{
            height: StatusBar.currentHeight,
            width: "100%",
            backgroundColor: "#FAFAFA",
            zIndex: 9999,
          }}
        ></View>
        <ChatHeader ref={chatHeaderRef} translateX={translateX} />
        <View style={styles.chatMainWrapper}>
          {toggleStates.toggleChatMenuPopup && <ChatOptionsPopup />}
          {toggleStates.toggleToolsPopup && <ToolsOptionsPopup />}
          {toggleStates.toggleTopicsPopup && <TopicsCompo />}
          {toggleStates.toggleDeleteChatConfirmPopup && <DeleteConfirmPopup />}
          {toggleStates.toggleRenameChatPopup && <RenameChatPopup />}
          {toggleStates.toggleChangeResponseLLMWhileChatPopup && (
            <ChangeLLMPopup />
          )}
          {toggleExitAppConfirmPopup && <ExitAppConfirmationPopup setToggleExitAppConfirmPopup={setToggleExitAppConfirmPopup} toggleExitAppConfirmPopup={toggleExitAppConfirmPopup} />}
          {toggleStates.toggleChangeLangWhileChatPopup && <ChangeLangPopup />}
          {toggleStates.toggleChangeResponseStyleWhileChatPopup && (
            <ChangeResponseStylePopup />
          )}
          {toggleStates.toggleNotHelpfulFeedbackPopup && (
            <NotHelpfulFeedbackPopup />
          )}
          {toggleStates.toggleAddChatToLearningLabPopup && (
            <AddChatToLearningLabPopup />
          )}
          {toggleStates.toggleUserMessageActionPopup && (
            <UserMessageActionPopup />
          )}
          {toggleStates.toggleChatActionsPopupOnLongPress && !globalDataStates.manualGuidedTourRunning && (
            <ChatLongPressPopup />
          )}
          {toggleStates.toggleUnlockArchiveLimitPopup && (
            <UnlockArchiveLimitPopup />
          )}
          {toggleStates.toggleUnlockPersonalisationLimitPopup && (
            <UnlockPersonalisationLimitPopup />
          )}
          {toggleStates.toggleElunaraProWelcomePopup && (
            <ElunaraProWelcomePopup />
          )}

          {/* Original new user guided tour tooltips */}
          {toggleStates.toggleChatScreenGuideStart && globalDataStates.guidedTourStepsCount == 1 && !globalDataStates.manualGuidedTourRunning && (
            <UniversalTooltip
              title="Customise Your AI"
              description="Customize how Elunara responds, choose the AI model, response style, language, and citation format, all tailored to your needs."
              isBelowButtonPresent={false}
              pointerPosition="down"
              pointerAlignment="left"
              modalPosition="down"
              modalAlignment="right"
              bottom={140}
              right={20}
              pointerLeft={60}
            />
          )}
          {toggleStates.toggleChatScreenGuideStart && globalDataStates.guidedTourStepsCount == 2 && !globalDataStates.manualGuidedTourRunning && (
            <UniversalTooltip
              title="Organise your work quickly."
              description="Start a new learning lab easily from the sidebar to keep everything focused."
              isBelowButtonPresent={false}
              pointerPosition="up"
              pointerAlignment="left"
              modalPosition="up"
              modalAlignment="left"
              top ={105}
              left={10}
              pointerLeft={20}
            />
          )}

          {/* Navigation Basics Tour */}
          {globalDataStates.manualGuidedTourRunning && globalDataStates.navigationBasicsGuideTourSteps === 1 && (() => {
            const spotlightRect = getSpotlightRect("navigation", 1);
            const tooltipPos = getTooltipPosition(spotlightRect, "below", "left");
            return (
              <UniversalTooltip
                isManualTour={true}
                title="Open Sidebar"
                description="Tap the menu icon to access your chat history, learning labs, and rooms."
                currentStep={1}
                totalSteps={4}
                onNextPress={() => handleNavigationBasicsNext(1)}
                showBackButton={false}
                pointerPosition="up"
                pointerAlignment="left"
                modalPosition="up"
                modalAlignment="left"
                top={tooltipPos.top || 90}
                left={tooltipPos.left || 10}
                pointerLeft={tooltipPos.pointerLeft || 20}
                spotlightRect={spotlightRect}
              />
            );
          })()}
          {globalDataStates.manualGuidedTourRunning && globalDataStates.navigationBasicsGuideTourSteps === 2 && (() => {
            const spotlightRect = getSpotlightRect("navigation", 2);
            const tooltipPos = getTooltipPosition(spotlightRect, "below", "left");
            return (
              <UniversalTooltip
                isManualTour={true}
                title="Recent Chats"
                description="View and continue your recent conversations here."
                currentStep={2}
                totalSteps={4}
                onNextPress={() => handleNavigationBasicsNext(2)}
                onBackPress={() => handleNavigationBasicsBack(2)}
                pointerPosition="up"
                pointerAlignment="left"
                modalPosition="up"
                modalAlignment="left"
                top={tooltipPos.top || 360}
                left={tooltipPos.left || 10}
                pointerLeft={tooltipPos.pointerLeft || 20}
                spotlightRect={spotlightRect}
              />
            );
          })()}
          {globalDataStates.manualGuidedTourRunning && globalDataStates.navigationBasicsGuideTourSteps === 3 && (() => {
            const spotlightRect = getSpotlightRect("navigation", 3);
            const tooltipPos = getTooltipPosition(spotlightRect, "below", "left");
            return (
              <UniversalTooltip
                isManualTour={true}
                title="Pinned Items"
                description="Pin important chats and rooms for quick access."
                currentStep={3}
                totalSteps={4}
                onNextPress={() => handleNavigationBasicsNext(3)}
                onBackPress={() => handleNavigationBasicsBack(3)}
                pointerPosition="up"
                pointerAlignment="left"
                modalPosition="up"
                modalAlignment="left"
                top={tooltipPos.top || 210}
                left={tooltipPos.left || 10}
                pointerLeft={tooltipPos.pointerLeft || 20}
                spotlightRect={spotlightRect}
              />
            );
          })()}
          {globalDataStates.manualGuidedTourRunning && globalDataStates.navigationBasicsGuideTourSteps === 4 && (() => {
            const spotlightRect = getSpotlightRect("navigation", 4);
            const tooltipPos = getTooltipPosition(spotlightRect, "below", "left");
            return (
              <UniversalTooltip
                isManualTour={true}
                title="Chat Actions"
                description="Long press any chat to rename, delete, pin, or add to a learning lab."
                currentStep={4}
                totalSteps={4}
                onNextPress={() => handleNavigationBasicsNext(4)}
                onBackPress={() => handleNavigationBasicsBack(4)}
                pointerPosition="up"
                pointerAlignment="left"
                modalPosition="up"
                modalAlignment="left"
                top={tooltipPos.top || 200}
                left={tooltipPos.left || 10}
                pointerLeft={tooltipPos.pointerLeft || 50}
                spotlightRect={spotlightRect}
              />
            );
          })()}

          {/* Chat Functions Tour */}
          {globalDataStates.manualGuidedTourRunning && globalDataStates.chatFunctionsGuideTourSteps === 1 && (() => {
            const spotlightRect = getSpotlightRect("chatFunctions", 1);
            const tooltipPos = getTooltipPosition(spotlightRect, "above", "left");
            return (
              <UniversalTooltip
                isManualTour={true}
                title="Input Area"
                description="Type your questions here and attach files to enhance your conversation."
                currentStep={1}
                totalSteps={4}
                onNextPress={() => handleChatFunctionsNext(1)}
                showBackButton={false}
                pointerPosition="down"
                pointerAlignment="left"
                modalPosition="down"
                modalAlignment="left"
                bottom={tooltipPos.bottom || 130}
                left={tooltipPos.left || 20}
                pointerLeft={tooltipPos.pointerLeft || 30}
                spotlightRect={spotlightRect}
              />
            );
          })()}
          {globalDataStates.manualGuidedTourRunning && globalDataStates.chatFunctionsGuideTourSteps === 2 && (() => {
            const spotlightRect = getSpotlightRect("chatFunctions", 2);
            const tooltipPos = getTooltipPosition(spotlightRect, "above", "left");
            return (
              <UniversalTooltip
                isManualTour={true}
                title="Quick Actions"
                description="Copy, share, save to notes, or provide feedback on AI responses."
                currentStep={2}
                totalSteps={4}
                onNextPress={() => handleChatFunctionsNext(2)}
                onBackPress={() => handleChatFunctionsBack(2)}
                pointerPosition="down"
                pointerAlignment="left"
                modalPosition="down"
                modalAlignment="left"
                bottom={tooltipPos.bottom || 300}
                left={tooltipPos.left || 20}
                pointerLeft={tooltipPos.pointerLeft || 50}
                spotlightRect={spotlightRect}
              />
            );
          })()}
          {globalDataStates.manualGuidedTourRunning && globalDataStates.chatFunctionsGuideTourSteps === 3 && (() => {
            const spotlightRect = getSpotlightRect("chatFunctions", 3);
            const tooltipPos = getTooltipPosition(spotlightRect, "above", "left");
            return (
              <UniversalTooltip
                isManualTour={true}
                title="Customize AI"
                description="Choose your preferred AI model, response style, and language."
                currentStep={3}
                totalSteps={4}
                onNextPress={() => handleChatFunctionsNext(3)}
                onBackPress={() => handleChatFunctionsBack(3)}
                pointerPosition="down"
                pointerAlignment="left"
                modalPosition="down"
                modalAlignment="left"
                bottom={tooltipPos.bottom || 130}
                left={tooltipPos.left || 20}
                pointerLeft={tooltipPos.pointerLeft || 20}
                spotlightRect={spotlightRect}
              />
            );
          })()}
          {globalDataStates.manualGuidedTourRunning && globalDataStates.chatFunctionsGuideTourSteps === 4 && (() => {
            const spotlightRect = getSpotlightRect("chatFunctions", 4);
            const tooltipPos = getTooltipPosition(spotlightRect, "below", "right");
            return (
              <UniversalTooltip
                isManualTour={true}
                title="Chat Options"
                description="Access additional options like rename, delete, or export chat."
                currentStep={4}
                totalSteps={4}
                onNextPress={() => handleChatFunctionsNext(4)}
                onBackPress={() => handleChatFunctionsBack(4)}
                pointerPosition="up"
                pointerAlignment="right"
                modalPosition="up"
                modalAlignment="right"
                top={tooltipPos.top || 90}
                right={tooltipPos.right || 20}
                pointerRight={tooltipPos.pointerRight || 20}
                spotlightRect={spotlightRect}
              />
            );
          })()}

          {/* Learning Labs Tour (Free User) */}
          {globalDataStates.manualGuidedTourRunning && globalDataStates.learningLabsGuideTourSteps === 1 && (() => {
            const spotlightRect = getSpotlightRect("learningLabs", 1);
            const tooltipPos = getTooltipPosition(spotlightRect, "below", "left");
            return (
              <UniversalTooltip
                isManualTour={true}
                title="Learning Labs"
                description="Unlock Learning Labs to organize your research and create focused projects. Upgrade to Pro for full access."
                currentStep={1}
                totalSteps={1}
                showUnlockButton={true}
                onUnlockPress={handleLearningLabsUnlock}
                onBackPress={handleLearningLabsBack}
                pointerPosition="up"
                pointerAlignment="left"
                modalPosition="up"
                modalAlignment="left"
                top={tooltipPos.top || 440}
                left={tooltipPos.left || 10}
                pointerLeft={tooltipPos.pointerLeft || 30}
                spotlightRect={spotlightRect}
              />
            );
          })()}

          <ToasterWithAction />
          {/* middle section */}
          <ChatMiddleWrapper />
          {/* middle section */}

          {/* chatInput section */}
          <View style={{ width: "100%", marginBottom: 30 }}>
            <ChatInputMain ref={chatInputRef} />
          </View>
          {/* chatInput section */}
        </View>
      </Animated.View>
      <StatusBar
        backgroundColor="#ff0000ff"
        barStyle="dark-content"
        hidden={false}
        translucent={false}
        animated
      />
    </SafeAreaView>
  );
};

export default ChatScreen;
