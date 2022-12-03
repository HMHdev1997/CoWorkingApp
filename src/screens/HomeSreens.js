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
import Hearder from "../navigation/Header";
import CustomLabel from "../custom_component/CustomLabel";

const eventList = [
  {
    title: "Sông Hồng Hotel",
    description: "Long Biên, Hà Nội",
    source: require("../images/hotel/hongriversun.jpg"),
  },
  {
    title: "Le Cafe Hotel",
    description: "Ba Đình, Hà Nội",
    source: require("../images/hotel/lecafe.png"),
  },
  {
    title: "Trống Đồng Hotel",
    description: "",
    source: require("../images/hotel/trongdong.jpg"),
  },
  {
    title: "Acoustic Hotel",
    description: "",
    source: require("../images/hotel/acoustic.jpg"),
  },
  {
    title: "Bendecir Hotel",
    description: "",
    source: require("../images/hotel/bendecir.jpg"),
  },
  {
    title: "Bishub Hotel",
    description: "",
    source: require("../images/hotel/bishub.jpg"),
  },
  {
    title: "Melia Hotel",
    description: "",
    source: require("../images/hotel/melia.jpg"),
  },
]

const topRateList = [
  {
    title: "Acoustic Hotel",
    description: "",
    source: require("../images/hotel/acoustic.jpg"),
  },
  {
    title: "Bendecir Hotel",
    description: "",
    source: require("../images/hotel/bendecir.jpg"),
  },
  {
    title: "Bishub Hotel",
    description: "",
    source: require("../images/hotel/bishub.jpg"),
  },
]

const LuxuryList = [
 
  {
    title: "Bishub Hotel",
    description: "",
    source: require("../images/hotel/bishub.jpg"),
  },
  {
    title: "Melia Hotel",
    description: "",
    source: require("../images/hotel/melia.jpg"),
  },
  {
    title: "Acoustic Hotel",
    description: "",
    source: require("../images/hotel/acoustic.jpg"),
  },
  {
    title: "Bendecir Hotel",
    description: "",
    source: require("../images/hotel/bendecir.jpg"),
  },
]

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
                    width: "100%",
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
     
      <Hearder isShowFunction={true} isShowMassage={true}/>
      <ScrollView showsVerticalScrollIndicator={false} >
       
        {/* <View style={style.searchInputContainer}>
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
        </View> */}
        <CategoryList/>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginTop: "5%"}}>
          {selectedCategoryIndex == 0 && eventList.map((e, i) => <CustomLabel key={i} title={e.title} source={e.source} description={e.description}></CustomLabel>)}
          {selectedCategoryIndex == 1 && topRateList.map((e, i) => <CustomLabel key={i} title={e.title} source={e.source} description={e.description}></CustomLabel>)}
          {selectedCategoryIndex == 2 && LuxuryList.map((e, i) => <CustomLabel key={i} title={e.title} source={e.source} description={e.description}></CustomLabel>)}

        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};


const style = StyleSheet.create({

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
    marginTop: "10%",
  },
  categoryListText: {
    paddingHorizontal: 20,
    fontSize: 17,
    alignItems: "center",
    fontWeight: "bold",
  },
});
export default HomeSreens;
