import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Register.css';

const instance = axios.create({
    baseURL: 'http://localhost:5000/api/user'
});

function Register(props) {
    const [showPassword, setShowPassword] = useState(true);
    const navigate = useNavigate();

    document.body.style.height = '0';

    const email = createContext();

    const verifyAccount = () => {
        let username = document.getElementById("username-input").value;
        let email = document.getElementById("email-input").value;
        let password = document.getElementById("pswd").value;
        //Verify Account
        instance.post("signup", { "username": username, "email": email, "password": password })
            .then(function (response) {
                console.log(username + " " + email + " " + password);
                window.alert("Account Created!");
            })
            .catch(function (error) {
                window.alert(error.response.data.error);
                console.log(error);
            })
    }

    return (
        <div>
            <div className="split left">
                <div className="color-orange-red"></div>
                <div className="flex">
                    <div className="dropdown login-dropdown">
                        <div className="logo-title">FLEXTRACK</div>
                        <a className="dropdown-text" href="#">The all-in-one fitness app!</a>
                    </div>
                    <div className="message-container">
                        <div className="welcome-back">Welcome Back!</div>
                        <div className="custom-message">Looking to shed a few pounds or put on some muscle? We've got you covered!</div>
                    </div>
                </div>
            </div>
            <div className="split right">
                <div className="login-container">
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"></link>
                    <div className="login-label">Register</div>
                    <div className="username-label">Username</div>
                    <input id="username-input" type="text" placeholder="Enter Your Username" name="uname" required />
                    <div className="email-label">Email</div>
                    <input id="email-input" type="text" placeholder="Enter Your Email" name="email" required />
                    <div className="pswd-label">Password</div>
                    <div>
                        <input id="pswd" type={showPassword ? "password" : "text"} placeholder="Enter Your Password" name="psw" required />
                        {showPassword ?
                            <i className="bi bi-eye-slash input-password-eye" onClick={() => { setShowPassword(false) }} /> :
                            <i className="bi bi-eye input-password-eye" onClick={() => { setShowPassword(true) }} />}
                    </div>
                    <div className="conf-pswd-label">Confirm Password</div>
                    <div>
                        <input id="pswd" type={showPassword ? "password" : "text"} placeholder="Enter Your Password" name="psw" required />
                        {showPassword ?
                            <i className="bi bi-eye-slash input-password-eye" onClick={() => { setShowPassword(false) }} /> :
                            <i className="bi bi-eye input-password-eye" onClick={() => { setShowPassword(true) }} />}
                    </div>
                    <button className="login" type="login" onClick={() => {
                        verifyAccount();
                    }}>Register</button>
                    <div>
                        <label>Already a user?&nbsp;</label>
                        <a className="orange-link" onClick={() => { navigate("/login"); }}>Click here to log in!</a>
                    </div>
                    <div className="copy-right">Powered by Group 7</div>
                </div>
            </div>
        </div>
    )
}
export default Register;