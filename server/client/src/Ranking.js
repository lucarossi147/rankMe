import React, {useEffect, useState} from "react";
import axios from "axios";
import {errorNotify} from "./notifyAlerts";
import {Button, Container, Form, Row, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import NavComponent from "./NavComponent";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const CONFIG = require("./config.json")

const Ranking = (props) => {
    const [isLoaded, setLoaded] = useState(false)
    const [ranking, setRanking] = useState({})
    const [filtering, setFiltering] = useState(false)
    const [locality, setLocality] = useState(null)

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
                if(res.status === 200 || res.status === 304){
                    setLoaded(true)
                    setRanking(res.data)
                } else {
                    setLoaded(false)
                }
            }).catch(function (error) {
            errorNotify('Error', error.message);
        });
    }

    if(isLoaded && ranking.array){
        return (
            <>
                <NavComponent/>
                <Container>
                    <Button onClick={() => setFiltering(!filtering)}>
                        Enable or disable filtering
                    </Button>
                    <FilterForm
                        enable={filtering}
                        locality={locality}
                        callback={setLocality}
                    />
                    <div className="div-center analyticsBox">
                        <div className="content">
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
                        </div>
                    </div>
                </Container>
            </>

        )
    }
    return (
        <h1>
            Ranking not loaded
        </h1>
    )
}

export const FilterForm = (props) => {
    const filtering = props.enable
    const locality = props.locality
    if(filtering === true) {
        return (
            <Row>
                <h1>{locality}</h1>
                <Form>
                    <Form.Label>Enter age:</Form.Label>
                    <Form.Control type="number" placeholder="22" min={0} max={100}/>
                        <Form.Check
                            type="radio"
                            name="gender"
                            label={`female`}
                        />
                        <Form.Check
                            inline
                            name="gender"
                            type="radio"
                            label={`male`}
                        />
                    <GooglePlacesAutocomplete selectProps={
                        {
                            locality,
                            onChange: props.callback
                        }
                    }
                        />
                </Form>
            </Row>
        )
    } else {
        return (
           <a> Not enabled</a>
        )
    }
}

export default Ranking

