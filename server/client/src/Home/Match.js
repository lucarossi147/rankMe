import UserVote from "./UserVote";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {CardGroup, Container} from "react-bootstrap";
import styles from "./match.module.css"
import ReactLoading from "react-loading";
import {useDispatch, useSelector} from "react-redux";
import {setMatch} from "../actions/allActions";

const CONFIG = require("../config.json");

function Match(){
    const [user1, setUser1] = useState(useSelector(state => state.matchReducer.user1))
    const [user2, setUser2] = useState(useSelector(state => state.matchReducer.user2))
    const [reload, setReload] = useState(false)
    const [isLoaded, setLoaded] = useState(false)

    const [error, setError] = useState('')

    const accessToken = localStorage.getItem('accessToken')
    const dispatch = useDispatch()

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
                    dispatch(
                        setMatch(
                            {
                                    user1: result.data.user1,
                                    user2: result.data.user2
                            }
                            )
                    )
                },
                (error) => {
                    setError(error)
                    setLoaded(false)
                }
            )
    }

    useEffect(() => {
        if (!user1 || !user2){
            fetchProfile()
        } else if(reload) {
            fetchProfile()
        } else if(!reload){
            setLoaded(true)
        }
        }
    , [reload])

    if(error){
        return <div> Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <ReactLoading type={"bars"} color={"26547C"} height={667} width={375} />
    } else {
        return (
            <>
                <Container className={styles.container}>
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
