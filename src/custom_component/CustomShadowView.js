import { View, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { Dimensions, Platform } from "react-native";
import Color from "../consts/Color"


const isIOS = Platform.OS === "ios"
const WIDTH = Dimensions.get('screen').width
const HEIGHT = Dimensions.get('screen').height
const defaultFunction = ()=>{}
const ShadowView = (props) => {
    const FROM_COLOR = props?.fromColor || 'black';
    const TO_COLOR = props?.toColor || 'white';
    return (
        <Pressable style={[props.style, isIOS ? styles.shadowProp : styles.elevation, styles.card]} onPress={props?.onPress || defaultFunction}>
        {
            props.isGradient &&
                <Svg style={[{
                    width: '100%',
                    height: '100%'
                }, { ...StyleSheet.absoluteFillObject }]}>
                    <Defs>
                        <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <Stop offset="0" stopColor={FROM_COLOR} />
                            <Stop offset="1" stopColor={TO_COLOR} />
                        </LinearGradient>
                    </Defs>
                    <Rect rx={15} width={props.width || "100%"} height="100%" fill="url(#grad)" />
                </Svg>
        }
{ props.children }

        </Pressable >
    )
}

const styles = StyleSheet.create({
    shadowProp: {
        shadowColor: Color.grey,
        shadowOffset: { width: -2, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    elevation: {
        elevation: 10,
        borderRadius: 50,
        shadowColor: Color.grey,
    },
    heading: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 13,
    },
    card: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 15,
    },
});

export default ShadowView