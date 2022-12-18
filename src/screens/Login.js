import React, { Component, useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Contaier,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { showToast, TYPE_NOTI, isEmpty } from "../consts/common.js"
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../consts/firebase'
import { store } from "../redux/store/store.js";
import { loginInit } from "../redux/action/Actions"
import { useDispatch, useSelector } from 'react-redux';
import { isNull } from "../consts/common.js";
import Color from "../consts/Color"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const windowsHeight = Dimensions.get("window").height;
const windowsWith = Dimensions.get("window").width;

let loading = false
let error = ""
let unSubcribeStore = () => { }

const CategoryList = ({selectedCategoryIndex, setSelectedCategoryIndex}) => {
  const category = ["Số điện thoại", "Email"];
  
  return (
    <View style={style.categoryListContainer}>
      {category.map((item, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.8}
          onPress={() => setSelectedCategoryIndex(index)}
        >
          <View>
            <Text
              style={{
                ...style.categoryListText,
                color:
                  selectedCategoryIndex == index ? Color.primary : Color.grey,
              }}
            >
              {item}
            </Text>
            {selectedCategoryIndex == index && (
              <View
              ></View>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const Login = ({ navigation }) => {
  const [getPasswordVisible, setPasswordVisible] = useState(false);
  const [getAccount, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch()
  const currentUser = useSelector((state) => state.user)

  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);

  const onLogin = () => {
    if (isEmpty(getAccount) || isEmpty(password)) {
      showToast(TYPE_NOTI.ERROR, null, "Vui lòng điền hết thông tin");
      return
    }
    unSubcribeStore = store.subscribe(() => {
      loading = store.getState().user.loading
      error = store.getState().user.error;

      if (error && !loading) {
        showToast(TYPE_NOTI.ERROR, null, error);
      }
      setIsLoading(loading)
      if (!loading) {
        if (store.getState().user.currentUser) {
          if (error) {
            showToast(TYPE_NOTI.ERROR, null, error);
          } else {
            navigation.replace("Profile")
            showToast(TYPE_NOTI.SUCCESS, null, 'Đăng nhập thành công')
          }
        }
        unSubcribeStore();
      }
    })

    const isPhone = selectedCategoryIndex == 0
    dispatch(loginInit(getAccount, password, isPhone))
    // setAccount("")
    setPassword("")
  }

  useEffect(() => {
    
    return () => {
      // unSubcribe();
      unSubcribeStore();
    }
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ width: "100%", height: "100%" }} keyboardShouldPersistTaps='handled'>
        {/* Account & Password */}
        <View style={style.viewLogin}>
          {/*Account*/}
          <View>
            <CategoryList selectedCategoryIndex={selectedCategoryIndex} setSelectedCategoryIndex={setSelectedCategoryIndex}></CategoryList>
          </View>
          <View style={style.txtAccount}>
            <Text style={{ fontWeight: "bold" }}>{selectedCategoryIndex==0?"Đ. thoại":"Email"}: </Text>
            <TextInput
              style={{ height: "100%", width: "70%", borderBottomWidth: 1 }}
              value={getAccount}
              onChangeText={setAccount}
            />
          </View>
          <View style={style.txtPassword}>
            <Text style={{ fontWeight: "bold" }}>Mật Khẩu: </Text>
            <TextInput
              style={{
                height: "100%",
                width: "70%",
                borderBottomWidth: 1,
                paddingRight: 45,
              }}
              secureTextEntry={getPasswordVisible ? false : true}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={style.imagePassword}
              onPress={() => {
                setPasswordVisible(!getPasswordVisible);
              }}
            >
              {getPasswordVisible ? (
                <FontAwesomeIcon size={25} icon={faEyeSlash} color={Color.dark}></FontAwesomeIcon>
              ) : (
                <FontAwesomeIcon size={25} icon={faEye} color={Color.dark}></FontAwesomeIcon>
              )}
            </TouchableOpacity>
          </View>

          {/* btn login & register */}
          <View style={style.Login}>
            {/* login */}
            <TouchableOpacity
              style={style.btnLogin}
              onPress={onLogin}
            >
              <Text style={{}}>Đăng Nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.btnLogin} onPress={() => {
              navigation.replace("RegisterScreen")
            }}>
              <Text style={{}}>Đăng Ký</Text>
            </TouchableOpacity>
            {/* Forget Password */}
            <TouchableOpacity>
              <Text style={{ marginTop: 15, left: 10 }} onPress={() => { }}>Quên Mật khẩu? </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  categoryListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginLeft: 0,
    marginTop: 10,
  },
  categoryListText: {
    paddingHorizontal: 20,
    fontSize: 17,
    alignItems: "center",
    fontWeight: "bold",
  },
  viewLogin: {
    height: "15%",
    width: "100%",
    marginTop: 0.4 * windowsHeight,
    alignItems: "center",
  },
  txtAccount: {
    width: "80%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 15,
  },
  txtPassword: {
    width: "80%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 15,
  },
  imagePassword: {
    width: 30,
    height: "70%",
    marginRight: 15,
    position: "absolute",
    right: 1,
  },

  Login: {
    width: "100%",
    height: 250,
    marginTop: 0.03 * windowsHeight,
    alignItems: "center",
  },
  btnLogin: {
    width: "60%",
    height: 45,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 50,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.lightblue,
  },
});

export default Login;
