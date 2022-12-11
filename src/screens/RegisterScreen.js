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
import { registerInit } from "../redux/action/Actions"
import { useDispatch, useSelector } from 'react-redux';
import { isNull } from "../consts/common.js";
import Color from "../consts/Color"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEye, faEyeDropper, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const windowsHeight = Dimensions.get("window").height;
const windowsWith = Dimensions.get("window").width;

let loading = false
let error = ""
let unSubcribeStore = () => { }
const RegisterScreen = ({ navigation, route }) => {

    const [getPasswordVisible, setPasswordVisible] = useState(false);
    const [getRePasswordVisible, setRePasswordVisible] = useState(false);

    const [getAccount, setAccount] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch()

    const onRegister = () => {

        if (isEmpty(password) || isEmpty(rePassword) || isEmpty(getAccount)) {
            showToast(TYPE_NOTI.ERROR, null, "Vui lòng điền hết thông tin")
            return
        }
        if (password != rePassword) {
            showToast(TYPE_NOTI.ERROR, null, "Mật khẩu không khớp")
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
        const trimEmail = getAccount.split(" ").join("")
        const trimPassword = password.split(" ").join("")
        dispatch(registerInit(trimEmail, trimPassword))
    }


    useEffect(() => {
        const unSubcribe = onAuthStateChanged(auth, user => {
          if (user) {
            showToast(TYPE_NOTI.SUCCESS, null, 'Đăng kí thành công')
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
                                <FontAwesomeIcon size={25} icon={faEyeSlash} color={Color.dark}></FontAwesomeIcon>
                            ) : (
                                <FontAwesomeIcon size={25} icon={faEye} color={Color.dark}></FontAwesomeIcon>
                            )}
                        </TouchableOpacity>
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
                            secureTextEntry={getRePasswordVisible ? false : true}
                            value={rePassword}
                            onChangeText={setRePassword}
                        />
                        <TouchableOpacity
                            style={style.imagePassword}
                            onPress={() => {
                                setRePasswordVisible(!getRePasswordVisible);
                            }}
                        >
                            {getRePasswordVisible ? (
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
                            onPress={onRegister}
                        >
                            <Text style={{}}>Đăng Ký</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.btnLogin} onPress={() => {
                            navigation.replace("LoginScreen")
                        }}>
                            <Text style={{}}>Đăng Nhập</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

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
        backgroundColor: Color.lightblue,
    },
});

export default RegisterScreen