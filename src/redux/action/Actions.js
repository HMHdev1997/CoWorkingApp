import { ACTION_TYPE } from "./Const";
import { auth, database } from "../../consts/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, getAuth, UserCredential, User } from "firebase/auth";
import { handleErrorAuth } from "../../consts/common"
import { doc, query, limit, DocumentData, DocumentSnapshot, getDoc, getFirestore, updateDoc, setDoc, getDocs, collection } from "firebase/firestore";
import { API, sendReq } from "../../consts/request"
import axios from 'axios';

// Login
const loginStart = () => ({
    type: ACTION_TYPE.LOGIN_START
})

const loginSuccess = (user) => ({
    type: ACTION_TYPE.LOGIN_SUCCESS,
    payload: user
})

const loginFail = (error) => ({
    type: ACTION_TYPE.LOGIN_FAIL,
    payload: error
})

const loginInit = (email, password, isPhone) => {
    return function (dispatch) {
        dispatch(loginStart())
        // signInWithEmailAndPassword(auth, email, password)
        //     .then(({ user }) => {
        //         dispatch(getUserInit())
        //         dispatch(loginSuccess(user))
        //     })
        //     .catch((error) => {
        //         console.log('[ERROR][loginFail] ' + error)
        //         dispatch(loginFail(handleErrorAuth(error.code)))
        //         dispatch(loginSuccess({}))
        //     })

        const url = API.Host + API.UserLogin + "?" + new URLSearchParams({
            email: isPhone ? "" : email,
            password: password,
            phoneNumber: isPhone ? email : ""
        })

        axios({
            method: 'get',
            url: url,
        })
            .then((res) => {
                console.log('[ERROR][loginSucc] ' + JSON.stringify(res.data))
                if (res.status == 200) {
                    dispatch(loginSuccess(res.data))
                }
              
                else {               
                    throw new Error(`Lỗi! Vui lòng điền lại thông tin khác`);
                }
            }).catch(error => {
                console.log('[ERROR][loginFail] ' + error.message)
                dispatch(loginFail(error.response.request._response))
            })
    }
}

// Logout
const logoutSuccess = () => ({
    type: ACTION_TYPE.LOGOUT_SUCCESS,
})

// Register
const registerStart = () => ({
    type: ACTION_TYPE.REGISTER_START
})

const registerSuccess = (user) => ({
    type: ACTION_TYPE.REGISTER_SUCCESS,
    payload: user
})

const registerFail = (error) => ({
    type: ACTION_TYPE.REGISTER_FAIL,
    payload: error
})

const registerInit = (name, email, phone, password) => {
    return function (dispatch) {

        dispatch(registerStart())
        const url = API.Host + API.User 
        const bodyFormData = new FormData()
        bodyFormData.append('Name', name);
        bodyFormData.append('Email', email);
        bodyFormData.append('PhoneNumbers', phone);
        bodyFormData.append('Password', password);
        axios({
            method: 'post',
            url: url,
            data: bodyFormData,
            headers: { "Content-Type": "multipart/form-data", "accept": "application/json" },
        })
            .then((res) => {
                console.log('[ERROR][registerSucc] ' + JSON.stringify(res.data))
                if (res.status == 200) {
                    dispatch(registerSuccess(res.data))
                } 
            
                else {
                    throw new Error(`Lỗi! Vui lòng điền lại thông tin khác`);
                }
            }).catch(error => {
                console.log('[ERROR][registerFail] ' + error.message)
                dispatch(registerFail(error.response.request._response))
            })

    }
}

//Create user info
const createUserStart = () => ({
    type: ACTION_TYPE.CREATE_USER_INFO_START
})

const createUserSuccess = (user) => ({
    type: ACTION_TYPE.CREATE_USER_INFO_SUCCESS,
    payload: user
})

const createUserFail = (error) => ({
    type: ACTION_TYPE.CREATE_USER_INFO_FAIL,
    payload: error
})

