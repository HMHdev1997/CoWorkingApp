import React, { useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Color from "../consts/Color";
import Icon from "react-native-vector-icons/MaterialIcons";
import CustomButton from "../custom_component/CustomButton";
const heightScreen = Dimensions.get("screen").height;

const maxLineC = 10
const lineHeight = 14

const DetailsScreen = ({ navigation, route }) => {
  const item = route.params;
  const [isShowMore, setShowMore] = useState(true)
  const [maxLine, setMaxLine] = useState(3)
  const onPressShowMore = () => {
    setShowMore((e) => !e)
    setMaxLine(isShowMore ? maxLineC : 3)
  }

  const onLayout = (event) => {
    const { height } = event.nativeEvent.layout
    const maxHeight = maxLine * lineHeight

    if (maxLine > 0 && height > maxHeight) {
      setShowMore(true)
    }
  }

  return (
    <View style={{ minHeight: heightScreen, backgroundColor: Color.white }}>

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
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>{item.Name}</Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: Color.grey,
                marginTop: 5,
              }}
            >
              {item.Address}
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
              <Text style={{ fontSize: 13, color: Color.grey }}>{item.ViewCount} reviews</Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Giới thiệu</Text>
              <Text style={{ marginTop: 5, lineHeight: 20, color: Color.grey, fontSize: 14 }}
                numberOfLines={maxLine}
                ellipsizeMode="tail"
                onLayout={(event) => onLayout(event)}
              >
                {item.Detail}
              </Text>
              <TouchableOpacity
                onPress={onPressShowMore} style={{ alignSelf: "center" }}>
                <Text
                  style={{
                    color: Color.lightblue,
                    marginTop: 10,
                    fontSize: 15,
                  }}
                  onPress={onPressShowMore}>
                  {isShowMore ? 'Xem thêm' : 'Rút gọn'}
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>Dịch vụ</Text>
                <Text style={{ fontWeight: 'bold', color: Color.lightblue, fontSize: 15 }}>Xem thêm</Text>

              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={style.cardDetails}>
        <View style={{ flex: 1, flexDirection: "column", alignItems: "center" }}>
          <Text style={{ fontWeight: 'bold', fontSize: 17, marginTop: 5 }}> Check in: {item.Price}P/lượt</Text>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <Icon name="star" size={20} color={Color.grey} />
            <Icon name="star" size={20} color={Color.grey} />
            <Icon name="star" size={20} color={Color.grey} />
            <Icon name="star" size={20} color={Color.grey} />
            <Icon name="star" size={20} color={Color.grey} />
          </View>
        </View>

        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <CustomButton name={"Đặt lịch"} />
        </View>
      </View>
    </View>
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
  cardDetails: {
    height: 200,
    borderRadius: 25,
    backgroundColor: Color.white,
    borderWidth: 0.5,
    borderColor: Color.grey,
    position: "absolute",
    bottom: 0,
    padding: 20,
    width: "100%",
    flexDirection: "row"
  },
});

export default DetailsScreen;
