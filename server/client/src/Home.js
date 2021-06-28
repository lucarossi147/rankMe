import {useSelector} from "react-redux";
import React from "react";
import {RedirectHome} from "./redirects";
import LoginForm from "./LoginForm";
import Logout from "./Logout";
import Match from "./Match";
import {Link} from "react-router-dom";


export const Home = () => {
    return useSelector(state => state.userReducer.username)  ? <HomeAuth/> : <Authentication/>
}

const HomeAuth = () => {

    return (
        <div>
            <h2>Home</h2>
            <h3>Sei nella home e sei autenticato</h3>
            <Link to="/profile">Profile</Link>
            <Match/>
            <Logout/>

        </div>
    );
    /*
    TODO aggiungere match
     */
}

export const Authentication = () => {
    if(useSelector(state => state.userReducer.username)){
        return <RedirectHome/>
    } else {
        return <LoginForm/>
    }
}

