import React, {useEffect, useState} from "react";
import FormSocial from "./FormSocial"
import {Home} from "../Home/Home"
import {useSelector} from "react-redux";
import {Link, useLocation} from "react-router-dom"
import ReactLoading from 'react-loading';
import axios from "axios";
import {Col, Container, Image, Row} from "react-bootstrap";
import FormLocality from "./FormLocality";
import ImageForm from "./ImageForm";
import NavComponent from "../navbar/NavComponent";
import styles from './profile.module.css'
import Badges from "./Badges";
import {Bio} from "./Bio";

const CONFIG = require("../config.json");

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
    const [editable, setEditable] = useState(false)

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
    }, [isLoaded, reload, id, editable])



    if(error){
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <ReactLoading className={styles.center} type={"bars"} color={"#26547C"} height={200} width={100} />
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
                                    <Bio callback={setEditable} user={user} editable={editable}/>
                                </Row>
                                <Row>
                                    <Col>
                                        <EditButton displayUpload={viewUpload} editable={editable} setEditable={setEditable} callback={setViewUpload} user={user}/>
                                    </Col>
                                    <Col>
                                        <AnalyticsButton user={user}/>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                    <Row className={styles.padded}>
                        <div className="d-grid gap-2 d-md-block">
                            <FormSocial user={user} callback={setEditable} editable={editable}/>
                            <Locality user={user} callback={setReload}/>
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

function EditButton(props) {
    const id = useSelector(state => state.userReducer._id)

    const handleClick = () => {
        props.callback(!props.displayUpload)
        props.setEditable(!props.editable)
    }

    if(id === props.user._id){
        return (
            <div onClick={() => handleClick()} >
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
                    <path
                        d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                    <path
                        d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                </svg>
            </div>
        );
    } else {
        return <></>
    }

}

export const Locality = (props) => {
    const user =  useSelector(state => state.userReducer)
    if(!user.country && (user._id === props._id)){
        return <FormLocality callback={props.callback}/>
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

function AnalyticsButton(props) {
    const id = useSelector(state => state.userReducer._id)
    if(id === props.user._id) {
        return (
            <Link to="/analytics">
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" className="bi bi-bar-chart" viewBox="0 0 16 16">
                    <path
                        d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z"/>
                </svg>
            </Link>
        );
    } else {
        return <></>
    }
}

export default Profile;
