import * as React from 'react';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoadScreen from './src/view/LoadScreen';
import Login from './src/view/Login';
import Home from './src/view/Home';
import Register from './src/view/Register';
import RegisterSchedule from './src/view/RegisterSchedule';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoadScreen">
        <Stack.Screen name="LoadScreen" component={LoadScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="RegisterSchedule" component={RegisterSchedule} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
