import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
  Linking,
} from "react-native";
import React, { useState, useEffect } from "react";
import SwayamIcon from "../../../assets/SvgIconsComponent/AcademicLinksIcon/SwayamIcon";
import {
  ArrowUpRightIcon,
  MoreVertical,
  Paperclip,
  Plus,
  Trash2,
} from "lucide-react-native";
import { scaleFont } from "../../utils/responsive";
import { academicLinks } from "../../data/datas";
import LinkIcon from "../../../assets/SvgIconsComponent/AcademicLinksIcon/LinkIcon";
import { triggerToast } from "../../services/toast";
import AddLinkPopup from "../../components/common/AddLinkPopup";
import DeleteAcademicLinkPopup from "../../components/ProfileAndSettings/AcademicLinksCompo/DeleteAcademicLinkPopup";
import { useDispatch, useSelector } from "react-redux";
import { setToggleAddLinkPopup } from "../../redux/slices/toggleSlice";
import {
  commonFunctionForAPICalls,
  resetAcademicLinkFlags,
} from "../../redux/slices/apiCommonSlice";

const { width, height } = Dimensions.get("window");

const AcademicLinks = () => {
  const [activePopupIndex, setActivePopupIndex] = useState(null);
  const [linkPendingDelete, setLinkPendingDelete] = useState(null);
  const { toggleStates } = useSelector((state) => state.Toggle);
  const { settingsStates } = useSelector((state) => state.API);
  const dispatch = useDispatch();

  // Fetch academic links on component mount
  useEffect(() => {
    dispatch(
      commonFunctionForAPICalls({
        method: "GET",
        url: "/settings/academic-links",
        name: "getAcademicLinks",
      }),
    );
  }, []);

  // Refetch when link is added or deleted
  useEffect(() => {
    if (
      settingsStates.academicLinkAdded ||
      settingsStates.academicLinkDeleted
    ) {
      dispatch(
        commonFunctionForAPICalls({
          method: "GET",
          url: "/settings/academic-links",
          name: "getAcademicLinks",
        }),
      );
      dispatch(resetAcademicLinkFlags());
    }
  }, [settingsStates.academicLinkAdded, settingsStates.academicLinkDeleted]);

  const handleMorePress = (index) => {
    setActivePopupIndex(activePopupIndex === index ? null : index);
  };

  const handleDelete = (link, linkIndex) => {
    // Resolve the API's identifier the same way the original code did:
    // prefer link.index (a field on the API object), fall back to array
    // position. Without this resolution the DELETE URL was undefined and
    // the popup just closed without ever firing the request.
    const deleteId =
      link?.index !== undefined ? link.index : linkIndex;
    setLinkPendingDelete({ link, deleteId });
    setActivePopupIndex(null);
  };

  const userLinksCount = settingsStates.academicLinks?.userLinks?.length || 0;
  const isAtLinkLimit = userLinksCount >= 2;

  const handleAddLink = () => {
    if (isAtLinkLimit) {
      triggerToast(
        "Limit Exceeded",
        "You can add a maximum of 2 academic links. Remove one to add another.",
        "error",
        3000,
      );
      return;
    }
    dispatch(setToggleAddLinkPopup(true));
  };

  return (
    <View style={styles.container}>
      {toggleStates.toggleAddLinkPopup && <AddLinkPopup />}
      <DeleteAcademicLinkPopup
        visible={!!linkPendingDelete}
        link={linkPendingDelete?.link}
        deleteId={linkPendingDelete?.deleteId}
        onClose={() => setLinkPendingDelete(null)}
      />

      <View style={styles.card}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.titleSection}>
            <SwayamIcon />
            <Text style={styles.title}>Swayam Central</Text>
          </View>

          <TouchableOpacity
            style={styles.visitButton}
            onPress={() => Linking.openURL("https://swayam.gov.in/")}
          >
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

          {/* Plus Button - Centered to left content. Visually disabled when
              the user has reached the 2-link limit, but still tappable so the
              "Limit Exceeded" toast fires on press. */}
          <TouchableOpacity
            onPress={handleAddLink}
            style={[styles.addButton, isAtLinkLimit && { opacity: 0.4 }]}
          >
            <Plus size={23} color="#1F2937" strokeWidth={1.5} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Loader while fetching links */}
      {settingsStates.fetchingAcademicLinks && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="small" color="#081A35" />
        </View>
      )}

      {!settingsStates.fetchingAcademicLinks && (settingsStates.academicLinks?.userLinks || []).map(
        (links, linkIndex) => {
          return (
            <View key={linkIndex} style={styles.linksMain}>
              {/* Link Icon + Details — tappable to open the URL in the
                  device's default browser. The more-options button on the
                  right is kept outside this touch area so users can still
                  open the delete popup without accidentally opening the
                  link. */}
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.linkTappableArea}
                onPress={() => {
                  const raw = (links?.url || "").trim();
                  if (!raw) return;
                  // Add scheme if user-saved URL was entered without one,
                  // otherwise Linking.openURL fails silently on some devices.
                  const href = /^https?:\/\//i.test(raw)
                    ? raw
                    : `https://${raw}`;
                  Linking.openURL(href).catch(() => {
                    triggerToast(
                      "Couldn't open link",
                      "The link could not be opened. Please check its format.",
                      "error",
                      3000,
                    );
                  });
                }}
              >
                <View style={styles.iconContainer}>
                  <LinkIcon />
                </View>

                <View style={styles.linkDetails}>
                  <Text style={styles.url}>{links.url} </Text>
                  <Text style={styles.description}>{links.description} </Text>
                </View>
              </TouchableOpacity>

              {/* More Options Button */}
              <View style={styles.moreButtonContainer}>
                <TouchableOpacity
                  style={styles.moreButton}
                  onPress={() => handleMorePress(linkIndex)}
                >
                  <MoreVertical size={24} color="#1F2937" strokeWidth={2} />
                </TouchableOpacity>

                {/* Delete Popup */}
                {activePopupIndex === linkIndex && (
                  <>
                    <TouchableOpacity
                      style={styles.popupOverlay}
                      onPress={() => {
                        // Only close the popup when tapping outside
                        setActivePopupIndex(null);
                      }}
                    ></TouchableOpacity>
                    <Pressable style={styles.popup}>
                      <View style={styles.deletePopup}>
                        <TouchableOpacity
                          style={styles.deleteOption}
                          onPress={() => handleDelete(links, linkIndex)}
                        >
                          <Trash2 size={18} color="#3A3A3A" strokeWidth={2} />
                          <Text style={styles.deleteText}>Delete</Text>
                        </TouchableOpacity>
                      </View>
                    </Pressable>
                  </>
                )}
              </View>
            </View>
          );
        },
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    paddingVertical: 30,
    alignItems: "center",
    justifyContent: "center",
  },
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
    fontFamily: "Mukta-Bold",
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
    fontFamily: "Mukta-Medium",
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
    width: 48,
    height: 48,
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
    fontFamily: "Mukta-Regular",
  },
  iconContainer: {
    width: 55,
    height: 50,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CDD5DC",
  },
  linkDetails: {
    flex: 1,
    gap: 4,
  },
  url: {
    fontSize: scaleFont(14),
    fontWeight: "600",
    fontFamily: "Mukta-Medium",
    color: "#1F2937",
    lineHeight: 24,
  },
  moreButtonContainer: {
    position: "relative",
  },
  moreButton: {
    padding: 4,
  },
  popupOverlay: {
    position: "absolute",
    bottom: -500,
    right: -25,
    zIndex: 100,
    width,
    height,
    backgroundColor: "transparent",
  },
  popup: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 100,
  },
  deletePopup: {
    position: "absolute",
    top: 35,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    paddingRight: 50,
    minWidth: 100,
    borderWidth: 1,
    borderColor: "#D3DAE5",
  },
  deleteOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  deleteText: {
    fontSize: scaleFont(14),
    fontWeight: "500",
    fontFamily: "Mukta-Medium",
    color: "#3A3A3A",
  },
  linksMain: {
    backgroundColor: "#EBF1FB",
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 11,
    flexDirection: "row",
    alignItems: "center",
    width: width - 32,
    gap: 14,
    alignSelf: "center",
    marginTop: 20,
  },
  linkTappableArea: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
});

export default AcademicLinks;
