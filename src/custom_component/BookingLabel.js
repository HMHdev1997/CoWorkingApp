import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native'
import React from 'react'
import ShadowView from './CustomShadowView';
import { Dimensions } from "react-native";
import Color from "../consts/Color"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUsd } from '@fortawesome/free-solid-svg-icons';
import CustomButton from './CustomButton';

const WIDTH = Dimensions.get('screen').width
const HEIGHT = Dimensions.get('screen').height



const BookingLabel = ({ title, description, source, onPress, checkinTime, price, navigation, item }) => {
    return (
        <ShadowView style={styles.label} onPress={onPress}>
            <View style={styles.imageView}>
                <Image style={{
                    flex: 2,
                    borderRadius: 10,
                    width: undefined,
                    height: undefined,
                }} source={source} />
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 3, paddingLeft: "5%" }}>
                        <Text> {"Check in:\n\t" + checkinTime}</Text>
                    </View>
                    <View style={{ flex: 2, paddingLeft: "5%", flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <FontAwesomeIcon size={20} icon={faUsd} color={Color.lightblue}></FontAwesomeIcon>
                        </View>
                        <View style={{ flex: 4 }}>
                            <Text style={{ color: Color.red, fontSize: 20, fontWeight: "500" }}>{price} P</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.textView}>
                <View style={{ flex: 3 }}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.text}>{description}</Text>
                </View>
                <View style={{ flex: 2 }}>
                    <CustomButton name={"Đặt lịch ngay"}  onPress={()=>{navigation.navigate("OrderScreen", item)}}></CustomButton>
                </View>
            </View>
        </ShadowView>
    )
}

const styles = StyleSheet.create({
    label: {
        marginTop: '5%',
        marginLeft: 0.05 * WIDTH,
        width: 0.9 * WIDTH,
        height: 0.25 * HEIGHT,
        flexDirection: 'row'
    },

    title: {
        fontSize: 20,
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingTop: '5%',
        color: Color.dark,
        fontWeight: 'bold',
        textAlign: 'justify',
    },

    text: {
        fontSize: 14,
        paddingLeft: '5%',
        paddingRight: '5%',
        paddingTop: '5%',
        color: Color.dark,
        textAlign: 'justify',
    },

    imageView: {
        flex: 2,
        borderRadius: 10,
        width: undefined,
        height: undefined,
        flexDirection: "column"
    },

    textView: {
        flex: 3,
        flexDirection: "column"
    },

});

export default BookingLabel