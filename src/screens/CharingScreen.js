import { View, Text, Pressable, Image, TouchableOpacity, TextInput, Alert, Modal, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import Color from "../consts/Color"
import { showToast, TYPE_NOTI, windowsHeight, windowsWith } from '../consts/common'
import { HeaderBar } from '../navigation/Header'
import CustomButton from '../custom_component/CustomButton'
import { useDispatch, useSelector } from 'react-redux'
import { updatePointInit } from '../redux/action/Actions'
import { isIOS } from '../custom_component/CustomAvatar'

const CModal = ({ modalVisible, setModalVisible, onPressX }) => {

  return (
    <View style={{
    }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={{
            justifyContent: "center",
            alignItems: "center",
            width: windowsWith * 0.9,
            alignSelf: "center",
            height: 0.4 * windowsHeight,
            backgroundColor: Color.light,
            borderRadius: 15,
            borderWidth: 1,
            borderColor: Color.lightblue,

          }}>
            <Text style={{
              fontSize: 24,
              fontWeight: "500",
              color: Color.lightblue,
              position: "absolute",
              top: "5%",
            }}>
              Choọn phương thức thanh toán
            </Text>
            <TouchableOpacity
              style={{
                marginTop: 10,
                marginHorizontal: "5%",
                paddingVertical: 2,
                borderRadius: 15,
                borderWidth: 2,
                borderColor: Color.lightblue,
                backgroundColor: Color.white,
                flexDirection: "row",
                width: "90%",
              }}
              onPress={() => {

                onPressX()
                setModalVisible(!modalVisible);
              }}
            >
              <View style={{ flex: 1 }}>
                <Image source={require("../../assets/MoMo_Logo.png")} style={{
                  flex: 1,
                  width: 50,
                  height: 50,
                  resizeMode: 'contain',
                  alignSelf: "flex-start",

                }}></Image>
              </View>
              <View style={{ flex: 1, justifyContent: "center", alignContent: "center" }}>
                <Text style={{ fontSize: 20, fontWeight: "500", color: Color.lightblue }}>
                  Momo
                </Text>
              </View>

            </TouchableOpacity>
            <View style={{ bottom: "5%", position: "absolute" }}>
              <CustomButton
                onPress={() => setModalVisible(false)}
                name={"Ẩn"}>
              </CustomButton>
            </View>

          </View>

        </View>
      </Modal>
      <CustomButton name={"Nạp"} onPress={() => {
        setModalVisible(true)
      }}></CustomButton>
    </View>


  )
}

const CharingScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [changingPoint, setChangingPoint] = useState(0);
  const { currentUser } = useSelector((state) => state.user)
  const { userInfo } = useSelector((state) => state.userInfo)

  const dispatch = useDispatch();
  const onPressMomo = () => {
    const changingPointNumber = Number(changingPoint);
    const curPoint = userInfo?.Point || 0
    // console.log(changingPointNumber, curPoint, currentUser?.ID)

    if (currentUser?.ID && changingPointNumber > 0) {
      dispatch(updatePointInit(currentUser?.ID, curPoint + changingPointNumber, true))
      return
    }
    showToast(TYPE_NOTI.ERROR, null, "Point không hợp lệ")
  }
  const showConfirmDialog = () => {
    // const condition = (userInfo?.Point && data.price <= userInfo.Point)
    return Alert.alert(
      `Nap tien`
      ,
      () => { return <View></View> },
      [
        {
          text: `Đặt phòng`,
          onPress: () => { },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "Hủy",
        },
      ]
    );
  }

  return (
    <View style={{ minHeight: windowsHeight, backgroundColor: Color.white }}>
      <HeaderBar title={"Nạp tiền"} navigation={navigation}></HeaderBar>
      <View style={{
        position: "absolute",
        top: 100,
        width: "100%",
      }}>
        <View style={{
          justifyContent: "center",
          width: windowsWith,
          marginLeft: "5%"
        }}>
          <Text style={{ fontSize: 24, fontWeight: "500", color: Color.lightblue }}>
            Chọn số point cần nạp:
          </Text>
          <TextInput style={{
            fontSize: 40,
            width: "90%",
            color: Color.lightblue,
            borderRadius: 15,
          }}
            placeholder={"..."}
            keyboardType={"numeric"}
            value={changingPoint}
            onChangeText={(text) => {
              setChangingPoint(text)
            }}
          ></TextInput>
        </View>


      </View>
      <View style={styles.cardDetails}>
        <CModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          onPressX={onPressMomo} />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  cardDetails: {
    justifyContent: "center",
    alignItems: "center",
    height: 0.2 * windowsHeight,
    borderRadius: 25,
    backgroundColor: Color.white,
    borderWidth: 0.5,
    borderColor: Color.grey,
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row"
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default CharingScreen