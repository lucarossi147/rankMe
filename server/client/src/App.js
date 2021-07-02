import React from "react";
import {BrowserRouter as Router, Route, Switch,} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from "./Profile";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Logout from "./Logout";
import {Home} from "./Home";
import {ToastContainer} from "react-toastify";
import {Analytics} from "./Analytics";
import Ranking from "./analytics/Ranking";

function App(){
    return (
        <div id="appDiv">
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
        </div>
)
}

export default App

/*
Finchè ho l'access token sono autenticato, scade ogni 15 minuti
Finchè ho il refresh token possono chiedere l'access token, viene cancellato al logout
Se non ho nessuno dei due per riceverli devo fare login
 */
