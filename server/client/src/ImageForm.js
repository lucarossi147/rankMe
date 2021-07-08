import React, {useState} from "react";
import axios from "axios";
import {errorNotify, successNotify} from "./notifyAlerts";

const CONFIG = require("./config.json");

function ImageForm(props){
    const [selectedFile, setFile] = useState()
    const accessToken = localStorage.getItem('accessToken')

    const onClickHandler = () => {
        const data = new FormData();
        data.append('profile', selectedFile)
        if (selectedFile){
            let config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': 'Bearer ' + accessToken
                }
            }

            axios.post(CONFIG.SERVER_URL + "/uploadPhoto", data, config)
                .then(res => {
                    //TODO controlla effettiva risposta corretta
                    successNotify("Photo correctly uploaded")
                    props.callback(true)
                })
                .catch(err => {
                    errorNotify("Error uploading photo")
                });
        } else {
            errorNotify("Select a file first")
        }

    }

    const onChangeHandler = evt => {
        setFile(evt.target.files[0])
    }

    return (
        <div>
            <input type="file" name="profile" onChange={onChangeHandler} />
            <button onClick={onClickHandler}>Upload photo</button>
        </div>
    );
}

export default ImageForm
