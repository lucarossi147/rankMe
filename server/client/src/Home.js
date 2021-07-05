import {useSelector} from "react-redux";
import React from "react";
import LoginForm from "./LoginForm";
import Match from "./Match";
import axios from "axios";
import {successNotify} from "./notifyAlerts";
import {Row} from "react-bootstrap";
import LinkBar from "./LinkBar";

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
        if (localStorage.getItem('accessToken')){
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
    }

    const timerNotify = setInterval(printNotify, 30000);
    //On component unmount unset the timer TODO

    return (
            <div className="back">
                <div className="div-center homeBox">
                    <div className="content">
                        <Match/>
                        <Row>
                            <LinkBar active={"home"}/>
                        </Row>
                    </div>
                </div>
            </div>
    );
}

function Footer() {
    return (
        <footer>
            <p>Author: Luca Rossi & Davide Schiaroli, 2021</p>
        </footer>
    )
}
