import { AntDesign, Ionicons } from "@expo/vector-icons";
import {
  Camera,
  ChartLine,
  FolderPlus,
  IndianRupee,
  Pencil,
  Pin,
  Trash,
  Image,
  Lightbulb,
  FileSliders,
  MessageCircleMore,
  Files,
  Brush,
  PenTool,
  GraduationCap,
  File,
  ArrowUpRight,
} from "lucide-react-native";
import gemini from "../assets/images/gemini.png";
import anthropic from "../assets/images/antropic.png";
import mistral from "../assets/images/mistral.png";
import meta from "../assets/images/meta.png";
import chatgpt from "../assets/images/chatgpt.png";
import chakraLogo from "../assets/images/chakraFull.png";
import finance from "../assets/images/finance.png";
import marketing from "../assets/images/marketing.png";
import HR from "../assets/images/HR.png";
import IT from "../assets/images/IT.png";
import operations from "../assets/images/operation.png";
import business from "../assets/images/business.png";
import economics from "../assets/images/economics.png";
import others from "../assets/images/others.png";
import bookmark from "../assets/images/BookmarkSimple.png";
import folderPlus from "../assets/images/FolderNotchPlus.png";
import edit from "../assets/images/PencilSimple.png";
import pin from "../assets/images/PushPin.png";
import archive from "../assets/images/ArchiveBox.png";
import trash from "../assets/images/Trash.png";
import books from "../assets/images/Books.png";
import llm from "../assets/images/GitFork.png";
import responseStyle from "../assets/images/UserSwitch.png";
import language from "../assets/images/Translate.png";
import citation from "../assets/images/GraduationCap.png";

import bulb from "../assets/images/LightbulbFilament.png";
import file from "../assets/images/FileText.png";
import chatBubble from "../assets/images/ChatCircleDots.png";
import files from "../assets/images/Files.png";
import paintBrush from "../assets/images/PaintBrush.png";

import penNib from "../assets/images/PenNib.png";
import RupeeIcon from "../../assets/SvgIconsComponent/TopicsIcons/RupeeIcon";
import MarketingIcon from "../../assets/SvgIconsComponent/TopicsIcons/MarketingIcon";
import HRIcon from "../../assets/SvgIconsComponent/TopicsIcons/HRIcon";
import ITIcon from "../../assets/SvgIconsComponent/TopicsIcons/ITIcon";
import OperationIcon from "../../assets/SvgIconsComponent/TopicsIcons/OperationIcon";
import OtherIcon from "../../assets/SvgIconsComponent/TopicsIcons/OtherIcon";
import BusinessIcon from "../../assets/SvgIconsComponent/TopicsIcons/BusinessIcon";
import EconomicsIcon from "../../assets/SvgIconsComponent/TopicsIcons/EconomicsIcon";
import LLMIcon from "../../assets/SvgIconsComponent/ToolsOptionsIcons/LLMIcon";
import ResStyleIcon from "../../assets/SvgIconsComponent/ToolsOptionsIcons/ResStyleIcon";
import ResLangIcon from "../../assets/SvgIconsComponent/ToolsOptionsIcons/ResLangIcon";
import CitationIcon from "../../assets/SvgIconsComponent/ToolsOptionsIcons/CitationIcon";
import ChakraIcon from "../../assets/SvgIconsComponent/ResponseStyleIcons/ChakraIcon";
import ConciseIcon from "../../assets/SvgIconsComponent/ResponseStyleIcons/ConciseIcon";
import FormalIcon from "../../assets/SvgIconsComponent/ResponseStyleIcons/FormalIcon";
import ConversationalIcon from "../../assets/SvgIconsComponent/ResponseStyleIcons/ConversationalIcon";
import DetailedIcon from "../../assets/SvgIconsComponent/ResponseStyleIcons/DetailedIcon";
import CreativeIcon from "../../assets/SvgIconsComponent/ResponseStyleIcons/CreativeIcon";
import APAIcon from "../../assets/SvgIconsComponent/CitationFormatIcons/APAIcon";
import NotesIcon from "../../assets/SvgIconsComponent/ChatMenuOptionsIcons/NotesIcon";
import FolderPlusIcon from "../../assets/SvgIconsComponent/ChatMenuOptionsIcons/FolderPlusIcon";
import RenameIcon from "../../assets/SvgIconsComponent/ChatMenuOptionsIcons/RenameIcon";
import PinIcon from "../../assets/SvgIconsComponent/ChatMenuOptionsIcons/PinIcon";
import ArchiveIcon from "../../assets/SvgIconsComponent/ChatMenuOptionsIcons/ArchiveIcon";
import TrashIcon from "../../assets/SvgIconsComponent/ChatMenuOptionsIcons/TrashIcon";
import FolderIconDark from "../../assets/SvgIconsComponent/AllChatsPageIcons/FolderIconDark";

