import {useSelector} from "react-redux";
import React from "react";
import LoginForm from "./LoginForm";
import Logout from "./Logout";
import Match from "./Match";
import {Link} from "react-router-dom";
import FormLocality from "./FormLocality";
import axios from "axios";
import {successNotify} from "./notifyAlerts";

const CONFIG = require('./config.json')

export const Home = () => {
    return useSelector(state => state.userReducer.username)  ? <HomeAuth/> : <LoginForm/>
}

const HomeAuth = () => {

    function printNotify() {
        let config = {
            headers : {
                Authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        }

        axios.get(CONFIG.SERVER_URL + "/notifies",config).then(
            (res) => {
                console.log(res.data)
                if(!!res.data){
                    for(const string of res.data){
                        successNotify(string)
                    }
                }
            },
            (err) => console.log(err)
        )
    }

    setInterval(printNotify, 30000);

    return (
        <div>
            <h2>Home</h2>
            <Link to="/profile">Profile</Link>
            <Locality/>
            <Match/>
            <Logout/>
        </div>
    );
    /*
    TODO aggiungere match
     */
}

export const Locality = () => {
    const user =  useSelector(state => state.userReducer)
    if(!user.country){
        return (
            <div>
                <h2>Hey! You didn't insert your location..</h2>
                <FormLocality/>
            </div>
        )
    } else {
        return null
    }
}

