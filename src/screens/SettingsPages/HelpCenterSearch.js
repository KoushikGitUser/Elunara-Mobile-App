import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { scaleFont, verticalScale } from "../../utils/responsive";
import { MessageCircle, Search } from "lucide-react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { previouslySearchedTopicsForHelp } from "../../data/datas";
import BigSearchIcon from "../../../assets/SvgIconsComponent/ProfilePageOptionsIcons/BigSearchIcon";
import GradientText from "../../components/common/GradientText";

const HelpCenterSearch = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const inputRef = useRef();

  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(
    previouslySearchedTopicsForHelp
  );
  const [startedSearching, setStartedSearching] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      inputRef.current.focus();
    }, 200);
  }, []);

  const handleSearch = (text) => {
    setStartedSearching(true);
    setSearch(text);
    if (text == "") {
      setFilteredData(previouslySearchedTopicsForHelp);
      setStartedSearching(false);
    } else {
      const filtered = previouslySearchedTopicsForHelp.filter((item) =>
        item.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const noResults = search.length > 0 && filteredData.length === 0;

  return (
    <View style={styles.container}>
      <View style={styles.searchInputMain}>
        <Search
          size={25}
          strokeWidth={1.25}
          color="#B5BECE"
          style={styles.searchIcon}
        />
        <TextInput
          ref={inputRef}
          placeholder=""
          value={search}
          onChangeText={handleSearch}
          placeholderTextColor="#B5BECE"
          style={styles.searchInput}
        />
      </View>
      {!startedSearching && <Text style={styles.headerLabel}>Previously searched</Text>}
      
      <ScrollView>
        {filteredData?.map((topics, topicIndex) => {
          return (
            <TouchableOpacity key={topicIndex} style={styles.topicMain}>
              {!startedSearching && (
                <MessageCircle color="#888888" size={25} strokeWidth={1.25} />
              )}
              <Text>{topics.title}</Text>
            </TouchableOpacity>
          );
        })}
        {noResults && (
          <View style={styles.noResultMain}>
            <BigSearchIcon />
            <GradientText
              marginBottom={0}
              marginTop={15}
              children="No Results found"
              fullWidth={false}
              widthNumber={0.55}
              fontSize={scaleFont(25)}
            />
            <Text style={{fontSize:scaleFont(13),textAlign:"center",width:"75%",color:"#757575"}}>
                We couldn't find any matches for your search. Try different keywords or check your spelling to find what you're looking for.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  scrollView: {
    flex: 1,
  },
  searchInputMain: {
    width: "100%",
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 15,
  },
  searchIcon: {
    position: "absolute",
    left: 30,
  },
  searchInput: {
    width: "100%",
    height: verticalScale(40),
    borderWidth: 1,
    borderRadius: 16,
    borderColor: "#ABB8CC",
    paddingLeft: 40,
    outlineColor: "black",
    outlineWidth: 1,
  },
  headerLabel: {
    fontSize: 13,
    color: "#757575",
    marginBottom: 8,
    fontWeight: "400",
    marginTop: 20,
    marginLeft: 20,
  },
  topicMain: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 20,
    width: "100%",
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  noResultMain: {
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    gap: 10,
    alignItems: "center",
    marginTop: 70
  },
});

export default HelpCenterSearch;
