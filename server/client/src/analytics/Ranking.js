import React, {useEffect, useState} from "react";
import axios from "axios";
import {errorNotify} from "../notifyAlerts";
import {ListGroup, Table} from "react-bootstrap";
import Logout from "../Logout";
import {Link} from "react-router-dom";

const CONFIG = require("../config.json")

const Ranking = (props) => {
    const [isLoaded, setLoaded] = useState(false)
    const [ranking, setRanking] = useState({})

    useEffect(() => {
        getRanking()
    }, [isLoaded])

    const getRanking = () => {
        let config = {
            headers : {
                Authorization : 'Bearer ' + localStorage.getItem('accessToken')
            },
            params : {
                n : props.n,
                age: props.age,
                city: props.city,
                state: props.state,
                country: props.country
            }
        }

        axios.get(CONFIG.SERVER_URL + "/rank", config)
            .then((res) => {
                if(res.status === 200 || res.status === 304){
                    setLoaded(true)
                    setRanking(res.data)
                    console.log("ranking after axios call" + ranking)
                } else {
                    setLoaded(false)
                }
            }).catch(function (error) {
            errorNotify('Error', error.message);
        });
    }

    if(isLoaded && ranking.array){
        return (
            <div className="content">
                <div className="div-center">
                    <h2>Ranking </h2>
                    <Table striped bordered hover>
                        <thead>
                        <th>#</th>
                        <th>Username</th>
                        </thead>
                        <tbody>
                        {ranking.array.map(item =>
                            <tr>
                                <td scope="row">
                                    {item.rankPosition}
                                </td>
                                <td>
                                    {item.username}
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
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
                            <Link to={"/"}>Back to Home</Link>
                        </ListGroup.Item>
                    </ListGroup>
                </div>
            </div>
        )
    }
    return (
        <h1>
            Ranking not loaded
        </h1>
    )
}

export default Ranking

