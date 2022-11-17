import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-navigation";
import Icon from "react-native-vector-icons/MaterialIcons";
import Color from "../consts/Color";

const Profile = ({ navigation }) => {
   
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.titleBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-ios" size={24} />
          </TouchableOpacity>
        </View>
        <View>
          <View style={{ alignItems: "center" }}>
            <Image source={require("../images/user.png")} style={style.image} />
          </View>
          <View style={style.add}>
            <Icon name="add" size={48} color="#DFD8C8" />
          </View>
          <Text style={{ fontSize: 25, fontWeight: "bold", color: Color.red }}>
            Text
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const style = StyleSheet.create({
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
    marginHorizontal: 20,
  },

  image: {
    flex: 1,
    alignItems: "center",
    width: 200,
    height: 200,
    borderRadius: 20,
    justifyContent: "center",
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: 150,
    right: 100,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Profile;
