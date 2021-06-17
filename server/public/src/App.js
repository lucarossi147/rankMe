import React, { Component } from "react";
import ImageForm from "./imageForm";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Profile from "./Profile";

class App extends Component {
    render() {
        return (
            <div>
                <SignupForm/>
                <LoginForm/>
                <ImageForm proxy={"http://localhost:3000"}/>
                <Profile/>
            </div>
        );
    }
}


export default App;