import SettingsIcon from "../../assets/SvgIconsComponent/ProfilePageOptionsIcons/SettingsIcon";
import PersonIcon from "../../assets/SvgIconsComponent/ProfilePageOptionsIcons/PersonIcon";
import ChartLineIcon from "../../assets/SvgIconsComponent/ProfilePageOptionsIcons/ChartLineIcon";
import MoneyIcon from "../../assets/SvgIconsComponent/ProfilePageOptionsIcons/MoneyIcon";
import GradCapIcon from "../../assets/SvgIconsComponent/ProfilePageOptionsIcons/GradCapIcon";
import InfoIcon from "../../assets/SvgIconsComponent/ProfilePageOptionsIcons/InfoIcon";
import HelpIcon from "../../assets/SvgIconsComponent/ProfilePageOptionsIcons/HelpIcon";
import FilesIcon from "../../assets/SvgIconsComponent/ProfilePageOptionsIcons/FilesIcon";
import PrivacyIcon from "../../assets/SvgIconsComponent/ProfilePageOptionsIcons/PrivacyIcon";
import SignOutIcon from "../../assets/SvgIconsComponent/ProfilePageOptionsIcons/SignOutIcon";

import FileTextIcon from "../../assets/SvgIconsComponent/HelpCenterIcons/FileTextIcon";
import ShootingStarIcon from "../../assets/SvgIconsComponent/HelpCenterIcons/ShootingStarIcon";
import FeedBackIcon from "../../assets/SvgIconsComponent/HelpCenterIcons/FeedBackIcon";

export const slides = [
  {
    heading: ["Learning,", "Reimagined.", "Ethically."],
    description:
      "Designed to combine transparency, privacy, and empathy to support your learning journey.",
  },
  {
    heading: ["Smarter Answers,", "Sharper Goals"],
    description:
      "Tap into multiple powerful AI models for nuanced answers, create dynamic learning goals. Always in your control.",
  },
  {
    heading: ["Your Learning", "Universe, Lynk-ed."],
    description:
      "Save insights from Lynk AI chat, write rich notes, and organize everything in one seamless space.",
  },
];

export const recentChats = [
  { title: "Marketing Plan for 2024" },
  { title: "Financial Analysis of Q1" },
  { title: "Employee Engagement Strategies" },
  { title: "IT Infrastructure Overview" },
  { title: "Operations Optimization" },
  { title: "Customer Journey Mapping" },
  { title: "Product Launch Strategy" },
  { title: "Market Research Report" },
  { title: "Sales Forecasting" },
  { title: "Budget Planning for Next Fiscal Year" },
  { title: "Competitive Analysis" },
  { title: "Social Media Campaign Ideas" },
];

export const chatMessages = [
  {
    role: "user",
    message: "Hello",
  },
  {
    role: "ai",
    message: "Hi! How can I assist you today?",
  },
  {
    role: "user",
    message: "Can you help me with a marketing plan?",
  },
  {
    role: "ai",
    message:
      "Absolutely! To create an effective marketing plan, we should start by defining your target audience, setting clear objectives, and outlining the strategies and tactics you'll use to reach your goals. Do you have a specific product or service in mind?",
  },
  {
    role: "user",
    message: "Yes, I'm launching a new eco-friendly water bottle.",
  },
  {
    role: "ai",
    message:
      "Great! For your eco-friendly water bottle, we can focus on highlighting its sustainability features, targeting environmentally conscious consumers, and leveraging social media platforms to create awareness. We can also consider partnerships with eco-friendly organizations and influencers to amplify your message. Would you like me to help you draft a detailed marketing plan?",
  },
  {
    role: "user",
    message: "Yes, please!",
  },
  {
    role: "ai",
    message:
      "Sure! Here's a basic outline for your marketing plan:\n\n1. Executive Summary: Brief overview of the product and marketing goals.\n\n2. Market Research: Analysis of the eco-friendly market, target audience demographics, and competitor analysis.\n\n3. Marketing Objectives: Clear, measurable goals such as increasing brand awareness, driving sales, and building customer loyalty.\n\n4. Marketing Strategies: Tactics to achieve objectives, including social media campaigns, influencer partnerships, content marketing, and events.\n\n5. Budget: Allocation of resources for each marketing activity.\n\n6. Implementation Timeline: Schedule for executing the marketing plan.\n\n7. Evaluation: Metrics to measure the success of the marketing efforts.\n\nWould you like me to expand on any of these sections or provide more specific strategies?",
  },
];

