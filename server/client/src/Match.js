import {Component} from "react";
import axios from "axios";

function User(props) {
    return (
        <div>
            <img src={props.img} alt={"img not found"}/>
            <h3>{props.name} {props.surname}</h3>
        </div>
    );
}

class Match extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user1 : null,
            user2 : null
        }
        fetchProfile()
    }

    render() {
        return (
            <div>
                <h1>Choose the best photo: </h1>
                <h2>User 1:</h2>
                <User user={this.state.user1}/>
                <h2>User 2:</h2>
                <User user={this.state.user2}/>
            </div>
        );
    }
}

function fetchProfile(){
    let localJWT = localStorage.getItem('accessToken')

    let config = {
        headers: {
            'Authorization': 'Bearer ' + localJWT
        }
    }

    axios.get("http://localhost:3000/findmatch", config)
        .then(function (res) {
            this.setState({
                user1 : res.data.user1,
                user2 : res.data.user2,
            })
        })
        .catch(function (err) {
            console.log(err);
        });
}

export default Match;
