import React, {Component} from "react";
import axios from "axios";
import {Redirect} from "react-router-dom";

class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect : false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        let localJWT = localStorage.getItem('refreshToken') || null;
        if(localJWT === null){
            console.log("JWT is null.. Aborting request")
            return;
        }

        axios
            .delete("http://localhost:3000/logout", {
                headers: {},
                data: {
                    token: localJWT
                }
            })
            .then( res => {
                if(res.status === 200) {
                    alert("user is logged out")
                }
            })
            .catch(err => {
                console.log(err);
            });
        localStorage.clear()

        this.setState({
                redirect : true
            }
        )
    }

    render() {
        if(this.state.redirect === true){
            this.setState({
                    redirect : false
                }
            )
            return <Redirect to={'/'}/>
        }

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
