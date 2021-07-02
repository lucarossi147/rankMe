import {useSelector} from "react-redux";
import {Home} from "./Home";
import Genders from "./analytics/Genders";
import {ListGroup} from "react-bootstrap";
import Logout from "./Logout";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Ages from "./analytics/Ages";
import axios from "axios";

const CONFIG = require("./config.json")

function AnalyticsAuth(props) {

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
                console.log("In then")
                setLoaded(true)
                setData(res.data)
                console.log("data" + data)
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
        return (
            <div className="div-center">
                <div className="content">
                    <Genders genders={data.genderAnalytics}/>
                    <Ages ages={data.agesAnalytics}/>
                    <ListGroup horizontal>
                        <ListGroup.Item>
                            <Logout/>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Link to="/profile">My Profile </Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Link to="/ranking">Ranking </Link>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Link to={"/"}>Back to Home</Link>
                        </ListGroup.Item>
                    </ListGroup>
                </div>
            </div>
        )
    }
}

export const Analytics = () => {
    const user = useSelector(state => state.userReducer)
    return user.username ? <AnalyticsAuth user={user}/> : <Home/>
}


