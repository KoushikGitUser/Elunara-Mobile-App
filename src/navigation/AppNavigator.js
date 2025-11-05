import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/SplashScreen/SplashScreen";
import SignIn from "../screens/auth/SignIn/SignIn";
import SignUp from "../screens/auth/SignUp/SignUp";
import WelcomeScreen from "../screens/WelcomeScreen/WelcomeScreen";
import ChangePassword from "../screens/auth/ChangePassword/ChangePassword";
import ChatScreen from "../screens/ChatScreen/ChatScreen";
import Notes from "../screens/Notes/Notes";
import Rooms from "../screens/Rooms/Rooms";

// Screens

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}
      >
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="welcome"
          component={WelcomeScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="signin"
          component={SignIn}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="signup"
          component={SignUp}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="changepass"
          component={ChangePassword}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="chat"
          component={ChatScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="notes"
          component={Notes}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="rooms"
          component={Rooms}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
