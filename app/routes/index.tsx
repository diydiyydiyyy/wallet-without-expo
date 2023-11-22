import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AppStackParamList} from '../types';
import Address from '../screens/Address';
import Home from '../screens/Home';
import Mnemonic from '../screens/Mnemonic';
import Password from '../screens/Password';
import CheckOtherToken from '../screens/CheckOtherToken';
import SendTransaction from '../screens/SendTransaction';

const Stack = createNativeStackNavigator<AppStackParamList>();

export const Router = () => {
  return (
    <Stack.Navigator screenOptions={{animation: 'slide_from_right'}}>
      <>
        <Stack.Screen
          name="Password"
          component={Password}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Mnemonic" component={Mnemonic} />
        <Stack.Screen name="Address" component={Address} />
        <Stack.Screen name="CheckOtherToken" component={CheckOtherToken} />
        <Stack.Screen name="SendTransaction" component={SendTransaction} />
        <Stack.Screen name="Home" component={Home} />
      </>
    </Stack.Navigator>
  );
};