const createUserInit = (userInfo) => {
    return async function (dispatch) {
        dispatch(createUserStart())
        const auth = getAuth()
        updateProfile(auth.currentUser, { displayName: userInfo.name, phoneNumber: userInfo.phone })
        const docRef = doc(getFirestore(), "Customers", auth.currentUser?.uid);
        // Set the 'capital' field of the city
        setDoc(docRef, { ...userInfo }, { merge: true })
            .then(() => {
                dispatch(createUserSuccess({ ...userInfo, id: auth.currentUser?.uid }))
            })
            .catch((error) => {
                console.log('[ERROR][createUserFail] ' + error.message)
                dispatch(createUserFail(error.message))
            })
    }
}

// Get user info
const getUserStart = () => ({
    type: ACTION_TYPE.GET_USER_INFO_START
})

const getUserSuccess = (user) => ({
    type: ACTION_TYPE.GET_USER_INFO_SUCCESS,
    payload: user
})

const getUserFail = (error) => ({
    type: ACTION_TYPE.GET_USER_INFO_FAIL,
    payload: error
})

const getUserInit = () => {
    return async function (dispatch) {
        dispatch(getUserStart())
        // const expoToken = await registerForPushNotificationsAsync()
        const docRef = doc(getFirestore(), "Customers", auth.currentUser?.uid);

        try {
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                dispatch(getUserSuccess({ ...docSnap.data(), id: auth.currentUser?.uid }))
            } else {
                // doc.data() will be undefined in this case
                dispatch(getUserSuccess({ age: 0 }))
                console.log("No such document!");
                // dispatch(getUserFail({error: "No document"}))
            }
        } catch (error) {
            dispatch(getUserFail(error.message))
        }
    }
}

// Get user info
const getOfficeListStart = () => ({
    type: ACTION_TYPE.GET_OFFICE_LIST_START
})

const getOfficeListSuccess = (list) => ({
    type: ACTION_TYPE.GET_OFFICE_LIST_SUCCESS,
    payload: list
})

const getOfficeListFail = (error) => ({
    type: ACTION_TYPE.GET_OFFICE_LIST_FAIL,
    payload: error
})

const getOfficeListInit = () => {
    return async function (dispatch) {
    //     dispatch(getOfficeListStart())
    //     const OfficeRef = collection(database, "Office");

    //     const q = query(OfficeRef, limit(10));

    //     getDocs(q)
    //         .then((querySnapshot) => {

    //             const List = querySnapshot.docs.map((doc) => {
    //                 const data = doc?._document.data.value.mapValue.fields

    //                 if (data) {
    //                     const objectK = Object.keys(data)
    //                     const newO = { ...data }

    //                     objectK.forEach((e) => {
    //                         newO[e] = data[e][Object.keys(data[e])[0]]
    //                     })
    //                     // console.log("0111", '[OK][createUserFail] ' + JSON.stringify(newO))
    //                     return { ...newO, Image: require("../../images/hotel/lecafe.png") }
    //                 }
    //                 return { Image: require("../../images/hotel/lecafe.png") };
    //             });
    //             dispatch(getOfficeListSuccess(List))

    //         })
    //         .catch((e) => {
    //             console.log('[ERROR][createUserFail] ' + e.message)
    //             dispatch(getOfficeListFail(e.message))
    //         })
        const url = API.Host + API.Office + "?" + new URLSearchParams({
            AreaId: API.AreaId,
            PageIndex: 1,
            PageSize: 10,
            TotalRecords: 10,
            PageCount: 10,
        })

        axios({
            method: 'get',
            url: url,
        })
            .then((res) => {
                if (res.status == 200) {
                    var data = []
                    if (res.data.Item) {

                        data = res.data.Item.map((e) => {
                            return {...e, Image: require("../../images/hotel/lecafe.png"), Price: 89}
                        })
                    }
                    // console.log('[ERROR][loginSucc] ' + JSON.stringify(data))
                    dispatch(getOfficeListSuccess(data))
                }
              
                else {               
                    throw new Error(`Lỗi! Vui lòng điền lại thông tin khác`);
                }
            }).catch(error => {
                console.log('[ERROR][loginFail] ' + error.message)
                dispatch(getOfficeListFail( error.message))
            })

    }
}

export { loginInit, logoutSuccess, registerInit, createUserInit, getUserInit, getOfficeListInit }
