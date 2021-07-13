import * as React from "react";
import axios from "axios";
import {errorNotify, successNotify} from "../notifyAlerts"
import {Button} from "react-bootstrap";
import {useEffect} from "react";

const CONFIG = require("../config.json")

interface bioProps {
    bio: string,
    readonly editable: boolean,
    callback: (boolean) => void
}

export function Bio(props:bioProps){

    const [text, setText] = React.useState<string>("")
    const accessToken = localStorage.getItem('accessToken')

    useEffect(
        () => {
            setText(props.bio)
        }
    )

    const handleChange = (evt) => {
        const {name,value} = evt.target;
        if(name === 'bio'){
            setText(value)
        }
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()

        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        }

        if(text === ""){
            errorNotify("Bio is empty")
            return
        }

        axios.post(CONFIG.SERVER_URL + "/bio",
            {
                bio: text,
            }, config)
            .then(function (response) {
                if(response.status === 200){
                    successNotify("Correctly update bio")
                    props.callback(false)
                } else {
                    errorNotify("No update of bio...")
                }
            }).catch(function (error) {
            console.log('Error', error.message);
        });
    }


    if (props.editable) {
        return (
            <>
                <textarea style={{height: "auto"}} name="bio" onChange={handleChange} value={text}/>
                <Button onClick={handleSubmit}>Update</Button>
            </>
    )
    } else {
        return <p> {text} </p>
    }
}
