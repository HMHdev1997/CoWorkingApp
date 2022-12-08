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
} from "react-native";
import { showToast, TYPE_NOTI, isEmpty } from "../consts/common.js"
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../consts/firebase'
import { TextInput } from "react-native-gesture-handler";
import { store } from "../redux/store/store.js";
import { loginInit } from "../redux/action/Actions"
import { useDispatch, useSelector } from 'react-redux';
import { isNull } from "../consts/common.js";
const windowsHeight = Dimensions.get("window").height;
const windowsWith = Dimensions.get("window").width;

let loading = false
let error = ""
let unSubcribeStore = () => { }
const Login = ({ navigation }) => {
  const [getPasswordVisible, setPasswordVisible] = useState(false);
  const [getAccount, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch()

 
  const onLogin = () => {
    console.log('onLoginPress');
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
        unSubcribeStore();
      }
    })

    
    dispatch(loginInit(getAccount, password))
    setAccount("")
    setPassword("")
  }

  useEffect(() => {
    const unSubcribe = onAuthStateChanged(auth, user => {
      if (user) {
        showToast(TYPE_NOTI.SUCCESS, null, 'Đăng nhập thành công')
        if (isNull(user.displayName)) {
          navigation.replace("Profile")
        } else {
          navigation.replace("Home")
        }
      }
    })
    return () => {
      unSubcribe();
      unSubcribeStore();
    }
  }, [])

  return (
    <ImageBackground
      style={{ width: "100%", height: "100%" }}
      imageStyle={{ opacity: 0.6 }}
      source={require("../images/onboarding_image.jpg")}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ width: "100%", height: "100%" }} keyboardShouldPersistTaps='handled'>
          {/* Account & Password */}
          <View style={style.viewLogin}>
            {/*Account*/}
            <View style={style.txtAccount}>
              <Text style={{ fontWeight: "bold" }}>Tài Khoản: </Text>
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
                  <Image
                    source={require("../images/hide.png")}
                    style={{ height: "100%", width: "100%" }}
                  />
                ) : (
                  <Image
                    source={require("../images/view.png")}
                    style={{ height: "100%", width: "100%" }}
                  />
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
              <TouchableOpacity style={style.btnLogin}>
                <Text style={{}}>Đăng Ký</Text>
              </TouchableOpacity>
              {/* Forget Password */}
              <TouchableOpacity>
                <Text style={{ marginTop: 15, left: 10 }}>Quên Mật khẩu? </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const style = StyleSheet.create({
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
    backgroundColor: "#87ceeb",
  },
});

export default Login;
