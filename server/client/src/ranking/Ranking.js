import React, {useEffect, useState} from "react";
import axios from "axios";
import {errorNotify} from "../notifyAlerts";
import {Button, Container, Image, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import NavComponent from "../navbar/NavComponent";
import FilterForm from "./FilterForm";
import styles from "../ranking/ranking.module.css";
import {Loading} from "../loading/Loading";

const CONFIG = require("../config.json")

const Ranking = () => {
    const [isLoaded, setLoaded] = useState(false)
    const [ranking, setRanking] = useState({})
    const [filtering, setFiltering] = useState(false)
    const [result, setResult] = useState({})

    useEffect(() => {
        const getRanking = () => {
            let config = {
                headers : {
                    Authorization : 'Bearer ' + localStorage.getItem('accessToken')
                },
                params : {
                    n : result.n || 10,
                    age: result.age,
                    gender: result.gender,
                    city: result.city,
                    state: result.state,
                    country: result.country
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
        getRanking()
    }, [filtering, isLoaded, result])



    if(isLoaded && ranking.array){
        return (
            <>
                <NavComponent/>
                <Container>
                    <Button
                        className={styles.backColor}
                        onClick={() => {
                            setFiltering(!filtering)
                            setResult({
                                n: 10
                            })
                        }}>
                        Toggle filters
                    </Button>
                    <FilterForm
                        enable={filtering}
                        createUrl={setResult}
                    />
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
                                                <Image className={styles.image}
                                                       src={CONFIG.SERVER_URL + "/images/" + item.picture}
                                                       roundedCircle
                                                />
                                                <Link
                                                    className={styles.a}
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
                </Container>
            </>
        )
    }

    return <Loading/>
}

export default Ranking

