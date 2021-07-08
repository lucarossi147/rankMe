import React, {useEffect, useState} from "react";
import axios from "axios";
import {errorNotify} from "./notifyAlerts";
import {Button, Col, Container, Form, Row, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import NavComponent from "./NavComponent";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const CONFIG = require("./config.json")

const Ranking = () => {
    const [isLoaded, setLoaded] = useState(false)
    const [ranking, setRanking] = useState({})
    const [filtering, setFiltering] = useState(false)
    const [result, setResult] = useState({}) //Result deve contenere i campi age, n, city state e country con n di default a 10

    useEffect(() => {
        getRanking()
    }, [filtering, isLoaded, result])

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
            }).catch(function (error) {
            errorNotify('Error', error.message);
        });
    }

    if(isLoaded && ranking.array){
        return (
            <>
                <NavComponent/>
                <Container>
                    <Button onClick={() => {
                        setFiltering(!filtering)
                        setResult({
                            n: 10
                        })
                    }}>
                        Enable or disable filtering
                    </Button>
                    <FilterForm
                        enable={filtering}
                        createUrl={setResult}
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

    const [localityType, setLocalityType] = useState(null)
    const [locality, setLocality] = useState(null)
    const [age, setAge] = useState(null)
    const [gender, setGender] = useState(null)
    const [max, setMax] = useState(10)

    const onSubmit = (evt) => {
        evt.preventDefault()
        const array = {
            age: age,
            gender: gender,
            n: max
        };
        array[localityType] = locality
        console.log(array)
        props.createUrl(array)
    }

    const setFilteredLocality = (place) => {
        switch (localityType){
            case "city":
                if(place.value.terms[0] !== null){
                    setLocality(place.value.terms[0].value)
                }
                break
            case "country":
                if(place.value.terms[1] !== null){
                    setLocality(place.value.terms[1].value)
                }
                break
            case "state":
                if(place.value.types[0] === "country"){
                    setLocality(place.value.terms[0].value)
                }
                break
            default:
                break
        }
    }

    function handleChange(evt) {
        const {name, value} = evt.target
        if(name === "age"){
            setAge(value)
        } else if(name === "gender"){
            setGender(value)
        } else if(name === "place"){
            setLocalityType(value)
        } else if(name === "max"){
            setMax(value)
        }
    }

    if(filtering === true) {
        return (
            <Form onSubmit={onSubmit}>
                <Row>
                    <Col>
                        <Form.Label>Enter number of person to show:</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            type="number"
                            min="0"
                            max="100"
                            name="max"
                        />
                    </Col>
                    <Col>
                        <Form.Label>Enter age:</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            type="number"
                            min="0"
                            max="100"
                            name="age"
                        />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group >
                            <Form.Check onChange={handleChange}
                                        type="radio"
                                        name="gender"
                                        value={"female"}
                                        label={`female`}
                            />
                            <Form.Check onChange={handleChange}
                                        name="gender"
                                        value={"male"}
                                        type="radio"
                                        label={`male`}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <div onChange={handleChange}>
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
                        {
                            (localityType !== null) ?
                                <GooglePlacesAutocomplete
                                    selectProps={{
                                        locality,
                                        onChange: setFilteredLocality,
                                    }}
                                /> : <></>
                        }
                    </Col>
                    <Col>
                        <Button type="secondary">Submit</Button>
                    </Col>
                </Row>
            </Form>
        )
    } else {
        return (
            <></>
        )
    }
}

export default Ranking

