import { combineReducers } from "redux";
import {userReducer} from "./Reducer";
import { userInfoReducer, officeListReducer } from "./Reducer";
const rootReducer = combineReducers({
    user: userReducer,
    userInfoReducer: userInfoReducer,
    officeList: officeListReducer,
})

export default rootReducer