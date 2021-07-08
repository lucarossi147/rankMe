import {Card, CardGroup, Container, ProgressBar, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import axios from "axios";

const CONFIG = require('./config.json')

const Badges = () => {

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
        return <div>Loading...</div>
    } else {
        const votes = data.numberOfVotes

        return (
            <Container>
                    <CardGroup>
                        <Card>
                            <Card.Header>Beginner</Card.Header>
                            <Card.Body>
                                <Card.Title>Get one vote!</Card.Title>
                                <ProgressBar now={(votes>0)?100:0}/>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Header>Average</Card.Header>
                            <Card.Body>
                                <Card.Title>Get 10 votes!</Card.Title>
                                <ProgressBar  now={votes*10} />
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Header>Awesome</Card.Header>
                            <Card.Body>
                                <Card.Title>Get 100 votes!</Card.Title>
                                <ProgressBar animated={true} now={votes} />
                            </Card.Body>
                        </Card>
                    </CardGroup>
            </Container>
        )
    }


}

export default Badges
