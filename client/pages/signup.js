import React, { Component } from 'react';

class Signup extends Component {
    render() {
        return <form className="p-4">
                    <h1>Sign up</h1>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputName4">Name</label>
                            <input type="text" className="form-control" id="inputName4" placeholder="Name"/>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputSurname">Surname</label>
                            <input type="text" className="form-control" id="inputSurname" placeholder="Password"/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">Email</label>
                            <input type="email" className="form-control" id="inputEmail4" placeholder="Email"/>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">Password</label>
                            <input type="password" className="form-control" id="inputPassword4" placeholder="Password"/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputUsername">Username</label>
                            <input type="text" className="form-control" id="inputUsername" placeholder="Username"/>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputDate">Date</label>
                            <input type="date" className="form-control" id="inputDate"/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputAddress">Address</label>
                            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"/>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputCity">City</label>
                            <input type="text" className="form-control" id="inputCity"/>
                        </div>
                    </div>
            <button type="submit" className="btn btn-primary btn-lg btn-block">Sign up</button>
        </form>
    }
}

export default Signup;


