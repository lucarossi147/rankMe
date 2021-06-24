import {useEffect, useState} from "react";
import FormSocial from "./FormSocial"
const CONFIG = require("./config.json");

function Profile(props) {

    const [isLoaded, setLoaded] = useState(false)
    const [error, setError] = useState('')
    const [user, setUser] = useState({})

    useEffect(() => {
        fetchProfile(props.user)
    }, [props.user])

    const fetchProfile =  (user) => {

        if(!user._id){
            console.log("Error id null in fetchprofile")
            return;
        }
        fetch(CONFIG.SERVER_URL + "/profile/" + user._id, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        }).then(res => res.json())
            .then((res) => {
                setLoaded(true)
                setUser(res)
        }, (error) => {
                setLoaded(false)
                setError(error)
            })
    }

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


