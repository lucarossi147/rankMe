import {Component} from "react";
import UserVote from "./UserVote";
import authService from "./authService";
import axios from "axios";
const CONFIG = require("./config.json");

class Match extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            user1 : {},
            user2 : {}
        }
    }

    componentDidMount() {
        this.fetchProfile()
    }

    fetchProfile(){
        let config = {
            headers : {
                Authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        }
        axios.get(CONFIG.SERVER_URL + "/findMatch", config)
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        user1 : result.data.user1,
                        user2 : result.data.user2
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
    }

    render() {
        const {error, isLoaded, user1, user2} = this.state

        if(error){
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>
        } else {
            return (
                <div>
                    <h1>Choose the best photo: </h1>
                    <UserVote user={user1}/>
                    <UserVote user={user2}/>
                </div>
            );
        }
    }
}

export default Match;
