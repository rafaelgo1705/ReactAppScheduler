import * as React from 'react';

import 'react-native-gesture-handler';
import { NavigationContainer, useLinkProps } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';
import colors from './src/utility/colors';

import LoadScreen from './src/view/LoadScreen';
import Login from './src/view/Login';
import Home from './src/view/Home';
import Register from './src/view/Register';
import RegisterSchedule from './src/view/RegisterSchedule';
import Account from './src/view/Account';
import UpdateSchedule from './src/view/UpdateSchedule';

const Stack = createStackNavigator();
const StackAuth = createStackNavigator();
const Tab = createBottomTabNavigator();
const StackSchedule = createStackNavigator();

const StackSche = () => (
  <StackSchedule.Navigator>
    <StackSchedule.Screen 
      name="Home" 
      component={Home}
      options={{
        title: "Agenda",
        headerTitleAlign: 'center'
      }}
    />
    <StackSchedule.Screen 
      name="RegisterSchedule" 
      component={RegisterSchedule} 
      options={{
        title: "Nova Atividade"
        }}
      />
    <StackSchedule.Screen 
      name="UpdateSchedule" 
      component={UpdateSchedule} 
      options={{
        title: "Editar Atividade"
        }}
      />
  </StackSchedule.Navigator>
);

const StackSig = () => (
  <StackAuth.Navigator headerMode="none">
    <StackAuth.Screen name="Login" component={Login} />
    <StackAuth.Screen name="Register" component={Register} />
  </StackAuth.Navigator>
);

const TabsScreen = () => (
  <Tab.Navigator 
    initialRouteName="StackSche" 
    tabBarOptions={{ 
      activeTintColor: colors.colorBlueLogin,
      inactiveTintColor: colors.colorDisabled
    }}
    >
    <Tab.Screen 
      name="StackSche" 
      component={StackSche} 
      options={{
        title:"Agenda",
        tabBarIcon:({focused}) => (<Ionicons name="md-clipboard" size={24} color={focused ? colors.colorBlueLogin : colors.colorDisabled} />)
      }}/>
    <Tab.Screen 
      name="Account" 
      component={Account} 
      options={{
        title:"Conta",
        headerTitleAlign: 'center',
        tabBarIcon:({focused}) => (<Ionicons name="md-contact" size={24} color={focused ? colors.colorBlueLogin : colors.colorDisabled} />)
      }} />
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
            headerShown:false,
          }}
        />    
              
      </Stack.Navigator>
    </NavigationContainer>
  );
}
