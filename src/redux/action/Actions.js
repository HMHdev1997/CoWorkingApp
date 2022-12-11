import { ACTION_TYPE } from "./Const";
import { auth } from "../../consts/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, getAuth, UserCredential, User } from "firebase/auth";
import { handleErrorAuth } from "../../consts/common"
import { doc, DocumentData, DocumentSnapshot, getDoc, getFirestore, updateDoc, setDoc } from "firebase/firestore";


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

const loginInit = (email, password) => {
    return function (dispatch) {
        dispatch(loginStart())
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(getUserInit())
                dispatch(loginSuccess(user))
            })
            .catch((error) => {
                console.log('[ERROR][loginFail] ' + error)
                dispatch(loginFail(handleErrorAuth(error.code)))
                dispatch(loginSuccess({}))
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

const registerInit = (email, password) => {
    return function (dispatch) {
        dispatch(registerStart())
        createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(registerSuccess(user))
                createUserInit({
                    email: auth.currentUser?.email ? auth.currentUser?.email : undefined,
                    register_date: auth.currentUser.metadata.creationTime
                })
            })
            .catch((error) => {
                console.log('[ERROR][registerFail] ' + error.code)
                console.log('[ERROR][registerFail] ' + error.message)

                dispatch(registerFail(handleErrorAuth(error.code)))
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
            dispatch(getUserFail(error))
        }
    }
}

export { loginInit, logoutSuccess, registerInit, createUserInit, getUserInit }
