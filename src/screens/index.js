import React, { Component } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "./Login";

import OnBoardScrenns from "./OnBoardScreens";
import Tabs from "../navigation/Tabs";
import 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



const RootComponent = ({ navigation }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OnBoard" screenOptions={{headerShown:false}}>
        <Stack.Screen name="OnBoard" component={OnBoardScrenns}  />       
        <Stack.Screen name="Home" component={Tabs} />
      </Stack.Navigator> 
    </NavigationContainer>
  );
};
export default RootComponent;
