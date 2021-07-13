import {errorNotify} from "../notifyAlerts";
import {Button, Container, Image, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import NavComponent from "../navbar/NavComponent";
import {Loading} from "../loading/Loading";
import {useState, useEffect} from "react";
import axios from "axios";

const CONFIG = require("../config.json")

interface resultI {
    n: number,
    age: number,
    gender: string,
    city: string,
    state: string,
    country: string
}

const Ranking = () => {
    const [isLoaded, setLoaded] = useState<boolean>(false)

    const [ranking, setRanking] = useState({
        array: null
    })

    const [filtering, setFiltering] = useState<boolean>(false)
    const [result, setResult] = useState<resultI>()

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
                }).catch(function (err) {
                errorNotify("Error" + "err.message");
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
                        onClick={() => {
                            setFiltering(!filtering)
                            setResult({
                                ...result,
                                n: 10
                            })
                        }}>
                        Toggle filters
                    </Button>

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
                                        <Image
                                               src={CONFIG.SERVER_URL + "/images/" + item.picture}
                                               roundedCircle
                                        />
                                        <Link
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
