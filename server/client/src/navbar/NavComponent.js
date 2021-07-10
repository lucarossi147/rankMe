import {Button, Image, Modal, Nav, Navbar} from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";
import Logo from '../res/logo_last.png'
import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import styles from "./navbar.module.css"
import authService from "../authService";
import {logoutAction} from "../actions/allActions";

const LogoutLink = () => (
    <Nav.Link>
        <LogoutModal/>
    </Nav.Link>
);

function LogoutModal() {
    const [show, setShow] = useState(false);
    const [redirect, setRedirect] = useState(false)
    const dispatch = useDispatch()

    const handleClose = () => {
        setShow(false);
        authService.logout(dispatch)
        localStorage.clear()
        setRedirect(true)
        dispatch(logoutAction())
    }

    const close = () => {
        setShow(false);
    }
    const handleShow = () => setShow(true);

    if(redirect === true){
        return <Redirect to={'/'}/>
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Logout
            </Button>

            <Modal show={show} onHide={close}>
                <Modal.Header closeButton>
                    <Modal.Title>Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you really sure?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={close}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Logout
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export const NavComponent = () => {
    return (
        <Navbar collapseOnSelect bg="light" expand="lg" className={styles.bottomSpace}>
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
