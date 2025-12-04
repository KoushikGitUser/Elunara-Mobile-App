import {
  View,
  Text,
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  PanResponder,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { BadgeCheck, CircleX, Info, TriangleAlert } from "lucide-react-native";
import { toastEmitter } from "../../services/toast";
import { useFonts } from "expo-font";

const ToasterWithAction = () => {
  const [fontsLoaded] = useFonts({
    "Mukta-Bold": require("../../../assets/fonts/Mukta-Bold.ttf"),
    "Mukta-Regular": require("../../../assets/fonts/Mukta-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
    }
  }, [fontsLoaded]);

  // Show nothing (or a loader) while fonts are loading
  if (!fontsLoaded) {
    return null;
  }

  const [toast, setToast] = useState({
    visible: false,
    title: "",
    description: "",
    type: "success",
    duration: 3000,
    actionTitle: "",
    action: null,
  });

  const slideAnim = useRef(new Animated.Value(-150)).current;
  const hideTimer = useRef(null);

  // 👉 SWIPE HANDLER
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => {
        return Math.abs(gesture.dy) > 5;
      },

      onPanResponderMove: (_, gesture) => {
        if (gesture.dy < 0) {
          slideAnim.setValue(20 + gesture.dy);
        }
      },

      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy < -40) {
          Animated.timing(slideAnim, {
            toValue: -150,
            duration: 200,
            useNativeDriver: true,
          }).start(() => {
            setToast((t) => ({ ...t, visible: false }));
          });
        } else {
          Animated.spring(slideAnim, {
            toValue: 20,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    const listener = (data) => {
      if (hideTimer.current) clearTimeout(hideTimer.current);

      const duration = data.duration || 3000;
      setToast({
        visible: true,
        title: data.title || "",
        description: data.description || "",
        type: data.type || "success",
        duration,
        actionTitle: data.actionTitle || "Button",
        action: data.action || null,
      });

      slideAnim.setValue(-150);
      Animated.timing(slideAnim, {
        toValue: 20,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        hideTimer.current = setTimeout(() => {
          Animated.timing(slideAnim, {
            toValue: -150,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            setToast((t) => ({ ...t, visible: false }));
          });
        }, duration);
      });
    };

    const off = toastEmitter.on("SHOW_TOAST_WITH_ACTION", listener);
    return () => off();
  }, []);

  if (!toast.visible) return null;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[styles.toast, { transform: [{ translateY: slideAnim }] }]}
    >
      {toast.type == "success" ? (
        <BadgeCheck
          style={{ marginTop: 5 }}
          color="#03B32F"
          strokeWidth={1.25}
        />
      ) : toast.type == "alert" ? (
        <TriangleAlert
          style={{ marginTop: 5 }}
          color="#FFA412"
          strokeWidth={1.25}
        />
      ) : toast.type == "info" ? (
        <Info style={{ marginTop: 5 }} color="#D00B0B" strokeWidth={1.25} />
      ) : (
        <CircleX style={{ marginTop: 5 }} color="#D00B0B" strokeWidth={1.25} />
      )}

      <Animated.View>
        <Text style={[styles.textTitle,{fontFamily:'Mukta-Bold'}]}>{toast.title}</Text>
        <Text style={[styles.textDesc,{fontFamily:'Mukta-Regular'}]}>{toast.description}</Text>
      </Animated.View>

      <TouchableOpacity style={styles.actionBtn} onPress={toast.action}>
        <Text style={{ fontWeight: 600, fontSize: 16,fontFamily:'Mukta-Bold'}}>
          {toast.actionTitle}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    left: 20,
    width: width - 40,
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D3DAE5",
    elevation: 10,
    shadowColor: "#c5c5c5ff",
    zIndex: 99999,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 10,
  },
  textTitle: {
    fontWeight: 600,
    fontSize: 17,
  },
  textDesc: {
    color: "#757575",
    fontSize: 15,
  },
  actionBtn: {
    borderBottomWidth: 1,
    borderColor: "black",
    marginLeft: "auto",
  },
});

export default ToasterWithAction;
