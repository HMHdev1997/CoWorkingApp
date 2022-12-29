import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'
import CustomInput from './CustomInput'
import Color from '../consts/Color'
import CustomLine from './CustomLine';
import DateTimePickerModal from "react-native-modal-datetime-picker";



const CustomDatePicker = ({ name, value, placeholder, secureTextEntry, setValue, width, height, isNotNullable, isNumber, isEditable, numberOfLines, multiline, style, onFocus, isVisible, onConfirm, onCancel, setVisibility }) => {
    const [date, setDate] = useState(value ? value : new Date())

    const onConfirm1 = (date) => {
        onConfirm(date)
        setDate(date)
    }
    return (
        <Pressable style={{ marginVertical: 15 }} onPress={() => { setVisibility(true) }}>
            <View ><Text style={styles.name}>{name}{isNotNullable ? " (*)" : ""}:</Text></View>
            <View pointerEvents="none">
                <TextInput
                    {...{ name, value, placeholder, secureTextEntry, setValue, width, height, isNotNullable, isNumber, isEditable, numberOfLines, multiline, style, onFocus, isVisible, onConfirm, onCancel, setVisibility }}
                    style={[styles.input, { width: width ? width : "100%", height: height ? height : 40 }, style]}
                    value={date.toISOString().substring(0, 10)}
                />
                <CustomLine color={Color.lightblue} style={{ width: width || '100%', marginTop: -10 }}></CustomLine>
                <DateTimePickerModal
                    isVisible={isVisible}
                    mode="date"
                    onConfirm={onConfirm1}
                    onCancel={onCancel}
                    confirmTextIOS={'Chọn'}
                    cancelTextIOS={'Hủy'}
                    date={date}
                    maximumDate={(new Date()).setDate((new Date()).getDate() + 60)}
                    minimumDate={new Date()}
                    style={{}}
                />
            </View>

        </Pressable>
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
        height: 44,
        marginVertical: 5,
        paddingLeft: 20
    },

    name: {
        color: Color.lightblue,
    }
});

export default CustomDatePicker