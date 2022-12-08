import React, { Component } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "./Login";
import DetailsScreen from "./DetailsScreen";

import OnBoardScrenns from "./OnBoardScreens";
import Profile from "./Profile";

import Tabs from "../navigation/Tabs";
import 'react-native-gesture-handler';
import AddPhotoScreen from "./AddPhotoScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



const RootComponent = ({ navigation }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OnBoard" screenOptions={{headerShown:false}}>
        <Stack.Screen name="OnBoard" component={OnBoardScrenns}  />       
        <Stack.Screen name="Home" component={Tabs} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="AddPhotoScreen" key='AddPhotoScreen' component={AddPhotoScreen} />
        <Stack.Screen name ="DetailsScreen" component={DetailsScreen} />
        <Stack.Screen name ="LoginScreen" component={Login} />
      </Stack.Navigator> 
    </NavigationContainer>
  );
};
export default RootComponent;
