import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom"
import authService from "./authService"
import {loginAction} from "./actions/allActions";
import {useDispatch} from "react-redux";
import {Button, Form, Row} from "react-bootstrap";

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
            <div>
                <Redirect to={'/'}/>
            </div>
        )
    }
    return (
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
                                          placeholder="password"
                                          className="form-control"
                            />
                        </Form.Group>
                        <Row>
                            <Button id="primaryButton" variant="primary" type="submit">
                                Login
                            </Button>
                            <Button variant={"link"} id="secondaryButton">
                                <Link to="/signup">Signup</Link>
                            </Button>
                        </Row>
                    </Form>
                </div>
            </div>
    );
}

export default LoginForm;
