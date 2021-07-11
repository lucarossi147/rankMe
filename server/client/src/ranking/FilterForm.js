import {Button, Col, Form, Row} from "react-bootstrap";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import React, {useState} from "react";
import styles from "../ranking/ranking.module.css";

const FilterForm = (props) => {
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
                        <Button className={styles.backColor} type="secondary">Submit</Button>
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

export default FilterForm
