import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen  from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import AddDishScreen from './screens/AddDishScreen';
import Filterscreen from './screens/Filtercreen';
import ManageMenu from './screens/ManageMenu';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="AddDish" component={AddDishScreen} />
        <Stack.Screen name="Filterscreen" component={Filterscreen} />
        <Stack.Screen name="ManageMenu" component={ManageMenu} />

      </Stack.Navigator>
    </NavigationContainer>
  );}
