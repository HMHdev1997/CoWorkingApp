import React, { useEffect, useState } from "react";
import {
    ImageBackground,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Alert
} from "react-native";
import Color from "../consts/Color";
import Icon from "react-native-vector-icons/MaterialIcons";
import CustomButton from "../custom_component/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import CustomLine from "../custom_component/CustomLine";
import CustomDatePicker from "../custom_component/CustomDatePicker";
import { isIOS } from "../custom_component/CustomAvatar";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { showToast, TYPE_NOTI, windowsWith } from "../consts/common";
import { bookingInit } from "../redux/action/Actions";
import CustomCobobox from "../custom_component/CustomCobobox";
import CustomNote from "../custom_component/CustomNote";
import ImageSwipe from "../custom_component/ImageSwipe";
const heightScreen = Dimensions.get("screen").height;

const maxLineC = 10
const lineHeight = 14

const Header = ({ navigation }) => {
    return (
        <View style={{
            height: 100,
            backgroundColor: Color.white,
            borderColor: Color.grey,
            position: "absolute",
            top: 20,
            width: "100%",
            flexDirection: "row",
            justifyContent: "center"
        }}>

            <View style={{ left: 20, top: 20, position: "absolute", }}>
                <Icon
                    name="arrow-back-ios"
                    size={28}
                    color={Color.lightblue}
                    onPress={() => { navigation.goBack() }}
                />
            </View>
            <View style={{}}>
                <Text style={{ fontSize: 20, fontWeight: "600", color: Color.lightblue }}>Đặt phòng</Text>
            </View>
        </View>
    )
}

