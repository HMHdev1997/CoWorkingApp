import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-navigation";
import Icon from "react-native-vector-icons/MaterialIcons";
import Color from "../consts/Color";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAdd, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import CustomInput from "../custom_component/CustomInput";
import CustomButton from "../custom_component/CustomButton";



const Profile = () => {
  const navigation = useNavigation()
  const [pname, setPname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bday, setBDay] = useState("");
  const [gender, setGender] = useState("");


  const ProfileList = [
    {
      name: "Họ và tên",
      value: pname,
      setValue: setPname,
      isNotNull: true,
    },
    {
      name: "Email",
      value: email,
      setValue: setEmail, 
      isNotNull: true,
    },
    {
      name: "Số điện thoại",
      value: phone,
      setValue: setPhone,
      isNotNull: true,
    },
    {
      name: "Ngày sinh",
      value: bday,
      setValue: setBDay,
      isNotNull: true,
    },
    {
      name: "Giới tính",
      value: gender,
      setValue: setGender,
      isNotNull: true,
    },
  ]
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={style.titleBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-ios" size={24} />
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center" }}>
        <FontAwesomeIcon style={style.icon} size={150} icon={faUserCircle} color={Color.grey} />
      </View>
      <View style={style.add}>
        <FontAwesomeIcon style={style.icon} size={20} icon={faAdd} color={Color.grey} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: "5%" }}>
          {
            ProfileList.map((e) => <CustomInput width='90%' name={e.name} value={e.value} setValue={e.setValue} isNotNullable={e.isNotNull}></CustomInput>)
          }

        </View>
      </ScrollView>
      <View style={{marginBottom: "10%"}}>
        <CustomButton name={"Lưu thay đổi"}></CustomButton>
      </View>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
    marginHorizontal: 20,
  },

  image: {
    flex: 1,
    alignItems: "center",
    width: 200,
    height: 200,
    borderRadius: 20,
    justifyContent: "center",
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: 150,
    right: 100,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Profile;
