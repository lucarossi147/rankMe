import React, {useEffect, useState} from "react";
import FormSocial from "./FormSocial"
import {Home} from "./Home"
import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom"
import axios from "axios";
import { Col, Container, Image, Row} from "react-bootstrap";
import FormLocality from "./FormLocality";
import ImageForm from "./ImageForm";
import NavComponent from "./NavComponent";

import styles from './profile.module.css'
import Badges from "./Badges";
const CONFIG = require("./config.json");

export const Profile = () => {
    const location = useLocation()
    const id = location.state?.redirectToUser
    const user =  useSelector(state => state.userReducer)
    return user.username  ? <ProfileAuth user={user} id={id}/> : <Home/>
}

const ProfileAuth = (props) => {
    const [isLoaded, setLoaded] = useState(false)
    const [error, setError] = useState('')
    const [user, setUser] = useState(props.user || {}) //Ottengo l'utente corrente se passato
    const id = props.id || user._id || null //Se viene passato un id, chiedo il profilo di quell'utente, altrimenti dell'utente corrente
    const [viewUpload, setViewUpload] = useState(false)
    const [reload, setReload] = useState(false)

    useEffect(() => {
        fetchProfile() //TODO muovere fethcprofile qua dentro https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook
    }, [isLoaded, reload]) //Ricarico il profilo solo se c'è un side effect su isLoaded

    const fetchProfile =  () => {

        if (!id) {
            console.log("Error id null in fetchprofile" + id)
            return;
        }

        let config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('accessToken')
            }
        }

        axios.get(CONFIG.SERVER_URL + "/profile/" + id, config)
            .then((res) => {
                setLoaded(true)
                setUser(res.data)
                setReload(false)
            }, (error) => {
                setLoaded(false)
                setError(error)
            })
    }

    if(error){
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>
    } else {
        if(localStorage.getItem('accessToken')){
            console.log(user)
            return (
                <>
                    <NavComponent/>
                    <Container>
                        <Row>
                            <Col>
                                <Image className={styles.image}
                                       src={CONFIG.SERVER_URL + "/images/" + user.picture}
                                       roundedCircle
                                       alt="Profile not found"
                                       onClick={() => setViewUpload(!viewUpload)}
                                />
                                <Upload callback={setReload} display={viewUpload}/>
                            </Col>
                            <Col>
                                <Container>
                                    <Row>
                                        <h4>@{user.username} - {user.name} {user.surname}</h4>
                                    </Row>
                                    <Row>
                                        <h4>Rank: {user.rankPosition}</h4>
                                    </Row>
                                    <Row>
                                        <p> {user.bio || ""}</p>
                                    </Row>
                                </Container>
                            </Col>
                        </Row>
                        <Row className={styles.padded}>
                            <div className="d-grid gap-2 d-md-block">
                                <FormSocial user={user}/>
                                <Locality callback={setReload}/>
                            </div>
                        </Row>
                        <Row>
                            <Badges/>
                        </Row>
                    </Container>
                </>
            )
        } else {
            return (
                <>
                    <NavComponent/>
                    <div>
                        <h1>Welcome unauthorized user!</h1>
                        <h3>Please login or signup to the site!</h3>
                    </div>
                </>

            )
        }
    }
}

export const Locality = (props) => {
    const user =  useSelector(state => state.userReducer)
    if(!user.country){
        return (
            <div>
                <FormLocality callback={props.callback}/>
            </div>
        )
    } else {
        return null
    }
}

const Upload = (props) => {
    if(props.display){
        return <ImageForm callback={props.callback}/>
    } else {
        return null
    }
}

export default Profile;
