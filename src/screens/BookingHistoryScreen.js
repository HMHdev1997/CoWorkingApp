import { View, Text, Dimensions, ScrollView, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Color from "../consts/Color";
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from 'react-redux';
import { getBookingHistoryInit } from '../redux/action/Actions';
import { getOfficebyIdFromCache, formatDate } from '../consts/request';

const heightScreen = Dimensions.get("screen").height;

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
                <Text style={{ fontSize: 20, fontWeight: "600", color: Color.lightblue }}>Lịch sử Booking</Text>
            </View>
        </View>
    )
}

const SlotCart = ({ Booking, navigation }) => {
    const [office, setOffice] = useState({})
    const [imgData, setImgData] = useState("")
    useEffect(() => {
        const fetchData = async () => {
            if (Booking?.OfficeId) {
                setOffice(await getOfficebyIdFromCache(Booking?.OfficeId))
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (office) {
            if (office.ImageList) {
                setImgData(office.ImageList[0] || "")
            }
        }
    }, [office])
    return (
        <TouchableOpacity style={style.topHotelCard} onPress={() => { navigation.navigate("BookingDetailScreen", { office: office, booking: Booking }) }}>
            <View
                style={{
                    position: "absolute",
                    top: 5,
                    right: 5,
                    zIndex: 1,
                    flexDirection: "row",
                }}
            >
            </View>
            <Image style={style.topHotelCardImage} source={{ uri: "data:image/jpeg;base64," + imgData }} />

            <View
                style={{ paddingVertical: 5, paddingHorizontal: 10, paddingTop: 20 }}
            >
                <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                    {office?.NameOffice ? office?.NameOffice : ""}
                </Text>
                <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                    {office?.Address ? office?.Address : ""}
                </Text>
                <Text style={{ fontSize: 10, fontWeight: "bold" }}>
                    Ngày đặt: {formatDate(Booking.CreatedDate)}
                </Text>
                <Text style={{ fontSize: 10, fontWeight: "bold", color: Color.grey }}>
                    Bắt đầu: {formatDate(Booking.StartTime)}
                </Text>
                <Text style={{ fontSize: 10, fontWeight: "bold", color: Color.grey }}>
                    Kết thúc: {formatDate(Booking.EndTime)}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const BookingHistoryScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const { currentUser } = useSelector(state => state.user)
    const { bookingHistory } = useSelector(state => state.bookingHistory)
    const [list, setList] = useState([])
    useEffect(() => {
        if (bookingHistory) {
            setList(bookingHistory)
        }
        dispatch(getBookingHistoryInit(currentUser?.ID))
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
                <FlatList
                    data={list}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingLeft: 20,
                        marginTop: 20,
                        paddingBottom: 30,
                        flexDirection: "column",
                    }}
                    renderItem={({ item }) => <SlotCart Booking={item} navigation={navigation} />}
                />
                <View style={{ height: 200 }}>

                </View>
            </ScrollView>
        </View>
    )
}

const style = StyleSheet.create({
    topHotelCard: {
        flexDirection: "row",
        height: 120,
        width: 330,
        backgroundColor: Color.white,
        elevation: 15,
        marginHorizontal: 10,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 0.5,
    },
    topHotelCardImage: {
        height: 100,
        width: 150,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
});
export default BookingHistoryScreen