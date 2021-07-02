import {useSelector} from "react-redux";
import {Home} from "./Home";
import Genders from "./analytics/Genders";
import Ranking from "./analytics/Ranking";

function AnalyticsAuth(props) {
    return (
        <>
            <Genders/>
        </>
    )
    //            <Ranking n={5}/>
}

export const Analytics = () => {
    const user = useSelector(state => state.userReducer)
    return user.username ? <AnalyticsAuth user={user}/> : <Home/>
}


