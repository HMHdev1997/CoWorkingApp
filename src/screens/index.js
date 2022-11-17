import React, { Component } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "./Login";
import HomeSreens from "./HomeSreens";
import OnBoardScrenns from "./OnBoardScreens";
import Profile from "./Profile";
// import Maps from "./Maps";
import 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const HomeTabs = () =>{
  return(
    <Tab.Navigator initialRouteName="HomeSreens" screenOptions={{headerShown:false}}>
        <Tab.Screen name="HomeSreens" component={HomeSreens} />
        {/* <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Login" component={Login} />         */}
      </Tab.Navigator>  
  );
}


const HomeDrawer =()=>{
  return(
      <Drawer.Navigator initialRouteName="HomeSreens" screenOptions={{headerShown:false}}>
        <Drawer.Screen name="HomeSreens" component={HomeSreens} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Login" component={Login} />
        {/* <Drawer.Screen name="Maps" component={Maps} /> */}
        
      </Drawer.Navigator>  
  ); 
}

const RootComponent = ({ navigation }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OnBoard" screenOptions={{headerShown:false}}>
        <Stack.Screen name="OnBoard" component={OnBoardScrenns} />       
        <Stack.Screen name ="HomeDrawer" component={HomeDrawer}/>
        {/* <Stack.Screen  name="HomeTabs" component={HomeTabs} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default RootComponent;
