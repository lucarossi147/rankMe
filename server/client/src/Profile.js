import React, {useEffect, useState} from "react";
import FormSocial from "./FormSocial"
import {Home} from "./Home"
import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom"
import axios from "axios";
import {Col, Container, Image, ListGroup, Row} from "react-bootstrap";
import LinkBar from "./LinkBar";
import FormLocality from "./FormLocality";
import ImageForm from "./ImageForm";

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
        console.log(reload)
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
            return (
                <div className="profile">
                    <div className="div-center profileBox">
                        <Container className="profileContainer">
                            <Row>
                                <Col>
                                    <Image src={CONFIG.SERVER_URL + "/images/" + user.picture} alt="Profile not found" roundedCircle onClick={() => setViewUpload(!viewUpload)}/>
                                    <Upload callback={setReload} display={viewUpload}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {user.username}
                                </Col>
                            </Row>
                            <Row>
                                <FormSocial user={user}/>
                            </Row>
                            <Row>
                                <Locality/>
                            </Row>
                            <Row>
                                <p>Bio: </p>
                                <p> {user.bio || ""}</p>
                            </Row>
                            <Row>
                                <Col>
                                    <Rank rank={user.rankPosition}/>
                                </Col>
                            </Row>
                            <Row>
                                <LinkBar active={"profile"}/>
                            </Row>
                        </Container>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>Welcome unauthorized user!</h1>
                    <h3>Please login or signup to the site!</h3>
                </div>
            )
        }
    }
}

function Rank(props) {
    if(props.rank){
        return(
            <div> Rank: {props.rank}</div>
        );
    } else {
        return (
            <div>
                <h5>Posizione in classifica non calcolata</h5>
            </div>
        );
    }
}

export const Locality = () => {
    const user =  useSelector(state => state.userReducer)
    if(!user.country){
        return (
            <div>
                <p>Hey! You didn't insert your location..</p>
                <FormLocality/>
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

/*

                    <textarea readOnly value={user.bio || ""}/>
              TODO metter la bio nel èprofilo
 */