export const demoResponseFromAI =
  "Hello! 👋 I'm Elunara, your personal AI learning tutor. I'm here to make studying smarter and simpler — whether you're mastering complex math problems, exploring science concepts, or improving your writing. Ask me anything, and I'll explain it step by step, provide examples, and even quiz you for better understanding. \n\n🌟 Learning with Elunara means interactive guidance, instant feedback, and personalized lessons tailored to your goals. Let's begin your journey to knowledge — what topic would you like to learn today?";

export const menuOptions = [
  {
    icon: <NotesIcon />,
    option: "Open Notes",
  },
  {
    icon: <FolderPlusIcon />,
    option: "Add to Learning Lab",
  },
  {
    icon: <RenameIcon />,
    option: "Rename",
  },
  {
    icon: <PinIcon />,
    option: "Pin",
  },
  {
    icon: <ArchiveIcon />,
    option: "Archive",
  },
  {
    icon: <TrashIcon />,
    option: "Delete",
  },
];

export const addItemsOptions = [
  {
    text: "Camera",
  },
  {
    text: "Files",
  },
  {
    text: "Photos",
  },
];

export const LLMOptionsAvailable = [
  {
    id: "1",
    icon: gemini,
    color: "#4B6BFB",
    title: "Google Gemini",
    description: "Use for: Research and analysis",
  },
  {
    id: "2",
    icon: meta,
    color: "#1877F2",
    title: "Meta",
    description: "Use for: Fine tuning or sentiment analysis",
  },
  {
    id: "3",
    icon: anthropic,
    color: "#000",
    title: "Anthropic",
    description: "Use for: Reasoning and analysis",
  },
  {
    id: "4",
    icon: mistral,
    color: "#FFB300",
    title: "Mistral",
    description: "Use for: Complex Calculations & Logic Tasks",
  },
];

export const responseStyles = [
  {
    id: 0,
    icon: <ChakraIcon />,
    title: "Auto",
    description:
      "Elunara adjusts tone and style based on your query — from formal to friendly.",
  },
  {
    id: 1,
    icon: <ConciseIcon />,
    title: "Concise",
    description: "Direct and efficient — best for quick answers and summaries.",
  },
  {
    id: 2,
    icon: <FormalIcon />,
    title: "Formal",
    description:
      "Professional and neutral — ideal for research or formal writing.",
  },
  {
    id: 3,
    icon: <ConversationalIcon />,
    title: "Conversational",
    description:
      "Friendly and relaxed — great for casual questions and everyday explanations.",
  },
  {
    id: 4,
    icon: <DetailedIcon />,
    title: "Detailed",
    description: "Thorough and structured — ideal for deep dives and learning.",
  },
  {
    id: 5,
    icon: <CreativeIcon />,
    title: "Creative",
    description:
      "Expressive and playful — perfect for storytelling and idea generation.",
  },
];

export const languages = [
  {
    lang: "English",
    nativeCharacter: "",
  },
  {
    lang: "Bengali",
    nativeCharacter: "বাংলা",
  },
  {
    lang: "Gujarati",
    nativeCharacter: "ગુજરાતી",
  },
  {
    lang: "Hindi",
    nativeCharacter: "हिन्दी",
  },
  {
    lang: "Kannada",
    nativeCharacter: "ಕನ್ನಡ",
  },
  {
    lang: "Malayalam",
    nativeCharacter: "മലയാളം",
  },
];

