import { View, Text, ScrollView, Image, ImageBackground } from 'react-native'
import React from 'react'
import Color from '../consts/Color'
import { windowsHeight, windowsWith } from '../consts/common'
import { useState } from 'react';
import { useEffect } from 'react';
import Icon from "react-native-vector-icons/MaterialIcons";
const imageArr = [
    require("../images/hotel/bendecir.jpg"),
    require("../images/hotel/bishub.jpg"),
    require("../images/hotel/melia.jpg")];
const ImageSwipe = ({ imageArr }) => {
    const [imaActive, setImaActive] = useState(0)
    const [ImageList, setImageList] = useState([])
    useEffect(() => {
        setImageList(Array.isArray(imageArr) ? imageArr.filter((e, i) => i < 5) : [])
    }, [imageArr])
    const onChange = (nativeEvent) => {
        if (nativeEvent) {
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
            if (slide != imaActive) {
                setImaActive(slide)
            }
        }
    }
    return (
        <View style={{ width: windowsWith, height: windowsHeight * 0.22 }}>
            <ScrollView
                onScroll={({ nativeEvent }) => { onChange(nativeEvent) }}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                pagingEnabled
                horizontal
            >
                {ImageList.map((e, i) =>
                    <View style={{
                        width: windowsWith,
                        height: windowsHeight * 0.22,
                        borderRadius: 40,
                    }}>
                        <Image
                            key={e}
                            resizeMode="stretch"
                            source={{ uri: "data:image/jpeg;base64," + ImageList[i] }}
                            style={{
                                width: windowsWith * 0.9,
                                height: windowsHeight * 0.22,
                                borderRadius: 40,
                            }}
                        />
                    </View>
                )

                }

            </ScrollView>
            <View style={{ position: "absolute", bottom: 0, flexDirection: "row", alignSelf: "center", paddingRight: windowsHeight * 0.05 }}>
                {
                    ImageList.map((e, index) =>
                        <Text key={e} style={{ fontSize: 15, color: imaActive == index ? Color.lightblue : Color.grey }}>
                            o
                        </Text>
                    )
                }
            </View>
        </View>
    )
}

export const ImageSwipeBackGround = ({ imageArr, navigation }) => {
    const [imaActive, setImaActive] = useState(0)
    const [ImageList, setImageList] = useState([])
    useEffect(() => {
        setImageList(Array.isArray(imageArr) ? imageArr.filter((e, i) => i < 5) : [])
    }, [imageArr])
    const onChange = (nativeEvent) => {
        if (nativeEvent) {
            console.log(nativeEvent)
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
            if (slide != imaActive) {
                setImaActive(slide)
            }
        }
    }
    return (
        <View style={{
            height: 400,
            width: windowsWith,
            borderBottomRightRadius: 40,
            borderBottomLeftRadius: 40,
            overflow: "hidden",
        }}>
            <ScrollView
                onScroll={({ nativeEvent }) => { onChange(nativeEvent) }}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                pagingEnabled
                horizontal
            >
                {ImageList.map((e, i) =>
                    <ImageBackground style={{
                        height: 400,
                        width: windowsWith,
                        borderBottomRightRadius: 40,
                        borderBottomLeftRadius: 40,
                        overflow: "hidden",
                    }} source={{ uri: "data:image/jpeg;base64," + ImageList[i] }}>

                    </ImageBackground>
                )
                }

            </ScrollView>
            <View style={{
                position: "absolute",
                marginTop: 60,
                flexDirection: "row",
                alignItems: "center",
                marginHorizontal: 20,
                justifyContent: "space-between",
            }}>
                <View style={{ flex: 1, alignItems: "flex-start" }}>
                    <Icon
                        name="arrow-back-ios"
                        size={28}
                        color={Color.lightblue}
                        onPress={navigation.goBack}
                    />
                </View>
                <View style={{ flex: 1, alignItems: "flex-end" }}>
                    <Icon name="bookmark-border" size={28} color={Color.lightblue} />
                </View>
            </View>
            <View style={{ position: "absolute", bottom: 0, flexDirection: "row", alignSelf: "center" }}>
                {
                    ImageList.map((e, index) =>
                        <Text key={e} style={{ color: imaActive == index ? Color.lightblue : Color.grey }}>
                            o
                        </Text>
                    )
                }
            </View>
        </View>
    )
}

export default ImageSwipe