import React, {useState} from "react";
import './registration.css';
import logo from '../img/Logo-Instagram1.png';
import { Link } from 'react-router-dom';
import gplayApp from '../img/gplay-app.png';
import MsApp from '../img/ms-app.png';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, app , database} from "../firebase.js";
import { doc,  setDoc } from "firebase/firestore";
import { useHistory } from 'react-router-dom';

const Registration = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [isPasswordFieldFocused, setIsPasswordFieldFocused] = useState(false);
    const [password, setPassword] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState(null);
    const history = useHistory();

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    

    const handleRegistration = async (e) => {
        e.preventDefault();

        let fieldToSave = null;
        let valueToSave = null;

        // Check if the input value is an email or phone number
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputValue)) {
            fieldToSave = "email";
            valueToSave = inputValue;
        } else if (/^\d+$/.test(inputValue)) {
            fieldToSave = "phoneNumber";
            valueToSave = `${inputValue}@email.com`;
        } else {
            setError("Invalid email or phone number");
            return;
        }

        try {
            // Create user in Firebase based on the field and value
            const { user } = await createUserWithEmailAndPassword(auth, valueToSave, password);

            const userid = user.uid;

            // Update user details in Firestore
            await setDoc(doc(database, "users", userid), {
                [fieldToSave]: valueToSave,
                name: name,
                username: username
            });

            // Redirect to login page after successful registration
            setTimeout(() => {
                history.push('/login');
            }, 3000);
        } catch (error) {
            console.error("Registration error:", error);
            setError(error.message);
        }
    }


 
    return ( 
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12 p-0 registaration-form">
                        <div className="registaration-form-box">
                             <div className="row">
                                <div className="col-12 ">
                                    <div className="rg-logo-img">
                                            <img src={logo} className="img-fluid" />
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="info-text">Sign up to see photos and videos from your friends.</div>
                                </div>

                                <div className="col-12">
                                    <button className="rg-fb-btn">
                                        <span className="rg-fb-icon"><i className="fa-brands fa-square-facebook"></i></span>
                                        <span className="rg-fb-text">Log in with Facebook</span>
                                    </button>
                                </div>

                                <div className="col-12">
                                    <div className="registration-divider">
                                            <div className="col-5 p-0">
                                                <div className="divider"></div>
                                            </div>
                                            <div className="col-2 p-0">
                                                <div className="divider-text">or</div>
                                            </div>
                                            <div className="col-5 p-0">
                                                <div className="divider"></div>
                                            </div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="registration-form">
                                        <form onSubmit={handleRegistration}>
                                            <div className="rg-email form-floating">
                                                <input 
                                                    type="text" 
                                                    name="inputValue" 
                                                    id="inputValue" 
                                                    value={inputValue}
                                                    className="form-control" 
                                                    placeholder="Mobile Number or Email"
                                                    onChange={ handleInputChange}
                                                />
                                                <label htmlFor="inputValue">Mobile Number or Email</label>
                                            </div>

                                            <div className="rg-name form-floating">
                                                <input 
                                                        type="text" 
                                                        name="name" 
                                                        id="name"
                                                        value={name}
                                                        className="form-control" 
                                                        placeholder="Full Name"
                                                        onChange={handleNameChange}
                                                    />
                                                    <label htmlFor="name">Full Name</label>
                                            </div>

                                            <div className="rg-username form-floating">
                                                <input 
                                                        type="text" 
                                                        name="username" 
                                                        id="username" 
                                                        value={username}
                                                        className="form-control" 
                                                        placeholder="Username"
                                                        onChange={handleUsernameChange}
                                                    />
                                                    <label htmlFor="username">Username</label>
                                            </div>

                                            <div className="rg-password form-floating">
                                                    <input
                                                        type={showPassword ? "text" : "password"}
                                                        className="form-control"
                                                        id="password"
                                                        name="password"
                                                        placeholder="Password"
                                                        value={password}
                                                        onChange={handlePasswordChange}
                                                        onFocus={() => setIsPasswordFieldFocused(true)}
                                                        onBlur={() => setIsPasswordFieldFocused(false)}
                                                    />
                                                    <label htmlFor="password">Password</label>
                                                    {password && (
                                                        <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                                                            {showPassword ? "Hide" : "Show"}
                                                        </span>
                                                    )}
                                            </div>

                                            <div className="text-info-box">
                                                <span className="text-info">
                                                    People who use our service may have uploaded your contact information to Instagram.    
                                                    <Link to="#"> Learn More</Link>
                                                </span>
                                            </div>

                                            <div className="text-info-box">
                                                <span className="text-info">
                                                    By signing up, you agree to our     
                                                    <Link to="#"> Terms</Link>,
                                                    <Link to="#"> Privacy Policy</Link>
                                                    and
                                                    <Link to="#"> Cookies Policy</Link>.
                                                </span>
                                            </div>

                                            <div className="rg-submit-btn">
                                                    <button type="submit" className="btn w-100" value="Log in" name="submit">Sign up</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                             </div>
                        </div>
                    </div>

                    <div className="alrady-have-account-box col-12">
                            <div className="alrady-have-account ">
                                <div className="create-ac-text">
                                    <span>Have an account? </span>
                                    <Link to="/login">Log in</Link>
                                </div>
                            </div>
                    </div>

                    <div className="app-btn-box">
                        <div className="app-btn">
                            <div className="row get-the-app">
                                <div className="col-12">
                                    <div className="get-app-text">Get the app.</div>
                                </div>
                            </div>

                            <div className="row get-app-btn">
                                <div className="col-12 link-btn">
                                    <Link to="#" className="gplay-app"><img src={gplayApp} className="img-fluid"></img></Link>
                                    <Link to="#" className="ms-app"><img src={MsApp} className="img-fluid"></img></Link>
                                </div>
                            </div>
                        </div>
                    </div>

                   
                </div>
            </div>

            {error && <p>Error: {error}</p>}
        </>
    );

}

export default Registration;
