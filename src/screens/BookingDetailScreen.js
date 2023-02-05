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
} from "react-native";
import Color from "../consts/Color";
import Icon from "react-native-vector-icons/MaterialIcons";
import CustomButton from "../custom_component/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import CustomLine from "../custom_component/CustomLine";
import CustomDatePicker from "../custom_component/CustomDatePicker";
import { isIOS } from "../custom_component/CustomAvatar";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { showToast, TYPE_NOTI } from "../consts/common";
import { bookingInit } from "../redux/action/Actions";
import CustomCobobox from "../custom_component/CustomCobobox";
import CustomNote from "../custom_component/CustomNote";
import { API } from "../consts/request";
import { async } from "@firebase/util";
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
                <Text style={{ fontSize: 20, fontWeight: "600", color: Color.lightblue }}>Chi tiết đặt phòng</Text>
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

const nSeatArr = [1, 2, 3]
const defaultData = {
    "BookingId": -1,
    "Name": null,
    "Number": 0,
    "Price": 0,
    "Note": "",
    "StartTime": "2023-02-05T05:09:03",
    "EndTime": "2023-02-05T05:09:03",
    "PaymentStatus": 0,
    "CreaetDate": null,
    "CreateBy": null
}
const getBookingDetail = async (id) => {

    try {
        const url = API.Host + API.BookingDetail + `?id=${id}`
        const res = await fetch(url, { method: "get" })
        if (res.status == 200) {
            const data = await res.json()
            return data
        } else {
            throw new Error(`Lỗi! Vui lòng điền lại thông tin khác`);
        }



    } catch (err) {
        showToast(TYPE_NOTI.ERROR, null, "Get Detail Booking không thành công")

        console.log('[ERROR][BookingDetail] ' + err.message)
        return defaultData
    }

}

const BookingDetailScreen = ({ navigation, route }) => {
    const data = route.params;
    const item = data.office
    const booking = data.booking
    const [bookingDetail, setBookingDetail] = useState(defaultData)

    // console.log(bookingDetail)
    const [isShowMore, setShowMore] = useState(true)
    const [maxLine, setMaxLine] = useState(3)
    const { currentUser } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [date, setDate] = useState(new Date(bookingDetail.StartTime))
    const [nSeat, setNSeat] = useState()
    const [note, setNote] = useState(bookingDetail.Note)


    useEffect(
        () => {
            const fetchData = async () => {
                const bookingDetail = await getBookingDetail(booking.ID)
                console.log(bookingDetail)
                setBookingDetail(bookingDetail)
                setNote(bookingDetail.Note)
                setDate(new Date(bookingDetail.StartTime))
                setEndDate(new Date(bookingDetail.EndTime))
                setNSeat(bookingDetail.Number)

            }
            fetchData()
        }
        , [route.params])
    const onSelectNSeat = (index, option) => {
        setNSeat(nSeatArr[index])
    }
    // const [date, setDate] = useState(new Date())

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const handleConfirm = (date) => {
        setDate(date)
        hideDatePicker();
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    // const [endDate, setEndDate] = useState(new Date())

    const [endDate, setEndDate] = useState(new Date(bookingDetail.EndTime))
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
    const handleEndDateConfirm = (date) => {
        setEndDate(date)
        hideEndDatePicker();
    };

    const hideEndDatePicker = () => {
        setEndDatePickerVisibility(false);
    };


    useEffect(() => {
        if (currentUser) {
            // navigation.navigate("Profile")
        } else {
            showToast(TYPE_NOTI.ERROR, null, "Bạn phải đăng nhập trước");
            navigation.replace("LoginScreen")
        }
    }, [])


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
                    <Customer />
                    <CustomLine style={{ width: "90%", marginTop: 10 }} />


                    <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
                        <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 10 }}>Dịch vụ</Text>

                        <ImageBackground style={style.headerImage} source={{ uri: "data:image/jpeg;base64," + item.ImageList[0] }} />
                        <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 20 }}>{item.NameOffice}</Text>
                        <Text
                            style={{
                                fontSize: 12,
                                fontWeight: "400",
                                color: Color.grey,
                                marginTop: 20,
                            }}
                        >
                            {item.Address}
                        </Text>
                        <CustomCobobox disabled={true} width={"100%"} name='Số ghế đặt' option={nSeatArr} onSelect={onSelectNSeat} defaultValue={nSeat} />

                        <CustomDatePicker
                            width={"100%"} name='Ngày đặt'
                            isVisible={isDatePickerVisible}
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                            setVisibility={setDatePickerVisibility}
                            value={date}
                            disable={true}
                        />
                        <CustomDatePicker
                            width={"100%"} name='Ngày kết thúc'
                            isVisible={isEndDatePickerVisible}
                            onConfirm={handleEndDateConfirm}
                            onCancel={hideEndDatePicker}
                            setVisibility={setEndDatePickerVisibility}
                            value={endDate}
                            disable={true}
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

            </ScrollView>
            <View style={style.cardDetails}>
                <Text style={{ fontSize: 26, fontWeight: "700", marginBottom: 10, marginRight: 20, color: Color.lightblue, textAlign: 'right' }}>Giá thành: {bookingDetail.Price}P</Text>

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
        flexDirection: "row-reverse",
        alignItems: "center",
    },
});

export default BookingDetailScreen;
