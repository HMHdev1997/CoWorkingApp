import moment from "moment/moment";
import React, { useState } from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import { Calendar } from "react-native-calendars";
import CustomLabel from "../custom_component/CustomLabel";

const data = [
    {}
]

const eventList = [
    {
        title: "Le Cafe Hotel",
        description: "Ba Đình, Hà Nội",
        source: require("../images/hotel/lecafe.png"),
        date: ["2022-12-03", "2022-12-07", "2022-12-10", "2022-12-11", "2022-12-03", "2022-12-14", "2022-12-12", "2022-12-15",]
    },
    {
        title: "Trống Đồng Hotel",
        description: "",
        source: require("../images/hotel/trongdong.jpg"),
        date: ["2022-12-20", "2022-12-15", "2022-12-16", "2022-12-07", "2022-12-08", "2022-12-19", "2022-12-21", "2022-12-15",]
    },
    {
        title: "Acoustic Hotel",
        description: "",
        source: require("../images/hotel/acoustic.jpg"),
        date: ["2022-12-20", "2022-12-04", "2022-12-13", "2022-12-14", "2022-12-15", "2022-12-09", "2022-12-06", "2022-12-15",]
    },
    {
        title: "Sông Hồng Hotel",
        description: "Long Biên, Hà Nội",
        source: require("../images/hotel/hongriversun.jpg"),
        date: ["2022-12-20", "2022-12-05", "2022-12-06", "2022-12-07", "2022-12-08", "2022-12-09", "2022-12-10", "2022-12-15",]
    },
    {
        title: "Bendecir Hotel",
        description: "",
        source: require("../images/hotel/bendecir.jpg"),
        date: ["2022-12-20", "2022-12-05", "2022-12-06", "2022-12-07", "2022-12-08", "2022-12-09", "2022-12-10", "2022-12-15",]
    },
    {
        title: "Bishub Hotel",
        description: "",
        source: require("../images/hotel/bishub.jpg"),
        date: ["2022-12-20", "2022-12-05", "2022-12-17", "2022-12-07", "2022-12-08", "2022-12-09", "2022-12-10", "2022-12-15",]
    },
    {
        title: "Melia Hotel",
        description: "",
        source: require("../images/hotel/melia.jpg"),
        date: ["2022-12-03", "2022-12-05", "2022-12-24", "2022-12-07", "2022-12-08", "2022-12-09", "2022-12-10", "2022-12-15",]
    },
]

const Calendars = ({ navigation }) => {
    const [dayState, setDayState] = useState({
        selectedDate: "2022-12-03",
        markedDates: {}
    })
    getSelectedDayEvents = date => {
        let markedDates = {};
        markedDates[date] = { selected: true, color: '#00B0BF', textColor: '#FFFFFF' };
        setDayState({
            selectedDate: date,
            markedDates: markedDates
        });
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Calendar style={{ marginTop: 30 }}
                onDayPress={day => {
                    getSelectedDayEvents(day.dateString);
                }}
                markedDates={
                    dayState.markedDates
                } />
            <ScrollView showsVerticalScrollIndicator={false}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ marginTop: "5%" }}>
                    {eventList.filter(e => e.date.includes(dayState.selectedDate)).map((e, i) => <CustomLabel key={i} title={e.title} source={e.source} description={dayState.selectedDate + "\n" + e.description}></CustomLabel>)}
                </ScrollView>
            </ScrollView>

        </SafeAreaView>
    );
};

export default Calendars;