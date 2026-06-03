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
        // Android hyper-sdk-react sometimes emits an object (WritableMap)
        // directly while iOS emits a JSON string. Handle both. Same goes for
        // the nested `payload` field.
        const data = typeof resp === "string" ? JSON.parse(resp) : resp;
        const event = data?.event || "";
        const rawPayload = data?.payload;
        const payload =
          typeof rawPayload === "string" ? JSON.parse(rawPayload) : rawPayload || {};
        console.log("[App] HyperEvent:", event, "payload:", JSON.stringify(payload));
        if (event === "process_result") {
          dispatch(
            setPaymentResultEvent({
              orderId: data?.orderId || payload?.orderId || "",
              status: payload?.status || "",
              ts: Date.now(),
            })
          );
        }
      } catch (e) {
        console.log("[App] HyperEvent parse error:", e, "raw:", resp);
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
