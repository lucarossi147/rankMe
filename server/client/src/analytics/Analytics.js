import {useSelector} from "react-redux";
import {Home} from "../Home/Home";
import Genders from "./Genders";
import React, {useEffect, useState} from "react";
import Ages from "./Ages";
import axios from "axios";
import {Col, Container, Row} from "react-bootstrap";
import NavComponent from "../navbar/NavComponent";
import {Loading} from "../loading/Loading";

const CONFIG = require("../config.json")

function AnalyticsAuth() {

    const [isLoaded, setLoaded] = useState(false)
    const [data, setData] = useState({})
    const [error, setError] = useState('')

    useEffect(() => {
        getData()
    }, [isLoaded])

    const getData = () => {
        let config = {
            headers : {
                Authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        }

        axios.get(CONFIG.SERVER_URL + "/analytics", config)
            .then((res) => {
                console.log(res.data)
                setData(res.data)
                setLoaded(true)
            }, (err) => {
                setLoaded(false)
                setError(err)
                //Maybe errorNotify
            })
    }

    if(error){
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <Loading/>
    } else {
        return (
            <>
                <NavComponent/>
                <Container>
                    <Row>
                        <Col>
                            <h3>You are the number # {data.rankPosition} in the global ranking!</h3>
                        </Col>
                        <Col>
                            <h3>You received a total of {data.numberOfVotes} votes</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <h2>Your voters are</h2>
                            <Genders genders={data.genderAnalytics}/>
                        </Col>
                        <Col>
                            <h1>How old are your voters?</h1>
                            <Ages ages={data.agesAnalytics}/>
                        </Col>
                    </Row>
                </Container>
            </>

        )
    }
}

export const Analytics = () => {
    const user = useSelector(state => state.userReducer)
    return user.username ? <AnalyticsAuth user={user}/> : <Home/>
}


