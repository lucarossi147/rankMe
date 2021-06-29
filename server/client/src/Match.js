import UserVote from "./UserVote";
import axios from "axios";
import {useEffect, useState} from "react";
import {CardGroup} from "react-bootstrap";
const CONFIG = require("./config.json");

function Match(){

    const [user1, setUser1] = useState({})
    const [user2, setUser2] = useState({})
    const [isLoaded, setLoaded] = useState(false)
    const [error, setError] = useState('')

    const accessToken = localStorage.getItem('accessToken')

    useEffect(() => {
        fetchProfile()
    }, [])

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
            <div>
                <h1>Choose the best photo: </h1>
                <CardGroup>
                    <UserVote user={user1}/>
                    <UserVote user={user2}/>
                </CardGroup>
            </div>
        );
   }
}

export default Match;
