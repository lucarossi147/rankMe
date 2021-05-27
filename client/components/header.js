import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom';

import Home from "../pages/home";
import Other from "../pages/other";
import Login from "../pages/login";
import Signup from "../pages/signup";

class Header extends Component {
    render() {
        return <Router>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <span className="navbar-brand mb-0 h1">Rank me</span>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to="/" className="nav-link" href="#">Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/other" className="nav-link" href="#">Page1</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/other" className="nav-link" href="#">Page2</Link>
                        </li>
                    </ul>
                        <Link to="/login" className="btn">
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Login</button>
                        </Link>
                        <Link to="/signup" className="btn">
                            <button className="btn btn-outline-secondary my-2 my-sm-0">Signup</button>
                        </Link>
                </div>
            </nav>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/other' component={Other}/>
                <Route exact path='/login' component={Login}/>
                <Route exact path='/signup' component={Signup}/>
            </Switch>
        </Router>
    }
}
//TODO add aria-current='page' to selected page
export default Header;
