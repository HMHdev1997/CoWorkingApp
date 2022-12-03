import { faBarChart, faBlenderPhone, faBook, faGift, faInfo, faShield, faSignOut, faStar, faUser } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Text, View, SafeAreaView, ScrollView } from "react-native";
import CustomSetting from "../custom_component/CustomSetting";
import Hearder from "../navigation/Header";

const SettingsList = [
    {
        name: "Giới thiệu",
        icon: faInfo
    },
    {
        name: "Hướng dẫn sử dụng",
        icon: faBook
    },
    {
        name: "Hỗ trợ",
        icon: faBlenderPhone
    },
    {
        name: "Thông tin cá nhân",
        icon: faUser
    },
    {
        name: "Lịch sử point",
        icon: faBarChart
    },
    {
        name: "Thay đổi mật khẩu",
        icon: faShield
    },
    {
        name: "Chia sẻ nhận quà",
        icon: faGift
    },
    {
        name: "Đánh giá",
        icon: faStar
    },
    {
        name: "Đăng xuất",
        icon: faSignOut
    },

]

const Settings = () => {
    return (
        <View>
            <Hearder />
            <SafeAreaView style={{marginTop: "10%"}}>
                <ScrollView showsVerticalScrollIndicator={false} >
                    {SettingsList.map((s, i) => <CustomSetting key={i} text={s.name} icon={s.icon} />)}
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
export default Settings;