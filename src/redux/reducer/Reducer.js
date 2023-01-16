import { mergeByProperty } from "../../consts/common"
import { ACTION_TYPE } from "../action/Const"

const initialUserState = {
    loading: false,
    currentUser: null,
    error: null,
    phoneN: "",
}

const userReducer = (state = initialUserState, action) => {
    switch (action.type) {
        case ACTION_TYPE.LOGIN_START:
        case ACTION_TYPE.REGISTER_START:
            return {
                ...state,
                error: null,
                loading: true,
                currentUser: null
            }
        case ACTION_TYPE.LOGIN_SUCCESS:
        case ACTION_TYPE.REGISTER_SUCCESS:
            const newState = {
                ...state,
                loading: false,
                error: null,
                currentUser: action.payload,
                phoneN: action.payload.PhoneNumbers
            }
            return newState
        case ACTION_TYPE.LOGIN_FAIL:
        case ACTION_TYPE.REGISTER_FAIL:
            state = {
                ...state,
                loading: false,
                error: action.payload,
                currentUser: null
            }
            return state
        case ACTION_TYPE.LOGOUT_SUCCESS:
            state = {
                ...state,
                loading: false,
                error: null,
                currentUser: null,
                phoneN: "",
            }
            return state
        default:
            return state

    }
}

const initialUserInfoState = {
    loading: false,
    userInfo: null,
    error: null,
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
                userInfo: { ...action.payload },
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
                userInfo: null,
            }
        default:
            return state

    }
}

const initialOfficeListState = {
    loading: false,
    officeList: [],
    error: null,
    pageIndex: 0,
    pageCount: 0,
    totalRecords: 0
}
const officeListReducer = (state = initialOfficeListState, action) => {
    switch (action.type) {
        case ACTION_TYPE.GET_OFFICE_LIST_START:
            const newState = {
                ...state,
                error: null,
                loading: true,
                officeList: [],
                pageIndex: 0
            }
            return newState
        case ACTION_TYPE.GET_OFFICE_LIST_SUCCESS:
            mergeByProperty(state.officeList, action.payload, "ID")
            return {
                ...state,
                loading: false,
                error: null,
                officeList: [...state.officeList],
                pageIndex: action.pageIndex,
                totalRecords: action.totalRecords,
                pageCount: action.pageCount,
            }
        case ACTION_TYPE.GET_OFFICE_LIST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                officeList: [],
            }
        case ACTION_TYPE.LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                officeList: []
            }
        default:
            return state

    }
}

const initialCategoryListState = {
    loading: false,
    categoryList: [],
    error: null
}

const categoryListReducer = (state = initialOfficeListState, action) => {
    switch (action.type) {
        case ACTION_TYPE.GET_CATEGORY_START:
            const newState = {
                ...state,
                error: null,
                loading: true
            }
            return newState
        case ACTION_TYPE.GET_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                categoryList: [...action.payload]
            }
        case ACTION_TYPE.GET_CATEGORY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                categoryList: [],
            }
        case ACTION_TYPE.LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                categoryList: []
            }
        default:
            return state

    }
}


const initialBookingHistoryState = {
    loading: false,
    bookingHistory: [],
    error: null
}
const bookingHistoryReducer = (state = initialBookingHistoryState, action) => {
    switch (action.type) {
        case ACTION_TYPE.BOOKING_HISTORY_START:
            const newState = {
                ...state,
                error: null,
                loading: true
            }
            return newState
        case ACTION_TYPE.BOOKING_HISTORY_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                bookingHistory: [...action.payload]
            }
        case ACTION_TYPE.BOOKING_HISTORY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                officeList: [],
            }
        case ACTION_TYPE.LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                officeList: []
            }
        default:
            return state

    }
}

export { userReducer, userInfoReducer, officeListReducer, categoryListReducer, bookingHistoryReducer } 