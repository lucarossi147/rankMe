import React from "react";
import axios from "axios";
import useHistory from "react-router-dom"

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
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
        evt.preventDefault();

        let history = useHistory()

        axios.post("http://localhost:3000/login",
            {
                username: this.state.username,
                password: this.state.password
        }, )
        .then(function (response) {
            if(response.status === 200){
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                localStorage.setItem('username', response.data.user.username);
                localStorage.setItem('name', response.data.user.name);
                localStorage.setItem('surname', response.data.user.surname);
                localStorage.setItem('rank', response.data.user.rankPosition);
                localStorage.setItem('facebook', response.data.user.facebook);
                localStorage.setItem('instagram', response.data.user.instagram);
                localStorage.setItem('_id', response.data.user._id);
                localStorage.setItem('bio', response.data.user.bio);
            }
        }).catch(function (error) {
            console.log('Error', error.message);
        });

        history.push("/")
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
