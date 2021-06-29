import React, {useState} from "react";
import axios from "axios";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import {toast, ToastContainer} from "react-toastify";

const CONFIG = require("./config.json");

function FormLocality(props){

    const errorNotify = (message) => toast.error(message)
    const successNotify = (message) => toast.success(message)
    const [locality, setLocality] = useState(null)
    const accessToken = localStorage.getItem('accessToken')

    const handleSubmit = (evt) =>{
        evt.preventDefault();

        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }

        //TODO inserire toast invece di console.log
        if(locality.value.terms.length < 3 ){
            errorNotify("Error submitting the city, please change locality or retry")
            return
        }
        axios.post(CONFIG.SERVER_URL + "/address",
            {
                city: locality.value.terms[0].value,
                country: locality.value.terms[1].value,
                state: locality.value.terms[2].value,
            }, config)
            .then(function (response) {
                if(response.status === 200){
                    successNotify("Correctly update location")
                } else {
                    errorNotify("Error on update of location")
                }
            }).catch(function (error) {
                errorNotify('Error', error.message);
        });
    }

    return(
        <div>
            <ToastContainer />
            <GooglePlacesAutocomplete selectProps={
                {
                    locality,
                    onChange: setLocality
                }
            }
            />
            <button onClick={handleSubmit}>Update</button>
        </div>
    )
}

export default FormLocality
