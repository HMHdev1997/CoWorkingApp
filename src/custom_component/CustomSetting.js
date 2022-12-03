import { View, Text,Pressable } from 'react-native'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowAltCircleDown, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Color from "../consts/Color";
const CustomSetting = ({ icon, text, onPress, isNoti }) => {
    return (
        <View style={{ flexDirection: "row", marginVertical: "2%",  }}>
            <View style={{ flex: 1, marginLeft: "5%" }}>
                <FontAwesomeIcon size={20} icon={icon} color={Color.black} />
            </View>
            <View style={{ flex: 10, alignItems: "flex-start", marginLeft: "2%" }}>
                <Text style={{fontSize: 18}}>
                    {text}
                </Text>
            </View>
            <Pressable onPress={onPress} style={{ flex: 2, alignItems: "flex-end",  marginRight: "5%"}}>
                <FontAwesomeIcon size={20} icon={faArrowRight} color={Color.grey} />
            </Pressable>
        </View>
    )
}

export default CustomSetting