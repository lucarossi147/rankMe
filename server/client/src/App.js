import React from "react";
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from "./profile/Profile";
import LoginForm from "./auth/LoginForm";
import SignupForm from "./auth/SignupForm";
import Logout from "./auth/Logout";
import {Home} from "./Home/Home";
import {ToastContainer} from "react-toastify";
import {Analytics} from "./analytics/Analytics";
import Ranking from "./ranking/Ranking";

function App(){
    return (
        <>
            <ToastContainer/>
            <Router>
                <Switch>
                    <Route path="/profile" component={Profile}/>
                    <Route path="/login"   component={LoginForm}/>
                    <Route path="/signup"  component={SignupForm}/>
                    <Route path="/logout"  component={Logout}/>
                    <Route path="/analytics"  component={Analytics}/>
                    <Route path="/ranking"  component={Ranking}/>
                    <Route path="/"        component={Home}/>
                </Switch>
            </Router>
        </>
)
}

export default App

/*
Finchè ho l'access token sono autenticato, scade ogni 15 minuti
Finchè ho il refresh token possono chiedere l'access token, viene cancellato al logout
Se non ho nessuno dei due per riceverli devo fare login
 */
