import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider } from 'react-redux';
import Store from './src/redux/store/Store';
import { View } from 'react-native';
import Toaster from './src/components/UniversalToaster/Toaster';

export default function App() {
  return (
    <>
     <Provider store={Store}>
      <AppNavigator />
     </Provider>
    </>
  );
}
