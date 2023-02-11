import { View, Text, Alert } from 'react-native'
import React from 'react'
import Color from "../consts/Color";
import { windowsHeight } from '../consts/common';
import { HeaderBar } from '../navigation/Header';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import CustomLine from '../custom_component/CustomLine';
import { useState } from 'react';
import { useEffect } from 'react';
import CustomButton from '../custom_component/CustomButton';
import CustomDatePicker from '../custom_component/CustomDatePicker';
import CustomNote from '../custom_component/CustomNote';
import { isIOS } from '../custom_component/CustomAvatar';
import { bookingInit } from '../redux/action/Actions';

const Customer = () => {
    const { currentUser } = useSelector((state) => state.user)
    return (
        <View style={{ marginLeft: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 10 }}>Thông tin khách hàng</Text>
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

const BillScreen = ({ navigation, route }) => {
    const dispatch = useDispatch()
    const [showBox, setShowBox] = useState(true);
    const [data, setData] = useState(
        {
            OfficeId: -1,
            UserId: -1,
            NameOffice: "",
            startTime: "",
            endTime: "",
            price: 0,
            nSeat: 0,
            seatPosition: [],
            note: "",
        })

    useEffect(() => {
        if (route?.params?.data) {
            setData(route?.params?.data)
        }
    }, [route])
    const onSelectionSeat = () => {
        console.log()
        navigation.navigate("SeatBookingScreen", {
            callback: () => {
            },
            seatPosition: data.seatPosition ? data.seatPosition.toString() : ""
        })
    }

    const onBooking = () => {
        // navigation.navigate("BillScreen", {
        //     data: {
        //         OfficeId: item.ID,
        //         UserId: currentUser.ID,
        //         NameOffice: item.NameOffice,
        //         Address: item.Address,
        //         startTime: date.toUTCString(),
        //         endTime: endDate.toUTCString(),
        //         price: item.Discount + nSeat,
        //         nSeat: nSeat,
        //         seatPosition: seatPosition,
        //         note: note,
        //     }
        // })
        dispatch(
            bookingInit(
                data.OfficeId,
                data.UserId,
                data.startTime,
                data.endTime,
                data.price,
                data.nSeat,
                data.seatPosition,
                data.note
            ))
        navigation.goBack()    
    }

    const showConfirmDialog = () => {
        return Alert.alert(
            "Bạn muốn đặt phòng?",
            `Bạn muốn đặt phòng ${data.NameOffice} với ${data.nSeat} chỗ ngồi\nGiá tổng cộng: ${data.price} P`,
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

    return (
        <View style={{ minHeight: windowsHeight, backgroundColor: Color.white }}>
            <HeaderBar navigation={navigation} title={"Thanh toán"} />
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
                        <Text style={{ fontSize: 20, fontWeight: "600", marginBottom: 10 }}>Dịch vụ</Text>

                        {/* <ImageSwipe imageArr={item.ImageList}></ImageSwipe> */}
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "400",
                                color: Color.dark,
                                marginTop: 20,
                            }}
                        >
                            {`Tên văn phòng:\t\t${data.NameOffice}`}
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "400",
                                color: Color.dark,
                                marginTop: 20,
                            }}
                        >
                            {`Địa chỉ:\t\t${data.Address}`}
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "400",
                                color: Color.dark,
                                marginTop: 20,
                            }}
                        >
                            {`Số ghế đặt:\t\t${data.nSeat}`}
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: "400",
                                color: Color.dark,
                                marginTop: 20,
                            }}
                        >
                            {`Vị trí ghế:\t\t${data.seatPosition}`}
                        </Text>

                        <CustomDatePicker
                            width={"100%"} name='Ngày đặt'
                            isVisible={false}
                            onConfirm={() => { }}
                            onCancel={() => { }}
                            setVisibility={() => { }}
                            value={data.startTime != "" ? new Date(data.startTime) : new Date()}
                            disable={true}
                        />
                        <CustomDatePicker
                            width={"100%"} name='Ngày kết thúc'
                            isVisible={false}
                            onConfirm={() => { }}
                            onCancel={() => { }}
                            setVisibility={() => { }}
                            value={data.endTime != "" ? new Date(data.endTime) : new Date()}
                            disable={true}
                        />

                        <CustomNote editable={false} value={data.note} setValue={() => { }} />

                        <View
                            style={{
                                marginBottom: 500
                            }}
                        >
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={{
                height: isIOS ? 200 : 100,
                borderRadius: 25,
                backgroundColor: Color.white,
                borderWidth: 0.5,
                borderColor: Color.grey,
                position: "absolute",
                bottom: 0,
                width: "100%",
                flexDirection: "row"
            }}>
                <View style={{ flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 5 }}> Tổng cộng:{`\n\t\t`} {data.price} P</Text>
                </View>

                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <CustomButton name={"Xác nhận"} onPress={showConfirmDialog} />
                </View>
            </View>
        </View>
    )
}

export default BillScreen