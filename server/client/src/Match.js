import {Component} from "react";
import UserVote from "./UserVote";
import authHeader from "./authService";

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
        fetch("http://localhost:3000/findMatch", {
            method: 'GET',
            authHeader
        }).then(
            res => res.json()
        )
        .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        user1 : result.user1,
                        user2 : result.user2
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
