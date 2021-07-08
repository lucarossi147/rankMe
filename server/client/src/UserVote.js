import axios from "axios";
import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import {Button, Card, Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import {errorNotify, successNotify} from "./notifyAlerts";
import { useMediaQuery } from 'react-responsive';
import styles from './userVote.module.css'
const CONFIG = require("./config.json");


function FooterOptional(props) {
    const isTabletOrMobileDevice = useMediaQuery({
        query: '(max-device-width: 1224px)'
    })
    console.log(isTabletOrMobileDevice)
    if(!isTabletOrMobileDevice){
        return (
            <>
                <Card.Footer>
                    <TextPosition pos={props.country}/>
                </Card.Footer>
                <Button className={styles.voteButton} onClick={props.callback}>Vote</Button>
            </>
        )
    } else return <></>
}

function UserVote(props) {
    let user = props.user

    const handleSubmit = (evt) => {
        evt.preventDefault();

        let config = {
            headers : {
                Authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        }

        axios.post(CONFIG.SERVER_URL + "/winner",
            {
                userId: user._id
            }, config)
            .then( (response) => {
                if(response.status === 200){
                    successNotify(" Correctly voted!")
                    props.callback(true)
                } else {
                    errorNotify("Problems occurred during vote")
                }
            }).catch(function (error) {
            errorNotify('Error', error.message);
        });

    }

    return (
            <Card>
                <Card.Img variant="top" src={CONFIG.SERVER_URL + "/images/" + user.picture} onClick={handleSubmit}/>
                <Card.Body>
                    <Card.Title>
                        <Link className={styles.link}
                            to={{
                                pathname: "/profile",
                                state: { redirectToUser: user._id },
                            }}
                        >
                            {user.username}
                        </Link>
                    </Card.Title>
                </Card.Body>
                <FooterOptional country={user.country} callback={handleSubmit}/>
            </Card>
    )
}

const TextPosition = (props) => {
    return props.pos ?  <small className="text-muted"> {props.pos}</small> : <small className="text-muted"> Unknown </small>
}
export default UserVote
