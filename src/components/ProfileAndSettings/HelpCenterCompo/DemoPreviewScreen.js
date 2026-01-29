import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { scaleFont } from "../../../utils/responsive";
import { BlurView } from "@react-native-community/blur";
import { X, Menu, PlusCircle, MessageSquare, ChevronRight, ChevronLeft, ChevronDown, EllipsisVertical, Plus } from "lucide-react-native";
import Svg, { Rect, Defs, Mask } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import LLMIcon from "../../../../assets/SvgIconsComponent/ToolsOptionsIcons/LLMIcon";
import ResStyleIcon from "../../../../assets/SvgIconsComponent/ToolsOptionsIcons/ResStyleIcon";
import ResLangIcon from "../../../../assets/SvgIconsComponent/ToolsOptionsIcons/ResLangIcon";
import SwitchIcon from "../../../../assets/SvgIconsComponent/ChatMessagesActionIcons/SwitchIcon";
import FeedBackIcon from "../../../../assets/SvgIconsComponent/HelpCenterIcons/FeedBackIcon";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

const DemoPreviewScreen = ({ visible, onClose, demoType }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const statusBarHeight = StatusBar.currentHeight || 0;

  // Demo configurations for each tour type with multiple steps
  const demoConfigs = {
    navigation: {
      1: {
        step: "1/4",
        title: "Your Navigation Hub, The Sidebar",
        description: "The sidebar helps you navigate Elunara. Switch between Chats, Learning Labs (Pro), Settings, and more easily.",
        spotlightRect: {
          x: 12,
          y: statusBarHeight + 8,
          width: 44,
          height: 44,
        },
        showSidebar: false,
      },
      2: {
        step: "2/4",
        title: "Recent Chats",
        description: "Quickly access your recent conversations. Tap any chat to continue where you left off.",
        spotlightRect: {
          x: 16,
          y: statusBarHeight + 80,
          width: SCREEN_WIDTH * 0.58,
          height: 380,
        },
        showSidebar: true,
        showPinned: false,
      },
      3: {
        step: "3/4",
        title: "Pin Your Important Items",
        description: "Pin important chats and Learning labs to keep them easily accessible at the top of your sidebar.",
        spotlightRect: {
          x: 16,
          y: SCREEN_HEIGHT * 0.35,
          width: SCREEN_WIDTH * 0.7,
          height: 130,
        },
        showSidebar: false,
        showPinned: true,
        showOptions: false,
      },
      4: {
        step: "4/4",
        title: "More Options at Your Fingertips",
        description: "Hold an item in the sidebar to open a menu. Rename, pin, delete, or move items quickly.",
        spotlightRect: {
          x: 16,
          y: SCREEN_HEIGHT * 0.18,
          width: SCREEN_WIDTH * 0.6,
          height: 260,
        },
        showSidebar: false,
        showPinned: false,
        showOptions: true,
        tooltipPosition: {
          top: SCREEN_HEIGHT * 0.53,
          left: SCREEN_WIDTH * 0.05,
          right: SCREEN_WIDTH * 0.05,
        },
      },
      totalSteps: 4,
    },
    chatFunctions: {
      1: {
        step: "1/4",
        title: "Your Chat Toolkit",
        description: "Use the input box to type or speak your questions. The icon buttons let you:\n\n• Attach files for better context\n• Select related subjects to focus your chat\n• Customize Elunara's response - choose the AI model, response style, language, and citation format to suit your needs",
        spotlightRect: {
          x: SCREEN_WIDTH * 0.03,
          y: SCREEN_HEIGHT * 0.75,
          width: SCREEN_WIDTH * 0.94,
          height: SCREEN_HEIGHT * 0.14,
        },
        showSidebar: false,
        showInputArea: true,
      },
      2: {
        step: "2/4",
        title: "Make the Most of Every Response",
        description: "Copy answers, save insights to notes, or share useful content in a tap, all from the action menu next to each response.",
        showSidebar: false,
        showResponseActions: true,
        tooltipPosition: {
          bottom: SCREEN_HEIGHT * 0.13,
          left: SCREEN_WIDTH * 0.05,
          right: SCREEN_WIDTH * 0.05,
        },
      },
      3: {
        step: "3/4",
        title: "Tailor Your AI’s Replies",
        description: "Easily change Elunara’s tone, style, or language to suit your needs directly in the chat.",
        spotlightRects: [
          {
            // Change Response popup - positioned on the right side
            x: SCREEN_WIDTH * 0.45,
            y: SCREEN_HEIGHT * (1 - 0.50 - 0.22), 
            width: SCREEN_WIDTH * 0.5,
            height: SCREEN_HEIGHT * 0.25,
          },
          {
            // Back/Next buttons - from bottom: tooltip(20%) = 20% from bottom
            x: SCREEN_WIDTH * 0.45,
            y: SCREEN_HEIGHT * (1 - 0.37 - 0.08), 
            width: SCREEN_WIDTH * 0.3,
            height: SCREEN_HEIGHT * 0.06,
          },
        ],
        showChangeResponsePopup: true,
        // Custom tooltip position - responsive based on screen size
        tooltipPosition: {
          bottom: SCREEN_HEIGHT * 0.09,   // 1% from bottom (adjusts to screen height)
          left: SCREEN_WIDTH * 0.05,      // 5% from left (adjusts to screen width)
          right: SCREEN_WIDTH * 0.05,     // 5% from right (adjusts to screen width)
        },
      },
      4: {
        step: "4/4",
        title: "Manage your Chat",
        description: "Access powerful chat management features including notes, organization, naming, pinning, and more - all in one place!",
        spotlightRects: [
          {
            // Bottom action buttons (Back/Explore lab features)
            x: SCREEN_WIDTH * 0.83,
            //y: SCREEN_HEIGHT * (1 - 0.32 - 0.08),
            y:50,
            //width: SCREEN_WIDTH * 0.4,
            width:54,
            height: SCREEN_HEIGHT * 0.05,
          },
        ],
        showManageChatMenu: true,
        // Custom tooltip position - responsive based on screen size
        tooltipPosition: {
          bottom: SCREEN_HEIGHT * 0.55,   // 1% from bottom (adjusts to screen height)
          //bottom: 650,
          left: SCREEN_WIDTH * 0.05,      // 5% from left (adjusts to screen width)
          right: SCREEN_WIDTH * 0.05,     // 5% from right (adjusts to screen width)
        },
      },
      totalSteps: 4,
    },
    learningLabs: {
      1: {
        step: "1/4",
        title: "Create Your First Learning Lab",
        description: "Tap “New Learning Lab” in the sidebar to create a learning lab. It helps organise chats and sources into focused workspaces.",
        noSpotlight: true,
        showLabWelcome: true,
        tooltipPosition: {
          top: SCREEN_HEIGHT * 0.3,
          left: SCREEN_WIDTH * 0.05,
          right: SCREEN_WIDTH * 0.05,
        },
      },
      2: {
        step: "2/4",
        title: "Manage labs Like a Pro",
        description: "Use the top menu to rename, update, pin, or delete your learning labs.",
        noSpotlight: true,
        showLabManage: true,
        spotlightRects: [
          {
            // Bottom action button (ellipsis menu)
            x: SCREEN_WIDTH * 0.78,
            y: 50,
            width: 60,
            height: SCREEN_HEIGHT * 0.06,
          },
        ],
        tooltipPosition: {
          bottom: SCREEN_HEIGHT * 0.60,
          left: SCREEN_WIDTH * 0.05,
          right: SCREEN_WIDTH * 0.05,
        },
      },
      3: {
        step: "3/4",
        title: "Keep Everything Connected",
        description: "Add new or existing chats directly to your learning lab. Everything stays grouped together to streamline your workflow.",
        noSpotlight: true,
        showLabOrganize: true,
        spotlightRects: [
          {
            // Bottom action button (ellipsis menu)
            x: SCREEN_WIDTH * 0.78,
            y: 50,
            width: 60,
            height: SCREEN_HEIGHT * 0.06,
          },
        ],
        tooltipPosition: {
          bottom: SCREEN_HEIGHT * 0.55,
          left: SCREEN_WIDTH * 0.05,
          right: SCREEN_WIDTH * 0.05,
        },
      },
      4: {
        step: "4/4",
        title: "Switch Between Learning Labs Easily",
        description: "Click 'Learning Labs' in the sidebar anytime to view, search, and manage all your learning labs in one place.",
        noSpotlight: true,
        showLabProgress: true,
        tooltipPosition: {
          top: SCREEN_HEIGHT * 0.3,
          left: SCREEN_WIDTH * 0.05,
          right: SCREEN_WIDTH * 0.05,
        },
      },
      totalSteps: 4,
    },
  };

  const tourConfig = demoConfigs[demoType] || demoConfigs.navigation;
  const config = tourConfig[currentStep] || tourConfig[1];
  const { spotlightRect, spotlightRects, showSidebar, showPinned, showOptions, showInputArea, showResponseActions, showChangeResponsePopup, showManageChatMenu, noSpotlight, showLabWelcome, showLabManage, showLabOrganize, showLabProgress } = config;

  // Use spotlightRects if available, otherwise use single spotlightRect
  const spotlightAreas = spotlightRects || [spotlightRect];
  // Always have a valid spotlightRect for backwards compatibility
  const activeSpotlightRect = spotlightRect || (spotlightRects ? spotlightRects[0] : null);

  // Recent chats data for sidebar
  const recentChats = [
    { title: "Tech Talk", color: "#E8F5E9" },
    { title: "Design Discussions", color: "#E3F2FD" },
    { title: "Marketing Strategies", color: "#FFF3E0" },
    { title: "Finance Insights", color: "#F3E5F5" },
    { title: "Project Updates", color: "#E0F7FA" },
    { title: "Team Collaboration", color: "#FBE9E7" },
    { title: "Exploring the Depths of Qua...", color: "#E8EAF6" },
  ];

  const handleNext = () => {
    const totalSteps = tourConfig.totalSteps || 1;
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(1);
      onClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    onClose();
  };

  // Topic cards data
  const topicCards = [
    { title: "Finance", desc: '"Budgets, returns,\nand risk"', color: "#E0F7FA", iconColor: "#00BCD4" },
    { title: "Marketing", desc: '"Brands, strategy &\nconsumer insight"', color: "#F3E5F5", iconColor: "#9C27B0" },
    { title: "Human Resource", desc: '"People, performance,\nculture"', color: "#FFF3E0", iconColor: "#FF9800" },
    { title: "Information System", desc: '"Tech behind business"', color: "#F5F5F5", iconColor: "#757575" },
    { title: "Operations", desc: '"Processes, flow,\nefficiency."', color: "#E8EAF6", iconColor: "#5C6BC0" },
    { title: "All Subjects", desc: '"8 vast topics"', color: "#FFF3E0", iconColor: "#FF9800" },
  ];

  // Spotlight overlay component
  const SpotlightOverlay = () => (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg height={SCREEN_HEIGHT} width={SCREEN_WIDTH}>
        <Defs>
          <Mask id="spotlight-mask">
            <Rect x="0" y="0" width={SCREEN_WIDTH} height={SCREEN_HEIGHT} fill="white" />
            {spotlightAreas.filter(rect => rect).map((rect, index) => (
              <Rect
                key={index}
                x={rect.x}
                y={rect.y}
                width={rect.width}
                height={rect.height}
                rx={16}
                ry={16}
                fill="black"
              />
            ))}
          </Mask>
        </Defs>
        <Rect
          x="0"
          y="0"
          width={SCREEN_WIDTH}
          height={SCREEN_HEIGHT}
          fill="rgba(0, 0, 0, 0.5)"
          mask="url(#spotlight-mask)"
        />
      </Svg>
    </View>
  );

  // Calculate tooltip position based on spotlight
  const getTooltipPosition = () => {
    // Check if config has custom tooltip position first
    if (config.tooltipPosition) {
      return config.tooltipPosition;
    }
    if (!activeSpotlightRect) {
      return { top: SCREEN_HEIGHT * 0.5, left: 20 };
    }
    if (demoType === "chatFunctions" && currentStep === 1) {
      // Step 1: Position tooltip above the spotlight (input area)
      return {
        bottom: SCREEN_HEIGHT - activeSpotlightRect.y + 55,
        left: 20,
      };
    }
    // For step 3 and step 4 with multiple spotlights, position tooltip at the very bottom (20% of screen height)
    if ((showChangeResponsePopup || showManageChatMenu) && spotlightRects && spotlightRects.length > 1) {
      return {
        bottom: 10,
        left: 20,
        right: 20,
      };
    }
    // All other cases: Position tooltip below the spotlight box
    return {
      top: activeSpotlightRect.y + activeSpotlightRect.height + 15,
      left: 20,
    };
  };

  const tooltipPosition = getTooltipPosition();
  const usesBottomPosition = tooltipPosition.bottom !== undefined;

  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="fade"
      onRequestClose={handleClose}
      statusBarTranslucent={true}
    >
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" translucent={false} />

        {/* Background - simulated app screen */}
        <View style={styles.mockAppBackground}>
          {/* Header with menu icon and avatar */}
          <View style={[styles.mockHeader, { marginTop: statusBarHeight }]}>
            <View style={styles.menuIconContainer}>
              <Menu size={22} color="#1F2937" strokeWidth={1.5} />
            </View>
            <View style={styles.mockHeaderRight}>
              <PlusCircle size={24} color="#9CA3AF" strokeWidth={1.5} />
            </View>
          </View>

          {/* Notification banner */}
          <View style={styles.notificationBanner}>
            <Text style={styles.notificationTitle}>Create and organise your work quickly</Text>
            <Text style={styles.notificationDesc}>Start a new learning lab easily from the sidebar to keep everything focused.</Text>
            <TouchableOpacity style={styles.notificationClose}>
              <X size={16} color="#6B7280" strokeWidth={2} />
            </TouchableOpacity>
          </View>

          {/* Welcome section */}
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeTitle}>Welcome to Elunara Pro, Anjali!</Text>
            <Text style={styles.welcomeDesc}>Pick a topic to begin, start typing, or try your new feature of learning labs built for advanced study</Text>
          </View>

          {/* Topic cards grid */}
          <ScrollView style={styles.topicsContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.topicsGrid}>
              {topicCards.map((topic, index) => (
                <View key={index} style={[styles.topicCard, { backgroundColor: topic.color }]}>
                  <View style={[styles.topicIcon, { backgroundColor: topic.color }]}>
                    <View style={[styles.topicIconInner, { borderColor: topic.iconColor }]} />
                  </View>
                  <Text style={styles.topicTitle}>{topic.title}</Text>
                  <Text style={styles.topicDesc}>{topic.desc}</Text>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Input area at bottom */}
          <View style={styles.inputArea}>
            <View style={styles.inputBox}>
              <Text style={styles.inputPlaceholder}>Ask anything</Text>
            </View>
            <View style={styles.inputIcons}>
              <View style={styles.inputIconBtn} />
              <View style={styles.inputIconBtn} />
              <View style={styles.inputIconBtn} />
            </View>
          </View>

          {/* Bottom nav */}
          <View style={styles.mockBottomNav}>
            <View style={styles.mockNavItem} />
            <View style={styles.mockNavItem} />
            <View style={styles.mockNavItem} />
            <View style={styles.mockNavItemActive} />
          </View>
        </View>

        {/* Blur overlay - heavy blur for demo effect */}
        <View style={styles.blurContainer} pointerEvents="none">
          <BlurView
            style={[StyleSheet.absoluteFill, { width: SCREEN_WIDTH, height: SCREEN_HEIGHT }]}
            blurType="light"
            blurAmount={15}
            reducedTransparencyFallbackColor="rgba(255, 255, 255, 0.9)"
          />
          {/* Additional blur layer for stronger effect */}
          <View style={styles.extraBlurOverlay} />
        </View>

        {/* Spotlight overlay */}
        {!noSpotlight && activeSpotlightRect && <SpotlightOverlay />}

        {/* Spotlight highlight box */}

        {!showOptions && !showChangeResponsePopup && !noSpotlight && activeSpotlightRect && (
          <View
            style={[
              styles.spotlightBox,
              {
                top: activeSpotlightRect.y,
                left: activeSpotlightRect.x,
                width: activeSpotlightRect.width,
                height: activeSpotlightRect.height,
              },
              (showSidebar || showPinned) && styles.recentChatsBox,
              showInputArea && styles.inputAreaBox,
              showResponseActions && styles.responseActionsBox,
            ]}
          >
          {demoType === "navigation" && currentStep === 1 && (
            <View style={styles.highlightedMenuIcon}>
              <Menu size={22} color="#1F2937" strokeWidth={1.5} />
            </View>
          )}
          {showSidebar && (
            <View style={styles.recentChatsContent}>
              <Text style={styles.recentChatsTitle}>Recent Chats</Text>
              {recentChats.map((chat, index) => (
                <View key={index} style={styles.chatItem}>
                  <View style={[styles.chatIcon, { backgroundColor: chat.color }]}>
                    <MessageSquare size={14} color="#6B7280" strokeWidth={1.5} />
                  </View>
                  <Text style={styles.chatTitle} numberOfLines={1}>{chat.title}</Text>
                </View>
              ))}
              <TouchableOpacity style={styles.viewAllBtn}>
                <Text style={styles.viewAllText}>View all Chats</Text>
                <ChevronRight size={16} color="#1E3A5F" />
              </TouchableOpacity>
            </View>
          )}
          {showPinned && (
            <View style={styles.pinnedContent}>
              <View style={styles.pinnedItem}>
                <View style={styles.pinnedItemLeft}>
                  <View style={styles.pinnedIconBox}>
                    <Ionicons name="pin" size={14} color="#6B7280" />
                  </View>
                  <Text style={styles.pinnedItemText}>Pinned Chats (07)</Text>
                </View>
                <ChevronDown size={18} color="#6B7280" strokeWidth={1.5} />
              </View>
              <View style={styles.pinnedDivider} />
              <View style={styles.pinnedItem}>
                <View style={styles.pinnedItemLeft}>
                  <View style={styles.pinnedIconBox}>
                    <Ionicons name="pin" size={14} color="#6B7280" />
                  </View>
                  <Text style={styles.pinnedItemText}>Pinned Learning Labs (05)</Text>
                </View>
                <ChevronDown size={18} color="#6B7280" strokeWidth={1.5} />
              </View>
            </View>
          )}
          {showInputArea && (
            <View style={styles.inputAreaContent}>
              {/* Input text area */}
              <Text style={styles.demoInputPlaceholder}>Ask anything</Text>
              {/* Icon buttons row */}
              <View style={styles.demoInputIcons}>
                {/* Left icons */}
                <View style={styles.demoInputLeftIcons}>
                  <Ionicons name="attach" size={24} color="#343330" />
                  <Ionicons name="book-outline" size={22} color="#343330" />
                  <Ionicons name="options-outline" size={22} color="#343330" />
                </View>
                {/* Right icons */}
                <View style={styles.demoInputRightIcons}>
                  <Ionicons name="mic-outline" size={24} color="#343330" />
                  <View style={styles.demoSendBtn}>
                    <Ionicons name="arrow-up" size={22} color="#FFFFFF" />
                  </View>
                </View>
              </View>
            </View>
          )}
          {showResponseActions && (
            <View style={styles.responseActionsContent}>
              {/* Response action items */}
              <View style={styles.responseActionItem}>
                <View style={styles.responseActionIcon}>
                  <Ionicons name="copy-outline" size={16} color="#6B7280" />
                </View>
                <Text style={styles.responseActionText}>Copy insights instantly</Text>
              </View>
              <View style={styles.responseActionItem}>
                <View style={styles.responseActionIcon}>
                  <Ionicons name="share-social-outline" size={16} color="#6B7280" />
                </View>
                <Text style={styles.responseActionText}>Share your findings easily</Text>
              </View>
              <View style={styles.responseActionItem}>
                <View style={styles.responseActionIcon}>
                  <Ionicons name="bookmark-outline" size={16} color="#6B7280" />
                </View>
                <Text style={styles.responseActionText}>Keep important info at hand</Text>
              </View>
              <View style={styles.responseActionItem}>
                <View style={styles.responseActionIcon}>
                  <Ionicons name="bulb-outline" size={16} color="#6B7280" />
                </View>
                <Text style={styles.responseActionText}>Help us improve Elunara</Text>
              </View>
              {/* Bottom action icons row */}
              <View style={styles.responseActionsBottomRow}>
                <View style={styles.responseBottomIcon}>
                  <Ionicons name="copy-outline" size={18} color="#6B7280" />
                </View>
                <View style={styles.responseBottomIcon}>
                  <Ionicons name="volume-high-outline" size={18} color="#6B7280" />
                </View>
                <View style={styles.responseBottomIcon}>
                  <Ionicons name="refresh-outline" size={18} color="#6B7280" />
                </View>
                <View style={styles.responseBottomIcon}>
                  <Ionicons name="ellipsis-horizontal" size={18} color="#6B7280" />
                </View>
                <View style={styles.responseBottomIconActive}>
                  <Ionicons name="thumbs-up-outline" size={16} color="#1E3A5F" />
                </View>
                <View style={styles.responseBottomIcon}>
                  <Ionicons name="thumbs-down-outline" size={16} color="#6B7280" />
                </View>
              </View>
            </View>
          )}
          </View>
        )}

        {/* For showResponseActions without spotlight, render content directly */}
        {showResponseActions && !activeSpotlightRect && (
          <View style={[styles.responseActionsContent,styles.responseActionsContentList]}>
            {/* Response action items */}
            <View style={styles.responseActionItem}>
              <View style={styles.responseActionIcon}>
                <Ionicons name="copy-outline" size={16} color="#6B7280" />
              </View>
              <Text style={[styles.responseActionListText]}>Copy insights instantly</Text>
            </View>
            <View style={styles.responseActionItem}>
              <View style={styles.responseActionIcon}>
                <Ionicons name="share-social-outline" size={16} color="#6B7280" />
              </View>
              <Text style={[styles.responseActionListText]}>Share your findings easily</Text>
            </View>
            <View style={styles.responseActionItem}>
              <View style={styles.responseActionIcon}>
                <Ionicons name="bookmark-outline" size={16} color="#6B7280" />
              </View>
              <Text style={[styles.responseActionListText]}>Keep important info at hand</Text>
            </View>
            <View style={styles.responseActionItem}>
              <View style={styles.responseActionIcon}>
               
                <FeedBackIcon size={16} color="#6B7280" />
              </View>
              <Text style={[styles.responseActionListText]}>Help us improve Elunaraa</Text>
            </View>
            {/* Bottom action icons row */}
            <View style={styles.responseActionsBottomRow}>
              <View style={styles.responseBottomIcon}>
                <Ionicons name="copy-outline" size={18} color="#6B7280" />
              </View>
              <View style={styles.responseBottomIcon}>
                <Ionicons name="share-social-outline" size={18} color="#6B7280" />
              </View>
              <View style={styles.responseBottomIcon}>
                <Ionicons name="bookmark-outline" size={18} color="#6B7280" />
              </View>
              
              <View style={styles.responseBottomIconActive}>
                <FeedBackIcon size={16} color="#6B7280" />
               
              </View>
            </View>
          </View>
        )}

        {/* For showOptions, render content without spotlight box wrapper */}
        {showOptions && activeSpotlightRect && (
          <View
            style={{
              position: "absolute",
              top: activeSpotlightRect.y,
              left: activeSpotlightRect.x,
              width: activeSpotlightRect.width,
              height: activeSpotlightRect.height,
            }}
          >
            <View style={styles.optionsContent}>
              {/* Left - Project Updates item */}
              <View style={styles.optionsProjectItem}>
                <View style={styles.optionsChatCheckbox} />
                <Text style={styles.optionsChatTitle}>Project Updates</Text>
              </View>
              {/* Right - white options popup positioned to start at Project Updates level */}
              <View style={styles.optionsPopup}>
                <View style={styles.optionRow}>
                  <Ionicons name="flask-outline" size={16} color="#6B7280" />
                  <Text style={styles.optionText}>Add to Learning Lab</Text>
                </View>
                <View style={styles.optionRow}>
                  <Ionicons name="pencil-outline" size={16} color="#6B7280" />
                  <Text style={styles.optionText}>Rename</Text>
                </View>
                <View style={styles.optionRow}>
                  <Ionicons name="pin-outline" size={16} color="#6B7280" />
                  <Text style={styles.optionText}>Unpin</Text>
                </View>
                <View style={styles.optionRow}>
                  <Ionicons name="archive-outline" size={16} color="#6B7280" />
                  <Text style={styles.optionText}>Archive</Text>
                </View>
                <View style={styles.optionRow}>
                  <Ionicons name="trash-outline" size={16} color="#EF4444" />
                  <Text style={[styles.optionText, { color: "#EF4444" }]}>Delete</Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* For showChangeResponsePopup, render multiple spotlight boxes */}
        {showChangeResponsePopup && (
          <>
            {/* Change Response popup box */}
            <View
              style={[
                styles.spotlightBox,
                {
                  top: spotlightAreas[0].y,
                  left: spotlightAreas[0].x,
                  width: spotlightAreas[0].width,
                  height: spotlightAreas[0].height,
                  backgroundColor: "#FFFFFF",
                  borderColor: "#FFFFFF",
                },
              ]}
            >
              <View style={styles.changeResponseContent}>
                <Text style={styles.changeResponseTitle}>Change Response</Text>
                <View style={styles.changeResponseOption}>
                  {/* <Ionicons name="flask" size={18} color="#1E3A5F" /> */}
                  <LLMIcon color="#888888" />
                  <Text style={styles.changeResponseOptionText}>LLM</Text>
                </View>
                <View style={styles.changeResponseOption}>
                  {/* <Ionicons name="speedometer" size={18} color="#6B7280" /> */}
                  <ResStyleIcon color="#888888" />
                  <Text style={styles.changeResponseOptionText}>Style</Text>
                </View>
                <View style={styles.changeResponseOption}>
                  {/* <Ionicons name="globe" size={18} color="#6B7280" /> */}
                  <ResLangIcon color="#888888" />
                  <Text style={styles.changeResponseOptionText}>Language</Text>
                </View>
              </View>
            </View>

            {/* Bottom action section */}
            <View
              style={[
                styles.spotlightBox,
                {
                  top: spotlightAreas[1].y,
                  left: spotlightAreas[1].x,
                  width: spotlightAreas[1].width,
                  height: spotlightAreas[1].height,
                  backgroundColor: "#FFFFFF",
                  borderColor: "#FFFFFF",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 16,
                },
              ]}
            >
              <View><SwitchIcon color="#6B7280" /></View>
              <View><ChevronDown  color="#6B7280" /></View>
            </View>
          </>
        )}

        {/* For showManageChatMenu, render Manage Chat menu */}
        {showManageChatMenu && (
          <>
            {/* Manage Chat menu box */}
            <View style={[styles.manageChatMenuList]}>
              <View style={styles.manageChatOption}>
                  <Text style={styles.manageChatOptionText}>View and edit your saved notes</Text>
                  <Ionicons style={[styles.manageChatOptionTextIcon]} name="document-text-outline" size={20} color="#6B7280" />
                </View>

                <View style={styles.manageChatOption}>
                  <Text style={styles.manageChatOptionText}>Organize chats by project</Text>
                  <Ionicons style={[styles.manageChatOptionTextIcon]} name="folder-outline" size={20} color="#6B7280" />
                </View>

                <View style={styles.manageChatOption}>
                  <Text style={styles.manageChatOptionText}>Give this chat a custom name</Text>
                  <Ionicons style={[styles.manageChatOptionTextIcon]} name="create-outline" size={20} color="#6B7280" />
                </View>

                <View style={styles.manageChatOption}>
                  <Text style={styles.manageChatOptionText}>Keep this chat handy in the sidebar</Text>
                  <Ionicons style={[styles.manageChatOptionTextIcon]} name="pin-outline" size={20} color="#6B7280" />
                </View>

                <View style={styles.manageChatOption}>
                  <Text style={styles.manageChatOptionText}>Hide this chat without deleting</Text>
                  <Ionicons style={[styles.manageChatOptionTextIcon]} name="eye-off-outline" size={20} color="#6B7280" />
                </View>

                <View style={styles.manageChatOption}>
                  <Text style={styles.manageChatOptionText}>Remove this chat permanently</Text>
                  <Ionicons style={[styles.manageChatOptionTextIcon]} name="trash-outline" size={20} color="#EF4444" />
                </View>
            </View>

            {/* Bottom action buttons (Back/Explore lab features) */}
            <View
              style={[
                styles.spotlightBox,
                {
                  top: spotlightAreas[0].y,
                  left: spotlightAreas[0].x,
                  width: spotlightAreas[0].width,
                  height: spotlightAreas[0].height,
                  backgroundColor: "#FFFFFF",
                  borderColor: "#FFFFFF",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 16,
                },
              ]}
            >
              <EllipsisVertical />
            </View>
          </>
        )}

        {/* Learning Labs Stage 1 - Welcome */}
        {showLabWelcome && (
          <View style={styles.firstLabWelcomeContainer}>
            <View style={styles.labOrganizeHeader}>
                <Ionicons style={[styles.firstLabOrganizeHeaderIcon]} size={20} name="folder-open" color="#1E3A5F" />
                <Text style={styles.firstLabOrganizeHeaderText}>New Learning Lab</Text>
              </View>
          </View>
        )}

        {/* Learning Labs Stage 2 - Manage Labs */}
        {showLabManage && (
          <>
            {/* Manage Labs menu box */}
            <View style={[styles.manageLabsMenuList]}>
              <View style={styles.manageChatOption}>
                  <Text style={styles.manageChatOptionText}>Give this learning lab a custom name</Text>
                  <Ionicons style={[styles.manageChatOptionTextIcon]} name="create-outline" size={20} color="#6B7280" />
                </View>

                <View style={styles.manageChatOption}>
                  <Text style={styles.manageChatOptionText}>Update instructions at anytime</Text>
                  <Ionicons style={[styles.manageChatOptionTextIcon]} name="document-text-outline" size={20} color="#6B7280" />
                </View>

                <View style={styles.manageChatOption}>
                  <Text style={styles.manageChatOptionText}>Keep this learning lab handy in the sidebar</Text>
                  <Ionicons style={[styles.manageChatOptionTextIcon]} name="pin-outline" size={20} color="#6B7280" />
                </View>



                <View style={styles.manageChatOption}>
                  <Text style={styles.manageChatOptionText}>Remove this learning lab permanently</Text>
                  <Ionicons style={[styles.manageChatOptionTextIcon]} name="trash-outline" size={20} color="#EF4444" />
                </View>
            </View>

            {/* Bottom action button */}
            {spotlightAreas && spotlightAreas[0] && (
              <View
                style={[
                  styles.spotlightBox,
                  {
                    top: spotlightAreas[0].y,
                    left: spotlightAreas[0].x,
                    width: spotlightAreas[0].width,
                    height: spotlightAreas[0].height,
                    backgroundColor: "#FFFFFF",
                    borderColor: "#FFFFFF",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 16,
                  },
                ]}
              >
                <EllipsisVertical />
              </View>
            )}
          </>
        )}

        {/* Learning Labs Stage 3 - Organize */}
        {showLabOrganize && (
          <>
            {/* Manage Labs menu box */}
            <View style={[styles.manageConnectedMenuList]}>
               <View style={styles.manageChatOption}>
                  <Text style={styles.manageChatOptionText}>Start a  new chat</Text>
                  <Ionicons style={[styles.manageChatOptionTextIcon]} name="document-text-outline" size={20} color="#6B7280" />
                </View>

                <View style={styles.manageChatOption}>
                  <Text style={styles.manageChatOptionText}>Add a already existing chat to the learning labs</Text>
                  <Ionicons style={[styles.manageChatOptionTextIcon]} name="folder-outline" size={20} color="#6B7280" />
                </View>
            </View>

            {/* Bottom action button */}
            {spotlightAreas && spotlightAreas[0] && (
              <View
                style={[
                  styles.spotlightBox,
                  {
                    top: spotlightAreas[0].y,
                    left: spotlightAreas[0].x,
                    width: spotlightAreas[0].width,
                    height: spotlightAreas[0].height,
                    backgroundColor: "#FFFFFF",
                    borderColor: "#FFFFFF",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 16,
                  },
                ]}
              >
                <Plus />
              </View>
            )}
          </>
        )}

        {/* Learning Labs Stage 4 - Progress */}
        {showLabProgress && (
          <View style={styles.firstLabWelcomeContainer}>
            <View style={styles.labOrganizeHeader}>
                <Ionicons style={[styles.firstLabOrganizeHeaderIcon]} size={20} name="folder-open" color="#1E3A5F" />
                <Text style={styles.firstLabOrganizeHeaderText}>New Learning Lab</Text>
              </View>
          </View>
        )}

        {/* Tooltip */}
        <View
          style={[
            styles.tooltip,
            usesBottomPosition
              ? {
                  bottom: tooltipPosition.bottom,
                  left: tooltipPosition.left,
                  ...(tooltipPosition.right !== undefined && { right: tooltipPosition.right })
                }
              : { top: tooltipPosition.top, left: tooltipPosition.left },
          ]}
        >
          {/* Step indicator and close button */}
          <View style={styles.tooltipHeader}>
            <Text style={styles.stepText}>{config.step}</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <X size={20} color="#FFFFFF" strokeWidth={2} />
            </TouchableOpacity>
          </View>

          {/* Pointer */}
          {(!noSpotlight || showLabManage || showLabOrganize || showLabWelcome || showLabProgress || showResponseActions) && (
            <View style={[
              styles.pointer,
              (showLabWelcome || showLabProgress || showResponseActions)
                ? styles.pointerTopCenterLeft
                : (showLabManage || showLabOrganize || showManageChatMenu)
                ? styles.pointerRightSide
                : showChangeResponsePopup
                ? styles.pointerTopCenterRight
                : (usesBottomPosition ? styles.pointerDown : styles.pointerUp),
            ]} />
          )}

          {/* Content */}
          <Text style={styles.tooltipTitle}>{config.title}</Text>
          <Text style={styles.tooltipDescription}>{config.description}</Text>

          {/* Buttons */}
          <View style={styles.buttonsContainer}>
            {currentStep > 1 ? (
              <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                <ChevronLeft size={18} color="#FFFFFF" strokeWidth={2} />
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.emptyButton} />
            )}
            <TouchableOpacity style={[styles.nextButton, currentStep === 4 && styles.exploreButton]} onPress={handleNext}>
              <Text style={[styles.nextButtonText, currentStep === 4 && { color: "#1E3A5F" }]}>{currentStep === 4 ? "Explore chat features" : "Next"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  mockAppBackground: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  mockHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  mockHeaderRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationBanner: {
    backgroundColor: "#F0F7FF",
    marginHorizontal: 16,
    marginTop: 8,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D1E3F6",
    position: "relative",
  },
  notificationTitle: {
    fontSize: scaleFont(13),
    fontFamily: "Mukta-Bold",
    color: "#1F2937",
    marginBottom: 2,
  },
  notificationDesc: {
    fontSize: scaleFont(11),
    fontFamily: "Mukta-Regular",
    color: "#6B7280",
    lineHeight: 16,
    paddingRight: 20,
  },
  notificationClose: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  welcomeSection: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
  },
  welcomeTitle: {
    fontSize: scaleFont(20),
    fontFamily: "Mukta-Bold",
    color: "#1E3A5F",
    marginBottom: 6,
  },
  welcomeDesc: {
    fontSize: scaleFont(13),
    fontFamily: "Mukta-Regular",
    color: "#6B7280",
    lineHeight: 20,
  },
  topicsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  topicsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  topicCard: {
    width: "48%",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    minHeight: 100,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  topicIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  topicIconInner: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
  },
  topicTitle: {
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Bold",
    color: "#1F2937",
    marginBottom: 2,
  },
  topicDesc: {
    fontSize: scaleFont(11),
    fontFamily: "Mukta-Regular",
    color: "#6B7280",
    lineHeight: 14,
  },
  inputArea: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  inputBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 8,
  },
  inputPlaceholder: {
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Regular",
    color: "#9CA3AF",
  },
  inputIcons: {
    flexDirection: "row",
    gap: 12,
  },
  inputIconBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
  },
  mockBottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    paddingBottom: 20,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  mockNavItem: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: "#E5E7EB",
  },
  mockNavItemActive: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: "#1E3A5F",
  },
  blurContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  extraBlurOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  spotlightBox: {
    position: "absolute",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  highlightedMenuIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
  tooltip: {
    position: "absolute",
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: "#1E3A5F",
    borderRadius: 16,
    padding: 16,
    paddingTop: 12,
  },
  tooltipHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  stepText: {
    color: "#FFFFFF",
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Regular",
  },
  closeButton: {
    padding: 5,
  },
  pointer: {
    position: "absolute",
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    left: 30,
  },
  pointerUp: {
    top: -12,
    borderBottomWidth: 12,
    borderBottomColor: "#1E3A5F",
  },
  pointerDown: {
    bottom: -12,
    borderTopWidth: 12,
    borderTopColor: "#1E3A5F",
  },
  pointerTopCenterRight: {
    top: -12,
    left: "65%",
    borderBottomWidth: 12,
    borderBottomColor: "#1E3A5F",
  },
  pointerTopCenterLeft: {
    top: -12,
    left: "35%",
    borderBottomWidth: 12,
    borderBottomColor: "#1E3A5F",
  },
  pointerRightSide: {
    top: -12,
    right: 50,
    left: "auto",
    borderLeftWidth: 6,
    borderLeftColor: "transparent",
    borderRightWidth: 6,
    borderRightColor: "transparent",
    borderBottomWidth: 12,
    borderBottomColor: "#1E3A5F",
  },
  tooltipTitle: {
    color: "#FFFFFF",
    fontSize: scaleFont(18),
    fontFamily: "Mukta-Bold",
    marginBottom: 8,
  },
  tooltipDescription: {
    color: "#D1D5DB",
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Regular",
    lineHeight: 22,
    marginBottom: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  backButton: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Bold",
    textDecorationLine: "underline",
  },
  nextButton: {
    flex: 1,
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#FFFFFF",
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: "center",
  },
  exploreButton: {
    backgroundColor: "#FFFFFF",
    flex: 1.5,
  },
  nextButtonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Bold",
  },
  emptyButton: {
    flex: 1,
  },
  // Recent Chats box styles
  recentChatsBox: {
    borderRadius: 16,
    padding: 14,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    overflow: "hidden",
  },
  recentChatsContent: {
    width: "100%",
  },
  recentChatsTitle: {
    fontSize: scaleFont(13),
    fontFamily: "Mukta-Bold",
    color: "#1F2937",
    marginBottom: 6,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 6,
  },
  chatIcon: {
    width: 26,
    height: 26,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  chatTitle: {
    fontSize: scaleFont(12),
    fontFamily: "Mukta-Regular",
    color: "#1F2937",
    flex: 1,
  },
  viewAllBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 4,
    paddingVertical: 6,
    marginTop: 4,
  },
  viewAllText: {
    fontSize: scaleFont(12),
    fontFamily: "Mukta-Medium",
    color: "#1E3A5F",
  },
  // Pinned items styles
  pinnedContent: {
    width: "100%",
    paddingHorizontal: 4,
  },
  pinnedItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  pinnedItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  pinnedIconBox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  pinnedItemText: {
    fontSize: scaleFont(13),
    fontFamily: "Mukta-Medium",
    color: "#1F2937",
  },
  pinnedDivider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    width: "100%",
  },
  // Options popup styles
  optionsContent: {
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 10,
  },
  optionsProjectItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    width:"100%",
  },
  optionsChatCheckbox: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    backgroundColor: "#FFFFFF",
  },
  optionsChatTitle: {
    fontSize: scaleFont(13),
    fontFamily: "Mukta-Medium",
    color: "#1F2937",
  },
  optionsPopup: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 16,
    width: "60%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  optionText: {
    fontSize: scaleFont(13),
    fontFamily: "Mukta-Regular",
    color: "#374151",
  },
  // Input area box style for Chat Functions demo
  inputAreaBox: {
    borderRadius: 28,
    padding: 0,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ABB8CC",
    backgroundColor: "#FFFFFF",
  },
  // Input area styles for Chat Functions demo
  inputAreaContent: {
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 15,
    gap: 12,
  },
  demoInputPlaceholder: {
    fontSize: scaleFont(16),
    fontFamily: "Mukta-Regular",
    color: "grey",
    paddingVertical: 8,
  },
  demoInputIcons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  demoInputLeftIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  demoInputRightIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 17,
  },
  demoSendBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#081A35",
    justifyContent: "center",
    alignItems: "center",
  },
  // Response Actions styles for Chat Functions step 2
  responseActionsBox: {
    borderRadius: 0,
    padding: 0,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    overflow: "hidden",
    backgroundColor: "transparent",
    borderWidth: 0,
    borderColor: "transparent",
    shadowColor: "transparent",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  responseActionsContent: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 4,
  },
  responseActionsContentList:{
    position:"relative",
    top: - 420,
  },
  responseActionListText: {
  borderRadius: 15,
  backgroundColor: "#FFFFFF",
  borderColor: "#E5E7EB",
  paddingHorizontal: 12,
  paddingVertical: 6,
  alignSelf: "flex-start", // 👈 fit to text
  fontSize: scaleFont(13),
    fontFamily: "Mukta-Regular",
    color: "#374151",
},

  responseActionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 10,
    paddingHorizontal: 0,
    backgroundColor: "transparent",
  },
  responseActionIcon: {
    width: 28,
    height: 28,
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  responseActionText: {
    fontSize: scaleFont(13),
    fontFamily: "Mukta-Regular",
    color: "#374151",
    flex: 1,
  },
  responseActionsBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  responseBottomIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  responseBottomIconActive: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#E0F2FE",
    justifyContent: "center",
    alignItems: "center",
  },
  // Change Response popup styles
  changeResponseContent: {
    width: "100%",
    height: "100%",
    padding: 16,
    gap: 12,
    //alignItems: "flex-end",
  },
  changeResponseTitle: {
    fontSize: scaleFont(16),
    fontFamily: "Mukta-SemiBold",
    color: "#1F2937",
    marginBottom: 4,
  },
  changeResponseOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 8,
  },
  changeResponseOptionText: {
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Regular",
    color: "#374151",
  },
  // Manage Chat menu styles
