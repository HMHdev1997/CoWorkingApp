import { faCamera, faSchool } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { Image, Pressable, StyleProp, View, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';

import Color from "../consts/Color"

export const isIOS = Platform.OS === "ios";
export const isAndroid = Platform.OS !== "ios";

export const getFilePathEachPlatform = (
	path,
	directoryPath = FileSystem.documentDirectory,
) => {
	if (!path) return '';
	if (path.startsWith('http')) return path;
	if (path.includes(directoryPath ? directoryPath : "")) {
		if (isIOS) {
			return path;
		} else {
			return path.startsWith('file://') ? path : `file://${path}`
		}
	}
	return isAndroid
		? path.startsWith('file://')
			? path
			: `file://${directoryPath}/${path}`
		: `${directoryPath}/${path}`;
};

const CustomAvatar = ({ size = 50, source1, isEdit, onPress, isShadow = true, }) => {
	const styleAvatar = { width: size, height: size, borderRadius: size / 2, borderWidth: 0, borderColor: "#ffffff" };
	const styleAvatarBound = { width: size, height: size, borderRadius: size / 2, borderWidth: 2, borderColor: "#ffffff" };
	return <Pressable onPress={onPress} style={[styleAvatar, isShadow && (isIOS ? styles.shadowProp : styles.elevation)]} android_ripple={isEdit ? { color: '#silver', borderless: true } : undefined}>
		{
			!!source1 ? <Image
				style={[styleAvatarBound]}
				source={typeof (source1) == typeof (require('../../assets/icon.png')) ? source1 : { uri: getFilePathEachPlatform(source1) }}>
			</Image>
				:
				<Image
					style={styleAvatarBound}
					source={require('../../assets/blank_avt.jpg')}>
				</Image>
		}
		{
			isEdit &&
			<FontAwesomeIcon
				size={size / 4}
				style={{ position: 'absolute', alignSelf: 'flex-end', bottom: 0 }}
				icon={faCamera} color={Color.lightblue}></FontAwesomeIcon>
		}

	</Pressable>
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
});

export default CustomAvatar;
