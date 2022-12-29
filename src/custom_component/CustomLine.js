import { View, Text } from 'react-native'
import React from 'react'

const CustomLine = ({color, weight, style}) => {
  return (
    <View
    style={[{
        borderBottomColor: color || 'black',
        borderBottomWidth: weight || 0.5,
        alignSelf:"center"
      }, style]}
  />
  )
}

export default CustomLine