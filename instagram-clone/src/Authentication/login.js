import React from "react";
import './authentication.css';
import logo from '../img/Logo-Instagram.png'

const Login = () => {

    return (
        <>
            <div className="container-fluid login-container">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-12">
                            <div className="login-img">

                            </div>
                        </div>

                        <div className="col-lg-6 col-12">
                            <div className="login-form-info">
                                <div className="logo-img">
                                    <img src={logo} className="img-fluid" />
                                </div>
                                <div className="login-form">
                                    <form >
                                        <div className="row">
                                            <div className="login-phone form-floating">
                                                <input type="text" class="form-control" id="floatingInput" placeholder="Phone number, username, or email"/>
                                                <label for="floatingInput">Phone number, username, or email</label>
                                            </div>

                                            <div className="login-phone form-floating">
                                                <input type="password" class="form-control" id="floatingInput" placeholder="Password"/>
                                                <label for="floatingInput">Password</label>
                                            </div>

                                            <div className="login-btn">
                                                <button type="submit" class="btn btn-primary w-100">Log in</button>
                                            </div>
                                            
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default Login;