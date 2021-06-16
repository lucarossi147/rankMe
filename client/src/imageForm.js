import React from "react";
import axios from "axios";
import "./login.css";

class ImageForm extends React.Component {
    constructor(props) {
        super(props);
        this.proxy = this.props.proxy
        this.state = {
            image: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (evt) => {
        //Non worka con le checkbox https://blog.greenroots.info/how-to-create-react-form-with-a-single-change-event-handler-ckizqh0yq00x7zks16wd1cxu1
        const name = evt.target.name;
        const value = evt.target.value;
        this.setState({
            ...this.state,
            [name]: value
        })
    }

    handleSubmit(evt){

        axios.post(this.proxy + '/uploadphoto', {
            "accessToken" : localStorage.getItem('name'),
            "image" : this.state.image
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        evt.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Image:
                    <input required
                           type="file"
                           name="image"
                           value={this.state.image}
                           onChange={this.handleChange}
                           placeholder="Image"
                           accept="image/png image/jpeg image/jpg"
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default ImageForm;
