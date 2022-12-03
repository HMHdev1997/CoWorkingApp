import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useState } from "react";
import { Pressable, Text, View, StyleSheet, Dimensions, Keyboard, ScrollView } from "react-native";
import Color from "../consts/Color"
import BookingLabel from "../custom_component/BookingLabel";
import CustomInput from "../custom_component/CustomInput";
const WIDTH = Dimensions.get('screen').width
const HEIGHT = Dimensions.get('screen').height


const eventList = [
    {
        title: "Sông Hồng Hotel",
        description: "Long Biên, Hà Nội",
        source: require("../images/hotel/hongriversun.jpg"),
        checkinTime: "08:00-20:00",
        price: "80",
    },
    {
        title: "Le Cafe Hotel",
        description: "Ba Đình, Hà Nội",
        source: require("../images/hotel/lecafe.png"),
        checkinTime: "08:00-20:00",
        price: "60",
    },
    {
        title: "Trống Đồng Hotel",
        description: "Ba Đình, Hà Nội",
        source: require("../images/hotel/trongdong.jpg"),
        checkinTime: "08:00-20:00",
        price: "99",
    },
    {
        title: "Acoustic Hotel",
        description: "Ba Đình, Hà Nội",
        source: require("../images/hotel/acoustic.jpg"),
        checkinTime: "08:00-20:00",
        price: "129",
    },
    {
        title: "Bendecir Hotel",
        description: "Ba Đình, Hà Nội",
        source: require("../images/hotel/bendecir.jpg"),
        checkinTime: "08:00-20:00",
        price: "59",
    },
    {
        title: "Bishub Hotel",
        description: "Ba Đình, Hà Nội",
        source: require("../images/hotel/bishub.jpg"),
        checkinTime: "08:00-20:00",
        price: "72",
    },
    {
        title: "Melia Hotel",
        description: "Ba Đình, Hà Nội",
        source: require("../images/hotel/melia.jpg"),
        checkinTime: "08:00-20:00",
        price: "50",
    },
]

const Bookings = () => {
    const [search, setSearch] = useState("")
    const [searchedList, setSList] = useState(eventList)
    const onSearch = () => {
        Keyboard.dismiss()
        if (search == "") {
            setSList(eventList)
        } else {
            setSList(eventList.filter(e => 
                e.title.toLowerCase().includes(search.toLowerCase()) 
                || e.description.toLowerCase().includes(search.toLowerCase()) 
                || e.checkinTime.toLowerCase().includes(search.toLowerCase()) 
                || e.price.toLowerCase().includes(search.toLowerCase()) 
            ))
        }
    }
    return (
        <View>
            <View style={{ top: 10, width: "100%", flexDirection: "row", marginTop: "10%" }}>
                <View style={{ flex: 5 }}>
                    <CustomInput width='90%' style={styles.txtSearch} name={"Tìm Kiếm"} isNotNullable={false} value={search} setValue={setSearch}></CustomInput>
                </View>
                <Pressable style={{ flex: 1, marginVertical: Dimensions.get('screen').height * 0.02 }} onPress={onSearch}>
                    <FontAwesomeIcon size={30} icon={faSearch} color={Color.lightblue}></FontAwesomeIcon>
                </Pressable>
            </View>
            <ScrollView>
                {searchedList.map((e, i) => <BookingLabel key={i} title={e.title} source={e.source} description={e.description} checkinTime={e.checkinTime} price={e.price}></BookingLabel>)}
                <View style={{height: HEIGHT * 0.2}}></View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    txtSearch: {
        borderRadius: 20,
        marginLeft: 20,
        color: "#000",
        borderColor: "#666",
        backgroundColor: "#FFF",
        borderWidth: 1,
        height: 45,
        paddingHorizontal: 10,
        fontSize: 18,
    },
});

export default Bookings;