import axios from "axios"
import {deleteUser, setUser} from "./actions/allActions";
import {errorNotify, successNotify} from "./notifyAlerts";

const CONFIG = require("./config.json");

const authHeader = () => {
    return { Authorization : 'Bearer ' + localStorage.getItem("accessToken")}
}

function register(user) {
    return axios.post(CONFIG.SERVER_URL + '/signup', {
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
            errorNotify("Email or username already chosen")
            return false
        } else {
            successNotify("Signup made, check your email")
            successNotify("Choose the best profile!")
            return true
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

function login(username, password, dispatcher) {
    return axios.post(CONFIG.SERVER_URL + "/login",
        {
            username: username,
            password: password
        }, )
        .then(function (response) {
            if(response.status === 200){
                localStorage.setItem('accessToken', response.data.accessToken)
                localStorage.setItem('refreshToken', response.data.refreshToken)
                dispatcher(setUser(response.data.user))
                return true
            } else if(response.status === 401){
                return  false
            }
        }).catch(function (error) {
            console.log('Error', error.message);
        });
}

const logout = (dispatcher) => {
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')

    if(!accessToken && !refreshToken){
        return
    }

    axios.delete(CONFIG.SERVER_URL+"/logout", {
        headers: {}, data: {
            token: refreshToken
        }
    }).then(res => {
        if(res.status === 200){
            successNotify("Logout made")
        }
    }).catch(err => {
        console.log(err)
    })
    localStorage.clear()
    dispatcher(deleteUser())
}

const auth = {
    authHeader,
    logout,
    login,
    register
}

export default auth
