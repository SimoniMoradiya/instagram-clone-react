import React, {useState, useEffect} from "react";
import './registration.css';
import logo from '../img/Logo-Instagram1.png';
import { Link } from 'react-router-dom';
import gplayApp from '../img/gplay-app.png';
import MsApp from '../img/ms-app.png';
import { signInWithPhoneNumber } from "firebase/auth";
import { auth, app , database} from "../firebase.js";
import { RecaptchaVerifier, getAuth } from "firebase/auth";
import { doc,  setDoc } from "firebase/firestore";
import { useHistory } from 'react-router-dom';

const Registration = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [isPasswordFieldFocused, setIsPasswordFieldFocused] = useState(false);
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState(null);
    const history = useHistory();
    const [verifybtn, setVerifybtn] = useState(false);
    const [verifybtnOtp, setVerifyOtp] = useState(false);
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    const handlephoneChange = (e) => {
        setPhone(e.target.value);
        if(e.target.value.length === 10){
            setVerifybtn(true);
        } else {
            setVerifybtn(false);
        }
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

    const handeleOtp = (e) => {
        setOtp(e.target.value);
    }

    useEffect(() => {
        captaverify();
    }, []);
    
    const captaverify = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            {
            size: "invisible", // this property is important otherwise the captcha will be displayed on the screen
            },auth);
            
            window.recaptchaVerifier.verify();
    }
    
    
    

    const handlesubmitphone = async (data) => {
        setLoading(true);
        const phoneNumber = `+${data.phone}`;
        setPhone(phone);
        const appVerifier = await window.recaptchaVerifier;


        signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        alert("SMS sent");
        console.log('SMS sent');
        setVerifyOtp(true);
        // ...
        }).catch((error) => {
        // Error; SMS not sent
            alert("SMS not sent");
            console.log('SMS not sent');
        });

    }

    const verifycode = () => {
        window.confirmationResult.confirm(otp).then((result) => {
            // User signed in successfully.
            const user = result.user;
            alert("signed in successfully");
            console.log("signed in successfully");
            // ...
          }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            alert("signed not in successfully");
            console.log("signed not in successfully");
          });
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
                                        <form >
                                            <div id="recaptcha-container"></div>
                                            <div className="rg-email form-floating">
                                                <input 
                                                    type="text" 
                                                    name="phone" 
                                                    id="phone" 
                                                    value={phone}
                                                    className="form-control" 
                                                    placeholder="Mobile Number or Email"
                                                    onChange={handlephoneChange}
                                                />
                                                <label htmlFor="phone">Mobile Number or Email</label>
                                                { verifybtn ? 
                                                    <input type="button" value="verify" className="mt-2" onClick={captaverify}/>
                                                :null}
                                            </div>

                                            { verifybtnOtp ?
                                                <div className="rg-email form-floating">
                                                    <input 
                                                        type="number " 
                                                        name="Otp" 
                                                        id="Otp" 
                                                        value={otp}
                                                        className="form-control" 
                                                        placeholder="Mobile Number or Email"
                                                        onChange={handeleOtp}
                                                    />
                                                    <label htmlFor="phone">Otp</label>
                                                    <input type="button" value="verify" className="mt-2" onClick={verifycode}/>
                                                </div>
                                            : null}

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
