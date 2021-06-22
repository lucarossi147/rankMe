import React from "react";
import {Redirect} from "react-router-dom"
import authService from "./authService"
import MyToast from './MyToast'

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            username: '',
            password: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt) {
        const value = evt.target.value;
        this.setState({
            ...this.state,
            [evt.target.name]: value
        });
    }

    handleSubmit(evt) {
        evt.preventDefault();
        authService.login(this.state.username, this.state.password)
        this.setState({redirect : true})
    }

    render() {
        if(this.state.redirect === true){
            return (
                <div>
                    <MyToast message={'Login ok'}/>
                    <Redirect to={'/'}/>
                </div>
            )
        }
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                Username:
                <input required
                       type="text"
                       name="username"
                       value={this.state.username}
                       onChange={this.handleChange}
                       placeholder="username"
                />
                </label>
                <label>
                    Password:
                    <input
                        required
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default LoginForm;
