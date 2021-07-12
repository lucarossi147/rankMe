import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom"
import authService from "../authService"
import {loginAction} from "../actions/allActions";
import {useDispatch} from "react-redux";
import {Button, Form, Image} from "react-bootstrap";
import styles from './login.module.css'
import Logo from "../res/logo_last.png";
import {errorNotify} from "../notifyAlerts";

function LoginForm(){

    const [redirect, setRedirect] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    /*  Probabilmente una soluzione più clean sarebbe questa ->
        https://stackoverflow.com/questions/60807864/how-to-setstate-response-of-api-request-in-reactjs-with-hooks
     */
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
        authService.login(username,password, dispatch)
            .then((res) => {
                    if(res){
                        setRedirect(true)
                        dispatch(loginAction())
                    } else {
                        errorNotify("Wrong credentials, retry!")
                    }
                }).catch((err) => {
                console.log(err)
        })
    }

    if(redirect === true){
        return <Redirect to={'/'}/>
    }

    return (
        <>
            <div className={styles.alignImage}>
                <Image className={styles.image} src={Logo}/>
            </div>
            <div className={styles.aligner}>
                <Form onSubmit={handleSubmit} className={styles.form}>
                    <Form.Group>
                        <Form.Label className={styles.label}>Username</Form.Label>
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
                        <Form.Label className={styles.label}>Password:</Form.Label>
                        <Form.Control required
                                      type="password"
                                      name="password"
                                      value={password}
                                      onChange={handleChange}
                                      placeholder="password"
                                      className="form-control"
                        />
                    </Form.Group>
                    <Button className={styles.backColor} variant="primary" type="submit">
                        Login
                    </Button>
                    <Button variant={"link"} className={styles.link}>
                        <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/signup">Signup</Link>
                    </Button>
                </Form>
            </div>
        </>
    );
}

export default LoginForm;