export const setLanguages = [
  {
    id: 0,
    lang: "English",
  },
  {
    id: 1,
    lang: "Hindi — हिन्दी",
  },
  {
    id: 2,
    lang: "Bengali — বাংলা",
  },
];

export const citationStyles = [
  {
    id: 0,
    icon: <APAIcon />,
    style: "APA",
    description: "Standard style for social sciences and academic writing.",
  },
  {
    id: 1,
    icon: <CitationIcon />,
    style: "Harvard",
    description: "Popular author-date style for research and reports.",
  },
];

export const savedLLMOptions = [
  {
    icon: chakraLogo,
    title: "Auto",
    desc: "Elunara adjusts tone and style based on your query — from formal to friendly.",
    buttonText: "",
  },
  {
    icon: gemini,
    title: "Google Gemini",
    desc: "Use for: Research and analysis",
    buttonText: "The Knowledge Engine",
  },
  {
    icon: chatgpt,
    title: "OpenAI",
    desc: "Use for: Content and research",
    buttonText: "The Idea Engine",
  },
  {
    icon: anthropic,
    title: "Anthropic",
    desc: "Use for: Reasoning and analysis",
    buttonText: "The Thoughful Engine",
  },
];

export const findApiKeyNotices = [
  {
    id: 1,
    icon: chatgpt,
    title: "OpenAI",
    subtitle: "To get your OpenAI API key:",
    steps: [
      "Sign up or log into your OpenAI account at platform.openai.com",
      'Go to your profile icon at the top right and select "View API keys."',
      'Click on "Create new secret key," name it, and create it.',
      "Copy the key now - this is the only time you'll see it!",
      "Save it securely for use in Elunara integration.",
    ],
  },
  {
    id: 2,
    icon: gemini,
    title: "Google Gemini",
    subtitle: "To create your Gemini API key:",
    steps: [
      "Sign in to Google Cloud Console with your developer account.",
      "Enable the Gemini API for your project.",
      'Navigate to the "Credentials" section and create an API key.',
      "Restrict the key as needed and copy it for Elunara integration.",
    ],
  },
  {
    id: 3,
    icon: meta,
    title: "Meta AI(Liama)",
    subtitle: "To create your Meta API key:",
    steps: [
      "Sign in to Google Cloud Console with your developer account.",
      "Enable the Gemini API for your project.",
      'Navigate to the "Credentials" section and create an API key.',
      "Restrict the key as needed and copy it for Elunara integration.",
    ],
  },
  {
    id: 4,
    icon: mistral,
    title: "Mistral",
    subtitle: "To get your Mistral AI API key:",
    steps: [
      "Create or log into your Mistral AI developer account.",
      "Navigate to the API key section in your dashboard.",
      'Click "Create API key," name it, then generate it.',
      "Copy and save your key securely for Elunara.",
    ],
  },
  {
    id: 5,
    icon: anthropic,
    title: "Anthropic",
    subtitle: "To find your Anthropic API key:",
    steps: [
      "Log into your Anthropic developer console.",
      "Visit the API keys area under your account settings.",
      'Click "Create new API key," provide a name, and create it.',
      "Copy and securely store the key for Elunara integration.",
    ],
  },
];

export const topicsSheetInitial = [
  {
    id: 1,
    icon: <RupeeIcon />,
    iconBg: "#E0F7FA",
    borderColor: "#CCF0F2",
    iconColor: "#00BCD4",
    title: "Finance",
    description: "Budgets, returns, and risk",
    popularTopics: 14,
  },
  {
    id: 2,
    icon: <MarketingIcon />,
    iconBg: "#F3E5F5",
    borderColor: "#DFD8EB",
    iconColor: "#9C27B0",
    title: "Marketing",
    description: "Brands, strategy & consumer insight",
    popularTopics: 26,
  },
  {
    id: 3,
    icon: <HRIcon />,
    iconBg: "#FFF3E0",
    borderColor: "#F9DDB1",
    iconColor: "#FF9800",
    title: "Human Resource",
    description: "People, performance, culture",
    popularTopics: 11,
  },
  {
    id: 4,
    icon: <ITIcon />,
    iconBg: "#F5F5F5",
    borderColor: "#D1D1D1",
    iconColor: "#757575",
    title: "Information System",
    description: 'Tech behind business"',
    popularTopics: 8,
  },
  {
    id: 5,
    icon: <OperationIcon />,
    iconBg: "#E8EAF6",
    borderColor: "#CCDAEE",
    iconColor: "#5C6BC0",
    title: "Operations",
    description: "Processes, flow, efficiency.",
    popularTopics: 10,
  },

  {
    id: 8,
    icon: <OtherIcon />,
    iconBg: "#FFF3E0",
    borderColor: "#EAD8B9",
    iconColor: "#FF9800",
    title: "All Subjects",
    description: "8 vast topics",
    popularTopics: 14,
  },
];

