import React, {useEffect, useState} from "react";
import FormSocial from "./FormSocial"
import {Home} from "./Home"
import {useSelector} from "react-redux";
import FormLocality from "./FormLocality";
import Logout from "./Logout";
import {Link, useLocation} from "react-router-dom"
import ImageForm from "./ImageForm";

const CONFIG = require("./config.json");

export const Profile = () => {
    const location = useLocation()
    const id = location.state?.redirectToUser
    const user =  useSelector(state => state.userReducer)
    return user.username  ? <ProfileAuth user={user} id={id}/> : <Home/>
}

const ProfileAuth = (props) => {
    const [isLoaded, setLoaded] = useState(false)
    const [error, setError] = useState('')
    const [user, setUser] = useState(props.user || {}) //Ottengo l'utente corrente se passato
    const id = props.id || user._id || null //Se viene passato un id, chiedo il profilo di quell'utente, altrimenti dell'utente corrente

    useEffect(() => {
        fetchProfile() //TODO muovere fethcprofile qua dentro https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook
    }, [isLoaded]) //Ricarico il profilo solo se c'è un side effect su isLoaded

    const fetchProfile =  () => {

        if(!id){
            console.log("Error id null in fetchprofile" + id)
            return;
        }
        fetch(CONFIG.SERVER_URL + "/profile/" + id, {
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
                    <img src={CONFIG.SERVER_URL + "/images/" + user.picture} alt="Profile not found"/>
                    <Rank rank={user.rankPosition}/>
                    <FormSocial user={user}/>
                    <FormLocality user={user}/>
                    <textarea readOnly value={user.bio || ""}/>
                    <Link to={"/"}>Back to Home</Link>
                    <ImageForm/>
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


