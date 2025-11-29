import { View, Text, StyleSheet, Animated, Modal, Dimensions } from "react-native";
import React, { useEffect, useRef } from "react";

const Toaster = ({visible,title,description}) => {
  const slideAnim = useRef(new Animated.Value(-150)).current; // start above top

  useEffect(() => {
    if (visible) {
      // slide down
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // hide after 3 seconds
        setTimeout(() => {
          Animated.timing(slideAnim, {
            toValue: -150,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }, 3500);
      });
    }
  }, [visible]);
  return (
    <Modal transparent visible={visible} animationType="none">
      <View style={styles.container}>
        <Animated.View
          style={[styles.toast, { transform: [{ translateY: slideAnim }] }]}
        >
          <Text style={styles.text}>{title}</Text>
          <Text style={styles.text}>{description}</Text>
        </Animated.View>
      </View>
    </Modal>
  );
};
const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    backgroundColor:"red"
  },
  toast: {
    width:width-40,
    marginTop:50,
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderWidth:1,
    borderColor:"#D3DAE5",
    elevation: 10, // Android shadow
    shadowColor:"#c5c5c5ff"
  },
  text: {
    color: "#000",
    fontSize: 16,
  },
});

export default Toaster;
