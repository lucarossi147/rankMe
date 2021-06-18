import {Component} from "react";
import axios from "axios";

class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            setted: false,
            _id: '',
            name: '',
            surname: '',
            username: '',
            rankPosition: '',
            admin: '',
            instagram: '',
            facebook:'',
            birthDate: ''
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
        let config = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        }

        axios
            .get("http://localhost:3000/profile/" + id,config)
            .then(res => {
                if(res.status === 200){
                    //Profilo trovato, salvo informazioni
                    this.setState({
                        setted: true,
                        _id: res.data._id,
                        name: res.data.name,
                        surname: res.data.surname,
                        username: res.data.username,
                        rankPosition: res.data.rankPosition,
                        admin: res.data.admin,
                        instagram: res.data.instagram,
                        facebook: res.data.facebook,
                        birthDate: res.data.birthDate,
                        bio: res.data.bio
                    })
                    console.log(this.state)
                } else if(res.status === 404) {
                    console.log("Fetch profile response 404")
                }
            }).catch(err => {
            console.log(err)
        })
    }

    render() {
        if(localStorage.getItem('accessToken')){
            return <ProfileAuth user={this.state.user}/>;
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

function Social(props){
    if(props.link !== null){
        return (
            <div id={props.link}>
                <a href={props.link} rel="noreferrer" target="_blank">{props.link}</a>
            </div>
        );
    } else {
        return null;
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
        <Social link={thisUser.facebook}/>
        <Social link={thisUser.instagram}/>
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


