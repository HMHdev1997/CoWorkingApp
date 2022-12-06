import React from "react";
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Color from "../consts/Color";
import Icon from "react-native-vector-icons/MaterialIcons";

const DetailsScreen = ({ navigation, route }) => {
  const item = route.params;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        backgroundColor: Color.white,
        paddingBottom: 20,
      }}
    >
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="rgba(0,0,0,0)"
      />
      <ImageBackground style={style.headerImage} source={item.Image}>
        <View style={style.header}>
          <Icon
            name="arrow-back-ios"
            size={28}
            color={Color.lightblue}
            onPress={navigation.goBack}
          />
          <Icon name="bookmark-border" size={28} color={Color.lightblue} />
        </View>
      </ImageBackground>
      <View>
        <View style={style.iconContainer}>
          <Icon name="place" color={Color.white} size={28} />
        </View>
        <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.name}</Text>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "400",
              color: Color.grey,
              marginTop: 5,
            }}
          >
            {item.location}
          </Text>
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={{ flexDirection: "row" }}>
                <Icon name="star" size={20} color={Color.orange} />
                <Icon name="star" size={20} color={Color.orange} />
                <Icon name="star" size={20} color={Color.orange} />
                <Icon name="star" size={20} color={Color.orange} />
                <Icon name="star" size={20} color={Color.grey} />
              </View>
              <Text style={{ fontWeight: "bold", fontSize: 18, marginLeft: 5 }}>
                4.0
              </Text>
            </View>
            <Text style={{ fontSize: 13, color: Color.grey }}>365reviews</Text>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={{fontWeight:'bold', fontSize: 15}}> Giới thiệu</Text>
            <Text style={{marginTop: 5, lineHeight: 20, color: Color.grey }}>
              {item.details}
            </Text>
          </View>
         
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  btn: {
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    backgroundColor: Color.primary,
    marginHorizontal: 20,
    borderRadius: 10,
  },

  priceTag: {
    height: 40,
    alignItems: "center",
    marginLeft: 40,
    paddingLeft: 20,
    flex: 1,
    backgroundColor: Color.secondary,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: "row",
  },
  iconContainer: {
    position: "absolute",
    height: 60,
    width: 60,
    backgroundColor: Color.primary,
    top: -30,
    right: 20,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  headerImage: {
    height: 400,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    overflow: "hidden",
  },
  header: {
    marginTop: 60,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    justifyContent: "space-between",
  },
  
});

export default DetailsScreen;