manageChatOption: {
  flexDirection: "row",
  justifyContent: "flex-end",
  paddingVertical: 9,
  paddingHorizontal: 29,

},
  manageChatMenuList:{
    position: "relative",
    width: "100%",
    top:-190,
  },
  manageLabsMenuList:{
    position: "relative",
    width: "100%",
    top:-270,
  },
  manageConnectedMenuList:{
    position: "relative",
    // width: "100%",
    top:-300,
  },
  manageChatOptionText: {
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Regular",
    color: "#374151",
    marginRight: 10,
    borderRadius: 8,
    borderTopRightRadius:0,
    backgroundColor: "#ffffff",
    paddingHorizontal: 5,
    textAlign: "right"

  },
  manageChatOptionTextIcon: {
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: "#ffffff",
  },
  // Learning Labs Stage 1 - Welcome
  firstLabWelcomeContainer:{
    position: "absolute",
    top: SCREEN_HEIGHT * 0.35,
    left: SCREEN_WIDTH * 0.1,
    // right: SCREEN_WIDTH * 0.1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 10,
  },
  // Learning Labs Stage 3 - Organize
  labOrganizeContainer: {
    position: "absolute",
    top: SCREEN_HEIGHT * 0.2,
    left: SCREEN_WIDTH * 0.1,
    right: SCREEN_WIDTH * 0.1,
  },
  labOrganizeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  labOrganizeHeader: {
    flexDirection: "row",
    alignItems: "center",
    //gap: 12,
    width:250,
    borderBottomColor: "#E5E7EB",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  labOrganizeHeaderText: {
    fontSize: scaleFont(13),
    fontFamily: "Mukta-SemiBold",
    color: "#1F2937",
  },
  firstLabOrganizeHeaderText:{
    fontSize: scaleFont(13),
    fontFamily: "Mukta-SemiBold",
    color: "#1F2937",
  },
  firstLabOrganizeHeaderIcon:{
    //fontSize: scaleFont(13),
    paddingRight: 10,
  },
  labOrganizeItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: "#F9FAFB",
    marginBottom: 8,
  },
  labOrganizeItemText: {
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Regular",
    color: "#374151",
  },
});

export default DemoPreviewScreen;
