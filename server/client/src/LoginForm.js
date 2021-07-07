import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom"
import authService from "./authService"
import {loginAction} from "./actions/allActions";
import {useDispatch} from "react-redux";
import {Button, Form} from "react-bootstrap";
import './login.css'

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
        if (authService.login(username, password, dispatch)) {
            setRedirect(true)
            dispatch(loginAction())
        }
    }

    if(redirect === true){
        return (
            <>
                <Redirect to={'/'}/>
            </>
        )
    }
    return (
        <div className="aligner">
                    <Form onSubmit={handleSubmit} className="formLogin">
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
                                          placeholder="password"
                                          className="form-control"
                            />
                        </Form.Group>
                        <div className="buttonsJustifier">
                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                            <Button variant={"link"}>
                                <Link to="/signup">Signup</Link>
                            </Button>
                        </div>

                    </Form>
        </div>
    );
}

export default LoginForm;
