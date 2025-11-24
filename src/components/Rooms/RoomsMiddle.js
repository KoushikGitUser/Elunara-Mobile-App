import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { createStyles } from "../../screens/Rooms/Rooms.styles";
import roomLogo from "../../assets/images/Group 40427.png";
import { moderateScale, scaleFont } from "../../utils/responsive";
import { Brain, Link } from "lucide-react-native";
import BigSearchIcon from "../../../assets/SvgIconsComponent/ProfilePageOptionsIcons/BigSearchIcon";
import GradientText from "../common/GradientText";
import { setToggleAddedRoomDetails } from "../../redux/slices/toggleSlice";

const RoomsMiddle = ({ roomName }) => {
  const styleProps = {};
  const styles = useMemo(() => createStyles(styleProps), []);
  const { toggleStates } = useSelector((state) => state.Toggle);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={styles.roomMiddleMain}>
      <View style={styles.middleIconAndText}>
        <Image source={roomLogo} style={styles.roomLogo} />
        <View>
          <Text style={{ fontSize: moderateScale(24), fontWeight: 600 }}>
            {roomName}
          </Text>
          <Text style={{ fontSize: moderateScale(16), color: "#717680" }}>
            Your Study Lab: view chats, set context, add files, and start new
            conversations.
          </Text>
        </View>
      </View>
      <View>
        
      </View>
      {toggleStates.toggleAddedRoomDetails ? (
        <View style={[styles.middleBelowAddSection,{borderWidth:0,backgroundColor:"#FAFAFA"}]}>
          <View style={styles.noResultMain}>
            <BigSearchIcon />
            <GradientText
              marginBottom={0}
              marginTop={15}
              children="Start Something Great Today!"
              fullWidth={false}
              widthNumber={0.55}
              fontSize={scaleFont(20)}
            />
            <Text
              style={{
                fontSize: scaleFont(13),
                textAlign: "center",
                width: "100%",
                color: "#757575",
              }}
            >
              Create your first chat to dive into personalised AI help. Chats created in this Learning Lab will appear here.
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.middleBelowAddSection}>
          <View style={styles.addDetailsOptions}>
            <Brain strokeWidth={1.5} size={25} style={{ marginTop: 5 }} />
            <View style={{ width: "85%" }}>
              <Text style={{ fontSize: moderateScale(16), fontWeight: 600 }}>
                Add Instructions
              </Text>
              <Text style={{ fontSize: moderateScale(14), color: "#717680" }}>
                Tailor the way Elunara AI responds in this Room
              </Text>
            </View>
          </View>
          <View style={styles.addDetailsOptions}>
            <Link strokeWidth={1.5} size={25} style={{ marginTop: 5 }} />
            <View style={{ width: "85%" }}>
              <Text style={{ fontSize: moderateScale(16), fontWeight: 600 }}>
                Add Files or Links
              </Text>
              <Text style={{ fontSize: moderateScale(14), color: "#717680" }}>
                Share sources to set the quicker context
              </Text>
            </View>
          </View>
          <TouchableOpacity 
            onPress={() => dispatch(setToggleAddedRoomDetails(true))}
           style={styles.addDetailsBtn}>
            <Text style={{ fontSize: moderateScale(14), fontWeight: 600 }}>
              Add room details
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default RoomsMiddle;
