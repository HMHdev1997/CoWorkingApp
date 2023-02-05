import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, TextInput, Text, Pressable, Keyboard, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Button } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Color from "../consts/Color";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faLocation, faLocationArrow, faMapLocationDot, faSearch } from "@fortawesome/free-solid-svg-icons";
import CustomInput from "../custom_component/CustomInput";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";

const Header = ({ navigation }) => {
  return (
    <View style={{
      height: 100,
      backgroundColor: Color.white,
      borderColor: Color.grey,
      position: "absolute",
      top: 20,
      width: "100%",
      flexDirection: "row",
      justifyContent: "center"
    }}>

      <View style={{ left: 20, top: 20, position: "absolute", }}>
        <Icon
          name="arrow-back-ios"
          size={28}
          color={Color.lightblue}
          onPress={() => { navigation.goBack() }}
        />
      </View>

    </View>
  )
}


const Maps = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const { officeList } = useSelector((state) => state.officeList)

  const item = route.params;
  const [mapCor, setMapCor] = useState({
    latitude: 21.0273,
    longitude: 105.84604,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [mapRegion, setMapRegion] = useState({
    title: "title",
    description: "description",
    latitude: 21.0273,
    longitude:  105.84604,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [mapRegionOffice, setMapRegionOffice] = useState({
    title:  "title",
    description: "description",
    latitude: 21.0273,
    longitude: 105.84604,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    if (item?.title) {
      setMapRegion({
        title: item.title,
        description: item.description,
        latitude: item.Latitude/100000,
        longitude: item.Longitude/100000,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setMapRegionOffice({
        title: item.title,
        description: item.description,
        latitude: item.Latitude/100000,
        longitude: item.Longitude/100000,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }
  }, [item])
  const userLocation = async () => {

    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setErrorMsg("Permisson to access location was denied");
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    setMapRegion({
      latitude: 21.0273,
      longitude: 105.84604,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    setMapRegion(() => {
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }

    });
    setMapCor({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };
  // useEffect(() => {
  //   userLocation();
  // }, []);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />

      <MapView style={styles.map} region={mapRegion} onPress={Keyboard.dismiss}>
        <Marker coordinate={mapCor} title="Marker" pinColor={Color.lightblue} />
        <Marker coordinate={mapRegionOffice} title={mapRegionOffice.title} description={mapRegionOffice.description} pinColor={Color.red} />

      </MapView>
      {/* <Button title="Get Location" onPress={userLocation}> </Button> */}
      <TouchableOpacity style={{ left: 20, top: 20, position: "absolute", }} onPress={() => { navigation.goBack() }}>
        <Icon
          name="arrow-back-ios"
          size={28}
          color={Color.lightblue}
        // onPress={() => { navigation.goBack() }}
        />
      </TouchableOpacity>
      <View style={{ position: "absolute", top: 10, width: "100%", flexDirection: "row", marginTop: "10%" }}>
        <View style={{ flex: 5 }}>
          <CustomInput width='90%' style={styles.txtSearch} name={"Tìm Kiếm"} isNotNullable={false}></CustomInput>
        </View>
        <Pressable style={{ flex: 1, marginVertical: Dimensions.get('screen').height * 0.02 }}>
          <FontAwesomeIcon size={30} icon={faSearch} color={Color.lightblue}></FontAwesomeIcon>
        </Pressable>
      </View>
      <Pressable onPress={userLocation} style={{ position: "absolute", bottom: "5%", flexDirection: "row-reverse", width: "100%", right: "5%" }}>
        <FontAwesomeIcon size={50} icon={faMapLocationDot} color={Color.lightblue} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
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
});
export default Maps;