export const topicsSheet = [
  {
    id: 1,
    icon: <RupeeIcon />,
    iconBg: "#E0F7FA",
    borderColor: "#CCF0F2",
    iconColor: "#00BCD4",
    title: "Finance",
    description: "Budgets, returns, and risk",
    popularTopics: 14,
  },
  {
    id: 2,
    icon: <MarketingIcon />,
    iconBg: "#F3E5F5",
    borderColor: "#DFD8EB",
    iconColor: "#9C27B0",
    title: "Marketing",
    description: "Brands, strategy & consumer insight",
    popularTopics: 26,
  },
  {
    id: 3,
    icon: <HRIcon />,
    iconBg: "#FFF3E0",
    borderColor: "#F9DDB1",
    iconColor: "#FF9800",
    title: "Human Resource",
    description: "People, performance, culture",
    popularTopics: 11,
  },
  {
    id: 4,
    icon: <ITIcon />,
    iconBg: "#F5F5F5",
    borderColor: "#D1D1D1",
    iconColor: "#757575",
    title: "Information System",
    description: 'Tech behind business"',
    popularTopics: 8,
  },
  {
    id: 5,
    icon: <OperationIcon />,
    iconBg: "#E8EAF6",
    borderColor: "#CCDAEE",
    iconColor: "#5C6BC0",
    title: "Operations",
    description: "Processes, flow, efficiency.",
    popularTopics: 10,
  },
  {
    id: 6,
    icon: <BusinessIcon />,
    iconBg: "#F3E5F5",
    borderColor: "#FAC8FF",
    iconColor: "#9C27B0",
    title: "Business Analytics",
    description: "Data, decisions, and impact",
    popularTopics: 32,
  },
  {
    id: 7,
    icon: <EconomicsIcon />,
    iconBg: "#E8F5E9",
    borderColor: "#CCF2CD",
    iconColor: "#4CAF50",
    title: "Economics & Quantitative Methods",
    description: "Budgets, returns, and risk",
    popularTopics: 14,
  },
  {
    id: 8,
    icon: <OtherIcon />,
    iconBg: "#FFF3E0",
    borderColor: "#EAD8B9",
    iconColor: "#FF9800",
    title: "Others",
    description: "Tech, ethics, change & communication",
    popularTopics: 14,
  },
];

export const topicsUnopened = [
  {
    title: "Finance",
    desc: "Budgets, returns, \nand  risk",
    bgColor: "#ECFEFF",
    borderColor: "#CCF0F2",
    iconColor: "#2FC3EC",
  },
  {
    title: "Marketing",
    desc: "Brands, strategy & \nconsumer insight",
    bgColor: "#F3ECFF",
    borderColor: "#DFD8EB",
    iconColor: "#7D1DE4",
  },
  {
    title: "Human Resource",
    desc: "People, performance, \nculture",
    bgColor: "#FFF6E8",
    borderColor: "#F9DDB1",
    iconColor: "#FF9D00",
  },
  {
    title: "Information System",
    desc: "Tech behind business",
    bgColor: "#F0F0F0",
    borderColor: "#D1D1D1",
    iconColor: "#7B7979",
  },
  {
    title: "Operations",
    desc: "Processes, flow, \nefficiency.",
    bgColor: "#E9F2FF",
    borderColor: "#CCDAEE",
    iconColor: "#406DD8",
  },
  {
    title: "All Subjects",
    desc: "8 vast topics",
    bgColor: "#F5EEE2",
    borderColor: "#EAD8B9",
    iconColor: "#92470A",
  },
];

