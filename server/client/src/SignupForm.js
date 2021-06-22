import React from "react";
import {Redirect} from "react-router-dom";
import authService from "./authService";

/*
TODO checkare che password e password2 siano uguali
 */
class SignupForm extends React.Component {
    constructor(props) {
       super(props);

       this.state = {
           redirect: false,
           user:{
               name: '',
               surname: '',
               username: '',
               email: '',
               password: '',
               picture: '',
               birthDate: '',
               password2: ''
           }
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
        evt.preventDefault();
        authService.register(this.state.user)
        this.setState({redirect: true})
    }

    render() {
        if(this.state.redirect === true){
            return <Redirect to={'/'}/>
        }
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
