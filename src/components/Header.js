import React from "react";
import { ImageBackground, StyleSheet, View} from "react-native";


const Header = () =>{
    return(
        <View>
            <ImageBackground style ={style.Contener} source={require('../images/back2.jpg')}>
                
            </ImageBackground>
        </View>
    )
}

const style = StyleSheet.create({
    Contener:{
        aspectRatio: 5/2,
        height: 170,

    }
})

export default Header;