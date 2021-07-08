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
    }, [isLoaded, locality])

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
        console.log("rendered")
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

    const [localityType, setLocalityType] = useState(null)

    const onChangeLocality = (event) => {
        if(event.target.value !== null) {
            setLocalityType(event.target.value)
        }
    }

    const setFilteredLocality = (place) => {
        switch (localityType){
            case "city":
                if(place.value.terms[0] !== null){
                    props.callback(place.value.terms[0].value)
                }
                break
            case "country":
                if(place.value.terms[1] !== null){
                    props.callback(place.value.terms[1].value)
                }
                break
            case "state":
                if(place.value.terms[2] !== null){
                    props.callback(place.value.terms[2].value)
                }
                break;
        }
        console.log("Searching for : "+localityType + " and the result is: " + locality)
    }

    const onChangeAge = (event) => {
        const age = event.target.value
        console.log(age)
    }

    if(filtering === true) {
        console.log(locality)
        console.log("type: "+ localityType)
        return (
            <Row>
                <Form>
                    <div onChange={onChangeAge}>
                        <Form.Label>Enter age:</Form.Label>
                        <Form.Control type="number" placeholder="22" min={0} max={100}/>
                    </div>
                    <Form.Group>
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
                    </Form.Group>
                    <Form.Group>
                        <div onChange={onChangeLocality}>
                        <Form.Check
                            name="place"
                            type="radio"
                            label={`city`}
                            value="city"
                        />
                        <Form.Check
                            inline
                            name="place"
                            type="radio"
                            label={`country`}
                            value="country"
                        />
                        <Form.Check
                            inline
                            name="place"
                            type="radio"
                            label={`state`}
                            value="state"
                        />
                        </div>
                        <GooglePlacesAutocomplete
                            selectProps={{
                                locality,
                                onChange: setFilteredLocality,
                            }}
                        />
                    </Form.Group>
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