export const subTopics = [
  {
    id: 1,
    title: "Advanced Accounting & Taxation",
  },
  {
    id: 2,
    title: "Banking & Insurance Management",
  },
  {
    id: 3,
    title: "Investment Banking & Financial Services",
  },
  {
    id: 4,
    title: "Risk Management",
  },
  {
    id: 5,
    title: "Global Finance",
  },
  {
    id: 6,
    title: "Pricing",
  },
  {
    id: 7,
    title: "Security Analysis & Portfolio Management",
  },
  {
    id: 8,
    title: "Financial Statement Analysis",
  },
  {
    id: 9,
    title: "Mergers & Acquisitions",
  },
  {
    id: 10,
    title: "Rural Banking & Micro Finance",
  },
  {
    id: 11,
    title: "Behavioural Finance",
  },
  {
    id: 12,
    title: "Treasury Management",
  },
  {
    id: 13,
    title: "Valuation",
  },
  {
    id: 14,
    title: "Dissertation for Finance School of Excellence",
  },
];

export const toolsArrayOptions = [
  {
    icon: <LLMIcon />,
    title: "LLM",
    selection: "Auto",
  },
  {
    icon: <ResStyleIcon />,
    title: "Response Style",
    selection: "Auto",
  },
  {
    icon: <ResLangIcon />,
    title: "Response Language",
    selection: "English",
  },
  {
    icon: <CitationIcon />,
    title: "Citation Format",
    selection: "Havard",
  },
];

export const allChatsData = [
  {
    id: 0,
    title: "Marketing Material",
    subject: "Marketing",
    roomName: "Exam Prep",
  },
  {
    id: 1,
    title: "Marketing Material",
    subject: "Marketing",
    roomName: "Exam Prep",
  },
  {
    id: 2,
    title: "Chat Name",
    subject: "General",
    roomName: "Exam Prep",
  },
  {
    id: 3,
    title: "Overview Resource Guide",
    subject: "Subject",
    roomName: null,
  },
  {
    id: 4,
    title: "Chat Name",
    subject: "Marketing",
    roomName: "Room Name",
  },
  {
    id: 5,
    title: "Chat Name",
    subject: "Subject",
    roomName: "Room Name",
  },
  {
    id: 6,
    title: "Chat Name",
    subject: "Subject",
    roomName: null,
  },
  {
    id: 7,
    title: "Chat Name",
    subject: "Subject",
    roomName: null,
  },
  {
    id: 8,
    title: "Chat Name",
    subject: "Subject",
    roomName: "Room Name",
  },
  {
    id: 9,
    title: "Chat Name",
    subject: "Subject",
    roomName: null,
  },
  {
    id: 10,
    title: "Marketing Material",
    subject: "Marketing",
    roomName: "Exam Prep",
  },
  {
    id: 11,
    title: "Chat Name",
    subject: "General",
    roomName: "Exam Prep",
  },
  {
    id: 12,
    title: "Overview Resource Guide",
    subject: "Subject",
    roomName: null,
  },
  {
    id: 13,
    title: "Chat Name",
    subject: "Marketing",
    roomName: "Room Name",
  },
  {
    id: 14,
    title: "Chat Name",
    subject: "Subject",
    roomName: "Room Name",
  },
  {
    id: 15,
    title: "Chat Name",
    subject: "Subject",
    roomName: null,
  },
  {
    id: 16,
    title: "Chat Name",
    subject: "Subject",
    roomName: null,
  },
  {
    id: 17,
    title: "Chat Name",
    subject: "Subject",
    roomName: "Room Name",
  },
  {
    id: 18,
    title: "Chat Name",
    subject: "Subject",
    roomName: null,
  },
];

export const allChatsOptionsPopupData = [
  {
    title: "Add to Room",
    icon: <FolderIconDark />,
  },
  {
    title: "Rename",
    icon: <RenameIcon />,
  },
  {
    title: "Pin",
    icon: <PinIcon />,
  },
  {
    title: "Archive",
    icon: <ArchiveIcon />,
  },
  {
    title: "Delete",
    icon: <TrashIcon />,
  },
];

