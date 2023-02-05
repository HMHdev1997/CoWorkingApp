import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import ModalDropdown from 'react-native-modal-dropdown';
import CustomLine from './CustomLine';
import Color from '../consts/Color'
let fruits = [
    {
        id: 1,
        name: 'Mango',
    },
    {
        id: 2,
        name: 'Banana',
    },
]

const CustomCobobox = ({ name, option, value, placeholder, defaultIndex, defaultValue, onSelect, isNotNullable, width, styleDropdown, styleDropdownBox, dropdownTextStyle, textStyle, disabled }) => {
    const [data, setData] = useState([])

    return (
        <View >
            <View ><Text style={styles.name}>{name}{isNotNullable ? " (*)" : ""}:</Text></View>
            <ModalDropdown style={[styles.input, { width: width ? width : "100%" }, styleDropdownBox]}
                textStyle={[styles.text, textStyle]}
                dropdownStyle={[styles.dropdown, styleDropdown]}
                dropdownTextStyle={[{ fontSize: 14, color: Color.dark }, dropdownTextStyle]}
                options={option}
                defaultIndex={defaultIndex}
                onSelect={onSelect}
                defaultValue={defaultValue ? defaultValue : "Chọn ..."}
                disabled={disabled}
            />
            <CustomLine color={Color.lightblue} style={{ width: width || '100%', marginTop: -10 }}></CustomLine>
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


export default CustomCobobox