import {useSelector} from "react-redux";
import React from "react";
import {RedirectHome} from "./redirects";
import LoginForm from "./LoginForm";
import Logout from "./Logout";
import Match from "./Match";
import {Link} from "react-router-dom";
import FormLocality from "./FormLocality";


export const Home = () => {
    return useSelector(state => state.userReducer.username)  ? <HomeAuth/> : <Authentication/>
}

const HomeAuth = () => {

    return (
        <div>
            <h2>Home</h2>
            <h3>Sei nella home e sei autenticato</h3>
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

export const Authentication = () => {
    if(useSelector(state => state.userReducer.username)){
        return <RedirectHome/>
    } else {
        return <LoginForm/>
    }
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

