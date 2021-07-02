import {useState} from "react";
import {Redirect} from "react-router-dom";
import authService from "./authService";
import {useDispatch} from "react-redux";
import {logoutAction} from "./actions/allActions";

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

    return <input type="button" onClick={handleSubmit} value="Logout" />
}

export default Logout;
