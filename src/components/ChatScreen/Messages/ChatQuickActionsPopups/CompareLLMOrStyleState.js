import {
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import { AntDesign, Feather } from "@expo/vector-icons";
import { ArrowLeft, ChevronDown, FileText } from "lucide-react-native";
import { scaleFont } from "../../../../utils/responsive";
import { useDispatch, useSelector } from "react-redux";
import ChatIcon from "../../../../../assets/SvgIconsComponent/ChatHistorySidebarIcons/ChatIcon";
import ConversationalIcon from "../../../../../assets/SvgIconsComponent/ResponseStyleIcons/ConversationalIcon";
import { setToggleChangeResponseStyleWhileChatPopup, setToggleCompareStyleState } from "../../../../redux/slices/toggleSlice";
import OtherStylesPopup from "./ChangeStyle/OtherStylesPopup";
import gemini from '../../../../assets/images/gemini.png'
import anthropic from "../../../../assets/images/antropic.png"
import OtherLLMPopup from "./ChangeResponse/OtherLLMPopup";

const CompareLLMOrStyleState = ({
  forStyleOrLLM,
  icon1,
  icon2,
  title1,
  title2,
}) => {
  const [isExpandedFirst, setIsExpandedFirst] = useState(false);
  const [isExpandedSecond, setIsExpandedSecond] = useState(false);
  const { globalDataStates } = useSelector((state) => state.Global);
  const dispatch = useDispatch();

  return (
    <View style={styles.modalSheet}>
      {/* Handle Bar */}
      <View style={styles.closeModalMain}>
        <ArrowLeft
          onPress={() => dispatch(setToggleCompareStyleState(false))}
          size={30}
          strokeWidth={2}
        />
        <AntDesign
          onPress={() => dispatch(setToggleChangeResponseStyleWhileChatPopup(false))}
          name="close"
          size={24}
          color="black"
        />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.titleAndDropdown}>
          <View style={styles.leftSection}>
            {forStyleOrLLM == "style"? <FileText size={22} color="#888888" />:<Image style={{height:25,width:25}} source={gemini} />}
           
              <Text style={styles.title}>{forStyleOrLLM == "style"?"Concise":"Google Gemini"}</Text>
          </View>

          <TouchableOpacity
          onPress={()=>setIsExpandedFirst(true)}
          >
            <ChevronDown size={37} strokeWidth={1.25} color="#0C1A40" />
          </TouchableOpacity>
          {(isExpandedFirst && forStyleOrLLM == "style")? <OtherStylesPopup isFirst={true} setIsExpandedSecond={setIsExpandedSecond} setIsExpandedFirst={setIsExpandedFirst} /> :(isExpandedFirst && forStyleOrLLM == "LLM")?<OtherLLMPopup isFirst={true} setIsExpandedFirst={setIsExpandedFirst} setIsExpandedSecond={setIsExpandedSecond}/>:null}
        </View>
        <View style={styles.responseBoxMain}>
          <ScrollView style={styles.responseBoxScroll}>
            <Text
              style={{
                fontFamily: "Mukta-Regular",
                lineHeight: 20,
                fontSize: scaleFont(18),
                  color:"#5E5E5E"
              }}
            >
              Finance is the comprehensive management of money, credit,
              investments, and other financial assets and liabilities. It's
              about how individuals, businesses, and governments acquire and
              utilize funds, aiming to maximize value and minimize risk. Finance
              is the comprehensive management of money, credit, investments, and
              other financial assets and liabilities. It's about how
              individuals, businesses, and governments acquire and utilize
              funds, aiming to maximize value and minimize risk. Finance is the
              comprehensive management of money, credit, investments, and other
              financial assets and liabilities. It's about how individuals,
              businesses, and governments acquire and utilize funds, aiming to
              maximize value and minimize risk.
            </Text>
          </ScrollView>
        </View>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: "white",
              borderWidth: 1,
              borderColor: "#081A35",
              marginLeft: "auto",
              marginTop: 15,
            },
          ]}
        >
          <Text style={[styles.buttonText, { color: "#081A35" }]}>
            Select this Response
          </Text>
        </TouchableOpacity>
        <View style={styles.titleAndDropdown}>
          <View style={styles.leftSection}>
            {forStyleOrLLM == "style"? <ConversationalIcon/>:<Image style={{height:25,width:25}} source={anthropic} />}
            
            <Text style={styles.title}>{forStyleOrLLM == "style"?"Conversational":"Anthropic"}</Text>
          </View>

          <TouchableOpacity
            onPress={()=>setIsExpandedSecond(true)}
          >
            <ChevronDown size={37} strokeWidth={1.25} color="#0C1A40" />
          </TouchableOpacity>
          {(isExpandedSecond && forStyleOrLLM == "style")? <OtherStylesPopup isFirst={false} setIsExpandedSecond={setIsExpandedSecond} setIsExpandedFirst={setIsExpandedFirst} />:(isExpandedSecond && forStyleOrLLM == "LLM")? <OtherLLMPopup isFirst={false} setIsExpandedFirst={setIsExpandedFirst} setIsExpandedSecond={setIsExpandedSecond} />:null}
        </View>
        <View style={styles.responseBoxMain}>
          <ScrollView style={styles.responseBoxScroll}>
            <Text
              style={{
                fontFamily: "Mukta-Regular",
                lineHeight: 20,
                fontSize: scaleFont(18),
                color:"#5E5E5E"
              }}
            >
              Finance is the comprehensive management of money, credit,
              investments, and other financial assets and liabilities. It's
              about how individuals, businesses, and governments acquire and
              utilize funds, aiming to maximize value and minimize risk. Finance
              is the comprehensive management of money, credit, investments, and
              other financial assets and liabilities. It's about how
              individuals, businesses, and governments acquire and utilize
              funds, aiming to maximize value and minimize risk. Finance is the
              comprehensive management of money, credit, investments, and other
              financial assets and liabilities. It's about how individuals,
              businesses, and governments acquire and utilize funds, aiming to
              maximize value and minimize risk.
            </Text>
          </ScrollView>
        </View>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: "white",
              borderWidth: 1,
              borderColor: "#081A35",
              marginLeft: "auto",
              marginTop: 15,
            },
          ]}
        >
          <Text style={[styles.buttonText, { color: "#081A35" }]}>
            Select this Response
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
    backgroundColor: "#FAFAFA",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingBottom: Platform.OS === "ios" ? 40 : 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 20,
  },
  responseBoxMain: {
    width: "100%",
    height: 220,
    borderWidth: 1,
    borderColor: "#B5BECE",
    borderRadius: 20,
    marginTop: 5,
    paddingHorizontal: 15,
    paddingLeft: 20,
    paddingVertical: 20,
  },
  responseBoxScroll: {
    flex: 1,
    width: "100%",
  },
  btnsMain: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  verifiedIcon: {
    height: 55,
    width: 50,
    objectFit: "contain",
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  iconContainer: {
    marginBottom: 10,
  },
  title: {
    fontSize: scaleFont(18),
    fontWeight: "600",
    color: "#1F2937",
    fontFamily: "Mukta-Bold",
    letterSpacing: -0.5,
  },
  description: {
    fontSize: scaleFont(12),
    lineHeight: 24,
    color: "#6B7280",
    marginBottom: 10,
    letterSpacing: 0.2,
  },
  button: {
    width: "auto",
    backgroundColor: "#081A35",
    paddingVertical: 10,
    paddingHorizontal: 17,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: scaleFont(13),
    fontWeight: "500",
    letterSpacing: 0.3,
    fontFamily:"Mukta-Bold"
  },
  featuresList: {
    gap: 10,
    marginBottom: 30,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 12,
  },
  featureText: {
    fontSize: scaleFont(13),
    lineHeight: 24,
    color: "#1F2937",
    fontWeight: "500",
    flex: 1,
    paddingTop: 1,
  },
  cardsContainer: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
    marginBottom: 55,
  },
  priceCard: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    borderRadius: 20,
    padding: 13,
    borderWidth: 2,
    borderColor: "#D3DAE5",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedCard: {
    backgroundColor: "#EEF4FF",
    borderColor: "#081A35",
  },
  checkBadge: {
    position: "absolute",
    top: -17,
    right: 20,
    transform: [{ translateX: 12 }],
    width: 27,
    height: 27,
    borderRadius: 16,
    backgroundColor: "#081A35",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#ffffff",
  },
  saveBadge: {
    position: "absolute",
    top: -15,
    right: 15,
    backgroundColor: "#F3ECFF",
    borderWidth: 1,
    borderColor: "#7D1DE4",
    paddingHorizontal: 14,
    paddingVertical: 2,
    borderRadius: 20,
  },
  saveText: {
    color: "#7D1DE4",
    fontSize: 10,
    fontWeight: "600",
  },
  priceText: {
    fontSize: scaleFont(12.5),
    fontWeight: "600",
    color: "#1F2937",
    textAlign: "center",
  },
  periodText: {
    fontSize: scaleFont(12.5),
    fontWeight: "600",
    color: "#1F2937",
    textAlign: "center",
  },
  closeModalMain: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 16,
  },
  categorySections: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  sectionText: {
    color: "#757575",
  },
  sections: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 2,
    borderColor: "lightgrey",
    paddingVertical: 10,
  },
  currentLLMMain: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#D8DCE4",
    marginBottom: 20,
  },
  currentResponse: {
    fontSize: scaleFont(17),
    fontWeight: "600",
    color: "#1A1A1A",
    fontFamily: "Mukta-Bold",
  },
  badge: {
    backgroundColor: "#F3F3F3",
    borderColor: "#D8DCE4",
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 50,
  },
  btnText: {
    fontSize: scaleFont(12),
    fontWeight: "400",
    color: "#1A1A1A",
    fontFamily: "Mukta-Regular",
  },
  titleAndDropdown: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1F2937",
  },
  rotated: {
    transform: [{ rotate: "180deg" }],
  },
});

export default CompareLLMOrStyleState;
