import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { moderateScale, scaleFont, verticalScale } from "../../../utils/responsive";
import { useDispatch, useSelector } from "react-redux";
import pdfLogo from "../../../assets/images/pdf.png";
import { setToggleUserMessageActionPopup } from "../../../redux/slices/toggleSlice";
import { setChatTitleOnLongPress, setUserMessageOnLongPress, setEditingMessageData } from "../../../redux/slices/globalDataSlice";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FileSpreadsheet, File } from "lucide-react-native";

// Document type configurations
const DOCUMENT_TYPE_CONFIG = {
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
    icon: "microsoft-word", iconType: "material", color: "#2B579A", label: "Word"
  },
  "application/msword": {
    icon: "microsoft-word", iconType: "material", color: "#2B579A", label: "Word"
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
    icon: "microsoft-excel", iconType: "material", color: "#217346", label: "Excel"
  },
  "application/vnd.ms-excel": {
    icon: "microsoft-excel", iconType: "material", color: "#217346", label: "Excel"
  },
  "text/csv": {
    icon: "microsoft-excel", iconType: "material", color: "#217346", label: "CSV"
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
    icon: "FileSpreadsheet", iconType: "lucide", color: "#D24726", label: "PPT"
  },
  "application/vnd.ms-powerpoint": {
    icon: "FileSpreadsheet", iconType: "lucide", color: "#D24726", label: "PPT"
  },
  "text/plain": { icon: "File", iconType: "lucide", color: "#F59E0B", label: "Text" },
  "text/markdown": { icon: "File", iconType: "lucide", color: "#F59E0B", label: "MD" },
  "application/json": { icon: "File", iconType: "lucide", color: "#F59E0B", label: "JSON" },
  "text/yaml": { icon: "File", iconType: "lucide", color: "#F59E0B", label: "YAML" },
  "application/x-yaml": { icon: "File", iconType: "lucide", color: "#F59E0B", label: "YAML" },
  "text/html": { icon: "File", iconType: "lucide", color: "#F59E0B", label: "HTML" },
  default: { icon: "File", iconType: "lucide", color: "#F59E0B", label: "File" },
};

