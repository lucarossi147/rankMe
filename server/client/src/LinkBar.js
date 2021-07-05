import {ListGroup} from "react-bootstrap";
import Logout from "./Logout";
import {Link} from "react-router-dom";
import React from "react";
import {useSelector} from "react-redux";

const LinkBar = (props) => {
    const active = props.active
    const id = useSelector(state => state.userReducer._id)
    return (
        <ListGroup horizontal={"sm"}>
            <ListGroup.Item>
                <Logout/>
            </ListGroup.Item>
            <ListGroup.Item>
                <Link
                    to={{
                        pathname: "/profile",
                        state: { redirectToUser: id },
                    }}>
                    My profile
                </Link>
            </ListGroup.Item>
            <ListGroup.Item>
                <Link to="/analytics">Analytics </Link>
            </ListGroup.Item>
            <ListGroup.Item>
                <Link to="/ranking">Ranking </Link>
            </ListGroup.Item>
            <ListGroup.Item>
                <Link to="/badges">My badges </Link>
            </ListGroup.Item>
            <ListGroup.Item>
                <Link to={"/"}>Back to Home</Link>
            </ListGroup.Item>
        </ListGroup>
    )
}

export default LinkBar
