import React from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import RootComponent from "./src/screens";
import { Provider } from 'react-redux';
import { toastConfig } from "./src/navigation/Toast";
import { store } from "./src/redux/store/store";
import Toast from "react-native-toast-message";
// 
const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.root}>

        <RootComponent />
        <Toast config={toastConfig} />
      </SafeAreaView>
    </Provider>

  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    // paddingTop: isAndroid ? StatusBar.currentHeight : 0
  }
});
export default App;
