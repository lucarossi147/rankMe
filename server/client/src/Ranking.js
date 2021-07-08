import React, {useEffect, useState} from "react";
import axios from "axios";
import {errorNotify} from "./notifyAlerts";
import {Container, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import NavComponent from "./NavComponent";

const CONFIG = require("./config.json")

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
                } else {
                    setLoaded(false)
                }
            }).catch(function (error) {
            errorNotify('Error', error.message);
        });
    }

    if(isLoaded && ranking.array){
        return (
            <>
                <NavComponent/>
                <Container>
                    <div className="div-center analyticsBox">
                        <div className="content">
                            <h2>Ranking </h2>
                            <Table striped bordered hover>
                                <thead>
                                <th>#</th>
                                <th>Username</th>
                                </thead>
                                <tbody>
                                {
                                    ranking.array.map(item =>
                                        <tr>
                                            <td key={item} scope="row">
                                                {item.rankPosition}
                                            </td>
                                            <td >
                                                <Link
                                                    to={{
                                                        pathname: "/profile",
                                                        state: { redirectToUser: item._id },
                                                    }}>
                                                    {item.username}
                                                </Link>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </Container>
            </>

        )
    }
    return (
        <h1>
            Ranking not loaded
        </h1>
    )
}

export default Ranking

