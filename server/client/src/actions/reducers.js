import loggedReducer from "./loggedReducer";
import {combineReducers} from "redux";
import tokenReducer from "./tokenReducer";
import userReducer from "./userReducer";

const reducers = combineReducers({
    isLogged: loggedReducer,
    tokenReducer: tokenReducer,
    userReducer : userReducer
})

export default reducers
