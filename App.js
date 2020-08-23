import * as React from 'react';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoadScreen from './src/view/LoadScreen';
import Login from './src/view/Login';
import Home from './src/view/Home';
import Register from './src/view/Register';
import RegisterSchedule from './src/view/RegisterSchedule';
import Account from './src/view/Account';

const Stack = createStackNavigator();
const StackAuth = createStackNavigator();
const Tab = createBottomTabNavigator();
const StackSchedule = createStackNavigator();

const StackSche = () => (
  <StackSchedule.Navigator>
    <StackSchedule.Screen 
      name="Home" 
      component={Home} 
    />
    <StackSchedule.Screen name="RegisterSchedule" component={RegisterSchedule} />
  </StackSchedule.Navigator>
);

const StackSig = () => (
  <StackAuth.Navigator initialRouteName="LoadScreen" headerMode="none">
    <StackAuth.Screen name="Login" component={Login} />
    <StackAuth.Screen name="Register" component={Register} />
  </StackAuth.Navigator>
);

const TabsScreen = () => (
  <Tab.Navigator initialRouteName="StackSche">
    <Tab.Screen name="StackSche" component={StackSche} options={{title:"Home"}} />
    <Tab.Screen name="Account" component={Account} options={{title:"Conta"}} />
  </Tab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="LoadScreen"
          component={LoadScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="StackSig"
          component={StackSig}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="TabsScreen"
          component={TabsScreen}
          options={{
            title:"Home"
          }}
        />    
              
      </Stack.Navigator>
    </NavigationContainer>
  );
}
