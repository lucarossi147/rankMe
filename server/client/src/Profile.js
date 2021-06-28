import React, {useEffect, useState} from "react";
import FormSocial from "./FormSocial"
import {Authentication} from "./Home"
import {useSelector} from "react-redux";
import FormLocality from "./FormLocality";
import Logout from "./Logout";
const CONFIG = require("./config.json");

export const Profile = () => {
    const user =  useSelector(state => state.userReducer)
    return user.username  ? <ProfileAuth user={user}/> : <Authentication/>
}

const ProfileAuth = (props) => {
    const [isLoaded, setLoaded] = useState(false)
    const [error, setError] = useState('')
    const [user, setUser] = useState(props.user || {})

    useEffect(() => {
        fetchProfile() //TODO muovere fethcprofile qua dentro https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook
    }, [isLoaded]) //Ricarico il profilo solo se c'è un side effect su isLoaded

    const fetchProfile =  () => {

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
            return (
                <div>
                    <h1> Welcome {user.username}</h1>
                    <img src={user.picture} alt="Profile image not found"/>
                    <Rank rank={user.rankPosition}/>
                    <FormSocial user={user}/>
                    <FormLocality user={user}/>
                    <textarea readOnly value={props.bio || ""}/>
                    <Logout/>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>Welcome unauthorized user!</h1>
                    <h3>Please login or signup to the site!</h3>
                </div>
            )
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

export default Profile;