// settingsData.js
export const profileAndSettingsOptions = [
  { id: 1, title: "General Settings", icon: <SettingsIcon /> },
  { id: 2, title: "Personalisation", icon: <PersonIcon /> },
  { id: 3, title: "Analytics Dashboard", icon: <ChartLineIcon /> },
  { id: 4, title: "Payment & Billings", icon: <MoneyIcon /> },
  { id: 5, title: "Academic Links", icon: <GradCapIcon /> },
  { id: 6, title: "About", icon: <InfoIcon /> },
  { id: 7, title: "Help Center", icon: <HelpIcon /> },
  { id: 8, title: "Terms of Use", icon: <FilesIcon /> },
  { id: 9, title: "Privacy Policy", icon: <PrivacyIcon /> },
  { id: 10, title: "Log Out", icon: <SignOutIcon /> },
];

export const faqData = [
  {
    questionTitle: "Is there a free plan available?",
    answer:
      "Yes, there is a free plan available with basic features and certain limitations. You can start using Elunara at no cost, but some advanced capabilities and higher usage limits are reserved for Pro users.",
  },
  {
    questionTitle: "Can I change my plan later?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. Changes to your plan will be reflected in your next billing cycle.",
  },
  {
    questionTitle: "Can I create multiple Rooms in Elunara?",
    answer:
      "Yes, you can create multiple Rooms in Elunara. Each Room can have its own settings and configurations to help you organize your workspace.",
  },
  {
    questionTitle: "How do I customize my AI interaction settings?",
    answer:
      "You can customize your AI interaction settings by going to the Settings menu and selecting AI Preferences. From there, you can adjust various parameters to suit your needs.",
  },
  {
    questionTitle: "How do I recover deleted chats or notes?",
    answer:
      "Deleted chats and notes can be recovered from the Trash folder within 30 days of deletion. After 30 days, they will be permanently removed.",
  },
  {
    questionTitle: "How do I change my account email?",
    answer:
      "To change your account email, go to Account Settings, click on Email, and follow the verification process to update your email address.",
  },
  {
    questionTitle: "Can I create multiple Rooms in Elunara?",
    answer:
      "Yes, you can create multiple Rooms in Elunara. Each Room can have its own settings and configurations to help you organize your workspace.",
  },
  {
    questionTitle: "How do I customize my AI interaction settings?",
    answer:
      "You can customize your AI interaction settings by going to the Settings menu and selecting AI Preferences. From there, you can adjust various parameters to suit your needs.",
  },
  {
    questionTitle: "How do I recover deleted chats or notes?",
    answer:
      "Deleted chats and notes can be recovered from the Trash folder within 30 days of deletion. After 30 days, they will be permanently removed.",
  },
  {
    questionTitle: "How do I change my account email?",
    answer:
      "To change your account email, go to Account Settings, click on Email, and follow the verification process to update your email address.",
  },
];

export const previouslySearchedTopicsForHelp = [
  {
    id: 1,
    title: "Free Plan",
  },
  {
    id: 2,
    title: "Pro Plans",
  },
  {
    id: 3,
    title: "Rooms",
  },
  {
    id: 4,
    title: "How to Use Elunara",
  },
  {
    id: 5,
    title: "Rooms",
  },
  {
    id: 6,
    title: "How to Use Elunara",
  },
  {
    id: 7,
    title: "Rooms",
  },
  {
    id: 8,
    title: "How to Use Elunara",
  },
  {
    id: 1,
    title: "Free Plan",
  },
  {
    id: 2,
    title: "Pro Plans",
  },
  {
    id: 3,
    title: "Rooms",
  },
  {
    id: 4,
    title: "How to Use Elunara",
  },
  {
    id: 5,
    title: "Rooms",
  },
  {
    id: 6,
    title: "How to Use Elunara",
  },
  {
    id: 7,
    title: "Rooms",
  },
  {
    id: 8,
    title: "How to Use Elunara",
  },
];

export const feedbackOptions = [
  {
    title: "Report a Bug",
    desc: "Found something not working right? Let us know so we can fix it quickly.",
    icon: <FileTextIcon />,
  },
  {
    title: "Suggest a Feature",
    desc: "Have an idea to improve your AI learning experience? Share your suggestions with us.",
    icon: <ShootingStarIcon />,
  },
  {
    title: "General Feedback",
    desc: "Tell us what you like or what could be better — we're all ears!",
    icon: <FeedBackIcon />,
  },
];

