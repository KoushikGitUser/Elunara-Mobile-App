import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commonFunctionForAPICalls } from "../../redux/slices/apiCommonSlice";
import { Clock, X } from "lucide-react-native";
import { scaleFont } from "../../utils/responsive";

const SearchHistory = ({ onHistoryItemPress }) => {
  const dispatch = useDispatch();
  const { searchStates } = useSelector((state) => state.API);

  useEffect(() => {
    dispatch(
      commonFunctionForAPICalls({
        method: "GET",
        url: "/search/history?limit=10",
        name: "get-search-history",
      }),
    );
  }, []);

  const handleClearHistory = () => {
    dispatch(
      commonFunctionForAPICalls({
        method: "DELETE",
        url: "/search/history",
        name: "clear-search-history",
      }),
    );
  };

  if (searchStates.fetchingHistory) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#081A35" />
      </View>
    );
  }

  if (!searchStates.searchHistory || searchStates.searchHistory.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No recent searches</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recent Searches</Text>
        <TouchableOpacity
          onPress={handleClearHistory}
          disabled={searchStates.clearingHistory}
        >
          {searchStates.clearingHistory ? (
            <ActivityIndicator size="small" color="#6B7280" />
          ) : (
            <Text style={styles.clearText}>Clear All</Text>
          )}
        </TouchableOpacity>
      </View>
      <FlatList
        data={searchStates.searchHistory}
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.historyItem}
            onPress={() => onHistoryItemPress(item.query)}
          >
            <View style={styles.historyItemLeft}>
              <Clock size={16} color="#9CA3AF" />
              <Text style={styles.historyText}>{item.query}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: "100%",
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center",
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    fontFamily: "Mukta-Regular",
    color: "#9CA3AF",
    fontSize: scaleFont(14),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    width: "100%",
  },
  headerTitle: {
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Bold",
    color: "#1F2937",
    fontWeight: "600",
  },
  clearText: {
    fontSize: scaleFont(12),
    fontFamily: "Mukta-Medium",
    color: "#EF4444",
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  historyItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  historyText: {
    fontSize: scaleFont(14),
    fontFamily: "Mukta-Regular",
    color: "#374151",
  },
});

export default SearchHistory;
