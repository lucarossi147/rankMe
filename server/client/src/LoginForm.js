import React from "react";
import  "./login.css";
import axios from "axios";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.proxy = this.props.proxy
        this.state = {
            username: '',
            password: ''
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
        /*
            let email = this.state.email
            let password = this.state.password
            TODO Validazione input
        */
        axios.post("http://localhost:3000/login",
            {
                username: this.state.username,
                password: this.state.password
        }, )
        .then(function (response) {
            if(response.status === 200){
                console.log("OK login")
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                localStorage.setItem('username', response.data.user.username);
                localStorage.setItem('name', response.data.user.name);
                localStorage.setItem('surname', response.data.user.surname);
                localStorage.setItem('rank', response.data.user.rankPosition);
                localStorage.setItem('facebook', response.data.user.facebook);
                localStorage.setItem('instagram', response.data.user.instagram);
                localStorage.setItem('_id', response.data.user._id);
                localStorage.setItem('picture', response.data.picture);
                //this.props.history.push("/");

            }
        }).catch(function (error) {
            console.log('Error', error.message);
        });

        let localJWT = localStorage.getItem('accessToken')

        let config = {
            headers: {
                'Authorization': 'Bearer ' + localJWT
            }
        }

        const user_id = localStorage.getItem('_id');
        axios.get("http://localhost:3000/userImage/" + user_id, config)
            .then(res => {
                if(res.status === 200){
                    localStorage.setItem('picture', res.data);
                }
            })
            .catch(err => {
                console.log(err);
            });

        evt.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                Username:
                <input required
                       type="text"
                       name="username"
                       value={this.state.username}
                       onChange={this.handleChange}
                       placeholder="email@mail.com"
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
