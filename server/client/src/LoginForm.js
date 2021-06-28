import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom"
import authService from "./authService"
import {loginAction} from "./actions/allActions";
import {useDispatch} from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginForm(){

    const [redirect, setRedirect] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const handleChange = (evt) => {
        const {name, value} = evt.target
        if(name === 'username'){
            setUsername(value)
        } else if(name==='password'){
            setPassword(value)
        }
    }

    const handleSubmit= (evt) => {
        evt.preventDefault();
        authService.login(username, password, dispatch)
        setRedirect(true)
        dispatch(loginAction())
    }

    if(redirect === true){
        return (
            <div>
                <Redirect to={'/'}/>
            </div>
        )
    }
    return (
                <div className="form-group">
                    <Link to="/signup">Signup</Link>
                <form onSubmit={handleSubmit}>
                    <label>
                        Username:
                        <input required
                               type="text"
                               name="username"
                               value={username}
                               onChange={handleChange}
                               placeholder="username"
                               className="form-control"
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            required
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
    );
}

export default LoginForm;
