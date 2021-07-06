import React, {useState} from "react";
import axios from "axios";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import {errorNotify, successNotify} from "./notifyAlerts"
import {Redirect} from "react-router-dom";
import {Button} from "react-bootstrap";
const CONFIG = require("./config.json");

function FormLocality(props){

    const [locality, setLocality] = useState(null)
    const [redirect, setRedirect] = useState(null)
    const accessToken = localStorage.getItem('accessToken')

    const handleSubmit = (evt) =>{
        evt.preventDefault();
        console.log(locality)
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }
        if(locality){
            if(locality.value.terms.length < 3 ){
                errorNotify("Error submitting the city, please change locality or retry")
            } else {
                axios.post(CONFIG.SERVER_URL + "/address",
                    {
                        city: locality.value.terms[0].value,
                        country: locality.value.terms[1].value,
                        state: locality.value.terms[2].value,
                    }, config)
                    .then((res) => {
                        if(res.status === 200){
                            successNotify("Correctly update location")
                            setRedirect(true)
                            props.callback(true)
                        } else {
                            errorNotify("Error on update of location")
                        }
                    }).catch(function (error) {
                    errorNotify('Error', error.message);
                });
            }
        } else {
            errorNotify("Enter the name of your city first!")
        }
    }

    if(redirect){
        return <Redirect to="/profile"/>
    } else {
        return(
            <div>
                <p>Hey! You didn't insert your location..</p>
                <GooglePlacesAutocomplete selectProps={
                    {
                        locality,
                        onChange: setLocality
                    }
                }
                />
                <Button variant="primary" onClick={handleSubmit}>
                    Update
                </Button>
            </div>
        )
    }
}

export default FormLocality
