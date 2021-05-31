import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {registerUser} from "../../actions/authActions";
import classnames from "classnames";

class Register extends Component {

    /*
        Register example

         "name": "Luca",
        "surname": "Rossi",
        "username": "luca",
        "email": "lucarossi147@gmail.com",
        "password": "password",
        "picture": "picture.png",
        "birthDate": "2012-04-23T18:25:43.511Z",
        "admin": true
     */
    constructor() {
        super();
        this.state = {
            name: "",
            surname:"",
            username:"",
            email: "",
            password: "",
            password2: "",
            picture:"",
            birthDate:"",
            admin:"",
            errors: {}
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.errors){
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            surname: this.state.surname,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            picture: this.state.picture,
            birthDate: this.state.birthDate,
            admin: false
        };

        this.props.registerUser(newUser, this.props.history);

    };

    render() {
        const { errors } = this.state;
        return (
        <div className="container">
            <div className="row">
                <div className="col s8 offset-s2">
                    <Link to="/" className="btn-flat waves-effect">
                        <i className="material-icons left">keyboard_backspace</i> Back to home
                    </Link>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <h4>
                    <b>Register</b> below
                </h4>
                <p className="grey-text text-darken-1">
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
                </div>
<form noValidate onSubmit={this.onSubmit}>
    <div className="input-field col s12">
        <input
            onChange={this.onChange}
            value={this.state.name}
            error={errors.name}
            id="name"
            type="text"
            className={classnames("", {
                invalid: errors.name
            })}
        />
        <label htmlFor="name">Name</label>
        <span className="red-text">{errors.name}</span>
    </div>
    <div className="input-field col s12">
        <input
            onChange={this.onChange}
            value={this.state.surname}
            error={errors.surname}
            id="surname"
            type="text"
            className={classnames("", {
                invalid: errors.surname
            })}
        />
        <label htmlFor="surname">Surname</label>
        <span className="red-text">{errors.surname}</span>
    </div>
    <div className="input-field col s12">
    <input
        onChange={this.onChange}
        value={this.state.username}
        error={errors.username}
        id="username"
        type="text"
        className={classnames("", {
            invalid: errors.username
        })}
    />
    <label htmlFor="username">Username</label>
        <span className="red-text">{errors.username}</span>
    </div>
    <div className="input-field col s12">
        <input
            onChange={this.onChange}
            value={this.state.email}
            error={errors.email}
            id="email"
            type="email"
            className={classnames("", {
                invalid: errors.email
            })}
        />
        <label htmlFor="email">Email</label>
        <span className="red-text">{errors.email}</span>
    </div>
    <div className="input-field col s12">
        <input
            onChange={this.onChange}
            value={this.state.password}
            error={errors.password}
            id="password"
            type="password"
            className={classnames("", {
                invalid: errors.password
            })}
        />
        <label htmlFor="password">Password</label>
        <span className="red-text">{errors.password}</span>
    </div>
    <div className="input-field col s12">
        <input
            onChange={this.onChange}
            value={this.state.password2}
            error={errors.password2}
            id="password2"
            type="password"
            className={classnames("", {
                invalid: errors.password2
            })}
        />
        <label htmlFor="password2">Confirm Password</label>
        <span className="red-text">{errors.password2}</span>
    </div>
    <div className="input-field col s12">
        <input
            onChange={this.onChange}
            value={this.state.picture}
            error={errors.picture}
            id="picture"
            type="text"
            className={classnames("", {
                invalid: errors.picture
            })}
        />
        <label htmlFor="picture">Picture</label>
        <span className="red-text">{errors.picture}</span>
    </div>
    <div className="input-field col s12">
        <input
            onChange={this.onChange}
            value={this.state.birthDate}
            error={errors.birthDate}
            id="birthDate"
            type="text"
            className={classnames("", {
                invalid: errors.birthDate
            })}
        />
        <label htmlFor="birthDate">Date of birth</label>
        <span className="red-text">{errors.birthDate}</span>
    </div>
    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
        <button
            style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
            }}
            type="submit"
            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                    >
                    Sign up
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
);
}
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Register));
