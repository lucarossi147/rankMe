import React, {useState} from "react";
import axios from "axios";
import {errorNotify, successNotify} from "../notifyAlerts";
import {Button, Col, Row} from "react-bootstrap";
import styles from "./profile.module.css";

const CONFIG = require("../config.json");

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
                .then(() => {
                    successNotify("Photo correctly uploaded")
                    props.callback(true)
                })
                .catch(() => {
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
            <Row>
                <Col>
                    <input type="file" name="profile" onChange={onChangeHandler}/>
                </Col>
                <Col>
                    <Button className={styles.backColor} onClick={onClickHandler}>Upload photo</Button>
                </Col>
            </Row>
        </div>
    );
}

export default ImageForm
