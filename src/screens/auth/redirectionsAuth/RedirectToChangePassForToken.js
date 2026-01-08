import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const RedirectToChangePassForToken = ({ route }) => {
  const { recoveryToken } = route.params || {};
  const navigation = useNavigation();

  useEffect(() => {
    navigation.navigate("changepass",{recoveryToken,isForTokenOrOTP:"token"})
  }, []);


  return <View></View>;
};

export default RedirectToChangePassForToken;
