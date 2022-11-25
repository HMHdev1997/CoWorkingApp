import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Color from "../consts/Color";
import HomeSreens from "../screens/HomeSreens";
import Settings from "../screens/Settings";
import Maps from "../screens/Maps";
import Bookings from "../screens/Bookings";
import Calendars from "../screens/Calendars";
import { ColorSpace } from "react-native-reanimated";

const Tab = createBottomTabNavigator();

const tabOptions = {

  showLabel: false,
  style: {
    shadowColor: "#000",
    ShadowOfSet: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,
    elevation: 21,
  },
};

const Tabs = () => {
  return (
    <Tab.Navigator
      tabOptions={tabOptions}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const tintColor = focused ? Color.primary : Color.grey;

          switch (route.name) {
            case "HomeSreens":
              return (
                <Image
                  source={require('../images/homeIcon.png')}
                  resizeMode="contain"
                  style={{ tintColor: tintColor, height: 35, width: 35 }}
                />
              );
            case "Maps":
              return (
                <Image
                  source={require("../images/mapIcon.png")}
                  resizeMode="contain"
                  style={{ tintColor: tintColor, height: 35, width: 35 }}
                />
              );
              case "Bookings":
                return (
                  <Image
                    source={require("../images/addIcon.png")}
                    resizeMode="contain"
                    style={{ tintColor: tintColor, height: 35, width: 35 }}
                  />
                );
            case "Calendars":
              return (
                <Image
                  source={require("../images/calendarIcon.png")}
                  resizeMode="contain"
                  style={{ tintColor: tintColor, height: 35, width: 35 }}
                />
              );
            case "Settings":
              return (
                <Image
                  source={require("../images/settingsIcon.png")}
                  resizeMode="contain"
                  style={{ tintColor: tintColor, height: 35, width: 35 }}
                />
              );
          }
        },
      })}
    >
        <Tab.Screen name ='HomeSreens' component={HomeSreens} options={{headerShown: false}} />
        <Tab.Screen name ='Maps' component={Maps}  options={{headerShown: false}}/>
        <Tab.Screen name ='Bookings' component={Bookings}  options={{headerShown: false}}/>
        <Tab.Screen name ='Calendars' component={Calendars}  options={{headerShown: false}}/>
        <Tab.Screen name ='Settings' component={Settings}  options={{headerShown: false}}/>
             

       
    </Tab.Navigator>
  );
};

export default Tabs;
