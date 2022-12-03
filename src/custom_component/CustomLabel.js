import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native'
import React from 'react'
import ShadowView from './CustomShadowView';
import { Dimensions } from "react-native";
import Color from "../consts/Color"
const WIDTH = Dimensions.get('screen').width
const HEIGHT = Dimensions.get('screen').height
const CustomLabel = ({ title, description, source, onPress }) => {
    return (
        <ShadowView style={styles.label} onPress={onPress}>
            <Image style={styles.imageView} source={source} />

            <View style={styles.textView}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.text}>{description}</Text>
            </View>
        </ShadowView>
    )
}

const styles = StyleSheet.create({
    label: {
        // marginTop: '10%',
        marginLeft: 0.05 * WIDTH,
        width: 0.7 * WIDTH,
        height: 0.4 * HEIGHT,
        // flexDirection: 'row'  
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
        flex: 3,
        borderRadius: 10,
        width: undefined,
        height: undefined

    },

    textView: {
        flex: 2
    },

});

export default CustomLabel