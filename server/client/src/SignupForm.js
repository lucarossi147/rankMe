import React from "react";
import axios from "axios";

class SignupForm extends React.Component {
    constructor(props) {
       super(props);

       this.state = {
            name: '',
            surname: '',
            username: '',
            email: '',
            password: '',
            picture: '',
            birthDate: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (evt) => {
        const name = evt.target.name;
        const value = evt.target.value;
        this.setState({
            ...this.state,
            [name]: value
        })
    }

    handleSubmit = evt => {
        const proxy = "http://localhost:3000"
        axios.post(proxy + '/signup', {
            name: this.state.name,
            surname: this.state.surname,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            birthDate: this.state.birthDate,
            admin: false
        })
            .then(function (response) {
                if(response.status === 409){
                    alert("Email or username already chosen")
                } else {
                    //console.log(response);
                    //TODO torna alla home, eventualmente loggando
                }
            })
            .catch(function (error) {
                console.log(error);
            });

        evt.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input required
                           type="text"
                           name="name"
                           value={this.state.name}
                           onChange={this.handleChange}
                           placeholder="Name"
                    />
                </label>
                <label>
                    Surname:
                    <input required
                           type="text"
                           name="surname"
                           value={this.state.surname}
                           onChange={this.handleChange}
                           placeholder="Surname"
                    />
                </label>
                <label>
                    Username:
                    <input required
                           type="text"
                           name="username"
                           value={this.state.username}
                           onChange={this.handleChange}
                           placeholder="Username"
                    />
                </label>
                <label>
                    Email:
                    <input required
                           type="email"
                           name="email"
                           value={this.state.email}
                           onChange={this.handleChange}
                           placeholder="email@mail.com"
                    />
                </label>
                <label>
                    Date of birth:
                    <input required
                           type="date"
                           name="birthDate"
                           value={this.state.birthDate}
                           onChange={this.handleChange}
                           placeholder={new Date()}
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
                <label>
                    Password confirm:
                    <input
                        required
                        type="password"
                        value={this.state.password2}
                        onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default SignupForm;
