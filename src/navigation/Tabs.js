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
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBookBookmark, faCalendar, faGear, faHome, faMap } from "@fortawesome/free-solid-svg-icons";

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
          const tintColor = focused ? Color.lightblue : Color.grey;

          switch (route.name) {
            case "HomeSreens":
              return (
                <FontAwesomeIcon size={30} icon={faHome} color={tintColor} />
              );
            case "Maps":
              return (
                <FontAwesomeIcon size={30} icon={faMap} color={tintColor} />
              );
            case "Bookings":
              return (
                <FontAwesomeIcon size={30} icon={faBookBookmark} color={tintColor} />
              );
            case "Calendars":
              return (
                <FontAwesomeIcon size={30} icon={faCalendar} color={tintColor} />
              );
            case "Settings":
              return (
                <FontAwesomeIcon size={30} icon={faGear} color={tintColor} />
              );
          }
        },
      })}
    >
      <Tab.Screen name='HomeSreens' component={HomeSreens} options={{ headerShown: false }} />
      <Tab.Screen name='Maps' component={Maps} options={{ headerShown: false }} />
      <Tab.Screen name='Bookings' component={Bookings} options={{ headerShown: false }} />
      <Tab.Screen name='Calendars' component={Calendars} options={{ headerShown: false }} />
      <Tab.Screen name='Settings' component={Settings} options={{ headerShown: false }} />

    </Tab.Navigator>
  );
};

export default Tabs;
