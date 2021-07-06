import {Redirect} from "react-router-dom";

export function RedirectHome(){
    return <Redirect to={"/"}/>
}

export function RedirectLogin(){
    return <Redirect to={"/login"}/>
}
