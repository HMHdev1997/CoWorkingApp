import { View, Text, Pressable, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Color from "../consts/Color"
import { windowsHeight, windowsWith } from '../consts/common'
import { HeaderBar } from '../navigation/Header'
const CharingScreen = () => {
  return (
    <View style={{ minHeight: windowsHeight, backgroundColor: Color.white }}>
      <HeaderBar title={"Nap tien"}></HeaderBar>
      <View style={{
        position: "absolute",
        top: 100,
        width: "100%",
      }}>
        <View style={{
          justifyContent: "center",
          alignItems: "center",
          width: windowsWith,
          alignSelf: "center",
        }}>
          <Text style={{ fontSize: 24, fontWeight: "500", color: Color.lightblue }}>
            Chon phuong thuc thanh toan
          </Text>
        </View>
        <TouchableOpacity
          style={{
            marginTop: 10,
            marginHorizontal: "5%",
            paddingVertical: 2,
            borderRadius: 15,
            borderWidth: 2,
            borderColor: Color.lightblue,
            backgroundColor: Color.white,
            flexDirection: "row",
            width: "90%",
          }}
        >
          <View style={{ flex: 1 }}>
            <Image source={require("../../assets/MoMo_Logo.png")} style={{
              flex: 1,
              width: 50,
              height: 50,
              resizeMode: 'contain',
              alignSelf: "flex-start",

            }}></Image>
          </View>
          <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "500", color: Color.lightblue }}>
              Momo
            </Text>
          </View>

        </TouchableOpacity>
      </View>

    </View>
  )
}

export default CharingScreen