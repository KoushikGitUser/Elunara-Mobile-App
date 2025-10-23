import { AntDesign, Ionicons } from "@expo/vector-icons";
import { ChartLine, IndianRupee, Pencil, Pin, Trash } from "lucide-react-native";
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

export const topicsUnopened = [
  {
    title: "Finance",
    desc: "Budgets, returns, \nand  risk",
    bgColor: "#ECFEFF",
    borderColor: "#CCF0F2",
    iconColor:"#2FC3EC"
  },
  {
    title: "Marketing",
    desc: "Brands, strategy & \nconsumer insight",
    bgColor: "#F3ECFF",
    borderColor: "#DFD8EB",
    iconColor:"#7D1DE4"
  },
  {
    title: "Human Resource",
    desc: "People, performance, \nculture",
    bgColor: "#FFF6E8",
    borderColor: "#F9DDB1",
    iconColor:"#FF9D00"
  },
  {
    title: "Information System",
    desc: "Tech behind business",
    bgColor: "#F0F0F0",
    borderColor: "#D1D1D1",
    iconColor:"#7B7979"
  },
  {
    title: "Operations",
    desc: "Processes, flow, \nefficiency.",
    bgColor: "#E9F2FF",
    borderColor: "#CCDAEE",
    iconColor:"#406DD8"
  },
  {
    title: "All Subjects",
    desc: "8 vast topics",
    bgColor: "#F5EEE2",
    borderColor: "#EAD8B9",
    iconColor:"#92470A"
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
]

export const chatMessages = [
  {
    role:"user",
    message:"Hello",
  },
  {
    role:"ai",
    message:"Hi! How can I assist you today?",
  },
  {
    role:"user",
    message:"Can you help me with a marketing plan?",
  },
  {
    role:"ai",
    message:"Absolutely! To create an effective marketing plan, we should start by defining your target audience, setting clear objectives, and outlining the strategies and tactics you'll use to reach your goals. Do you have a specific product or service in mind?", 
  },
  {role:"user",
   message:"Yes, I'm launching a new eco-friendly water bottle."},
  {
    role:"ai",
    message:"Great! For your eco-friendly water bottle, we can focus on highlighting its sustainability features, targeting environmentally conscious consumers, and leveraging social media platforms to create awareness. We can also consider partnerships with eco-friendly organizations and influencers to amplify your message. Would you like me to help you draft a detailed marketing plan?",
  },
  {
    role:"user",
    message:"Yes, please!",
  },
  {
    role:"ai",
    message:"Sure! Here's a basic outline for your marketing plan:\n\n1. Executive Summary: Brief overview of the product and marketing goals.\n\n2. Market Research: Analysis of the eco-friendly market, target audience demographics, and competitor analysis.\n\n3. Marketing Objectives: Clear, measurable goals such as increasing brand awareness, driving sales, and building customer loyalty.\n\n4. Marketing Strategies: Tactics to achieve objectives, including social media campaigns, influencer partnerships, content marketing, and events.\n\n5. Budget: Allocation of resources for each marketing activity.\n\n6. Implementation Timeline: Schedule for executing the marketing plan.\n\n7. Evaluation: Metrics to measure the success of the marketing efforts.\n\nWould you like me to expand on any of these sections or provide more specific strategies?",
  }
]

export const menuOptions = [
  {
    icon:<Ionicons name="bookmark-outline" size={24} color="black" />,
    option:"Open Notes"
  },
   {
    icon:<AntDesign name="folder-add" size={24} color="black" />,
    option:"Add to Learning Lab"
  },
   {
    icon:<Pencil strokeWidth={1.25} />,
    option:"Rename"
  },
   {
    icon:<Pin strokeWidth={1.25} />,
    option:"Pin"
  },
   {
    icon:<Ionicons name="archive-outline" size={24} color="black" />,
    option:"Archive"
  },
   {  
    icon:<Trash strokeWidth={1.25} />,
    option:"Delete"
  }
]
