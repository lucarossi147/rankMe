import loggedReducer from "./loggedReducer";
import {combineReducers} from "redux";
import userReducer from "./userReducer";

const reducers = combineReducers({
    isLogged: loggedReducer,
    userReducer : userReducer
})

export default reducers
