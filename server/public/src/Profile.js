import {Component} from "react";

class Profile extends Component {
    render() {
        return <ProfilePrint/>;
    }

    /*
    Se il profilo è dell'utente corrente, occorre poter modificare i link/imamgine presenti
     */
}

function ProfilePrint(props){
    /*
        TODO: Qui si dovrebbe controllare se il token corrisponde a quello
        vero dell'utente
     */
    const isAuth = localStorage.getItem('accessToken')
    if(isAuth){
        const newUser = {
            name : localStorage.getItem('name'),
            image : localStorage.getItem('image'),
            rank : localStorage.getItem('rank'),
            facebook : localStorage.getItem('facebook'),
            instagram : localStorage.getItem('instagram')
        }
        return <ProfileAuth user={newUser} isAuth={true}/>;
    } else {
        return <ProfileNotAuth/>;
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

function Social(props){
    console.log("link =" + props.link)
    if(props.link){
        return (
            <div id={props.link}>
                <a href={props.link} rel="noreferrer" target="_blank">{props.link}</a>
            </div>
        );

    } else {
        return null;
    }
}

function Image(props){
    if(!props.img){
        return (
            <div id="image">
                <img src={props.img} alt={"profile"}/>
            </div>
        );
    } else {
        return null;
    }
}

function ProfileAuth(props){
    const user = props.user;
    return (
    <div>
        <h1> Welcome {user.name}</h1>
        <Image img={user.image}/>
        <Rank rank={user.rank}/>
        <Social link={user.facebook}/>
        <Social link={user.instagram}/>
    </div>
    );
    //TODO add bio
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
