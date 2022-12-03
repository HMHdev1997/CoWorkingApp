import React from "react";
import { Dispatch, SetStateAction } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import Color from "../consts/Color"
import CustomLine from "./CustomLine";
import { Dimensions } from "react-native";

const CustomInput = ({name, value, placeholder, secureTextEntry, setValue, width, height, isNotNullable, isNumber, isEditable, multiline, numberOfLines, style, onFocus, isName}) => {
  return (
    <View style = {{marginVertical: Dimensions.get('screen').height * 0.01}}>
      {isName &&<View ><Text style={styles.name}>{name}{isNotNullable ? " (*)" : ""}:</Text></View>}
      <TextInput
        style={[styles.input, { width: width ? width : "100%", height: height ? height : 40 }, style]}
        keyboardType={isNumber ? 'numeric' : 'default'}
        placeholder={placeholder ? placeholder : name}
        value={value}
        onChangeText={setValue}
        secureTextEntry={secureTextEntry}
        editable={isEditable}
        multiline={multiline}
        numberOfLines={numberOfLines}
        onFocus={onFocus}
      />
      {isName && <CustomLine color = {Color.lightblue} style = {{width: width || '100%', marginTop: -10}}></CustomLine>}
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
    backgroundColor: '#f0f0f0',
    height: 44,
    marginVertical: 5,
  },

  name: {
    color: Color.lightblue
  }
});

export default CustomInput