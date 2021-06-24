import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import authService from "./authService";

/*
TODO checkare che password e password2 siano uguali
 */
function SignupForm(props) {

    const [redirect, setRedirect] = useState(false)
    const [signinUser, setUser] = useState({})

    const handleChange = (evt) => {
        const {name, value} = evt.target
        setUser(prev => ({
            ...prev,
            [name] : value
        }))
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        authService.register(signinUser)
        setRedirect(true)
    }

    if(redirect === true){
        return <Redirect to={'/'}/>
    }
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input required
                       type="text"
                       name="name"
                       value={signinUser.name}
                       onChange={handleChange}
                       placeholder="Name"
                />
            </label>
            <label>
                Surname:
                <input required
                       type="text"
                       name="surname"
                       value={signinUser.surname}
                       onChange={handleChange}
                       placeholder="Surname"
                />
            </label>
            <label>
                Username:
                <input required
                       type="text"
                       name="username"
                       value={signinUser.username}
                       onChange={handleChange}
                       placeholder="Username"
                />
            </label>
            <label>
                Email:
                <input required
                       type="email"
                       name="email"
                       value={signinUser.email}
                       onChange={handleChange}
                       placeholder="email@mail.com"
                />
            </label>
            <label>
                Date of birth:
                <input required
                       type="date"
                       name="birthDate"
                       value={signinUser.birthDate}
                       onChange={handleChange}
                       placeholder={new Date()}
                />
            </label>
            <label>
                Password:
                <input
                    required
                    type="password"
                    name="password"
                    value={signinUser.password}
                    onChange={handleChange} />
            </label>
            <label>
                Password confirm:
                <input
                    required
                    type="password"
                    value={signinUser.password2}
                    onChange={handleChange} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
}

export default SignupForm;
