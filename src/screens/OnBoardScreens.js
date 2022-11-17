import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
} from "react-native";
// import { Colors } from "react-native-webview";
import Color from "../consts/Color";

const OnBoardScrenns = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent backgroundColor="rgba(0,0,0,0)" />
      <ImageBackground
        style={{width:'100%', height: '100%'}}
        imageStyle={{opacity:0.6}}
        source={require("../images/onboarding_image.jpg")}
      >
        <View style={style.dateils}>
          <Text
            style={{ fontSize: 30, fontWeghit: "bold" }}
          >
            Working Space
          </Text>
          <Text
            style={{  fontSize: 20, fontWeghit: "bold" }}
          >
            Working with us
          </Text>
          <Text style={{ lineHeight: 20, marginTop: 15 }}>
            Chia sẻ không gian làm việc chung
          </Text>
          <TouchableOpacity activeOpacity={0.7} onPress={()=>navigation.navigate('HomeDrawer')}>
            <View style={style.btn}>
              <Text style={{ fontWeight: "bold" }}>Get Started</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};


const style = StyleSheet.create({
  dateils: {
    height: "50%",
    bottom: 0,
    position: "absolute",
    paddingHorizontal: 40,
  },
  btn: {
    height: 50,
    width: 120,
    backgroundColor: Color.blue,
    marginTop: 20,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default OnBoardScrenns;
