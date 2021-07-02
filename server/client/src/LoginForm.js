import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom"
import authService from "./authService"
import {loginAction} from "./actions/allActions";
import {useDispatch} from "react-redux";
import {Button, Form} from "react-bootstrap";

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
        const redirect = authService.login(username, password, dispatch)
        if (redirect) {
            setRedirect(true)
            dispatch(loginAction())
        }
    }

    if(redirect === true){
        return (
            <div>
                <Redirect to={'/'}/>
            </div>
        )
    }
    return (
        <div className="back">
            <div className="div-center loginForm">
                <div className="content">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control required
                                          type="text"
                                          name="username"
                                          value={username}
                                          onChange={handleChange}
                                          placeholder="username"
                                          className="form-control"
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password:</Form.Label>
                            <Form.Control required
                                          type="password"
                                          name="password"
                                          value={password}
                                          onChange={handleChange}
                                          className="form-control"
                            />
                        </Form.Group>
                        <div id="group-buttons">
                            <Button id="primaryButton" variant="primary" type="submit">
                                Login
                            </Button>
                            <div id="secondaryButton">
                                <Link to="/signup">Signup</Link>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
