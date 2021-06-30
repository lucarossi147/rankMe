import {useState} from "react";
import axios from "axios";
import {errorNotify, successNotify} from "./notifyAlerts";

const CONFIG = require("./config.json");

function FormSocial(props){
    const user = props.user
    const [instagram, setIg] = useState(user.instagram || '')
    const [facebook, setFb] = useState(user.facebook || '')
    const accessToken = localStorage.getItem('accessToken')

    const handleChange = (evt) => {
        const {name,value} = evt.target;
        if(name === 'instagram'){
            setIg(value)
        } else if(name==='facebook'){
            setFb(value)
        }
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if(!instagram || !facebook){
            errorNotify("One or more social fields empty")
            return;
        }

        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }

        axios.post(CONFIG.SERVER_URL + "/addSocial",
            {
                instagram: instagram,
                facebook: facebook
            }, config)
            .then(function (response) {
                if(response.status === 200){
                    successNotify("Correctly update social links")
                } else {
                    errorNotify("No update of social links")
                }
            }).catch(function (error) {
            console.log('Error', error.message);
        });
    }

    //Qui controllo che il profilo di cui sto visualizzando il profilo sia quello dell'utente collegato
    console.log(user)
    console.log(accessToken)
    if(user.token == accessToken){
        return(
            <div>
                <label>
                    Facebook:
                    <input type="text" name="facebook" onChange={handleChange} value={facebook}/>
                </label>
                <label>
                    Instagram:
                    <input type="text" name="instagram" onChange={handleChange} value={instagram}/>
                </label>
                <button onClick={handleSubmit}>Update</button>
            </div>
        )
    } else {
        return(
            <div>
                <label>
                    Facebook: {facebook}
                </label>
                <br/>
                <label>
                    Instagram: {instagram}
                </label>
            </div>
        )
    }

}

export default FormSocial;
