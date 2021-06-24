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
        setRedirect(true)
        dispatch(logoutAction())
    }

    if(redirect === true){
        return <Redirect to={'/'}/>
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="submit" value="Logout" />
            </form>
        </div>
    );
}
export default Logout;
