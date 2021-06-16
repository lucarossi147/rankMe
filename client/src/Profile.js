import {Component} from "react";

class Profile extends Component {
    render() {
        const name = localStorage.getItem('name')
        const image = localStorage.getItem('image')
        const rank = localStorage.getItem('rank')
        const facebook = localStorage.getItem('facebook')
        const instagram = localStorage.getItem('instagram')

        return (
        <div>
            <h1> Welcome {name}</h1>
            <div id="image">
                <img src={image} alt={"profile"}/>
            </div>
            <div> Rank: {rank}</div>
            <div id={"facebook"}>
                <a href={facebook}>Facebook</a>
            </div>
            <div id={"instagram"}>
                <a href={instagram}>Instagram</a>
            </div>
        </div>
        )
    }

    /*
    Se il profilo è dell'utente corrente, occorre poter modificare i link/imamgine presenti
     */
}

export default Profile;
