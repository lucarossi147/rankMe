import axios from "axios";
import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CONFIG = require("./config.json");


function UserVote(props) {
    const notify = () => toast("Correctly voted!");
    const badNotify = () => toast("Problems occured during vote")

    const handleSubmit = (evt) => {
        evt.preventDefault();

        let config = {
            headers : {
                Authorization : 'Bearer ' + localStorage.getItem('accessToken')
            }
        }

        axios.post(CONFIG.SERVER_URL + "/addSocial",
            {
                userId: props.user._id
            }, config)
            .then( (response) => {
                if(response.status === 200){
                    notify()
                } else {
                    badNotify()
                }
            }).catch(function (error) {
                console.log('Error', error.message);
        });
    }

    let user = props.user
    /*
    TODO https://stackoverflow.com/questions/51569026/reactjs-image-doesnt-show-up
     */
    //console.log("picture : " + user.picture)
    return (
            <div>
                <h2>User: </h2>
                <img src={user.picture} alt={"img not found"}/>
                <h3>{user.name} {user.surname}</h3>
                <button onClick={handleSubmit}>Vote</button>
                <ToastContainer />
            </div>
    )
}

export default UserVote
