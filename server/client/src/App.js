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
                        <Logged/>
                    </ul>
                </nav>
            </div>

            <Switch>
                <Route path="/profile">
                    <Profile _id={localStorage.getItem('_id') || null}/>
                </Route>
                <Route path="/login"  component={LoginForm}/>
                <Route path="/signup" component={SignupForm}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/"       component={Home}/>
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
        return (
            <div>
                <h2>Home</h2>
                <h3>Welcome to the più bel sito del web</h3>
                <h3>Please <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link></h3>
            </div>
        );
    }

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
                    <Link to="/profile">Profile</Link>
                </li>
                <li>
                    <Link to="/logout">Logout</Link>
                </li>
            </div>
        );
    }
}
/*
Finchè ho l'access token sono autenticato, scade ogni 15 minuti
Finchè ho il refresh token possono chiedere l'access token, viene cancellato al logout
Se non ho nessuno dei due per riceverli devo fare login
 */
