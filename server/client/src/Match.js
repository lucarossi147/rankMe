import UserVote from "./UserVote";
import axios from "axios";
import {useEffect, useState} from "react";
import {CardGroup, Row, Container,} from "react-bootstrap";

const CONFIG = require("./config.json");

function Match(){

    const [reload, setReload] = useState(false)
    const [user1, setUser1] = useState({})
    const [user2, setUser2] = useState({})
    const [isLoaded, setLoaded] = useState(false)
    const [error, setError] = useState('')

    /*
    TODO faccio controllo, in caso ci siano settati user1._id e user2._id prendo quelli per fare il match,
      altrimenti chiamo feth profile
     */
    const accessToken = localStorage.getItem('accessToken')

    useEffect(() => {
        fetchProfile()
    }, [reload])

    const fetchProfile = () => {
        let config = {
            headers : {
                Authorization : 'Bearer ' + accessToken
            }
        }
        axios.get(CONFIG.SERVER_URL + "/findMatch", config)
            .then(
                (result) => {
                    setUser1(result.data.user1)
                    setUser2(result.data.user2)
                    setLoaded(true)
                    setReload(false)
                },
                (error) => {
                    setError(error)
                    setLoaded(false)
                }
            )
    }

    if(error){
        return <div> Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>
    } else {
        return (
            <>
            <Container>
                <CardGroup>
                        <UserVote callback={setReload} user={user1}/>
                        <UserVote callback={setReload} user={user2}/>
                </CardGroup>
            </Container>
            </>
        );
    }
}

export default Match;
