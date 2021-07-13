import {Card, CardGroup, Container, ProgressBar} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import axios from "axios";

const CONFIG = require('../config.json')

const Badges = () => {

    const [isLoaded, setLoaded] = useState(false)
    const [votes, setVotes] = useState(0)
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

        axios.get(CONFIG.SERVER_URL + "/numberOfVotes", config)
            .then((res) => {
                setVotes(res.data.numberOfVotes)
                setLoaded(true)
            }, (err) => {
                setLoaded(false)
                setError(err)
            })
    }


    if(error){
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>
    } else {
        return (
            <Container>
                    <CardGroup>
                        <Card>
                            <Card.Header>Beginner</Card.Header>
                            <Card.Body>
                                <Card.Title>Get one vote!</Card.Title>
                                <ProgressBar animated={!(votes)} now={(votes>0)?100:0}/>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Header>Average</Card.Header>
                            <Card.Body>
                                <Card.Title>Get 10 votes!</Card.Title>
                                <ProgressBar animated={(votes < 10)} now={votes*10} />
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Header>Awesome</Card.Header>
                            <Card.Body>
                                <Card.Title>Get 100 votes!</Card.Title>
                                <ProgressBar animated={(votes<100)} now={votes} />
                            </Card.Body>
                        </Card>
                    </CardGroup>
            </Container>
        )
    }


}

export default Badges
