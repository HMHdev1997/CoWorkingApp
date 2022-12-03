import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import Color from "../consts/Color";


const CustomButton = ({name, onPress}) => {
  return (
    <View style={styles.container}>

    <Pressable  style={styles.pressable} onPress = {onPress}  android_ripple={{color: '#silver', borderless: false}} >
      <Text style = {styles.text}>{name}</Text>
    </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  pressable: {
    backgroundColor: Color.lightblue,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: Color.lightblue,
    paddingHorizontal: 20,
    paddingVertical: 5,
    alignItems: 'center',
    alignSelf: 'center',
  },
    
  container: { 
    borderRadius: 10, 
    overflow: 'hidden',         
    alignSelf: 'center', 
   },
  text: {
      fontSize: 25,
      color: Color.white,
      textAlign: 'center',
  }
})

export default CustomButton