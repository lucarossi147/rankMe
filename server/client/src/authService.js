import axios from "axios"
import {deleteTokens, deleteUser, setAccessToken, setRefreshToken, setUser} from "./actions/allActions";

const CONFIG = require("./config.json");

const authHeader = (user, accessToken) => {
    //const user = useSelector(state => state.userReducer)
    //const {accessToken, refreshToken} = useSelector(state => state.tokenReducer)

    if(user && accessToken){
        return { Authorization : 'Bearer ' + user.accessToken}
    } else {
        return {}
    }
}

const register = (user) => {
    axios.post(CONFIG.SERVER_URL + '/signup', {
        name: user.name,
        surname: user.surname,
        username: user.username,
        email: user.email,
        password: user.password,
        birthDate: user.birthDate,
        admin: false
    }, )
    .then((response) => {
        if(response.status === 409){
            console.log("Email or username already chosen") //TODO dispatch toast
        } else {
            console.log("ok, signup made"); //TODO torna alla home, eventualmente loggando OK
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

const login = (username, password, dispatcher) => {
    axios.post(CONFIG.SERVER_URL + "/login",
        {
            username: username,
            password: password
        }, )
        .then(function (response) {
            if(response.status === 200){
                dispatcher(setAccessToken(response.data.accessToken))
                dispatcher(setRefreshToken(response.data.refreshToken))
                dispatcher (setUser(response.data.user))
                /*
                    localStorage.setItem('accessToken', response.data.accessToken);
                    localStorage.setItem('refreshToken', response.data.refreshToken);
                    localStorage.setItem('user', JSON.stringify(response.data.user))
                    const newUser = JSON.parse(localStorage.getItem('user'));
                    console.log(newUser)
                 */
            }
        }).catch(function (error) {
            console.log('Error', error.message);
        });
}

const logout = (dispatcher, refreshToken) => {

    axios.delete(CONFIG.SERVER_URL+"/logout", {
        headers: {}, data: {
            token: refreshToken
        }
    }).then(res => {
        if(res.status === 200){
            console.log("User correctly logged out")
        }
    }).catch(err => {
        console.log(err)
    })
    dispatcher(deleteTokens())
    dispatcher(deleteUser())
}

export default {
    authHeader,
    logout,
    login,
    register
}
