import { combineReducers } from "redux";
import {userReducer} from "./Reducer";
import { userInfoReducer, officeListReducer, categoryListReducer, bookingHistoryReducer } from "./Reducer";
const rootReducer = combineReducers({
    user: userReducer,
    userInfo: userInfoReducer,
    officeList: officeListReducer,
    categoryList: categoryListReducer,
    bookingHistory: bookingHistoryReducer,
})

export default rootReducer