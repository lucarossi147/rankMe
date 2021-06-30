import axios from "axios"
import {deleteUser, setUser} from "./actions/allActions";
import {errorNotify, successNotify} from "./notifyAlerts";

const CONFIG = require("./config.json");

const authHeader = (user, accessToken) => {

    if(user && accessToken){
        return { Authorization : 'Bearer ' + user.accessToken}
    } else {
        return {}
    }
}

function register(user) {
    let result = false
    axios.post(CONFIG.SERVER_URL + '/signup', {
        name: user.name,
        surname: user.surname,
        username: user.username,
        email: user.email,
        password: user.password,
        birthDate: user.birthDate,
        gender: user.gender,
        admin: false
    }, )
    .then((response) => {
        if(response.status === 409){
            result = false
            errorNotify("Email or username already chosen")
        } else {
            result = true
            successNotify("Signup made, check your email")
        }
    })
    .catch(function (error) {
        console.log(error);
    });
    return result
}

function login(username, password, dispatcher) {
    let result = false
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
                result = true
                successNotify("Login made")
            } else if(response.status === 401){
                result = false
                errorNotify("Invalid username or password")
            }
        }).catch(function (error) {
            console.log('Error', error.message);
        });
    return result
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
            successNotify("Logout made")
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
