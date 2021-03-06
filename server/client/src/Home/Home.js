import {useSelector} from "react-redux";
import React from "react";
import LoginForm from "../auth/LoginForm";
import Match from "./Match";
import axios from "axios";
import {successNotify} from "../notifyAlerts";
import NavComponent from "../navbar/NavComponent";
import styles from "./home.module.css"
const CONFIG = require('../config.json')

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
        if (localStorage.getItem('accessToken')){
            axios.get(CONFIG.SERVER_URL + "/notifies",config).then(
                (res) => {
                    if(!!res.data){
                        for(const string of res.data){
                            successNotify(string)
                        }
                    }
                },
                (err) => console.log(err)
            )
       }
    }

    let timerNotify = null
    if(!localStorage.getItem("timer")){
        timerNotify = setInterval(printNotify, 30000);
        localStorage.setItem("timer", timerNotify.toString())
    }

    return (
        <>
            <NavComponent/>
            <div className={styles.aligner}>
                <Match/>
            </div>
        </>
    );
}
