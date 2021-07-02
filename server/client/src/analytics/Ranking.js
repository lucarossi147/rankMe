import {useEffect, useState} from "react";
import axios from "axios";
import {errorNotify} from "../notifyAlerts";
import {Table} from "react-bootstrap";

const CONFIG = require("../config.json")

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
                if(res.status === 200){
                    setLoaded(true)
                    setRanking(res.data)
                    console.log("ranking after axios call" + ranking)
                } else {
                    setLoaded(false)
                }
            }).catch(function (error) {
            errorNotify('Error', error.message);
        });
    }

    if(isLoaded){
        console.log("inside rendering")
        console.log(isLoaded)
        console.log("is empty" + Object.getOwnPropertyNames(ranking).length === 0)
        return (
            <>
                <h2>Ranking </h2>
                <Table striped bordered hover>
                    <thead>
                    <th>#</th>
                    <th>Username</th>
                    </thead>
                    <tbody>
                    {ranking.array.map(item =>
                        <tr>
                            <td scope="row">
                                {item.position}
                            </td>
                            <td>
                                {item.username}
                            </td>
                        </tr>
                    )}
                    </tbody>
                </Table>
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

