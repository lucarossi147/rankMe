import {useState} from "react";
import {Redirect} from "react-router-dom";
import authService from "../authService";
import {useDispatch} from "react-redux";
import {logoutAction} from "../actions/allActions";
import {Button} from "react-bootstrap";

function Logout(){

    const [redirect, setRedirect] = useState(false)
    const dispatch = useDispatch()

    const handleSubmit = (event) => {
        event.preventDefault();
        authService.logout(dispatch)
        localStorage.clear()
        setRedirect(true)
        dispatch(logoutAction())
    }

    if(redirect === true){
        return <Redirect to={'/'}/>
    }

    return (
        <div className="profile">
            <div className="div-center logoutBox">
                <h3>Are you sure you want to exit?</h3>
                <span className="glyphicon glyphicon-log-out"/>
                <Button type="button" onClick={handleSubmit}>Logout</Button>
            </div>
        </div>
    )
}

export default Logout;
