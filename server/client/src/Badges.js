import {Card, ProgressBar} from "react-bootstrap";
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
            <div className="back">
                <div className="div-center homeBox">
                    <div className="deck">
                        <Card>
                            <Card.Header>Badge #1</Card.Header>
                            <Card.Body>
                                <Card.Title>Ottieni il tuo primo voto</Card.Title>
                                <Card.Text>
                                    Wait until someone vote you!
                                </Card.Text>
                                <ProgressBar now={(votes>0)?100:0}/>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Header>Badge #2</Card.Header>
                            <Card.Body>
                                <Card.Title>Ottieni dieci voti</Card.Title>
                                <Card.Text>
                                    Wait until someone vote you! (ten times)
                                </Card.Text>
                                <ProgressBar  animated={true} now={votes*10} />
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Header>Badge #3</Card.Header>
                            <Card.Body>
                                <Card.Title>Ottieni cento voti</Card.Title>
                                <Card.Text>
                                    Wait until someone vote you! (hundred times)
                                </Card.Text>
                                <ProgressBar animated={true} now={votes} />
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }


}

export default Badges
