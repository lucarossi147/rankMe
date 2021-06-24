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
import {useSelector} from 'react-redux'

function App(){

    const isLogged = useSelector(state => state.isLogged)
    //const {accessToken, refreshToken} = useSelector(state => state.tokenReducer)
    const user = useSelector(state => state.userReducer)

    return (
        <Router>
            <h1>Am i logged? -> {isLogged ? 'true' : 'false'} </h1>
            <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <Logged logged={isLogged}/>
                    </ul>
                </nav>
            <Switch>
                <Route path="/profile" component={() => <Profile user={user || null} />}/>
                <Route path="/login"  component={LoginForm}/>
                <Route path="/signup" component={SignupForm}/>
                <Route path="/logout" component={Logout}/>
                <Route path="/"       component={Home}/>
            </Switch>
        </Router>
        )
}

export default App

function Home(){
    const isLogged = useSelector(state => state.isLogged)
    if(isLogged){
        return <HomeAuth/>
    } else {
        return <HomeNotAuth/>
    }
}

function HomeNotAuth() {
        return (
            <div>
                <h2>Home</h2>
                <h3>Welcome to the più bel sito del web</h3>
                <h3>Please <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link></h3>
            </div>
        );
}

function HomeAuth(){
    return (
        <div>
            <h2>Home</h2>
            <Match/>
        </div>
    )
}

function Logged(){
    const isLogged = useSelector(state => state.isLogged)
    if(isLogged) {
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
