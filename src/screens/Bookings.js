import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { useEffect, useState } from "react";
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Keyboard,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Color from "../consts/Color";
import BookingLabel from "../custom_component/BookingLabel";
import CustomInput from "../custom_component/CustomInput";
const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;
import Working from "../consts/Working";
import { useSelector } from "react-redux";
const CategoryList = () => {
  const category = ["tất cả","HOT", "đã lưu"];
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
  
  return (
    <View style={styles.categoryListContainer}>
      {category.map((item, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={0.8}
          onPress={() => setSelectedCategoryIndex(index)}
        >
          <View>
            <Text
              style={{
                ...styles.categoryListText,
                color:
                  selectedCategoryIndex == index ? Color.primary : Color.grey,
              }}
            >
              {item}
            </Text>
            {selectedCategoryIndex == index && (
              <View
              // style={{
              //   height: 3,
              //   width: "100%",
              //   backgroundColor: Color.primary,
              //   marginTop: 2,
              // }}
              ></View>
            )}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const Bookings = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [searchedList, setSList] = useState([]);
  const {officeList} = useSelector((state) => state.officeList)
  useEffect(() => {
    setSList(officeList)
  }, [officeList])
  const onSearch = () => {
    Keyboard.dismiss();
    if (search == "") {
      setSList(eventList);
    } else {
      setSList(
        eventList.filter(
          (e) =>
            e.title.toLowerCase().includes(search.toLowerCase()) ||
            e.description.toLowerCase().includes(search.toLowerCase()) ||
            e.checkinTime.toLowerCase().includes(search.toLowerCase()) ||
            e.price.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  };
  return (
    <View>
      <View
        style={{
          top: 10,
          width: "100%",
          flexDirection: "row",
          marginTop: "10%",
        }}
      >
        <View style={{ flex: 5 }}>
          <CustomInput
            width="90%"
            style={styles.txtSearch}
            name={"Tìm Kiếm"}
            isNotNullable={false}
            value={search}
            setValue={setSearch}
          ></CustomInput>
        </View>
        <Pressable
          style={{
            flex: 1,
            marginVertical: Dimensions.get("screen").height * 0.02,
          }}
          onPress={onSearch}
        >
          <FontAwesomeIcon
            size={30}
            icon={faSearch}
            color={Color.lightblue}
          ></FontAwesomeIcon>
        </Pressable>
      </View>
      <CategoryList />

      <ScrollView>
        {officeList.map((e, i) => (
          <BookingLabel
            key={i}
            title={e.Name}
            source={e.Image}
            description={e.Detail}
            checkinTime={"08:00-20:00"}
            price={e.Price}
            onPress={() => navigation.navigate("DetailsScreen", e)}
          ></BookingLabel>
        ))}
        <View style={{ height: HEIGHT * 0.2 }}></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  txtSearch: {
    borderRadius: 20,
    marginLeft: 20,
    color: "#000",
    borderColor: "#666",
    backgroundColor: "#FFF",
    borderWidth: 1,
    height: 45,
    paddingHorizontal: 10,
    fontSize: 18,
  },
  categoryListContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginLeft: 0,
    marginTop: 10,
  },
  categoryListText: {
    paddingHorizontal: 20,
    fontSize: 17,
    alignItems: "center",
    fontWeight: "bold",
  },
});

export default Bookings;
