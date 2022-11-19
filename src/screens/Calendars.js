import React from "react";
import { View } from "react-native";
import { Calendar } from "react-native-calendars";

const Calendars =({navigation}) =>{
   return(
    <View style={{flex:1}}>
        <Calendar style={{marginTop:30}}/>
    </View>
   );
};

export default Calendars;