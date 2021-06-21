import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Profile from "./Profile";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Logout from "./Logout";
import Match from "./Match";

export default function App() {

    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                        <Logged/>
                    </ul>
                </nav>
            </div>

            <Switch>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/profile">
                    <Profile _id={localStorage.getItem('_id') || null}/>
                </Route>
                <Route path="/login">
                    <LoginForm />
                </Route>
                <Route path="/signup">
                    <SignupForm />
                </Route>
                <Route path="/logout">
                    <Logout/>
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

function Home() {
    if(localStorage.getItem('accessToken')){
        return (
            <div>
                <h2>Home</h2>
                <Match/>
            </div>
        );
    } else {
        /*
        TODO mettere un link a signup e login
         */
        return (
            <div>
                <h2>Home</h2>
                <h3>Please Login or Signup</h3>
            </div>
        );
    }

}

function About() {
    return (
        <div>
            <h2>About</h2>
        </div>
    );
}

function Logged(){
    if(!localStorage.getItem("accessToken")){
        return (
            <div>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/signup">Signup</Link>
                </li>
            </div>
        );
    } else {
        return (
            <div>
                <li>
                    <Link to="/logout">Logout</Link>
                </li>
            </div>
        );
    }
}

function isAuth(props){
    return localStorage.getItem(props.token) != null;
}
/*
Finchè ho l'access token sono autenticato, scade ogni 15 minuti
Finchè ho il refresh token possono chiedere l'access token, viene cancellato al logout
Se non ho nessuno dei due per riceverli devo fare login
 */
