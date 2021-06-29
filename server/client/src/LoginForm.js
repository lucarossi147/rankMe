import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom"
import authService from "./authService"
import {loginAction} from "./actions/allActions";
import {useDispatch} from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
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
                <>
                    <Link to="/signup">Signup</Link>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
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
                    <Form.Group className="mb-3">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control required
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </>
    );
}

export default LoginForm;
