import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap';
import { userInstance } from '../api/axiosInstances';
import './Login.css';

function Login(props) {
    const [showPassword, setShowPassword] = useState(true);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    document.body.style.height = '0';

    const email = createContext();

    const handleCloseErrorModal = () => setShowErrorModal(false);

    const verifyAccount = () => {
        let email = document.getElementById("email-input").value;
        let password = document.getElementById("pswd").value;
        userInstance.post("login", { "email": email, "password": password })
            .then(function (response) {
                navigate("/dashboard");
            })
            .catch(function (error) {
                setErrorMessage(error.response.data.error || 'Login failed');
                setShowErrorModal(true);
            });
    }

    return (
        <div>
            {props.setEmail("")}
            <div className="split left">
                <div className="color-orange-red"></div>
                <div className="flex">
                    <div className="login-dropdown dropdown">
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
                        <a className="orange-link" onClick={() => { navigate("/register"); }}>Click here to register!</a>
                    </div>
                    <div className="copy-right">Powered by Group 7</div>
                </div>
            </div>
            <Modal className="posts-modal" show={showErrorModal} onHide={handleCloseErrorModal}>
                <Modal.Header className="posts-modal-header" closeButton>
                    <Modal.Title className="posts-modal-text">Login Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>{errorMessage}</Modal.Body>
                <Modal.Footer>
                    <Button className="posts-modal-button darken" onClick={handleCloseErrorModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default Login;