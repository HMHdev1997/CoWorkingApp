import { ACTION_TYPE } from "../action/Const"

const initialUserState = {
    loading: false,
    currentUser: null,
    error: null
}

const userReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case ACTION_TYPE.LOGIN_START:
        case ACTION_TYPE.REGISTER_START:
            return {
                ...state,
                error: null,
                loading: true
            }
        case ACTION_TYPE.LOGIN_SUCCESS:
        case ACTION_TYPE.REGISTER_SUCCESS:
            const newState = {
                ...state,
                loading: false,
                error: null,
                currentUser: action.payload
            }
            return newState
        case ACTION_TYPE.LOGIN_FAIL:
        case ACTION_TYPE.REGISTER_FAIL:
            state = {
                ...state,
                loading: false,
                error: action.payload
            }
            return state
        case ACTION_TYPE.LOGOUT_SUCCESS:
            state = {
                ...state,
                loading: false,
                error: null,
                currentUser: null
            }
            return state
        default:
            return state

    }
}

const initialUserInfoState = {
    loading: false,
    userInfo: null,
    error: null
}

const userInfoReducer = (state = initialUserInfoState, action) => {
    switch (action.type) {
        case ACTION_TYPE.GET_USER_INFO_START:
        case ACTION_TYPE.CREATE_USER_INFO_START:
        case ACTION_TYPE.UPDATE_USER_INFO_START:
            const newState = {
                ...state,
                error: null,
                loading: true
            }
            return newState
        case ACTION_TYPE.GET_USER_INFO_SUCCESS:
        case ACTION_TYPE.CREATE_USER_INFO_SUCCESS:
        case ACTION_TYPE.UPDATE_USER_INFO_SUCCESS:

            return {
                ...state,
                loading: false,
                error: null,
                userInfo: {...action.payload}
            }
        case ACTION_TYPE.GET_USER_INFO_FAIL:
        case ACTION_TYPE.CREATE_USER_INFO_FAIL:
        case ACTION_TYPE.UPDATE_USER_INFO_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                userInfo: null,
            }
        case ACTION_TYPE.LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                userInfo: null
            }
        default:
            return state

    }
}

export { userReducer, userInfoReducer } 