const getDocConfig = (mimeType, fileName) => {
  if (mimeType && DOCUMENT_TYPE_CONFIG[mimeType]) return DOCUMENT_TYPE_CONFIG[mimeType];
  const ext = fileName?.split(".").pop()?.toLowerCase();
  const extMap = {
    docx: DOCUMENT_TYPE_CONFIG["application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
    doc: DOCUMENT_TYPE_CONFIG["application/msword"],
    xlsx: DOCUMENT_TYPE_CONFIG["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
    xls: DOCUMENT_TYPE_CONFIG["application/vnd.ms-excel"],
    csv: DOCUMENT_TYPE_CONFIG["text/csv"],
    pptx: DOCUMENT_TYPE_CONFIG["application/vnd.openxmlformats-officedocument.presentationml.presentation"],
    ppt: DOCUMENT_TYPE_CONFIG["application/vnd.ms-powerpoint"],
    txt: DOCUMENT_TYPE_CONFIG["text/plain"],
    md: DOCUMENT_TYPE_CONFIG["text/markdown"],
    json: DOCUMENT_TYPE_CONFIG["application/json"],
    yaml: DOCUMENT_TYPE_CONFIG["text/yaml"],
    yml: DOCUMENT_TYPE_CONFIG["text/yaml"],
    html: DOCUMENT_TYPE_CONFIG["text/html"],
    htm: DOCUMENT_TYPE_CONFIG["text/html"],
    log: DOCUMENT_TYPE_CONFIG["text/plain"],
  };
  return extMap[ext] || DOCUMENT_TYPE_CONFIG.default;
};

const SUPPORTED_DOC_MIMES = Object.keys(DOCUMENT_TYPE_CONFIG).filter(k => k !== "default");

const UserMessageBox = ({ chat, messageIndex }) => {
  const { globalDataStates } = useSelector((state) => state.Global);
  const dispatch = useDispatch();

  const truncateFileName = (fileName, ext = "pdf") => {
    if (!fileName) return "";
    const regex = new RegExp(`\\.${ext}$`, "i");
    const nameWithoutExtension = fileName.replace(regex, "");
    if (nameWithoutExtension.length > 15) {
      return nameWithoutExtension.substring(0, 15) + `...${ext}`;
    }
    return nameWithoutExtension + `.${ext}`;
  };

  // Get attachments array (support both new 'attachments' and legacy 'file')
  const attachments = chat.attachments || (chat.file ? [chat.file] : []);

  // Separate images, PDFs, and other documents
  const images = attachments.filter(file =>
    ["image/png", "image/jpg", "image/jpeg"].includes(file?.mimeType)
  );
  const pdfs = attachments.filter(file => file?.mimeType === "application/pdf");
  const documents = attachments.filter(file => {
    const isPdf = file?.mimeType === "application/pdf";
    const isImage = ["image/png", "image/jpg", "image/jpeg"].includes(file?.mimeType);
    if (isPdf || isImage) return false;
    // Check if it's a supported document type
    const ext = file?.name?.split(".").pop()?.toLowerCase();
    return SUPPORTED_DOC_MIMES.includes(file?.mimeType) ||
      ["docx", "doc", "xlsx", "xls", "csv", "pptx", "ppt", "txt", "md", "json", "yaml", "yml", "html", "htm", "log"].includes(ext);
  });

  // Render stacked images
  const renderStackedImages = () => {
    if (images.length === 0) return null;

    if (images.length === 1) {
      return (
        <Image source={images[0]} style={styles.attachedImage} />
      );
    }

    // Multiple images - stacked layout
    return (
      <View style={styles.stackedImagesContainer}>
        {images.map((image, index) => (
          <Image
            key={index}
            source={image}
            style={[
              styles.stackedImage,
              {
                right: index * 15,
                zIndex: images.length - index,
                transform: [{ rotate: `${(index - 1) * 5}deg` }],
              },
            ]}
          />
        ))}
        {images.length > 1 && (
          <View style={styles.imageCountBadge}>
            <Text style={styles.imageCountText}>{images.length}</Text>
          </View>
        )}
      </View>
    );
  };

  // Render PDFs
  const renderPdfs = () => {
    if (pdfs.length === 0) return null;

    return pdfs.map((pdf, index) => (
      <View key={index} style={styles.pdfMain}>
        <View style={styles.pdfLogoContainer}>
          <Image
            source={pdfLogo}
            style={{ height: 25, width: 25, objectFit: "contain" }}
          />
        </View>
        <View>
          <Text style={{ fontSize: scaleFont(12), fontWeight: "600", fontFamily: "Mukta-Bold" }}>
            {truncateFileName(pdf?.name, "pdf")}
          </Text>
          <Text style={{ fontSize: scaleFont(12), fontWeight: "400", fontFamily: "Mukta-Regular" }}>
            PDF
          </Text>
        </View>
      </View>
    ));
  };

  // Render document icon
  const renderDocIcon = (config, size = 22) => {
    if (config.iconType === "material") {
      return <MaterialCommunityIcons name={config.icon} size={size} color={config.color} />;
    } else if (config.icon === "FileSpreadsheet") {
      return <FileSpreadsheet size={size} color={config.color} strokeWidth={1.5} />;
    }
    return <File size={size} color={config.color} strokeWidth={1.5} />;
  };

  // Render stacked documents
  const renderStackedDocuments = () => {
    if (documents.length === 0) return null;

    if (documents.length === 1) {
      const doc = documents[0];
      const config = getDocConfig(doc?.mimeType, doc?.name);
      const ext = doc?.name?.split(".").pop()?.toLowerCase() || "";
      return (
        <View style={styles.pdfMain}>
          <View style={[styles.pdfLogoContainer, { borderColor: config.color + "40" }]}>
            {renderDocIcon(config, 25)}
          </View>
          <View>
            <Text style={{ fontSize: scaleFont(12), fontWeight: "600", fontFamily: "Mukta-Bold" }}>
              {truncateFileName(doc?.name, ext)}
            </Text>
            <Text style={{ fontSize: scaleFont(12), fontWeight: "400", fontFamily: "Mukta-Regular", color: config.color }}>
              {config.label}
            </Text>
          </View>
        </View>
      );
    }

    // Multiple documents - stacked layout
    return (
      <View style={styles.stackedDocsContainer}>
        {documents.slice(0, 3).map((doc, index) => {
          const config = getDocConfig(doc?.mimeType, doc?.name);
          return (
            <View
              key={index}
              style={[
                styles.stackedDoc,
                {
                  right: index * 12,
                  zIndex: documents.length - index,
                  transform: [{ rotate: `${(index - 1) * 4}deg` }],
                  borderColor: config.color + "60",
                },
              ]}
            >
              {renderDocIcon(config, 20)}
            </View>
          );
        })}
        {documents.length > 1 && (
          <View style={styles.docCountBadge}>
            <Text style={styles.docCountText}>{documents.length}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.mainBox}>
      {/* Render stacked images */}
      {renderStackedImages()}

      {/* Render PDFs */}
      {renderPdfs()}

      {/* Render stacked documents */}
      {renderStackedDocuments()}

      <TouchableOpacity
        onLongPress={() => {
          dispatch(setToggleUserMessageActionPopup(true));
          dispatch(setUserMessageOnLongPress(chat.message));
          dispatch(setEditingMessageData({
            message: chat.message,
            messageIndex: messageIndex,
            chat: chat
          }));
        }}
        style={styles.messageBox}
      >
        <Text style={[styles.message, { fontFamily: 'Mukta-Regular' }]}>{chat.message} </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBox: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    gap: 12,
    alignItems: "flex-end",
    marginTop: 20,
  },
  messageBox: {
    minHeight: verticalScale(45),
    maxWidth: "80%",
    backgroundColor: "#EBF1FB",
    borderWidth: 1,
    borderColor: "#D3DAE5",
    borderRadius: 20,
    borderTopRightRadius: 0,
    paddingHorizontal: 20,
    paddingVertical: 13,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  message: {
    fontSize: moderateScale(15),
    fontWeight: "400",
    color: "#3A3A3A"
  },
  pdfMain: {
    height: verticalScale(65),
    minWidth: 187,
    backgroundColor: "#EBF1FB",
    borderRadius: 20,
    position: "relative",
    paddingHorizontal: 12,
    paddingVertical: 12,
    paddingRight: 40,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 17,
  },
  pdfLogoContainer: {
    height: "100%",
    width: 60,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#c3cddcff",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  attachedImage: {
    width: "50%",
    objectFit: "cover",
    height: verticalScale(150),
    borderRadius: 20,
  },
  stackedImagesContainer: {
    width: "55%",
    height: verticalScale(150),
    position: "relative",
    alignItems: "flex-end",
    marginRight: 10,
  },
  stackedImage: {
    width: "85%",
    height: verticalScale(140),
    borderRadius: 16,
    position: "absolute",
    borderWidth: 2,
    borderColor: "#D3DAE5",
    backgroundColor: "#EBF1FB",
  },
  imageCountBadge: {
    position: "absolute",
    top: -24,
    right: 8,
    width: 24,
    height: 24,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  imageCountText: {
    color: "#FFFFFF",
    fontSize: scaleFont(11),
    fontWeight: "600",
    fontFamily: "Mukta-Bold",
  },
  stackedDocsContainer: {
    width: 120,
    height: verticalScale(60),
    position: "relative",
    alignItems: "flex-end",
    marginRight: 10,
  },
  stackedDoc: {
    width: 50,
    height: verticalScale(50),
    borderRadius: 12,
    position: "absolute",
    borderWidth: 2,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  docCountBadge: {
    position: "absolute",
    top: -20,
    right: 8,
    width: 24,
    height: 24,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  docCountText: {
    color: "#FFFFFF",
    fontSize: scaleFont(11),
    fontWeight: "600",
    fontFamily: "Mukta-Bold",
  },
});

export default UserMessageBox;
