import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { HeaderBar } from '../navigation/Header'
import Color from '../consts/Color'
import { windowsHeight, windowsWith } from '../consts/common'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPerson } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useEffect } from 'react'
import CustomButton from '../custom_component/CustomButton'

const SeatElement = ({ posistion, width, onPress, checkArr, disable }) => {
    const [status, setStatus] = useState(false)

    useEffect(() => {
        console.log(checkArr)
        setStatus(checkArr)
    }, [checkArr])
    const onPressElement = () => {
        if (disable) {
            return
        }
        onPress ? onPress({ posistion: posistion, status: !status }) : {}
        setStatus(status => !status)
    }

    return (
        <TouchableOpacity style={{
            width: width,
            alignItems: "center"
        }} onPress={onPressElement}>
            <FontAwesomeIcon size={30} icon={faPerson} color={status ? Color.lightblue : Color.grey}></FontAwesomeIcon>
            <Text style={{
                fontSize: 20,
                fontWeight: "500",
                color: Color.lightblue,
                justifyContent: "center",
                alignSelf: "center"
            }}>
                {posistion}
            </Text>
        </TouchableOpacity>
    )
}

const SeatWindow = ({ arrayLetter, onPress, length_row, checkArr, disable }) => {
    return (
        <View style={{ borderColor: Color.lightblue, borderWidth: 1, borderRadius: 10, width: 0.9 * windowsWith, alignItems: "center" }}>
            {arrayLetter ? arrayLetter.map((e, i) =>
                <SeatRow disable={disable} length={length_row} letter={e} onPress={onPress} checkArr={checkArr} />
            ) : <View></View>}
        </View>
    )
}

const SeatRow = ({ letter, length, onPress, checkArr, disable }) => {
    return (
        <View style={{ padding: 5, flexDirection: "row" }}>
            {Array(length).fill(0).map((e, i) =>
                <SeatElement disable={disable} posistion={letter + i} width={windowsWith * 0.8 / length} onPress={onPress} checkArr={checkArr ? checkArr.includes(letter + i) : false} />)}
        </View>
    )
}
const arrayLetter = ["A", "B", "C", "D"]
const length = 5
const statusMap = new Map();
const initMap = (arrayLetter, length) => {
    arrayLetter.forEach(element => {
        var i;
        for (i = 0; i < length; i++) {
            statusMap.set(element + i, false)
        }
    });
}
const SeatBookingScreen = ({ navigation, route }) => {
    const [totalSeat, setTotalSeat] = useState([])
    const [seatPositionArr, setSeatPositionArr] = useState([])
    const [disable, setDisable] = useState(false)
    useEffect(() => {
        initMap(arrayLetter, length)

    }
        , [])
    const onPressSeat = (info) => {
        statusMap.set(info.posistion, info.status)

    }

    useEffect(() => {
        if (route.params?.seatPosition) {
            const seatPositionString = route.params?.seatPosition;
            setSeatPositionArr(seatPositionString ? seatPositionString.split(",") : [])
            setDisable(true)
        }
    }, [route.params])

    const onCallback = () => {
        const array = Array.from(statusMap, ([posistion, status]) => ({ posistion, status })).filter((e) => e.status == true).map(e => e.posistion);
        console.log(array)
        route.params.callback(array)
        navigation.goBack()
    }
    return (
        <View style={{ minHeight: windowsHeight, backgroundColor: Color.white }}>
            <HeaderBar navigation={navigation} title="Đặt chỗ ngồi" />
            <View style={{ top: 100, marginLeft: 0.05 * windowsWith }}>
                <SeatWindow arrayLetter={arrayLetter} length_row={length} onPress={onPressSeat} checkArr={seatPositionArr} disable={disable} />
                {
                    !disable && <View style={{ marginTop: 20 }}>
                        <CustomButton name={"Xac nhan"} onPress={onCallback}></CustomButton>

                    </View>
                }
            </View>

        </View>
    )
}

export default SeatBookingScreen