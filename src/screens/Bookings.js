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
  RefreshControl,
} from "react-native";
import Color from "../consts/Color";
import BookingLabel from "../custom_component/BookingLabel";
import CustomInput from "../custom_component/CustomInput";
const WIDTH = Dimensions.get("screen").width;
const HEIGHT = Dimensions.get("screen").height;
import Working from "../consts/Working";
import { useDispatch, useSelector } from "react-redux";
import { getOfficeListInit } from "../redux/action/Actions";
const CategoryList = () => {
  const category = ["Tất cả", "HOT", "Đã lưu"];
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
  const { officeList } = useSelector((state) => state.officeList)
  const dispatch = useDispatch()
  const [refreshing, setRefreshing] = useState(false)
  const [scrollEnabled, setScrollEnabled] = useState(true)
  const onRefresh = () => {
    setRefreshing(true)
    dispatch(getOfficeListInit())
  }
  useEffect(() => {
    setRefreshing(false)
    // if (officeList.length == 0) {
    //   dispatch(getOfficeListInit())
    // }
    setSList(officeList)
  }, [officeList])
  const onSearch = () => {
    Keyboard.dismiss();
    if (search == "") {
      setSList(officeList);
    } else {
      setSList(
        searchedList.filter(
          (e) =>
            e.NameOffice.toLowerCase().includes(search.toLowerCase()) ||
            e.Detail.toLowerCase().includes(search.toLowerCase()) ||
            e.Address.toLowerCase().includes(search.toLowerCase()) ||
            e.GenenalDecription.toLowerCase().includes(search.toLowerCase())
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
        <TouchableOpacity
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
        </TouchableOpacity>
      </View>
      <CategoryList />

      <ScrollView
        refreshControl={<RefreshControl enabled={scrollEnabled} refreshing={refreshing} onRefresh={onRefresh}></RefreshControl>}
      >
        {searchedList.map((e, i) => (
          <BookingLabel
            navigation={navigation}
            key={i}
            item={e}
            title={e.NameOffice}
            source={{ uri: "data:image/jpeg;base64," + e.ImageList[0] }}
            description={e.Detail}
            address={e.Address}
            checkinTime={"08:00-20:00"}
            price={e.Discount}
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
