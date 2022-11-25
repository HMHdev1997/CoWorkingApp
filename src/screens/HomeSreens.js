import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Color from "../consts/Color";
import Icon from "react-native-vector-icons/MaterialIcons";


const HomeSreens = ({route, navigation }) => {
  const category = ["All", "Top Rated", "Luxury"];
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
  const { account } = route?.params || {};


  const CategoryList = () => {
    return (
      <View style={style.categoryListContainer}>
        {category.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setSelectedCategoryIndex(index)}
          >
            <View>
              <Text
                style={{
                  ...style.categoryListText,
                  color:
                    selectedCategoryIndex == index ? Color.primary : Color.grey,
                }}
              >
                {item}
              </Text>
              {selectedCategoryIndex == index && (
                <View
                  style={{
                    height: 3,
                    width: 30,
                    backgroundColor: Color.primary,
                    marginTop: 2,
                  }}
                ></View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.white }}>
      <View style={style.header}>
        <View style={{ paddingBottom: 15 }}>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>Xin Chào</Text>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{ fontSize: 25, fontWeight: "bold", color: Color.red }}
            >
             {account}
            </Text>
          </View>
        </View>
        <TouchableOpacity >
          <Icon name="person-outline" size={45} color={Color.grey} />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.searchInputContainer}>
          <Icon
            name="search"
            size={35}
            color={Color.light}
            style={{ marginLeft: 10, alignItems: "center" }}
          />
          <TextInput
            placeholder="Search"
            style={{ fontSize: 20, paddingLeft: 10 }}
          />
        </View>
        <CategoryList />
      </ScrollView>
    </SafeAreaView>
  );
};


const style = StyleSheet.create({
  header: {
    marginTop: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: Color.grey,
    marginTop: 5,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  categoryListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 30,
  },
  categoryListText: {
    fontSize: 17,
    fontWeight: "bold",
  },
});
export default HomeSreens;
