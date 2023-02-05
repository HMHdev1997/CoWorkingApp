import { ACTION_TYPE } from "./Const";
import { auth, database } from "../../consts/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, getAuth, UserCredential, User } from "firebase/auth";
import { handleErrorAuth, showToast, TYPE_NOTI } from "../../consts/common"
import { doc, query, limit, DocumentData, DocumentSnapshot, getDoc, getFirestore, updateDoc, setDoc, getDocs, collection } from "firebase/firestore";
import { API, getOfficebyId, sendReq } from "../../consts/request"
import axios from 'axios';
import { async } from "@firebase/util";

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
                    dispatch(getOfficeListInit(1))
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
                    dispatch(getOfficeListInit(1))
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
            .then((data) => {
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

const getOfficeListSuccess = (list, info) => ({
    type: ACTION_TYPE.GET_OFFICE_LIST_SUCCESS,
    payload: list,
    pageIndex: info.pageIndex,
    totalRecords: info.totalRecords,
    pageCount: info.pageCount,
})

const getOfficeListFail = (error) => ({
    type: ACTION_TYPE.GET_OFFICE_LIST_FAIL,
    payload: error
})

const getOfficeListInit = (id) => {
    return async function (dispatch) {
        if (id == -1 || id == 1) {
            dispatch(getOfficeListStart())
        }

        const url = API.Host + API.Office + "?" + new URLSearchParams({
            AreaId: API.AreaId,
            PageIndex: id,
            PageSize: 5,
            TotalRecords: 10,
            PageCount: 10,
        })

        await axios({
            method: 'get',
            url: url,
        })
            .then(async (res) => {
                if (res.status == 200) {
                    var data = []
                    if (res.data.Item) {

                        data = await Promise.all(res.data.Item.map(async (e) => {
                            return await getOfficebyId(e.ID)
                        }))
                    }

                    dispatch(getOfficeListSuccess(data, {
                        pageIndex: id,
                        pageCount: res.data.PageCount || 0,
                        totalRecords: res.data.TotalRecords || 0
                    }))
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

const bookingInit = (officeId, customId, startTime, endTime, price, nSeat, note) => {

    return async function (dispatch) {
        dispatch(bookingStart())

        const url = API.Host + API.Booking
        const BookingDetailUrl = API.Host + API.BookingDetail
        const bodyFormData = new FormData()
        bodyFormData.append('UserId', customId);
        bodyFormData.append('OfficeId', officeId);
        bodyFormData.append('StartTime', startTime);
        bodyFormData.append('EndTime', endTime);
        bodyFormData.append('Total', 1)

        try {
            const res = await fetch(url,
                {
                    body: bodyFormData,
                    method: "post"
                })
            if (res.status == 200) {
                const data = await res.json()
                const bookingId = data.ID
                const BookingDetailData = new FormData()
                BookingDetailData.append("BookingId", bookingId)
                BookingDetailData.append("Number", nSeat)
                BookingDetailData.append("Price", price)
                BookingDetailData.append("StartTime", startTime)
                BookingDetailData.append("EndTime", endTime)
                BookingDetailData.append("Note", note)
                // BookingDetailData.append("BookingId", bookingId)
                console.log(bookingId)

                const resBookingDetail = await fetch(BookingDetailUrl,
                    {
                        body: BookingDetailData,
                        method: "post"
                    })

                if (resBookingDetail.status == 200) {
                    dispatch(bookingSuccess())
                    showToast(TYPE_NOTI.SUCCESS, null, "Booking thành công")
                    dispatch(getBookingHistoryInit(customId))
                    const detailBody = await resBookingDetail.json()
                }
            } else {
                throw new Error(`Lỗi! Vui lòng điền lại thông tin khác`);
            }
        } catch (error) {
            showToast(TYPE_NOTI.ERROR, null, "Booking không thành công")

            console.log('[ERROR][bookingInit] ' + error.message)
            dispatch(bookingFail(error.message))
        }



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
