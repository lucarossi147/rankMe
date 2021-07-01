import {useSelector} from "react-redux";
import {Home} from "./Home";

function AnalyticsAuth(props) {
    console.log("Analytics auth")
    return (
        <Genders/>
    )
}

export const Analytics = () => {
    const user = useSelector(state => state.userReducer)
    return user.username ? <AnalyticsAuth user={user}/> : <Home/>
}


