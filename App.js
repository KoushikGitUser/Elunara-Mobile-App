import React, { useEffect } from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { Provider, useDispatch } from "react-redux";
import Store from "./src/redux/store/Store";
import { NativeEventEmitter, NativeModules } from "react-native";
import Toaster from "./src/components/UniversalToaster/Toaster";
import { useFonts } from "expo-font";
import NetworkProvider from "./src/providers/NetworkProvider";
import HyperSdkReact from "hyper-sdk-react";
import { setPaymentResultEvent } from "./src/redux/slices/toggleSlice";

const HyperPaymentListeners = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    HyperSdkReact.createHyperServices();
  }, []);

  useEffect(() => {
    if (!NativeModules.HyperSdkReact) {
      console.log("[App] HyperSdkReact native module not available");
      return;
    }
    const hyperEmitter = new NativeEventEmitter(NativeModules.HyperSdkReact);
    const hyperListener = hyperEmitter.addListener("HyperEvent", (resp) => {
      try {
        const data = JSON.parse(resp);
        const event = data.event || "";
        console.log("[App] HyperEvent:", event);
        if (event === "process_result") {
          const innerPayload = data.payload || {};
          dispatch(
            setPaymentResultEvent({
              orderId: data.orderId,
              status: innerPayload.status || "",
              ts: Date.now(),
            })
          );
        }
      } catch (e) {
        console.log("[App] HyperEvent parse error:", e);
      }
    });
    return () => hyperListener.remove();
  }, [dispatch]);

  return null;
};

export default function App() {
  const [fontsLoaded] = useFonts({
    "Mukta-Regular": require("./assets/fonts/Mukta-Regular.ttf"),
    "Mukta-Bold": require("./assets/fonts/Mukta-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NetworkProvider>
      <Provider store={Store}>
        <HyperPaymentListeners />
        <AppNavigator />
        <Toaster />
      </Provider>
    </NetworkProvider>
  );
}
