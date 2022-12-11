import { faBarChart, faBlenderPhone, faBook, faGift, faInfo, faShield, faSignOut, faStar, faUser } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Text, View, SafeAreaView, ScrollView } from "react-native";
import CustomSetting from "../custom_component/CustomSetting";
import Hearder from "../navigation/Header";
import { signOut } from 'firebase/auth';
import { logoutSuccess } from "../redux/action/Actions";
import { useDispatch } from 'react-redux';
import { showToast, TYPE_NOTI } from '../consts/common';
import { auth } from "../consts/firebase";
import { windowsHeight } from "../consts/common";


const Settings = ({ navigation }) => {
    const dispatch = useDispatch()

    const onLogout = async () => {
        signOut(auth)
            .then(() => {
                dispatch(logoutSuccess())
                showToast(TYPE_NOTI.SUCCESS, null, 'Đăng xuất thành công')
                navigation.navigate("LoginScreen")
            })
            .catch(error => {
                console.log('[ERROR][Logout Fail] ' + error)
                showToast(TYPE_NOTI.ERROR, null, 'Đăng xuất thất bại')
            })
    }
    const SettingsList = [
        {
            name: "Giới thiệu",
            icon: faInfo,
            onPress: () => { }
        },
        {
            name: "Hướng dẫn sử dụng",
            icon: faBook,
            onPress: () => { }
        },
        {
            name: "Hỗ trợ",
            icon: faBlenderPhone,
            onPress: () => { }
        },
        {
            name: "Thông tin cá nhân",
            icon: faUser,
            onPress: () => { }
        },
        {
            name: "Lịch sử point",
            icon: faBarChart,
            onPress: () => { }
        },
        {
            name: "Thay đổi mật khẩu",
            icon: faShield,
            onPress: () => { }
        },
        {
            name: "Chia sẻ nhận quà",
            icon: faGift,
            onPress: () => { }
        },
        {
            name: "Đánh giá",
            icon: faStar,
            onPress: () => { }
        },
        {
            name: "Đăng xuất",
            icon: faSignOut,
            onPress: onLogout
        },

    ]

    return (
        <View>
            <Hearder />
            <SafeAreaView style={{ marginTop: "10%" }}>
                <ScrollView style={{maxHeight: "99%" }}>
                    {SettingsList.map((s, i) => <CustomSetting key={i} text={s.name} icon={s.icon} onPress={s.onPress} />)}
                </ScrollView>

            </SafeAreaView>
        </View>
    );
}
export default Settings;