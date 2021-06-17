import React from "react";
import axios from "axios";
import "./login.css";

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
        //Non worka con le checkbox https://blog.greenroots.info/how-to-create-react-form-with-a-single-change-event-handler-ckizqh0yq00x7zks16wd1cxu1
        const name = evt.target.name;
        const value = evt.target.value;
        this.setState({
            ...this.state,
            [name]: value
        })
    }

    handleSubmit(evt){
        alert(this.state.email + "has requested signup");
        const proxy = "http://localhost:3000"
        /*
            let email = this.state.email
            let password = this.state.password
            let name = this.state.name
            let username = this.state.username
            let birthDate = this.state.birthDate
            let picture = this.state.picture
            TODO Validazione input
        */
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
                console.log(response);
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
