import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider } from 'react-redux';
import Store from './src/redux/store/Store';

export default function App() {
  return (
    <>
     <Provider store={Store}>
      <AppNavigator />
      <StatusBar style="auto" />
     </Provider>
    </>
  );
}
