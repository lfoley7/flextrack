import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Login.css';

const instance = axios.create({
    baseURL: 'http://localhost:3000/api/user'
});

function Login(props) {
    const [showPassword, setShowPassword] = useState(true);
    const navigate = useNavigate();

    document.body.style.height = '0';

    const email = createContext();

    const verifyAccount = () => {
        let email = document.getElementById("email-input").value;
        let password = document.getElementById("pswd").value;
        //Verify Account
        instance.post("login", { "email": email, "password": password })
            .then(function (response) {
                console.log(email + " " + password);
                navigate("/")
            })
            .catch(function (error) {
                window.alert(error.response.data.error);
                console.log(error);
            })
    }

    return (
        <div>
            {props.setEmail("")}
            <div className="split left">
                <div className="color-orange-red"></div>
                <div className="flex">
                    <div className="dropdown">
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
                    <div className="login-label">Login</div>
                    <div className="email-label">Email</div>
                    <input id="email-input" type="text" placeholder="Enter Your Username" name="uname" required />
                    <div className="pswd-label">Password</div>
                    <div>
                        <input id="pswd" type={showPassword ? "password" : "text"} placeholder="Enter Your Password" name="psw" required />
                        {showPassword ?
                            <i className="bi bi-eye-slash input-password-eye" onClick={() => { setShowPassword(false) }} /> :
                            <i className="bi bi-eye input-password-eye" onClick={() => { setShowPassword(true) }} />}
                    </div>
                    <button className="login" type="login" onClick={() => {
                        verifyAccount();
                    }}>Login</button>
                    <div>
                        <label>New to your fitness journey?&nbsp;</label>
                        <a onClick={() => { navigate("/register"); }}>Click here to register!</a>
                    </div>
                    <div className="copy-right">Powered by Group 7</div>
                </div>
            </div>
        </div>
    )
}
export default Login;