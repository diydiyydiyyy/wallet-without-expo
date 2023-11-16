import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AppStackParamList} from '../types';
import Address from '../screens/Home';
import Home from '../screens/Home';
import Mnemonic from '../screens/Mnemonic';
import Password from '../screens/Password';

const Stack = createNativeStackNavigator<AppStackParamList>();

export const Router = () => {
  return (
    <Stack.Navigator screenOptions={{animation: 'slide_from_right'}}>
      <>
        <Stack.Screen name="Password" component={Password} />
        <Stack.Screen name="Mnemonic" component={Mnemonic} />
        <Stack.Screen name="Address" component={Address} />
        <Stack.Screen name="Home" component={Home} />
      </>
    </Stack.Navigator>
  );
};
