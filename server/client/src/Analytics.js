import {useSelector} from "react-redux";
import {Home} from "./Home";
import Genders from "./analytics/Genders";
import Ranking from "./analytics/Ranking";
import {ListGroup} from "react-bootstrap";
import Logout from "./Logout";
import {Link} from "react-router-dom";
import React from "react";

function AnalyticsAuth(props) {
    return (
        <div className="div-center">
            <div className="content">
                <Genders/>
                <ListGroup horizontal>
                    <ListGroup.Item>
                        <Logout/>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Link to="/profile">My Profile </Link>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Link to="/ranking">Ranking </Link>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Link to={"/"}>Back to Home</Link>
                    </ListGroup.Item>
                </ListGroup>
            </div>
        </div>
    )
    //            <Ranking n={5}/>
}

export const Analytics = () => {
    const user = useSelector(state => state.userReducer)
    return user.username ? <AnalyticsAuth user={user}/> : <Home/>
}


