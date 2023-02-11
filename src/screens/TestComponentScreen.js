import { View, Text } from 'react-native'
import React from 'react'
import { windowsHeight } from '../consts/common'
import Color from '../consts/Color'
import ImageSwipe, { ImageSwipeBackGround } from '../custom_component/ImageSwipe'
const TestComponentScreen = () => {
    return (
        <View style={{ minHeight: windowsHeight, backgroundColor: Color.white }}>
            <ImageSwipe/>
        </View>
    )
}

export default TestComponentScreen