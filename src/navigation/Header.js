import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Color from "../consts/Color";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Pressable } from "react-native";
import { Image } from "react-native";
import { Button } from "react-native";
const Hearder = () => {
  return (
    <View style={style.navheader}>
      <View>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>Xin Chào</Text>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              color: Color.red,
              left: 80,
            }}
          >
            {/* {account} */}
            Hello
          </Text>
        </View>
      </View>

      <TouchableOpacity>
        <Icon name="person-outline" size={45} color={Color.grey} />
      </TouchableOpacity>
      <Pressable
        style={{
          position: "absolute",
          height: 100,
          paddingTop: 10,
          borderRadius: 30,
          top: 100,
          left: 20,
          right: 20,
          width: "100%",
          borderWidth: 2,
          backgroundColor: Color.blue,
        }}
      >
        <View flexDirection="row">
        <Image
          source={require("../images/walletIcon.png")}
          style={{ height: 40, width: 40, left: 15, top: 5 }}
        />
        <View style={{height: 50, width: 100, left:195, top: 10,}}>
          <Button title="Nạp"  />
        </View>
        </View>
       
      </Pressable>
    </View>
  );
};

const style = StyleSheet.create({
  navheader: {
    marginTop: 20,
    paddingVertical: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: Color.blue,
  },
});
export default Hearder;
