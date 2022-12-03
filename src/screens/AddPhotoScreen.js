import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CustomAvatar from '../custom_component/CustomAvatar';
import { Route, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import Color from '../consts/Color';
import Toast from "react-native-toast-message";

const WIDTH = Dimensions.get('screen').width;
const HIGH = Dimensions.get('screen').height;

export const TYPE_NOTI = {
    SUCCESS: 'success',
    ERROR: 'error',
    INFO: 'info',
}
function isEmpty(str) {
    return (!str || str.length === 0 );
}

export const showToast = (type, title, mess) => {
    if (isEmpty(title)) {
        if (type === TYPE_NOTI.ERROR) {
            title = 'Có gì đó sai rồi Đại vương ơi ...'
        } else if (type === TYPE_NOTI.SUCCESS) {
            title = 'Thành công'
        } else if (type === TYPE_NOTI.INFO) {
            title = 'Thông tin'
        }
    }
    Toast.show({
        type: type,
        text1: title,
        text2: mess
    });
}

function AddPhotoScreen() {
    // The path of the picked image
    const navigation = useNavigation();
    const route = useRoute();
    const [pickedImagePath, setPickedImagePath] = useState(route.params?.avatarUri ? route.params?.avatarUri : '');
    // const [pickedImagePath, setPickedImagePath] = useState('');

    const choosePhoto = () => {
        if (isEmpty(pickedImagePath)) {
            showToast(TYPE_NOTI.INFO, null, "Vui lòng chọn ảnh")
            return
        } else {

            route.params?.onPhotoCallback(pickedImagePath);
            navigation.goBack();
        }
    }
    // This function is triggered when the "Select an image" button pressed
    const showImagePicker = async () => {
        // Ask the user for the permission to access the media library 
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            showToast(TYPE_NOTI.ERROR, null, "Không có quyền truy cập");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1]
        });

        // Explore the result

        if (!result.cancelled) {
            setPickedImagePath(result.uri);
        }
    }

    // This function is triggered when the "Open camera" button pressed
    const openCamera = async () => {
        // Ask the user for the permission to access the camera
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            showToast(TYPE_NOTI.ERROR, null, "Không có quyền truy cập");
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1]
        });

        // Explore the result

        if (!result.cancelled) {
            setPickedImagePath(result.uri);
        }
    }

    return (
        <View style={styles.screen}>
            <View style={styles.buttonContainer}>
                <CustomAvatar size={80} source1={pickedImagePath}></CustomAvatar>

            </View>

            <View style={styles.buttonContainer}>
                <Button onPress={showImagePicker} title="Chọn từ thư viện" />
                <Button onPress={openCamera} title="Chụp ảnh mới" />

            </View>

            <View style={styles.imageContainer}>
                {
                    pickedImagePath !== '' && <Image
                        source={{ uri: pickedImagePath }}
                        style={styles.image}
                    />
                }
            </View>


            <View style={styles.buttonContainer}>

                <Button onPress={choosePhoto} title="Chọn ảnh" />
            </View>
        </View>
    );
}

export default AddPhotoScreen;

// Kindacode.com
// Just some styles
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.white
    },
    buttonContainer: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: 20,
    },
    imageContainer: {
        padding: 30
    },
    image: {
        width: WIDTH / 4 * 3,
        height: WIDTH / 4 * 3,
        resizeMode: 'cover'
    }
});

