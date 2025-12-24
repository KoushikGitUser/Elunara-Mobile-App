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
import AllChatsPage from "../screens/AllChatsPage/AllChatsPage";
import ProfileAndSettings from "../screens/ProfileAndSettings/ProfileAndSettings";
import SettingsProfileInnerPage from "../screens/SettingsProfileInnerPages/SettingsProfileInnerPage";
import AddRoomDetails from "../screens/Rooms/AddRoomDetails";
import AllRoomsLandingPage from "../screens/Rooms/AllRoomsLandingPage";
import AnalyticsCompletedTopicsPage from "../screens/SettingsPages/AnalyticsCompletedTopicsPage";
import * as Linking from "expo-linking";
import VerifyEmailWhileSignup from "../screens/auth/redirectionsAuth/VerifyEmailWhileSignup";

// Screens

const Stack = createNativeStackNavigator();

const prefix = Linking.createURL("/");

const linking = {
  prefixes: [prefix, "elunara://", "exp+elunara://","elunaraapp://"],
  config: {
    screens: {
      "Splash": "splash",
      "welcome": "welcome",
      "signin": "signin",
      "signup": "signup",
      "changepass": "changepass/:recoveryToken/:isForTokenOrOTP",
      "chat": "chat/:chatId?",           // optional param
      "notes": "notes/:noteId?",         // optional param
      "allRooms": "allRooms",
      "rooms": "rooms/:roomId?",         // optional param
      "roomDetails": "roomDetails/:roomId?",
      "allchats": "allchats",
      "profile": "profile",
      "settingsInnerPages": "settings/:page?",
      "analyticsComplete": "analyticsComplete",
      "verify-email": "verify-email/:emailToken",
    },
  },
};



const AppNavigator = () => {
  return (
    <NavigationContainer linking={linking}>
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
          name="allRooms"
          component={AllRoomsLandingPage}
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

         <Stack.Screen
          name="roomDetails"
          component={AddRoomDetails}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="allchats"
          component={AllChatsPage}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="profile"
          component={ProfileAndSettings}
          options={{
            headerShown: false,
          }}
        />

         <Stack.Screen
          name="settingsInnerPages"
          component={SettingsProfileInnerPage}
          options={{
            headerShown: false,
          }}
        />

         <Stack.Screen
          name="analyticsComplete"
          component={AnalyticsCompletedTopicsPage}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="verify-email"
          component={VerifyEmailWhileSignup}
          options={{
            headerShown: false,
          }}
        />

      </Stack.Navigator>

      
    </NavigationContainer>
  );
};

export default AppNavigator;
