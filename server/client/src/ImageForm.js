import React, {useState} from "react";
import axios from "axios";

function ImageForm(){
    const [selectedFile, setFile] = useState()

    const onClickHandler = () => {
        const data = new FormData();
        data.append('profile', selectedFile)
        let localJWT = localStorage.getItem('accessToken')

        let config = {
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': 'Bearer ' + localJWT
            }
        }

        axios.post("http://localhost:3000/uploadPhoto", data, config)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
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
