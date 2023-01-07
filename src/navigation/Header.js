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
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBarcode, faBookBookmark, faBookJournalWhills, faChartBar, faChartColumn, faCheckCircle, faCheckToSlot, faPerson, faPersonRifle, faQrcode, faUsd, faUser, faUserCheck, faUserCircle, faWallet } from "@fortawesome/free-solid-svg-icons";
import CustomButton from "../custom_component/CustomButton";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../consts/firebase";
import { useSelector } from "react-redux";
const Hearder = ({ isShowFunction, isShowMassage }) => {
  const navigation = useNavigation()
  const {currentUser} = useSelector(state => state.user)
  return (
    <View >
      <View style={style.navheader}>

        <View >
          {isShowMassage && <View><Text style={{ fontSize: 30, fontWeight: "bold", left: "5%", }}>Xin Chào</Text>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  color: Color.lightblue,
                  left: "5%",
                }}
              >
                {/* {account} */}
                Hello
              </Text>
            </View>
          </View>
          }

        </View>
        <TouchableOpacity style={{ paddingTop: "5%" }} onPress={() => {
          if (currentUser) {
            navigation.navigate("Profile")
          } else {
            navigation.navigate("LoginScreen")
          }
        }}>
          <FontAwesomeIcon style={style.icon} size={50} icon={faUserCircle} color={Color.grey} />
        </TouchableOpacity>
      </View>

      <Pressable
        style={{
          marginHorizontal: "5%",
          paddingVertical: 10,
          borderRadius: 15,
          borderWidth: 2,
          backgroundColor: Color.white,
        }}
      >
        <View flexDirection="row">

          <View style={{ flex: 1, paddingLeft: "5%" }}>
            <View flexDirection="column">
              <View flexDirection="row">
                <FontAwesomeIcon style={style.icon} size={50} icon={faWallet} color={Color.lightblue} />
                <View style={{ paddingLeft: "5%", alignItems: "center", justifyContent: "center" }}>
                  <Text style={{ fontSize: 20, fontWeight: "800" }}>0P</Text>
                </View>
              </View>
              <Text>Sử dụng tới 31/12/2022</Text>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: "row-reverse", right: "5%" }}>
            <CustomButton name={"Nạp"} onPress={() => { }} />
          </View>

        </View>
        {isShowFunction &&
          <View flexDirection="row" style={{ marginTop: 10 }}>
            <TouchableOpacity style={{ flex: 1, alignItems: "center" }}>
              <FontAwesomeIcon style={{ ...style.icon }} size={30} icon={faBarcode} color={Color.lightblue} />
              <Text>Nhập mã</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, alignItems: "center" }} onPress={()=>{navigation.navigate("BookingHistoryScreen")}}>
              <FontAwesomeIcon style={style.icon} size={30} icon={faChartColumn} color={Color.lightblue} />
              <Text>Lịch sử</Text>

            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, alignItems: "center" }}>
              <FontAwesomeIcon style={style.icon} size={30} icon={faUserCheck} color={Color.lightblue} />
              <Text>Check-in nhanh</Text>

            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, alignItems: "center" }} onPress={()=>{navigation.navigate("Bookings")}}>
              <FontAwesomeIcon style={style.icon} size={30} icon={faBookBookmark} color={Color.lightblue} />
              <Text>Booking</Text>
            </TouchableOpacity>
          </View>
        }

      </Pressable>
    </View>



  );
};

const style = StyleSheet.create({
  navheader: {
    marginTop: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    color: Color.red,
    // backgroundColor: Color.blue,
  },
  icon: {
    marginLeft: "5%"
  }
});
export default Hearder;
