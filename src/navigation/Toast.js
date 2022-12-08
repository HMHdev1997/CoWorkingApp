import * as React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
const HEIGHT = Dimensions.get('screen').height
export const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: 'blue', borderLeftWidth: 10, top: HEIGHT*0.05 }}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        text1Style={{
            fontSize: 18,
            color: '#3333dd'
          }}
          text2Style={{
            fontSize: 14
          }}
          text2NumberOfLines={2}
      />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: (props) => (
      <ErrorToast
        {...props}
        style={{ borderLeftColor: 'red', borderLeftWidth: 10 }}
        contentContainerStyle={{ paddingHorizontal: 10 }}

        text1Style={{
          fontSize: 18,
          color: '#dd3333'
        }}
        text2Style={{
          fontSize: 14
        }}
        text2NumberOfLines={2}
      />
    ),
    /*
      Or create a completely new type - `tomatoToast`,
      building the layout from scratch.
  
      I can consume any custom `props` I want.
      They will be passed when calling the `show` method (see below)
    */
    tomatoToast: ({ text1, props }) => (
      <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
        <Text>{text1}</Text>
        <Text>{props.uuid}</Text>
      </View>
    )
  };