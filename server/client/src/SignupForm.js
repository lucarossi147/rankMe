import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import authService from "./authService";
import {Button, Col, Form} from "react-bootstrap";

function SignupForm() {

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
        setRedirect(authService.register(signinUser))
        if(redirect){
            return <Redirect to={'/'}/>
        }
    }

    return (
        <div>
        <Form onSubmit={handleSubmit}>
            <Form.Row>
                <Form.Group as={Col}>
                    <Form.Label>Name:</Form.Label>
                    <Form.Control required
                                  type="text"
                                  name="name"
                                  value={signinUser.name}
                                  onChange={handleChange}
                                  placeholder="Name"
                    />
                </Form.Group>
                <Form.Group as={Col}>
                    <Form.Label>Surname:</Form.Label>
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
                <Form.Label>
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
                <Form.Label>
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
                <Form.Label>
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
                <Form.Label>
                    Gender:
                </Form.Label>
                <Form.Control as={"select"}
                              value={signinUser.gender}
                                onChange={handleChange}>
                    <option value="m">Male</option>
                    <option value="f">Female</option>
                    <option value="o">Prefer not to say</option>
                </Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Label>
                    Password:
                </Form.Label>
                    <Form.Control
                        required
                        type="password"
                        name="password"
                        value={signinUser.password}
                        onChange={handleChange} />
            </Form.Group>
        </Form.Row>
        <Button type="submit">
            Submit
        </Button>
        </Form>
        </div>
    );
}

export default SignupForm;
