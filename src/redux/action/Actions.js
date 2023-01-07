import { ACTION_TYPE } from "./Const";
import { auth, database } from "../../consts/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, getAuth, UserCredential, User } from "firebase/auth";
import { handleErrorAuth, showToast, TYPE_NOTI } from "../../consts/common"
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
                    dispatch(getUserInit(res.data.ID))
                }

                else {
                    throw new Error(`Lỗi! Vui lòng điền lại thông tin khác`);
                }
            }).catch(error => {
                console.log('[ERROR][loginFail] ' + error.message)
                dispatch(loginFail(error.response.request._response || error.message))
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
        const url = API.Host + API.Customer
        const bodyFormData = new FormData()
        bodyFormData.append('Address', userInfo.Address);
        bodyFormData.append('DateOfBirth', userInfo.DateOfBirth);
        bodyFormData.append('Email', userInfo.Email);
        bodyFormData.append('FullName', userInfo.FullName);
        bodyFormData.append('Gender', userInfo.Gender)
        bodyFormData.append('IdentifierCode', userInfo.IdentifierCode)
        bodyFormData.append('PhoneNumbers', userInfo.PhoneNumbers)
        bodyFormData.append('Point', userInfo.Point)
        bodyFormData.append('Id', userInfo.ID)

        // console.log(111111111, url, userInfo.ID, userInfo.Email)
        fetch(url,
            {
                body: bodyFormData,
                method: "put"
            })
            .then((res) => {
                if (res.status == 200) {
                    return res.json()
                } else {
                    throw new Error(`Lỗi! Vui lòng điền lại thông tin khác`);
                }
            })
            .then(data =>  {
                dispatch(createUserSuccess(data))
                showToast(TYPE_NOTI.SUCCESS, null, "Update thành công")
            }) 
            .catch(error => {
                showToast(TYPE_NOTI.ERROR, null, "Update không thành công")

                console.log('[ERROR][createUserInit] ' + error.message)
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

const getUserInit = (uid) => {
    return async function (dispatch) {
        dispatch(getUserStart())
        const url = API.Host + API.User + "?" + new URLSearchParams({
            id: uid,
        })

        axios({
            method: 'get',
            url: url,
        })
            .then((res) => {
                console.log('[ERROR][getUserSuccess] ' + JSON.stringify(res.data))
                if (res.status == 200) {
                    dispatch(getUserSuccess(res.data))
                }

                else {
                    throw new Error(`Lỗi! Vui lòng điền lại thông tin khác`);
                }
            }).catch(error => {
                console.log('[ERROR][getUserInit] ' + error.message)
                dispatch(getUserFail(error.response.request._response || error.message))
            })

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
        dispatch(getOfficeListStart())

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
                            return { ...e, Image: require("../../images/hotel/lecafe.png"), Price: 89 }
                        })
                    }
                    // console.log('[ERROR][loginSucc] ' + JSON.stringify(data))
                    dispatch(getOfficeListSuccess(data))
                }

                else {
                    throw new Error(`Lỗi! Vui lòng điền lại thông tin khác`);
                }
            }).catch(error => {
                console.log('[ERROR][getOfficeListInit] ' + error.message)
                dispatch(getOfficeListFail(error.message))
            })

    }
}

// Get user info
const getCategoryStart = () => ({
    type: ACTION_TYPE.GET_CATEGORY_START
})

const getCategorySuccess = (list) => ({
    type: ACTION_TYPE.GET_CATEGORY_SUCCESS,
    payload: list
})

const getCategoryFail = (error) => ({
    type: ACTION_TYPE.GET_CATEGORY_FAIL,
    payload: error
})

const getCategoryInit = () => {
    return async function (dispatch) {
        dispatch(getCategoryStart())

        const url = API.Host + API.CategoryOfficeAll

        axios({
            method: 'get',
            url: url,
        })
            .then((res) => {
                if (res.status == 200) {
                    var data = []
                    if (res.data) {

                        data = res.data.map((e) => {
                            return { ID: e.ID, Name: e.Name, Decription: e.Decription }
                        })
                    }
                    // console.log('[ERROR][Category] ' + JSON.stringify(res.data))
                    dispatch(getCategorySuccess(data))
                }

                else {
                    throw new Error(`Lỗi! Vui lòng điền lại thông tin khác`);
                }
            }).catch(error => {
                console.log('[ERROR][getCategoryInit] ' + error.message)
                dispatch(getCategoryFail(error.message))
            })

    }
}



// Push Booking info
const bookingStart = () => ({
    type: ACTION_TYPE.BOOKING_START
})

const bookingSuccess = (list) => ({
    type: ACTION_TYPE.BOOKING_SUCCESS,
    payload: list
})

const bookingFail = (error) => ({
    type: ACTION_TYPE.BOOKING_FAIL,
    payload: error
})

const bookingInit = (officeId, customId, startTime) => {

    return async function (dispatch) {
        dispatch(bookingStart())

        const url = API.Host + API.Booking
        const bodyFormData = new FormData()
        bodyFormData.append('UserId', customId);
        bodyFormData.append('OfficeId', officeId);
        bodyFormData.append('StartTime', startTime);
        bodyFormData.append('EndTime', startTime);
        bodyFormData.append('Total', 1)
        // console.log(111111111, url, customId, officeId)
        fetch(url,
            {
                body: bodyFormData,
                method: "post"
            })
            .then((res) => {
                if (res.status == 200) {
                    dispatch(bookingSuccess())
                    showToast(TYPE_NOTI.SUCCESS, null, "Booking thành công")
                    dispatch(getBookingHistoryInit(customId))
                } else {
                    throw new Error(`Lỗi! Vui lòng điền lại thông tin khác`);
                }
            }).catch(error => {
                showToast(TYPE_NOTI.ERROR, null, "Booking không thành công")

                console.log('[ERROR][bookingInit] ' + error.message)
                dispatch(bookingFail(error.message))
            })

    }
}


// Push Booking info
const bookingHistoryStart = () => ({
    type: ACTION_TYPE.BOOKING_HISTORY_START
})

const bookingHistorySuccess = (list) => ({
    type: ACTION_TYPE.BOOKING_HISTORY_SUCCESS,
    payload: list
})

const bookingHistoryFail = (error) => ({
    type: ACTION_TYPE.BOOKING_HISTORY_FAIL,
    payload: error
})

const getBookingHistoryInit = (userId) => {

    return async function (dispatch) {
        dispatch(bookingHistoryStart())

        const url = API.Host + API.BookingHistory + `?id=${userId}`

        console.log(111111111, url, userId)
        axios({
            method: 'get',
            url: url,
        })
            .then((res) => {
                if (res.status == 200) {
                    if (res.data) {
                        // console.log('[SUCC][getBookingHistoryInit] ' + JSON.stringify(res.data))

                        dispatch(bookingHistorySuccess(res.data))
                        // showToast(TYPE_NOTI.SUCCESS, null, "Booking thành công")
                    }
                } else {
                    throw new Error(`Lỗi! Vui lòng điền lại thông tin khác`);
                }
            }).catch(error => {
                showToast(TYPE_NOTI.ERROR, null, "Booking không thành công")

                console.log('[ERROR][bookingInit] ' + error.message)
                dispatch(bookingHistoryFail(error.message))
            })

    }
}

export { loginInit, logoutSuccess, registerInit, createUserInit, getUserInit, getOfficeListInit, bookingInit, getCategoryInit, getBookingHistoryInit }
