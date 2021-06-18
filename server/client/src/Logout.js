import React, {Component} from "react";
import axios from "axios";

class Logout extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        let localJWT = localStorage.getItem('accessToken') || null;
        if(localJWT === null){
            console.log("JWT is null.. Aborting request")
            return;
        }

        let config = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        }

        axios
            .delete("http://localhost:3000/logout", config)
            .then( res => {
                if(res.status === 200){
                    alert("user is logged out")
                    localStorage.clear()
                } else if(res.status === 403){
                    alert("Forbidden to logout")
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="submit" value="Logout" />
                </form>
            </div>
        );
    }
}
export default Logout;
