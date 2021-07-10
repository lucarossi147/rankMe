import './signup.module.css'
import React, {useState} from "react";
import {Link, Redirect} from "react-router-dom";
import authService from "../authService";
import {Button, Col, Form, Image} from "react-bootstrap";
import {errorNotify} from "../notifyAlerts";
import {loginAction} from "../actions/allActions";
import {useDispatch} from "react-redux";
import styles from "./login.module.css";
import Logo from "../res/logo_last.png";

function SignupForm() {

    const [redirect, setRedirect] = useState(false)
    const [signinUser, setUser] = useState({
        "name": "",
        "username":"",
        "surname":"",
        "email":"",
        "birthDate":"",
        "password":"",
        "password2":"",
        "gender":""
    })
    const dispatch = useDispatch()

    const handleChange = (evt) => {
        const {name, value} = evt.target
        setUser(prev => ({
            ...prev,
            [name] : value
        }))
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (signinUser.password2 === signinUser.password) {
            authService.register(signinUser)
                .then(
                    () =>
                        authService.login(signinUser.username, signinUser.password, dispatch)
                            .then(() => {
                                dispatch(loginAction())
                                setRedirect(true)
                            })
                            .catch((err) => console.log(err))
                )
                .catch((err) => {
                    console.log(err)
                    errorNotify("Email or password already used")
                })
        } else {
            errorNotify("Passwords are not the same")
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
        <>
            <div className={styles.alignImage}>
                <Image className={styles.image} src={Logo}/>
            </div>
            <div className={styles.aligner}>
                <Form onSubmit={handleSubmit} className={styles.form}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label className={styles.label}>Name:</Form.Label>
                            <Form.Control required
                                          type="text"
                                          name="name"
                                          value={signinUser.name}
                                          onChange={handleChange}
                                          placeholder="Name"
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label className={styles.label}>Surname:</Form.Label>
                            <Form.Control required
                                          type="text"
                                          name="surname"
                                          value={signinUser.surname}
                                          onChange={handleChange}
                                          placeholder="Surname"
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label className={styles.label}>
                                Username:
                            </Form.Label>
                            <Form.Control required
                                          type="text"
                                          name="username"
                                          value={signinUser.username}
                                          onChange={handleChange}
                                          placeholder="Username"
                            />
                        </Form.Group >
                        <Form.Group as={Col}>
                            <Form.Label className={styles.label}>
                                Email:
                            </Form.Label>
                            <Form.Control required
                                          type="email"
                                          name="email"
                                          value={signinUser.email}
                                          onChange={handleChange}
                                          placeholder="email@mail.com"
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label className={styles.label}>
                                Date of birth:
                            </Form.Label>
                            <Form.Control required
                                          type="date"
                                          name="birthDate"
                                          value={signinUser.birthDate}
                                          onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label className={styles.label}>
                                Gender:
                            </Form.Label>
                            <Form.Control as={"select"}
                                          name="gender"
                                          value={signinUser.gender}
                                          onChange={handleChange}>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Prefer not to say</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label className={styles.label}>
                                Password:
                            </Form.Label>
                            <Form.Control
                                required
                                type="password"
                                name="password"
                                placeholder="password"
                                value={signinUser.password}
                                onChange={handleChange} />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label className={styles.label}>
                                Reinsert password:
                            </Form.Label>
                            <Form.Control
                                required
                                type="password"
                                name="password2"
                                placeholder="password"
                                value={signinUser.password2}
                                onChange={handleChange} />
                        </Form.Group>
                    </Form.Row>
                        <Button className={styles.backColor} variant="primary" type="submit">
                            Signup
                        </Button>
                    <Button variant={"link"} className={styles.link}>
                        <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to="/login">Login</Link>
                    </Button>
                </Form>
            </div>
        </>
    );
}

export default SignupForm;
