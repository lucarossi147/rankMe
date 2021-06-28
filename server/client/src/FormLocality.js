import {useState} from "react";
import axios from "axios";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

const CONFIG = require("./config.json");

function FormLocality(props){

    //const user = props
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
        if(!locality){
            console.log("Locality not chosen")
            return
        }
        console.log(locality.value)
        if(locality.value.terms.length < 3 ){
            console.log("You selected a country, please set a specific city")
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
                    console.log("Correctly update social links")
                } else {
                    console.log("No update of social links")
                }
            }).catch(function (error) {
            console.log('Error', error.message);
        });
    }

    return(
        <div>
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
