import {Component} from "react";
import axios from "axios";
var CONFIG = require("./config.json")

class FormSocial extends Component{
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            instagram: localStorage.getItem('instagram') || null,
            facebook: localStorage.getItem('facebook') || null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt) {
        const value = evt.target.value;
        this.setState({
            ...this.state,
            [evt.target.name]: value
        });
    }

    handleSubmit(evt) {
        evt.preventDefault();
        let localJWT = localStorage.getItem('accessToken')

        let headConfig = {
            headers: {
                'Authorization': 'Bearer ' + localJWT
            }
        }

        axios.post(CONFIG.SERVER_URL + "addSocial",
            {
                instagram: this.state.instagram,
                facebook: this.state.facebook
            }, headConfig)
            .then(function (response) {
                if(response.status === 200){
                    //console.log("Correctly update social links")
                } else {
                    //console.log("No update of social links")
                }
            }).catch(function (error) {
            console.log('Error', error.message);
        });
    }

    render() {
        return(
            <div>
                <label>
                    Facebook:
                    <input type="text" name="facebook" onChange={this.handleChange} value={this.state.facebook}/>
                </label>
                <label>
                    Instagram:
                    <input type="text" name="instagram" onChange={this.handleChange} value={this.state.instagram}/>
                </label>
                <button onClick={this.handleSubmit}>Update</button>
            </div>
        )
    }
}

export default FormSocial;
