import React from "react"

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Profile from "./Profile";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ImageForm from "./imageForm";

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
                    <Profile />
                </Route>
                <Route path="/login">
                    <LoginForm />
                </Route>
                <Route path="/signup">
                    <SignupForm />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

function Home() {
    return (
        <div>
            <h2>Home</h2>
            <ImageForm/>
        </div>
    );
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
                    <Link to="signup">Signup</Link>
                </li>
            </div>
        );
    } else {
        return null;
    }
}
