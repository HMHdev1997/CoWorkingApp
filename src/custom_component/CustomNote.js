import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import CustomLine from './CustomLine';
import Color from '../consts/Color'

const CustomNote = ({ width, value, setValue, height, style, editable }) => {
    return (
        <View>
            <View ><Text style={styles.name}>Note:</Text></View>
            <TextInput style={[styles.input, { width: width ? width : "100%", height: height ? height : 100 }, style]}
                value={value}
                onChangeText={setValue}
                editable={editable}
                multiline={true}
                numberOfLines={10}
            />
            <CustomLine color={Color.lightblue} style={{ width: width || '100%' }}></CustomLine>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F9FBFC',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    input: {
        backgroundColor: '#fff',
        height: 40,
        marginTop: 5,
        marginBottom: 5,
        paddingLeft: 20
    },

    text: {
        fontSize: 14,
        marginVertical: 10,
        color: Color.dark,
    },

    dropdown: {
        width: "50%",
        maxHeight: 150,
        borderRadius: 10,
        fontSize: 20,
    },
    name: {
        marginTop: 15,
        marginLeft: 0,
        color: Color.lightblue,
    }
});
export default CustomNote