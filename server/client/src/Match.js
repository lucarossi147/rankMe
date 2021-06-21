import {Component} from "react";

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
        let localJWT = localStorage.getItem('accessToken')

        fetch("http://localhost:3000/findMatch", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localJWT
            }
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
        console.log("In render: " + this.state)
        console.log("err" + error)
        console.log("user1 " + user1 + " " + user1.name)

        if(error){
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>
        } else {
            return (
                <div>
                    <h1>Choose the best photo: </h1>
                    <h2>User 1: </h2>
                    <img src={user1.img} alt={"img not found"}/>
                    <h3>{user1.name} {user1.surname}</h3>
                    <h2>User 2:</h2>
                    <img src={user2.img} alt={"img not found"}/>
                    <h3>{user2.name} {user2.surname}</h3>
                </div>
            );
        }
    }
}

export default Match;
