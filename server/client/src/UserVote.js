import {Component} from "react";
import axios from "axios";
import authService from "./authService";
const CONFIG = require("./config.json");

class UserVote extends Component {
    constructor(props) {
        super(props);

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

        axios.post(CONFIG.SERVER_URL + "addSocial",
            {
                userId: this.props.user._id
            }, authService.authHeader)
            .then(function (response) {
                if(response.status === 200){
                    console.log("Correctly voted")
                } else {
                    console.log("Not correctly voted")
                }
            }).catch(function (error) {
            console.log('Error', error.message);
        });
    }

    render(){
        let user = this.props.user
        return(
            <div>
                <h2>User: </h2>
                <img src={user.img} alt={"img not found"}/>
                <h3>{user.name} {user.surname}</h3>
                <button onClick={this.handleSubmit}>Vote</button>
            </div>
        )
    }
}

export default UserVote
