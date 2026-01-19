import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { scaleFont } from "../../utils/responsive";
import { Home, MessageSquare, FileText } from "lucide-react-native";

const SearchResults = () => {
  const { searchStates } = useSelector((state) => state.API);
  const navigation = useNavigation();

  if (searchStates.isSearching) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#081A35" />
      </View>
    );
  }

  const sections = [
    {
      title: "Rooms",
      data: searchStates.searchResults?.rooms || [],
      icon: <Home size={18} color="#4B5563" />,
      type: "room",
    },
    {
      title: "Chats",
      data: searchStates.searchResults?.chats || [],
      icon: <MessageSquare size={18} color="#4B5563" />,
      type: "chat",
    },
    {
      title: "Messages",
      data: searchStates.searchResults?.messages || [],
      icon: <FileText size={18} color="#4B5563" />,
      type: "message",
    },
  ];

  const handleResultPress = (item, type) => {
    if (type === "room") {
      navigation.navigate("rooms", {
        roomName: item.name,
        roomUuid: item.id || item.uuid,
      });
    } else if (type === "chat") {
      navigation.navigate("ChatScreen", {
        chatUuid: item.id || item.uuid,
        chatTitle: item.name,
      });
    } else if (type === "message") {
      navigation.navigate("ChatScreen", {
        chatUuid: item.chat?.id || item.chat?.uuid,
        chatTitle: item.chat?.name || "Chat",
      });
    }
  };

  const renderItem = ({ item, type }) => {
    let title = item.name;
    let subtitle = item.description || item.subject?.name;

    if (type === "message") {
      title = item.chat?.name || "Chat Message";
      subtitle = item.snippet;
    }

    return (
      <TouchableOpacity
        style={styles.resultItem}
        onPress={() => handleResultPress(item, type)}
      >
        <View style={styles.textContainer}>
          <Text style={styles.itemTitle}>{title}</Text>
          {subtitle && (
            <Text style={styles.itemSubtitle} numberOfLines={2}>
              {subtitle}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const hasResults = sections.some((section) => section.data.length > 0);

  if (!hasResults && !searchStates.isSearching) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No results found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={sections}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => {
          if (item.data.length === 0) return null;
          return (
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                {item.icon}
                <Text style={styles.sectionTitle}>{item.title}</Text>
              </View>
              {item.data.map((result, index) => (
                <View key={index}>
                  {renderItem({ item: result, type: item.type })}
                </View>
              ))}
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  loadingContainer: {
    padding: 30,
    alignItems: "center",
  },
  emptyContainer: {
    padding: 30,
    alignItems: "center",
  },
  emptyText: {
    fontFamily: "Mukta-Regular",
    color: "#6B7280",
    fontSize: scaleFont(14),
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  sectionTitle: {
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Bold",
    color: "#374151",
    fontWeight: "600",
  },
  resultItem: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: "white",
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: scaleFont(14),
    fontFamily: "Mukta-SemiBold",
    color: "#1F2937",
    marginBottom: 2,
  },
  itemSubtitle: {
    fontSize: scaleFont(12),
    fontFamily: "Mukta-Regular",
    color: "#6B7280",
  },
});

export default SearchResults;
