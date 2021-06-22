import axios from "axios"
const CONFIG = require("./config.json");

const authHeader = () => {
    const user = localStorage.getItem('user')
    if(user && user.accessToken){
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
    }, ).then((response) => {
            if(response.status === 409){
                //TODO dispatch toast
                console.log("Email or username already chosen")
            } else {
                console.log("ok, signup made");
                //TODO torna alla home, eventualmente loggando OK
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

const login = (username, password) => {
    axios.post(CONFIG.SERVER_URL + "/login",
        {
            username: username,
            password: password
        }, )
        .then(function (response) {
            if(response.status === 200){
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                localStorage.setItem('user', response.data.user)
            }
        }).catch(function (error) {
            console.log('Error', error.message);
        });
}

const logout = () => {
    const token = localStorage.getItem('refreshToken')

    axios.delete(CONFIG.SERVER_URL+"/logout", {
        headers: {}, data: {token: token}
    }).then(res =>{
        if(res.status === 200){
            console.log("User correctly logged out")
        }
    }).catch(err => {
        console.log(err)
    })

    localStorage.clear()
}

export default {
    authHeader,
    logout,
    login,
    register
}
