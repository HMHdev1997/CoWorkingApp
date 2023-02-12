import React, { useCallback, useEffect, useState } from "react";
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
import CustomAvatar from "../custom_component/CustomAvatar";
import { showToast, isEmpty, TYPE_NOTI } from "../consts/common";
import { auth } from "../consts/firebase";
import { useDispatch, useSelector } from 'react-redux';
import { createUserInit } from "../redux/action/Actions";
import CustomDatePicker from "../custom_component/CustomDatePicker";
const Profile = () => {
  const navigation = useNavigation()
  const { userInfo } = useSelector((state) => state.userInfo)
  const { currentUser, phoneN } = useSelector((state) => state.user)

  const [pname, setPname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [id, setID] = useState("");

  const [loading, setLoading] = useState(false);

  const [avatarUri, setAvatarUri] = useState(null)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(userInfo?.DateOfBirth ? (new Date(userInfo?.DateOfBirth)) : new Date("2010-01-01"))
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date) => {
    setDate(date)
    hideDatePicker();
  };
  const dispatch = useDispatch()
  useEffect(() => {
    // console.log(2222, userInfo, phoneN, currentUser)
    // setDate(new Date(userInfo?.DateOfBirth))
    if (currentUser) {
      setPhone("0" + currentUser?.PhoneNumbers || "")
      setEmail(currentUser?.Email || "")
    }
    if (userInfo != null) {
      setPname(userInfo?.FullName || "")
      setGender(userInfo?.Gender || "")
      setAddress(userInfo?.Address || "")
      setID(userInfo?.IdentifierCode?.toString() || "")
      setDate(new Date(userInfo?.DateOfBirth))
    }
  }, [userInfo, phoneN, currentUser])

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
      isEditable: false,
    },
    {
      name: "Số điện thoại",
      value: phone,
      setValue: setPhone,
      isNotNull: true,
      isEditable: false,
    },
    {
      name: "Giới tính",
      value: gender,
      setValue: setGender,
      isNotNull: true,
    },
    {
      name: "Địa chỉ",
      value: address,
      setValue: setAddress,
      isNotNull: true,
    }
  ]

  const onUpdate = () => {
    if (isEmpty(pname)) {
      showToast(TYPE_NOTI.ERROR, null, "Vui lòng điền tên")
      return
    }

    // if (isEmpty(phone)) {
    //   showToast(TYPE_NOTI.ERROR, null, "Vui lòng điền Số điện thoại")
    //   return
    // }

    if (isEmpty(gender)) {
      showToast(TYPE_NOTI.ERROR, null, "Vui lòng chọn giới tính")
      return
    }

    if (isEmpty(address)) {
      showToast(TYPE_NOTI.ERROR, null, "Vui lòng điền địa chỉ")
      return
    }

    const userInfo = {
      ID: currentUser?.ID,
      FullName: pname,
      Gender: gender,
      PhoneNumbers: phone,
      Email: email,
      DateOfBirth: date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate(),
      Address: address,
      IdentifierCode: id,
      Point: userInfo?.Point,
      IdentifierCode: 2,
    }

    dispatch(createUserInit(userInfo))

  }

  const onChangeAvatarPress = () => {
    navigation.navigate("AddPhotoScreen", { onPhotoCallback })
  }

  const onPhotoCallback = useCallback((data) => {

    setAvatarUri(data);
  }, [])
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF", minHeight: "100%" }}>
      <View style={style.titleBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-ios" size={24} />
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center" }}>
        <CustomAvatar isEdit={true} size={100} source1={avatarUri ? avatarUri : ""} onPress={onChangeAvatarPress}></CustomAvatar>

      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: "5%" }}>
          {
            ProfileList.map((e, i) => <CustomInput
              key={i}
              isName={true}
              width='100%'
              name={e.name}
              value={e.value}
              setValue={e.setValue}
              isNotNullable={e.isNotNull}
              isEditable={e.isEditable} >

            </CustomInput>)
          }
          <CustomDatePicker
            isbday={true}
            width={"100%"} name='Ngày sinh'
            isVisible={isDatePickerVisible}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            setVisibility={setDatePickerVisibility}
            value={date}
          />

        </View>
      </ScrollView>
      <View style={{ marginBottom: "10%" }}>
        <CustomButton name={"Lưu thay đổi"} onPress={onUpdate}></CustomButton>
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
