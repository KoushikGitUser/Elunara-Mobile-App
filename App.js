import React, { useEffect } from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { Provider } from "react-redux";
import Store from "./src/redux/store/Store";
import { View } from "react-native";
import Toaster from "./src/components/UniversalToaster/Toaster";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Mukta-Regular": require("./assets/fonts/Mukta-Regular.ttf"),
    "Mukta-Bold": require("./assets/fonts/Mukta-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
    }
  }, [fontsLoaded]);

  // Show nothing (or a loader) while fonts are loading
  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <Provider store={Store}>
        <Toaster />
        <AppNavigator />
      </Provider>
    </>
  );
}
