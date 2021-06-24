import {useState} from "react";
import axios from "axios";
const CONFIG = require("./config.json");

function FormSocial(){
    const [instagram, setIg] = useState('')
    const [facebook, setFb] = useState('') //localStorage.getItem('facebook') || null

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
            console.log("One or more social fields empty")
            //TODO toast
            return;
        }

        let localJWT = localStorage.getItem('accessToken')

        let headConfig = {
            headers: {
                'Authorization': 'Bearer ' + localJWT
            }
        }

        axios.post(CONFIG.SERVER_URL + "addSocial",
            {
                instagram: instagram,
                facebook: facebook
            }, headConfig)
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
}

export default FormSocial;
