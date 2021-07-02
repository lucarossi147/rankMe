import React, {useEffect, useState} from "react";
import FormSocial from "./FormSocial"
import {Home} from "./Home"
import {useSelector} from "react-redux";
import {Link, useLocation} from "react-router-dom"
import axios from "axios";
import {Col, Container, Image, ListGroup, Row} from "react-bootstrap";
import Logout from "./Logout";

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

    useEffect(() => {
        fetchProfile() //TODO muovere fethcprofile qua dentro https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook
    }, [isLoaded]) //Ricarico il profilo solo se c'è un side effect su isLoaded

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

        axios.get(CONFIG.SERVER_URL + "/profile/" + id, config
        ).then((res) => {
            setLoaded(true)
            setUser(res.data)
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
                                <Image src={CONFIG.SERVER_URL + "/images/" + user.picture} alt="Profile not found" roundedCircle/>
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
                            <Col>
                                <Rank rank={user.rankPosition}/>
                            </Col>
                        </Row>
                        <Row>
                            <ListGroup horizontal>
                                <ListGroup.Item>
                                    <Logout/>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Link to="/profile">My Profile </Link>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Link to="/analytics">Analytics </Link>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Link to="/ranking">Ranking </Link>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Link to={"/"}>Back to Home</Link>
                                </ListGroup.Item>
                            </ListGroup>
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

export default Profile;

/*
                <FormLocality user={user}/>
                    <textarea readOnly value={user.bio || ""}/>
                    <Link to={"/"}>Back to Home</Link>
                    <ImageForm/>
                    <Analytics/>
                    <Logout/>
 */
