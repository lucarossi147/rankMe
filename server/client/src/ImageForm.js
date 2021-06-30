import React, {useState} from "react";
import axios from "axios";
import {errorNotify, successNotify} from "./notifyAlerts";

const CONFIG = require("./config.json");

function ImageForm(){
    const [selectedFile, setFile] = useState()
    const accessToken = localStorage.getItem('accessToken')

    const onClickHandler = () => {
        const data = new FormData();
        data.append('profile', selectedFile)

        let config = {
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': 'Bearer ' + accessToken
            }
        }

        axios.post(CONFIG.SERVER_URL + "/uploadPhoto", data, config)
            .then(function (response) {
                successNotify("Photo correctly uploaded")
            })
            .catch(function (error) {
                errorNotify("Error uploading photo")
            });
    }

    const onChangeHandler = evt => {
        setFile(evt.target.files[0])
    }

    return (
        <div>
            <input type="file" name="profile" onChange={onChangeHandler} />
            <button onClick={onClickHandler}>Upload</button>
        </div>
    );
}

export default ImageForm
