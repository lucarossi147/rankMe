import React from "react";
import axios from "axios";
import "./login.css";

class ImageForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedFile: null,
        };
    }

    onClickHandler = () => {
        const data = new FormData();
        data.append('profile', this.state.selectedFile)
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

    onChangeHandler = evt => {
        console.log(evt.target.files[0]);
        this.setState({
            selectedFile : evt.target.files[0],
            loaded:0
        })
    }

    render() {
        return (
            <div>
                <input type="file" name="profile" onChange={this.onChangeHandler} />
                <button onClick={this.onClickHandler}>Upload</button>
            </div>
        );
    }
}

export default ImageForm;
