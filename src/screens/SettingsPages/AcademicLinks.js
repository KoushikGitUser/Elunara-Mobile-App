import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import SwayamIcon from "../../../assets/SvgIconsComponent/AcademicLinksIcon/SwayamIcon";
import {
  ArrowUpRightIcon,
  Link2,
  MoreVertical,
  Paperclip,
  Plus,
} from "lucide-react-native";
import { scaleFont } from "../../utils/responsive";
import { academicLinks } from "../../data/datas";
import LinkIcon from "../../../assets/SvgIconsComponent/AcademicLinksIcon/LinkIcon";
import AddLinkPopup from "../../components/ProfileAndSettings/AcademicLinksCompo/AddLinkPopup";

const { width } = Dimensions.get("window");

const AcademicLinks = () => {
  const [toggleAddLinkPopup,setToggleAddLinkPopup] = useState(false);
  return (
    <View style={styles.container}>
      <AddLinkPopup setToggleAddLinkPopup={setToggleAddLinkPopup} toggleAddLinkPopup={toggleAddLinkPopup} />
      <View style={styles.card}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.titleSection}>
            <SwayamIcon />
            <Text style={styles.title}>Swayam Central</Text>
          </View>

          <TouchableOpacity style={styles.visitButton}>
            <Text style={styles.visitText}>Visit Site</Text>
            <ArrowUpRightIcon />
          </TouchableOpacity>
        </View>

        {/* Description */}
        <Text style={styles.description}>
          Access free online courses from Top Indian universities. Learn
          anytime, earn certificates, and transfer credits to your degree
        </Text>
      </View>

      <View style={[styles.card, { marginTop: 10 }]}>
        <View style={styles.contentWrapper}>
          {/* Left Content */}
          <View style={styles.leftContent}>
            {/* Header with Icon and Title */}
            <View style={[styles.titleSection, { marginBottom: 15 }]}>
              <Paperclip size={26} color="#888888" strokeWidth={1.5} />
              <Text style={styles.title}>Your Academic Quick Links</Text>
            </View>

            {/* Description */}
            <Text style={[styles.description, { width: "100%" }]}>
              Add up to 2 academic links for quick access to your key resources.
            </Text>
          </View>

          {/* Plus Button - Centered to left content */}
          <TouchableOpacity onPress={()=> setToggleAddLinkPopup(true)} style={styles.addButton}>
            <Plus size={28} color="#1F2937" strokeWidth={1.5} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.divider} />

      {academicLinks.map((links, linkIndex) => {
        return (
          <TouchableOpacity  key={linkIndex} style={styles.linksMain}>
            {/* Link Icon */}
            <View style={styles.iconContainer}>
             <LinkIcon/>
            </View>

            {/* Link Details */}
            <View style={styles.linkDetails}>
              <Text style={styles.url}>{links.link} </Text>
              <Text style={styles.description}>{links.linkDesc} </Text>
            </View>

            {/* More Options Button */}
            <TouchableOpacity style={styles.moreButton}>
              <MoreVertical size={24} color="#1F2937" strokeWidth={2} />
            </TouchableOpacity>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  card: {
    borderRadius: 16,
    padding: 20,
    width: "100%",
  },
  contentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  leftContent: {
    width: "80%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  titleSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  title: {
    fontSize: scaleFont(18),
    fontWeight: "600",
    color: "#1F2937",
  },
  visitButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  visitText: {
    fontSize: scaleFont(14),
    fontWeight: "500",
    color: "#1F2937",
    borderBottomWidth: 1,
    borderBottomColor: "#1F2937",
  },
  divider: {
    width: width - 40,
    height: 1.5,
    backgroundColor: "#D3DAE5",
    alignSelf: "center",
    marginTop: 5,
  },
  addButton: {
    width: 52,
    height: 52,
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: "#1F2937",
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    fontSize: scaleFont(14),
    lineHeight: 20,
    color: "#757575",
    fontWeight: "400",
  },
  iconContainer: {
    width: 55,
    height: 50,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth:1,
    borderColor:"#CDD5DC"
  },
  linkDetails: {
    flex: 1,
    gap: 4,
  },
  url: {
    fontSize: scaleFont(14),
    fontWeight: "600",
    color: "#1F2937",
    lineHeight: 24,
  },
  moreButton: {
    padding: 4,
  },
  linksMain: {
    backgroundColor: "#EBF1FB",
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal:11,
    flexDirection: "row",
    alignItems: "center",
    width: width - 32,
    gap: 14,
    alignSelf:"center",
    marginTop:20
  },
});

export default AcademicLinks;
