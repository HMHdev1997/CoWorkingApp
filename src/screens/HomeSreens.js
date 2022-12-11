import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
  Animated,
} from "react-native";
import Color from "../consts/Color";
import Icon from "react-native-vector-icons/MaterialIcons";
import Hearder from "../navigation/Header";
import CustomLabel from "../custom_component/CustomLabel";
import Working from "../consts/Working";
const { width } = Dimensions.get("screen");
const cardWidth = width / 1.8;

const HomeSreens = ({ route, navigation }) => {
 
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
  const { account } = route?.params || {};
  const scrollX = React.useRef(new Animated.Value(0)).current;

 
  const Cart = ({ Working, index }) => {
    return (
      <TouchableOpacity activeOpacity={1}    onPress={() => navigation.navigate('DetailsScreen', Working)}>
          <View style={{ ...style.cart }}>
        <Animated.View style={{ ...style.cardOverLay, opacity: 0 }} />
        <View style={style.priceTag}>
          <Text
            style={{ color: Color.white, fontSize: 20, fontWeight: "bold" }}
          >
            {" "}
            ${Working.price}
          </Text>
        </View>

        <Image source={Working.Image} style={style.cardImage} />
        <View style={style.cardDetails}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                {Working.name}
              </Text>
              <Text style={{ fontWeight: "bold", fontSize: 13 }}>
                {Working.location}
              </Text>
            </View>
            <Icon name="bookmark-border" size={26} color={Color.primary} />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Icon name="star" size={15} color={Color.orange} />
              <Icon name="star" size={15} color={Color.orange} />
              <Icon name="star" size={15} color={Color.orange} />
              <Icon name="star" size={15} color={Color.orange} />
              <Icon name="star" size={15} color={Color.grey} />
            </View>
            <Text style={{ fontSize: 13, color: Color.grey }}>365reviews</Text>
          </View>
        </View>
      </View>
      </TouchableOpacity>
      
    );
  };
  const OficeCart = ({ Working }) => {
    return (
      <View style={style.topHotelCard}>
        <View
          style={{
            position: "absolute",
            top: 5,
            right: 5,
            zIndex: 1,
            flexDirection: "row",
          }}
        >
          <Icon name="star" size={15} color={Color.orange} />
          <Text
            style={{ color: Color.dark, fontWeight: "bold", fontSize: 15 }}
          >
            5.0
          </Text>
        </View>
        <Image style={style.topHotelCardImage} source={Working.Image} />
        <View
          style={{ paddingVertical: 5, paddingHorizontal: 10, paddingTop: 20 }}
        >
          <Text style={{ fontSize: 10, fontWeight: "bold" }}>
            {Working.name}
          </Text>
          <Text style={{ fontSize: 7, fontWeight: "bold", color: Color.grey }}>
            {Working.location}
          </Text>
        </View>
      </View>
    );
  };
  const OfficeEvenCart = ({ Working }) => {
    return (
      <View style={style.topHotelCard}>
        <View
          style={{
            position: "absolute",
            top: 5,
            right: 5,
            zIndex: 1,
            flexDirection: "row",
          }}
        >
          <Icon name="star" size={15} color={Color.orange} />
          <Text
            style={{ color: Color.dark, fontWeight: "bold", fontSize: 15 }}
          >
            5.0
          </Text>
        </View>
        <Image style={style.topHotelCardImage} source={Working.Image} />
        <View
          style={{ paddingVertical: 5, paddingHorizontal: 10, paddingTop: 20 }}
        >
          <Text style={{ fontSize: 10, fontWeight: "bold" }}>
            {Working.name}
          </Text>
          <Text style={{ fontSize: 7, fontWeight: "bold", color: Color.grey }}>
            {Working.location}
          </Text>
        </View>
      </View>
    );
  };
  const SlotCart = ({ Working }) => {
    return (
      <View style={style.topHotelCard}>
        <View
          style={{
            position: "absolute",
            top: 5,
            right: 5,
            zIndex: 1,
            flexDirection: "row",
          }}
        >
          <Icon name="star" size={15} color={Color.orange} />
          <Text
            style={{ color: Color.dark, fontWeight: "bold", fontSize: 15 }}
          >
            5.0
          </Text>
        </View>
        <Image style={style.topHotelCardImage} source={Working.Image} />
        <View
          style={{ paddingVertical: 5, paddingHorizontal: 10, paddingTop: 20 }}
        >
          <Text style={{ fontSize: 10, fontWeight: "bold" }}>
            {Working.name}
          </Text>
          <Text style={{ fontSize: 7, fontWeight: "bold", color: Color.grey }}>
            {Working.location}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.white }}>
      <Hearder isShowFunction={true} isShowMassage={true} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <CategoryList /> */}
        {/* Hệ thống co Working Space */}
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 20,
              marginTop: 10,
            }}
          >
            <Text
              style={{ fontWeight: "bold", color: Color.dark, fontSize: 15 }}
            >
              Hệ thống CoWorking Space
            </Text>
            <Text style={{ color: Color.blue }}> Xem Thêm </Text>
          </View>
          <FlatList
            horizontal
            data={Working}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingLeft: 20,
              marginTop: 20,
              paddingBottom: 30,
            }}
            renderItem={({ item }) => <Cart Working={item} />}
          />
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 20,
            }}
          >
            <Text
              style={{ fontWeight: "bold", color: Color.dark, fontSize: 15 }}
            >
              Văn phòng chọn gói
            </Text>
            <Text style={{ color: Color.blue }}> Xem Thêm </Text>
          </View>
          <FlatList
            data={Working}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingLeft: 20,
              marginTop: 20,
              paddingBottom: 30,
              flexDirection: "column",
            }}
            renderItem={({ item }) => <OficeCart Working={item} />}
          />
          
        </View>
        {/* không gian sự kiện */}
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 20,
            }}
          >
            <Text
              style={{ fontWeight: "bold", color: Color.dark, fontSize: 15 }}
            >
              Không gian tổ chức sự kiện
            </Text>
            <Text style={{ color: Color.blue }}> Xem Thêm </Text>
          </View>
          <FlatList
            data={Working}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingLeft: 20,
              marginTop: 20,
              paddingBottom: 30,
              flexDirection: "column",
            }}
            renderItem={({ item }) => <OfficeEvenCart Working={item} />}
          />
        </View>
        {/* Vị trí ngồi */}
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 20,
            }}
          >
            <Text
              style={{ fontWeight: "bold", color: Color.dark, fontSize: 15 }}
            >
              Vị trí ngồi
            </Text>
            <Text style={{ color: Color.blue }}> Xem Thêm </Text>
          </View>
          <FlatList
            data={Working}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingLeft: 20,
              marginTop: 20,
              paddingBottom: 30,
              flexDirection: "column",
            }}
            renderItem={({ item }) => <SlotCart Working={item} />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
 
  cart: {
    height: 280,
    width: cardWidth,
    elevation: 15,
    marginRight: 20,
    borderRadius: 15,
    backgroundColor: Color.white,
  },
  cardImage: {
    height: 200,
    width: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  priceTag: {
    height: 60,
    width: 80,
    backgroundColor: Color.primary,
    position: "absolute",
    zIndex: 1,
    right: 0,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  topHotelCardImage: {
    height: 80,
    width: "100%",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  cardDetails: {
    height: 100,
    borderRadius: 15,
    backgroundColor: Color.white,
    position: "absolute",
    bottom: 0,
    padding: 20,
    width: "100%",
  },
  cardOverLay: {
    height: 280,
    backgroundColor: Color.white,
    position: "absolute",
    zIndex: 100,
    width: cardWidth,
    borderRadius: 15,
  },
  topHotelCard: {
    flexDirection: "row",
    height: 120,
    width: 330,
    backgroundColor: Color.white,
    elevation: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  topHotelCardImage: {
    height: 100,
    width: 150,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
});
export default HomeSreens;