const Customer = () => {
    const { currentUser } = useSelector((state) => state.user)
    return (
        <View style={{ marginLeft: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 10 }}>Thông tin khách hàng</Text>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text style={{ fontSize: 14, fontWeight: "400", alignItems: "flex-start", flex: 1 }}>Tên</Text>
                <Text style={{ fontSize: 14, fontWeight: "400", alignItems: "flex-end", flex: 1 }}>{currentUser?.Name}</Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text style={{ fontSize: 14, fontWeight: "400", alignItems: "flex-start", flex: 1 }}>Số điện thoại</Text>
                <Text style={{ fontSize: 14, fontWeight: "400", alignItems: "flex-end", flex: 1 }}>{currentUser?.PhoneNumbers ? "0" + currentUser?.PhoneNumbers : ""}</Text>
            </View>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Text style={{ fontSize: 14, fontWeight: "400", alignItems: "flex-start", flex: 1 }}>Email</Text>
                <Text style={{ fontSize: 14, fontWeight: "400", alignItems: "flex-end", flex: 1 }}>{currentUser?.Email}</Text>
            </View>
        </View>
    )
}
const nSeatArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
const OrderScreen = ({ navigation, route }) => {
    const item = route.params;
    const [isShowMore, setShowMore] = useState(true)
    const [maxLine, setMaxLine] = useState(3)
    const { currentUser } = useSelector(state => state.user)
    const { userInfo } = useSelector(state => state.userInfo)
    const dispatch = useDispatch()
    const [date, setDate] = useState(new Date())
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [nSeat, setNSeat] = useState(0)
    const [seatPosition, setSeatPosition] = useState([])
    const [note, setNote] = useState("")
    const onSelectNSeat = (index, option) => {
        setNSeat(nSeatArr[index])
    }
    const handleConfirm = (date) => {
        setDate(date)
        hideDatePicker();
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const [endDate, setEndDate] = useState(new Date())
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
    const handleEndDateConfirm = (date) => {
        setEndDate(date)
        hideEndDatePicker();
    };

    const hideEndDatePicker = () => {
        setEndDatePickerVisibility(false);
    };
    const onBooking = () => {
        navigation.navigate("BillScreen", {
            data: {
                OfficeId: item.ID,
                UserId: currentUser.ID,
                NameOffice: item.NameOffice,
                Address: item.Address,
                startTime: date.toUTCString(),
                endTime: endDate.toUTCString(),
                price: item.Discount + nSeat,
                nSeat: nSeat,
                seatPosition: seatPosition,
                note: note,
            }
        })
        // dispatch(
        //     bookingInit(
        //         item.ID,
        //         currentUser.ID,
        //         date.toUTCString(),
        //         endDate.toUTCString(),
        //         item.Discount + nSeat,
        //         nSeat,
        //         seatPosition,
        //         note
        //     ))
    }

    useEffect(() => {
        if (currentUser) {
            // navigation.navigate("Profile")
        } else {
            showToast(TYPE_NOTI.ERROR, null, "Bạn phải đăng nhập trước");
            navigation.replace("LoginScreen")
        }
    }, [])

    const [showBox, setShowBox] = useState(true);

    const showConfirmDialog = () => {
        return Alert.alert(
            "Bạn muốn đặt phòng?",
            `Bạn muốn đặt phòng ${item.NameOffice} với ${nSeat} chỗ ngồi\nGiá tổng cộng: ${item.Discount + nSeat} P`,
            [
                // The "Yes" button
                {
                    text: "Đặt phòng",
                    onPress: () => {
                        onBooking()
                        setShowBox(false);
                    },
                },
                // The "No" button
                // Does nothing but dismiss the dialog when tapped
                {
                    text: "Hủy",
                },
            ]
        );
    }
    const onSelectionSeat = () => {
        navigation.navigate("SeatBookingScreen", {
            callback: (arr)=>{
                setNSeat(arr?.length?arr.length:0)
                setSeatPosition(arr?arr:[])
            }
        })
    }
    return (
        <View style={{ minHeight: heightScreen, backgroundColor: Color.white }}>
            <Header navigation={navigation} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    backgroundColor: Color.white,
                    paddingBottom: 20,
                }}
                style={{ top: 100 }}
            >


                <View style={{}}>
                    {/* <Customer /> */}
                    {/* <CustomLine style={{ width: "90%", marginTop: 10 }} /> */}


                    <View style={{ marginTop: 20, paddingHorizontal: 0.05*windowsWith }}>
                        {/* <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 10 }}>Dịch vụ</Text> */}

                        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.NameOffice}</Text>
                        <Text
                            style={{
                                fontSize: 12,
                                fontWeight: "400",
                                color: Color.grey,
                                marginVertical: 10,
                            }}
                        >
                            {item.Address}
                        </Text>
                        <ImageSwipe imageArr={item.ImageList}></ImageSwipe>

                        
                        <View style={{ flexDirection: "row", marginTop: 20  }}>
                            <View style={{flex: 1, justifyContent: "center"}}>
                                <Text style={{ color: Color.lightblue }}>Số ghế đặt: {nSeat}</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: "flex-end" }} >
                                <CustomButton name={"Chọn ghế"} onPress={onSelectionSeat}></CustomButton>
                            </View>
                        </View>

                        <CustomDatePicker
                            width={"100%"} name='Ngày đặt'
                            isVisible={isDatePickerVisible}
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                            setVisibility={setDatePickerVisibility}
                            value={date}
                        />
                        <CustomDatePicker
                            width={"100%"} name='Ngày kết thúc'
                            isVisible={isEndDatePickerVisible}
                            onConfirm={handleEndDateConfirm}
                            onCancel={hideEndDatePicker}
                            setVisibility={setEndDatePickerVisibility}
                            value={endDate}
                        />
                        <CustomNote value={note} setValue={setNote} />
                        <View
                            style={{
                                marginBottom: 500
                            }}
                        >

                        </View>


                    </View>
                </View>
                {/* {showBox && <View style={style.box}></View>} */}

            </ScrollView>
            <View style={style.cardDetails}>
                <View style={{ flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 5 }}> Tổng cộng:{`\t`} {item.Discount + nSeat} P</Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 5 }}> Số dư:{`\t`} {userInfo?.Point || 0} P</Text>
                </View>

                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <CustomButton name={"Thanh toán"} onPress={onBooking} />
                </View>
            </View>
        </View>
    );
};

const style = StyleSheet.create({
    btn: {
        height: 55,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
        backgroundColor: Color.primary,
        marginHorizontal: 20,
        borderRadius: 10,
    },

    priceTag: {
        height: 40,
        alignItems: "center",
        marginLeft: 40,
        paddingLeft: 20,
        flex: 1,
        backgroundColor: Color.secondary,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        flexDirection: "row",
    },
    iconContainer: {
        position: "absolute",
        height: 60,
        width: 60,
        backgroundColor: Color.primary,
        top: -30,
        right: 20,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    headerImage: {
        marginTop: 20,
        height: 200,
        borderRadius: 40,
        overflow: "hidden",
    },
    header: {
        marginTop: 60,
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 20,
        justifyContent: "space-between",
    },
    cardDetails: {
        height: isIOS ? 200 : 100,
        borderRadius: 25,
        backgroundColor: Color.white,
        borderWidth: 0.5,
        borderColor: Color.grey,
        position: "absolute",
        bottom: 0,
        width: "100%",
        flexDirection: "row"
    },
    box: {
        width: 300,
        height: 300,
        backgroundColor: "red",
        marginBottom: 30,
    },
    text: {
        fontSize: 30,
    },
});

export default OrderScreen;
