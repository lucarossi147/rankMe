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
                    <header>
                        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                            <Link to="/" className="navbar-brand" href="#">Rank Me</Link>
                            <div className="collapse navbar-collapse" id="navbarCollapse">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item active">
                                        <Link to="/" className="nav-link" href="#">Home<span className="sr-only">(current)</span></Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/other" className="nav-link" href="#">Page1</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/other" className="nav-link" href="#">Page2</Link>
                                    </li>
                                </ul>
                                <Link to="/login" className="form-inline ">Login</Link>
                                <Link to="/signup" className="form-inline btn btn-primary">Sign up</Link>
                            </div>
                        </nav>
                    </header>
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
