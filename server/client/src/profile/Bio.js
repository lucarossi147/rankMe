import React, {useEffect, useState} from "react";
import axios from "axios";
import {errorNotify, successNotify} from "../notifyAlerts";
import styles from "./profile.module.css";
import {Button} from "react-bootstrap";
const CONFIG = require("../config.json")

export function Bio(props) {

    const accessToken = localStorage.getItem('accessToken')
    const [text, setText] = useState(props.user.bio || "")

    useEffect(() => {
        setText(props.user.bio)
    })
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
                <textarea name="bio" onChange={handleChange} value={text}/>
                <Button className={styles.backColor} onClick={handleSubmit}>Update</Button>
            </>
        )
    } else {
        return <p> {text} </p>
    }
}

