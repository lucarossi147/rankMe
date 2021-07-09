import React, {useEffect, useState} from "react";
import FormSocial from "./FormSocial"
import {Home} from "./Home"
import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom"
import ReactLoading from 'react-loading';
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

function ImageUser(props) {
    const user = props.user
    const viewUpload = props.display
    if(user._id === useSelector(state => state.userReducer._id)){
        return (
            <Image className={styles.image}
                   src={CONFIG.SERVER_URL + "/images/" + user.picture}
                   roundedCircle
                   alt="Profile not found"
                   onClick={() => props.callback(!viewUpload)}
            />
        ) } else {
        return (
            <Image className={styles.image}
                   src={CONFIG.SERVER_URL + "/images/" + user.picture}
                   roundedCircle
                   alt="Profile not found"
            />
        )
    }
}

const ProfileAuth = (props) => {
    const [isLoaded, setLoaded] = useState(false)
    const [error, setError] = useState('')
    const [user, setUser] = useState(props.user || {}) //Ottengo l'utente corrente se passato
    const id = props.id || user._id || null //Se viene passato un id, chiedo il profilo di quell'utente, altrimenti dell'utente corrente
    const [viewUpload, setViewUpload] = useState(false)
    const [reload, setReload] = useState(false)

    useEffect(() => {
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
        fetchProfile()
    }, [isLoaded, reload])



    if(error){
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <ReactLoading type={"spinningBubbles"} color={"26547C"} height={667} width={375} />
    } else {
        return (
            <>
                <NavComponent/>
                <Container>
                    <Row>
                        <Col>
                            <ImageUser user={user} callback={setViewUpload} display={viewUpload}/>
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
