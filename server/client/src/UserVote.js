import axios from "axios";
import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Button, Card, CardGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
const CONFIG = require("./config.json");


function UserVote(props) {
    const successNotify = (message) => toast.success(message);
    const errorNotify = (message) => toast.error(message)

    const handleSubmit = (evt) => {
        evt.preventDefault();

        let config = {
            headers : {
                Authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        }

        axios.post(CONFIG.SERVER_URL + "/addSocial",
            {
                userId: props.user._id
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

    let user = props.user
    /*
    dentro user.picture c'è il percorso e funziona, ma l'iimagine non viene mostrata
    TODO https://stackoverflow.com/questions/51569026/reactjs-image-doesnt-show-up
     */
    //console.log("picture : " + user.picture)
    //console.log(user)
    return (
            <div>
                    <Card border={"light"} bg={"light"}>
                        <Card.Img variant="top" src={user.picture} width={200} heigth={200}/>
                        <Card.Body>
                            <Card.Title>
                                {user.name} {user.surname}
                            </Card.Title>
                            <Card.Text> </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">{user.country}</small>
                        </Card.Footer>
                    </Card>
                <Link
                    to={{
                        pathname: "/profile",
                        state: { redirectToUser: user._id },
                    }}>
                    Profile
                </Link>
                <Button onClick={handleSubmit}>Vote</Button>
                <ToastContainer />
            </div>
    )
}

export default UserVote
