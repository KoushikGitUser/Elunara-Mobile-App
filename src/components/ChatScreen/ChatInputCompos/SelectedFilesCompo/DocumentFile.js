import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { scaleFont, verticalScale } from "../../../../utils/responsive";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { X, FileSpreadsheet, File } from "lucide-react-native";

// File type configurations
const FILE_TYPE_CONFIG = {
  // Word documents
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
    icon: "microsoft-word",
    iconType: "material",
    color: "#2B579A",
    label: "Word",
    extension: "docx",
  },
  "application/msword": {
    icon: "microsoft-word",
    iconType: "material",
    color: "#2B579A",
    label: "Word",
    extension: "doc",
  },
  // Excel spreadsheets
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
    icon: "microsoft-excel",
    iconType: "material",
    color: "#217346",
    label: "Excel",
    extension: "xlsx",
  },
  "application/vnd.ms-excel": {
    icon: "microsoft-excel",
    iconType: "material",
    color: "#217346",
    label: "Excel",
    extension: "xls",
  },
  // CSV files
  "text/csv": {
    icon: "microsoft-excel",
    iconType: "material",
    color: "#217346",
    label: "CSV",
    extension: "csv",
  },
  // PowerPoint
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
    icon: "FileSpreadsheet",
    iconType: "lucide",
    color: "#D24726",
    label: "PPT",
    extension: "pptx",
  },
  "application/vnd.ms-powerpoint": {
    icon: "FileSpreadsheet",
    iconType: "lucide",
    color: "#D24726",
    label: "PPT",
    extension: "ppt",
  },
  // Text/Code files
  "text/plain": {
    icon: "File",
    iconType: "lucide",
    color: "#F59E0B",
    label: "Text",
    extension: "txt",
  },
  "text/markdown": {
    icon: "File",
    iconType: "lucide",
    color: "#F59E0B",
    label: "Markdown",
    extension: "md",
  },
  "application/json": {
    icon: "File",
    iconType: "lucide",
    color: "#F59E0B",
    label: "JSON",
    extension: "json",
  },
  "text/yaml": {
    icon: "File",
    iconType: "lucide",
    color: "#F59E0B",
    label: "YAML",
    extension: "yaml",
  },
  "application/x-yaml": {
    icon: "File",
    iconType: "lucide",
    color: "#F59E0B",
    label: "YAML",
    extension: "yaml",
  },
  "text/html": {
    icon: "File",
    iconType: "lucide",
    color: "#F59E0B",
    label: "HTML",
    extension: "html",
  },
  // Default for unknown types
  default: {
    icon: "File",
    iconType: "lucide",
    color: "#F59E0B",
    label: "File",
    extension: "",
  },
};

// Get file extension from filename
const getExtensionFromFileName = (fileName) => {
  if (!fileName) return "";
  const parts = fileName.split(".");
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : "";
};

// Get config based on mimeType or extension
const getFileConfig = (mimeType, fileName) => {
  // Try mimeType first
  if (mimeType && FILE_TYPE_CONFIG[mimeType]) {
    return FILE_TYPE_CONFIG[mimeType];
  }

  // Fallback to extension-based detection
  const ext = getExtensionFromFileName(fileName);
  const extensionMap = {
    docx: FILE_TYPE_CONFIG["application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
    doc: FILE_TYPE_CONFIG["application/msword"],
    xlsx: FILE_TYPE_CONFIG["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
    xls: FILE_TYPE_CONFIG["application/vnd.ms-excel"],
    csv: FILE_TYPE_CONFIG["text/csv"],
    pptx: FILE_TYPE_CONFIG["application/vnd.openxmlformats-officedocument.presentationml.presentation"],
    ppt: FILE_TYPE_CONFIG["application/vnd.ms-powerpoint"],
    txt: FILE_TYPE_CONFIG["text/plain"],
    md: FILE_TYPE_CONFIG["text/markdown"],
    json: FILE_TYPE_CONFIG["application/json"],
    yaml: FILE_TYPE_CONFIG["text/yaml"],
    yml: FILE_TYPE_CONFIG["text/yaml"],
    html: FILE_TYPE_CONFIG["text/html"],
    htm: FILE_TYPE_CONFIG["text/html"],
    log: FILE_TYPE_CONFIG["text/plain"],
  };

  return extensionMap[ext] || FILE_TYPE_CONFIG.default;
};

const DocumentFile = ({ file, onRemove }) => {
  const config = getFileConfig(file?.mimeType, file?.name);

  const truncateFileName = (fileName) => {
    if (!fileName) return "";
    const ext = getExtensionFromFileName(fileName);
    const nameWithoutExtension = fileName.replace(new RegExp(`\\.${ext}$`, "i"), "");

    if (nameWithoutExtension.length > 12) {
      return nameWithoutExtension.substring(0, 12) + "..." + (ext ? `.${ext}` : "");
    }

    return fileName;
  };

  const renderIcon = () => {
    if (config.iconType === "material") {
      return (
        <MaterialCommunityIcons
          name={config.icon}
          size={28}
          color={config.color}
        />
      );
    } else if (config.icon === "FileSpreadsheet") {
      return <FileSpreadsheet size={28} color={config.color} strokeWidth={1.5} />;
    } else {
      return <File size={28} color={config.color} strokeWidth={1.5} />;
    }
  };

  return (
    <View style={styles.documentMain}>
      <View style={[styles.iconContainer, { borderColor: config.color + "40" }]}>
        {renderIcon()}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.fileName}>
          {truncateFileName(file?.name)}
        </Text>
        <Text style={[styles.fileType, { color: config.color }]}>
          {config.label}
        </Text>
      </View>
      <TouchableOpacity style={styles.crossBtn} onPress={onRemove}>
        <X size={15} color="white" strokeWidth={1.5} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  documentMain: {
    height: verticalScale(65),
    minWidth: 187,
    backgroundColor: "#EBF1FB",
    borderRadius: 20,
    position: "relative",
    paddingHorizontal: 12,
    paddingVertical: 12,
    paddingRight: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 17,
  },
  iconContainer: {
    height: "100%",
    width: 60,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  fileName: {
    fontSize: scaleFont(13),
    fontWeight: "600",
    fontFamily: "Mukta-Bold",
    color: "#1F2937",
  },
  fileType: {
    fontSize: scaleFont(12),
    fontWeight: "400",
    fontFamily: "Mukta-Regular",
  },
  crossBtn: {
    position: "absolute",
    height: 24,
    width: 24,
    borderRadius: 50,
    backgroundColor: "black",
    right: -15,
    top: -12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

// Export the supported MIME types for use in file picker
export const SUPPORTED_DOCUMENT_TYPES = [
  // Word
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
  // Excel
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-excel",
  "text/csv",
  // PowerPoint
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.ms-powerpoint",
  // Text/Code
  "text/plain",
  "text/markdown",
  "application/json",
  "text/yaml",
  "application/x-yaml",
  "text/html",
];

// Export supported extensions for validation
export const SUPPORTED_EXTENSIONS = [
  "docx", "doc", "xlsx", "xls", "csv", "pptx", "ppt",
  "txt", "md", "json", "yaml", "yml", "html", "htm", "log"
];

export default DocumentFile;
