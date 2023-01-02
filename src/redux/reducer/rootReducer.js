import { combineReducers } from "redux";
import {userReducer} from "./Reducer";
import { userInfoReducer, officeListReducer, categoryListReducer } from "./Reducer";
const rootReducer = combineReducers({
    user: userReducer,
    userInfo: userInfoReducer,
    officeList: officeListReducer,
    categoryList: categoryListReducer,
})

export default rootReducer