import axios from "axios";
import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import {Button, Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {errorNotify, successNotify} from "./notifyAlerts";

const CONFIG = require("./config.json");


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
                } else {
                    errorNotify("Problems occured during vote")
                }
            }).catch(function (error) {
            errorNotify('Error', error.message);
        });


    }


    return (
        <div>
            <Col className="card-col">
                <Card border={"light"} bg={"light"}>
                    <Card.Img variant="top" src={CONFIG.SERVER_URL + "/images/" + user.picture} width={200} heigth={200} onClick={handleSubmit}/>
                    <Card.Body>
                        <Card.Title>
                            <Link
                                to={{
                                    pathname: "/profile",
                                    state: { redirectToUser: user._id },
                                }}>
                                {user.name} {user.surname}
                            </Link>
                        </Card.Title>
                        <Card.Text> </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">{user.country}</small>
                    </Card.Footer>
                    <Button className="voteButton" onClick={handleSubmit}>Vote</Button>
                </Card>
            </Col>
        </div>
    )
}

export default UserVote