export const academicLinks = [
  {
    id: 1,
    link: "<Link1@link.com>",
    linkDesc: "<link preview description>",
  },
  {
    id: 1,
    link: "<Link2@link.com>",
    linkDesc: "<link preview description>",
  },
];

export const proPlanFeature = [
  "Everything in free",
  "Unlimited file and photo uploads",
  "Room-based learning: create and manage focused Rooms",
  "Unlimited Custom AI interaction: pick model, style, language, and citations.",
  "Increased limits: more chats and longer conversations.",
  "Opportunities to test new features",
];

export const freePlanFeature = [
  "Basic AI chat interactions",
  "Access to curated subject library",
  "Limited daily attachment uploads\n(up to <x> files per day)",
  "Limited number of changes to AI response style and language (up to <x> changes per day)",
  "Limited number of changes to resources citations (up to <x> changes per day)",
];

export const billingData = [
  {
    id: 1,
    date: "09/06/2025",
    amount: "₹1,999",
    paymentMethod: "gpay",
    paymentInfo: "a****@oksbi",
  },
  {
    id: 2,
    date: "09/06/2025",
    amount: "₹1,999",
    paymentMethod: "mastercard",
    paymentInfo: "**** **** **** 4356",
  },
  {
    id: 3,
    date: "09/06/2025",
    amount: "₹1,999",
    paymentMethod: "gpay",
    paymentInfo: "a****@oksbi",
  },
  {
    id: 4,
    date: "09/06/2025",
    amount: "₹1,999",
    paymentMethod: "gpay",
    paymentInfo: "a****@oksbi",
  },
  {
    id: 5,
    date: "09/06/2025",
    amount: "₹1,999",
    paymentMethod: "gpay",
    paymentInfo: "a****@oksbi",
  },
  {
    id: 6,
    date: "09/06/2025",
    amount: "₹1,999",
    paymentMethod: "gpay",
    paymentInfo: "a****@oksbi",
  },
  {
    id: 7,
    date: "09/06/2025",
    amount: "₹1,999",
    paymentMethod: "mastercard",
    paymentInfo: "**** **** **** 4356",
  },
  {
    id: 8,
    date: "09/06/2025",
    amount: "₹1,999",
    paymentMethod: "gpay",
    paymentInfo: "a****@oksbi",
  },
  {
    id: 9,
    date: "09/06/2025",
    amount: "₹1,999",
    paymentMethod: "gpay",
    paymentInfo: "a****@oksbi",
  },
  {
    id: 10,
    date: "09/06/2025",
    amount: "₹1,999",
    paymentMethod: "gpay",
    paymentInfo: "a****@oksbi",
  },
];

export const topicsCoveredAnalytics = [
  {
    title: "Finance",
    completed: 12,
    total: 14,
    isComplete: false,
  },
  {
    title: "Information System",
    completed: 8,
    total: 8,
    isComplete: true,
  },
  {
    title: "Marketing",
    completed: 13,
    total: 27,
    isComplete: false,
  },
  {
    title: "Business Analytics",
    completed: 10,
    total: 33,
    isComplete: false,
  },
];

export const graphData = [
  { day: "M", hours: 4.0 },
  { day: "T", hours: 1.8 },
  { day: "W", hours: 3.5 },
  { day: "T", hours: 2.8 },
  { day: "F", hours: 3.8 },
  { day: "S", hours: 1.5 },
  { day: "S", hours: 3.7 },
];


export const genderSelection = [
  "Male",
  "Female",
  "Others",
  "Prefer not to say"
]

export const currentUniversity = [
  "IIM A",
  "IIM B",
  "ISB",
  "Globsyn",
  "Others"
]

export const degreeProgram = [
  "BBA",
  "MBA",
  "PGDM",
  "PG Business Analytics",
]

export const semester = [
  "1",
  "2",
  "3",
  "4",
]

export const specialization = [
  "Marketing",
  "Finance",
  "HR",
  "Research & Analytics",
]

export const internetQuality = [
  "Excellent",
  "Good",
  "Average",
  "Poor",
  "Unstable",
]