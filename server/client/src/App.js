import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Profile from "./Profile";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Logout from "./Logout";
import {Home} from "./Home";

function App(){
    return (
        <Router>
            <Switch>
                <Route path="/profile" component={Profile}/>
                <Route path="/login"   component={LoginForm}/>
                <Route path="/signup"  component={SignupForm}/>
                <Route path="/logout"  component={Logout}/>
                <Route path="/"    component={Home}/>
            </Switch>
        </Router>
    )
}

export default App

/*
Finchè ho l'access token sono autenticato, scade ogni 15 minuti
Finchè ho il refresh token possono chiedere l'access token, viene cancellato al logout
Se non ho nessuno dei due per riceverli devo fare login
 */
