import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import authService from "./authService";

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
        authService.logout()
        this.setState({redirect : true})
    }

    render() {
        if(this.state.redirect === true){
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
