import loggedReducer from "./loggedReducer";
import {combineReducers} from "redux";

const reducers = combineReducers({
    isLogged: loggedReducer
})

export default reducers
