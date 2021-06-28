import axios from "axios"
import {deleteUser, setUser} from "./actions/allActions";

const CONFIG = require("./config.json");

const authHeader = (user, accessToken) => {

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
                localStorage.setItem('accessToken', response.data.accessToken)
                localStorage.setItem('refreshToken', response.data.refreshToken)
                dispatcher(setUser(response.data.user))
            }
        }).catch(function (error) {
            console.log('Error', error.message);
        });
}

const logout = (dispatcher) => {
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    if(!accessToken && !refreshToken){
        console.log('Already logged out!')
        return
    }

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

    dispatcher(deleteUser())
}

const auth = {
    authHeader,
    logout,
    login,
    register
}

export default auth
