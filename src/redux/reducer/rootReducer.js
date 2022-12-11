import { combineReducers } from "redux";
import {userReducer} from "./Reducer";
import { userInfoReducer } from "./Reducer";
const rootReducer = combineReducers({
    user: userReducer,
    userInfoReducer: userInfoReducer,

})

export default rootReducer