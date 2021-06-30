import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom"
import authService from "./authService"
import {loginAction} from "./actions/allActions";
import {useDispatch} from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form, Container, Row, Col} from "react-bootstrap";
import './index.css'

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
        if(redirect){
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
        <Container id="container">
            <Container id="loginContainer">
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
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
                    </Col>
                </Row>
                <Row>
                    <Col>
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
                    </Col>
                </Row>
                <Row className="justify-content-center">
                        <Button id="loginButton" variant="primary" type="submit">
                            Login
                        </Button>
                        <Button id="signupButton" variant="link">
                            <Link to="/signup">Signup</Link>
                        </Button>
                </Row>
            </Form>
            </Container>
        </Container>
    );
}

export default LoginForm;
