import {Component} from "react";
import FormSocial from "./FormSocial"

class Profile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            error: null,
            user : {}
        }
    }

    componentDidMount() {
        this.fetchProfile(this.props._id)
    }

    fetchProfile(id){
        if(!id){
            console.log("Error id null in fetchprofile")
            return;
        }
        if(!localStorage.getItem('accessToken')){
            console.log('Error, user not logged in')
            return;
        }
        fetch("http://localhost:3000/profile/" + id, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        }).then(res => res.json())
            .then((res) => {
                this.setState({
                    isLoaded : true,
                    user : {
                        _id: res._id,
                        name: res.name,
                        surname: res.surname,
                        username: res.username,
                        rankPosition: res.rankPosition,
                        admin: res.admin,
                        instagram: res.instagram,
                        facebook: res.facebook,
                        birthDate: res.birthDate,
                        bio: res.bio
                    }
                })
        }, (error) => {
                this.setState({
                    isLoaded: false,
                    error
                })
            })
    }

    render() {
        const {error, isLoaded, user} = this.state
        if(error){
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>
        } else {
            if(localStorage.getItem('accessToken')){
                return <ProfileAuth user={user}/>;
            } else {
                return <ProfileNotAuth/>;
            }
        }
    }
}

function Rank(props) {
    if(props.rank){
        return(
            <div> Rank: {props.rank}</div>
        );
    } else {
        return (
            <div>
                <h5>Posizione in classifica non calcolata</h5>
            </div>
        );
    }
}

function Image(){
    return (
        <div id="image">
            <img src="" alt={"profile"}/>
        </div>
    );
}

function Bio(props){
    return (
        <div>
            <textarea readOnly value={props.bio || ""}/>
        </div>
    );
}

function ProfileAuth(user){
    /*
    TODO risolvere questo scempio
     */
    let thisUser = user.user
    return (
    <div>
        <h1> Welcome {thisUser.username}</h1>
        <Image id={thisUser._id}/>
        <Rank rank={thisUser.rankPosition}/>
        <FormSocial id={thisUser._id}/>
        <Bio bio={thisUser.bio}/>
    </div>
    );
}

function ProfileNotAuth(){
    return (
        <div>
            <h1>Welcome unauthorized user!</h1>
            <h3>Please login or signup to the site!</h3>
        </div>
    );
}

export default Profile;


