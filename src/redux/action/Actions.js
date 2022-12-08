import { ACTION_TYPE } from "./Const";
import { auth } from "../../consts/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, getAuth, UserCredential, User } from "firebase/auth";
import { handleErrorAuth } from "../../consts/common"
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

export { loginInit, logoutSuccess }
