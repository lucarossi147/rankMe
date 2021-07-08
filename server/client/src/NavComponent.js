import {Image, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import Logo from './res/logo_last.png'
import {useSelector} from "react-redux";
import React from "react";
import styles from "./navbar.module.css"

const LogoutLink = () => (
    <Nav.Link>
        <Link to="/logout">
            Logout
        </Link>
    </Nav.Link>
);

export const NavComponent = () => {
    return (
        <Navbar collapseOnSelect bg="light" expand="lg">
            <Navbar.Brand>
                <Link to="/">
                    <Image src={Logo}/>
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="navbarScroll">
                <Nav
                    className="mr-auto my-2 my-lg-0"
                    style={{ maxHeight: '100px' }}
                >
                    <Nav.Link>
                        <Link to="/ranking" className={styles.a}>Ranking </Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link to="/profile" className={styles.a}>
                            Profile
                        </Link>
                    </Nav.Link>
                </Nav>
                <Nav>
                    <Auth/>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

const Auth = () => {
    return useSelector(state => state.userReducer.username)  ? <LogoutLink/> : <></>
}

export default NavComponent
