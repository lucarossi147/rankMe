import loggedReducer from "./loggedReducer";
import {combineReducers} from "redux";
import userReducer from "./userReducer";
import matchReducer from "./matchReducer";

const reducers = combineReducers({
    isLogged: loggedReducer,
    userReducer : userReducer,
    matchReducer : matchReducer
})

export default reducers
